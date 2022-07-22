from typing import List, Optional
from pydantic import BaseModel


class PlurkRequest(BaseModel):
    id: str


class PlurkUser(BaseModel):
    id: str
    display_name: str
    nickname: str


class PlurkMessage(BaseModel):
    id: str
    owner: PlurkUser
    post_time: str
    last_edit_time: Optional[str]
    lang: str
    qualifier: str
    content: str
    content_raw: Optional[str]


class PlurkResponse(PlurkMessage):
    plurk_id: str
    coins_count: Optional[int]


class PlurkContent(PlurkMessage):
    plurk_type: int
    anonymous: bool
    porn: bool

    coins_count: int
    favorites_count: int
    replurkers_count: int
    responses_count: int
    responses: Optional[List[PlurkResponse]]
