from typing import List, Optional
from pydantic import BaseModel

from .plurk_response_md import PlurkResponseMD


class PlurkMD(BaseModel):
    plurk_b36id: str
    plurk_url: str
    plurker: str
    content: str
    responses: List[PlurkResponseMD]
    footer: str
    timestamp: str
