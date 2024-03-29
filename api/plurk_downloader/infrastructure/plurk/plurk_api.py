import logging

from fastapi import HTTPException
from plurk_oauth import PlurkAPI

from ...application.form import ExtractRequest
from ...config import Config
from ...domain.plurk.entity import PlurkContent
from ...domain.plurk.mapper import content_mapper, response_list_mapper


config = Config()
plurk_api = PlurkAPI(
    key=config.PLURK_API_KEY,
    secret=config.PLURK_API_SECRET,
    access_token=config.PLURK_ACCESS_TOKEN,
    access_secret=config.PLURK_ACCESS_SECRET,
)
logger = logging.getLogger('PlurkAPI')


def get_plurk(request: ExtractRequest) -> PlurkContent:
    logger.info(f'trying to get plurk: {request.plurk_id}')

    ret = plurk_api.callAPI(
        '/APP/Timeline/getPlurk',
        options={
            'plurk_id': request.plurk_id,
            'favorers_detail': False,
            'limited_detail': False,
            'replurkers_detail': False,
            'minimal_data': True,
            'minimal_user': True,
        }
    )
    if not ret:
        error = plurk_api.error()
        logger.warning(f"failed to get plurk content: {error['content']!r}")
        raise HTTPException(status_code=error['code'], detail=error['reason'])

    logger.info(f'got {request.plurk_id}')
    plurk = content_mapper(ret)

    return plurk


def get_response(plurk: PlurkContent) -> PlurkContent:
    logger.info(f'trying to get responses: {plurk.id}')

    ret = plurk_api.callAPI(
        '/APP/Responses/get',
        options={
            'plurk_id': plurk.id,
            'from_response': 0,
            'minimal_data': True,
            'minimal_user': True,
            'count': 0, # get all responses
        }
    )
    if not ret:
        error = plurk_api.error()
        logger.warning(f"failed to get plurk responses: {error['content']!r}")
        raise HTTPException(status_code=error['code'], detail=error['reason'])

    logger.info(f'got responses of {plurk.id}')
    plurk.responses = response_list_mapper(plurk.id, ret)

    return plurk
