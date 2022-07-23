from fastapi import FastAPI, HTTPException

from ..form import ExtractRequest
from ...domain.plurk.entity import PlurkContent
from ...infrastructure.coder import is_b36_str
from ...infrastructure.plurk.plurk_api import get_plurk, get_response


app = FastAPI()


@app.get('/', status_code=200)
def index():
    return 'OK'


@app.get('/markdown', response_model=PlurkContent)
def get_markdown(request: str):
    # WIP: plurk content is returned directly for now
    # TODO: return processed markdown instead
    if request.startswith('http'):
        ... # TODO: handle url
    elif request.isdigit():
        rq = ExtractRequest(plurk_id=int(request))
    elif is_b36_str(request):
        rq = ExtractRequest(plurk_id_base36=request)
    else:
        raise HTTPException(status_code=400, detail='invalid input')

    p = get_plurk(rq)
    p = get_response(p)
    return p
