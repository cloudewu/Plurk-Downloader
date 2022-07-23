from fastapi import FastAPI

from ..form import ExtractRequest
from ...domain.plurk.entity import PlurkContent
from ...infrastructure.plurk.plurk_api import get_plurk, get_response


app = FastAPI()


@app.get('/', status_code=200)
def index():
    return 'OK'


@app.get('/content', response_model=PlurkContent)
def get_content(request: str):
    # WIP: plurk content is returned directly for now
    # TODO: return processed markdown instead
    rq = ExtractRequest(id=request)
    p = get_plurk(rq)
    p = get_response(p)
    return p
