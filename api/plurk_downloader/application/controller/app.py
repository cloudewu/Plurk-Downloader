import logging
import re

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from itertools import chain
from operator import attrgetter

from ..form import ExtractRequest
from ..representator.MDResponse import MDResponse
from ...config import Config
from ...domain.markdown.mapper import gen_markdown_from_plurk
from ...infrastructure.coder import is_b36_str
from ...infrastructure.plurk.plurk_api import get_plurk, get_response


logger = logging.getLogger('api')
config = Config()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.APP_DOMAINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/', status_code=200)
def index():
    return 'OK'


@app.get('/markdown', response_model=MDResponse)
def get_markdown(q: str):
    logger.info(f'got request: {q}')

    if re.match(r'^((http|https):\/\/)?www.plurk.com(\/m)?\/p\/([\da-z]+)\/?$', q):
        logger.info(f'treats request string as a plurk url: {q}')
        _, plurk_id = q.rstrip('/').rsplit('/', 1)
        rq = ExtractRequest(plurk_id_base36=plurk_id)
    elif q.isdigit():
        logger.info(f'treats request string as a plurk id: {int(q)}')
        rq = ExtractRequest(plurk_id=int(q))
    elif is_b36_str(q):
        logger.info(f'treats request string as an encoded plurk id: {q}')
        rq = ExtractRequest(plurk_id_base36=q)
    else:
        raise HTTPException(status_code=400, detail='invalid input')

    logger.info(f'got encoded plurk id: {rq.plurk_id}')

    # TODO: handle errors
    p = get_plurk(rq)
    p = get_response(p)
    md = gen_markdown_from_plurk(p)
    title = f'{md.plurker} - {md.plurk_b36id}'

    response = MDResponse(
        title=f"{title}_{md.timestamp.replace(':', '')}",
        content='\n'.join(chain([f'# {title}', '', md.content], map(attrgetter('content'), md.responses), [md.footer]))
    )

    return response
