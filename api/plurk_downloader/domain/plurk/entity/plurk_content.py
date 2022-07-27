from typing import List, Optional

from .plurk_message import PlurkMessage
from .plurk_response import PlurkResponse


class PlurkContent(PlurkMessage):
    b36id: str
    plurk_type: int
    anonymous: bool
    porn: bool

    coins_count: int
    favorites_count: int
    replurkers_count: int
    responses_count: int
    responses: Optional[List[PlurkResponse]]
