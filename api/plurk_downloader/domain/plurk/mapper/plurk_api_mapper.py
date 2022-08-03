import logging

from typing import Dict, List

from ..entity import PlurkContent, PlurkResponse, PlurkUser
from ....infrastructure.coder import b36_encode


logger = logging.getLogger('PlurkAPI Mapper')


def user_mapper(user: Dict) -> PlurkUser:
    return PlurkUser(
        id=user.get('id'),
        display_name=user.get('display_name'),
        nickname=user.get('nick_name'),
    )


def content_mapper(plurk_data: Dict) -> PlurkContent:
    owner = user_mapper(plurk_data['user'])
    plurk = plurk_data['plurk']

    # dict.get() is used to handle optional return fields
    pid = plurk.get('plurk_id')
    logger.info(f'mapping plurk {pid}')
    return PlurkContent(
        owner=owner,
        id=pid,
        b36id=b36_encode(pid),
        post_time=plurk.get('posted'),
        last_edit_time=plurk.get('last_edited'),
        lang=plurk.get('lang'),
        qualifier=plurk.get('qualifier_translated'),
        content=plurk.get('content'),
        content_raw=plurk.get('content_raw'),
        plurk_type=plurk.get('plurk_type'),
        anonymous=plurk.get('anonymous'),
        porn=plurk.get('porn'),
        coins_count=plurk.get('coins'),
        favorites_count=plurk.get('favorite_count'),
        replurkers_count=plurk.get('replurkers_count'),
        responses_count=plurk.get('response_count'),
    )


def response_list_mapper(plurk_id: str, responses: List[Dict]) -> List[PlurkResponse]:
    logger.info(f'mapping response list from plurk {plurk_id}')
    friends = responses['friends']

    def gen_response(response):
        poster = friends.get(str(response['user_id']))
        return response_mapper(plurk_id, poster, response)

    return list(map(gen_response, responses['responses']))


def response_mapper(plurk_id: str, poster: Dict, response: Dict) -> PlurkResponse:
    logger.info(f"mapping the response {response['id']} from plurk {plurk_id}")
    owner = user_mapper(poster)
    if int(owner.id) == 99999: # anonymous plurker
        anonymous_id = response.get('handle')
        logger.info(f'Anonymous plurker detected. Generated id: {anonymous_id}')
        owner.display_name = anonymous_id or owner.display_name
        if anonymous_id != 'ಠ_ಠ':
            owner.nickname = anonymous_id or owner.nickname
        """
        Note that: both display name and nickname falls back to original one if handle is not found.
        Also, the plurker themselves is always shown as ಠ_ಠ (@anonymous),
        whereaw other plurkers are shown as handler (@handler).
        """

    # dict.get() is used to handle optional return fields
    return PlurkResponse(
        plurk_id=plurk_id,
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
