import logging

from fastapi import HTTPException
from plurk_oauth import PlurkAPI

from application.form import ExtractRequest
from config import Config
from domain.plurk.entity import PlurkContent, PlurkResponse, PlurkUser


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
        logger.warning(f'failed to get plurk content: {error["content"]!r}')
        raise HTTPException(status_code=error['code'], detail=error['reason'])
    logger.info(f'got {request.plurk_id}')

    # TODO: seperate entity translation as a utility module
    user_data = ret['user']
    owner = PlurkUser(
        id=user_data['id'],
        display_name=user_data['display_name'],
        nickname=user_data['nick_name']
    )
    plurk_data = ret['plurk']
    plurk = PlurkContent(
        owner=owner,
        id=plurk_data['plurk_id'],
        post_time=plurk_data['posted'],
        last_edit_time=plurk_data['last_edited'],
        lang=plurk_data['lang'],
        qualifier=plurk_data['qualifier_translated'],
        content=plurk_data['content'],
        content_raw=plurk_data['content_raw'],
        plurk_type=plurk_data['plurk_type'],
        anonymous=plurk_data['anonymous'],
        porn=plurk_data['porn'],
        coins_count=plurk_data['coins'],
        favorites_count=plurk_data['favorite_count'],
        replurkers_count=plurk_data['replurkers_count'],
        responses_count=plurk_data['response_count'],
    )
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
        logger.warning(f'failed to get plurk responses: {error["content"]!r}')
        raise HTTPException(status_code=error['code'], detail=error['reason'])
    logger.info(f'got responses of {plurk.id}')

    # dict.get() is used to handle the unstable return-format
    # TODO: seperate entity translation as a utility module
    response_list = []
    for response in ret['responses']:
        user_data = ret['friends'].get(str(response['user_id']))
        owner = PlurkUser(
            id=user_data['id'],
            display_name=user_data['display_name'],
            nickname=user_data['nick_name']
        )
        response = PlurkResponse(
            plurk_id=plurk.id,
            id=response.get('id'),
            owner=owner,
            post_time=response.get('posted'),
            last_edit_time=response.get('last_edited'),
            lang=response.get('lang'),
            qualifier=response.get('qualifier_translated'),
            content=response.get('content'),
            content_raw=response.get('content_raw'),
            coins_count=response.get('coins'),
        )
        response_list.append(response)

    plurk.responses = response_list
    return plurk
