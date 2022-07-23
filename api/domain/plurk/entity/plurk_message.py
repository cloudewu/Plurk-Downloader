from typing import List, Optional
from pydantic import BaseModel

from .plurk_user import PlurkUser


class PlurkMessage(BaseModel):
    id: str
    owner: PlurkUser
    post_time: str
    last_edit_time: Optional[str]
    lang: str
    qualifier: str
    content: str
    content_raw: Optional[str]
