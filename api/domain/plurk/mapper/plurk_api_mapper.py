from typing import Dict, List

from domain.plurk.entity import PlurkContent, PlurkResponse, PlurkUser


def user_mapper(user: Dict) -> PlurkUser:
    return PlurkUser(
        id=user.get('id'),
        display_name=user.get('display_name'),
        nickname=user.get('nick_name'),
    )


def content_mapper(plurk: Dict) -> PlurkContent:
    ...


def response_list_mapper(plurk_id: str, responses: List[Dict]) -> List[PlurkResponse]:
    friends = responses['friends']

    def gen_response(response):
        poster = friends.get(str(response['user_id']))
        return response_mapper(plurk_id, poster, response)

    return list(map(gen_response, responses['responses']))


def response_mapper(plurk_id: str, poster: Dict, response: Dict) -> PlurkResponse:
    owner = user_mapper(poster)

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
