from typing import List, Optional
from pydantic import BaseModel

from .plurk_response_md import PlurkResponseMD


class PlurkMD(BaseModel):
    plurk_id: str
    content: str
    responses: Optional[List[PlurkResponseMD]]
