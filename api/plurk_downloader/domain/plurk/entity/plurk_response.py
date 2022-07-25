from typing import Optional

from .plurk_message import PlurkMessage


class PlurkResponse(PlurkMessage):
    plurk_id: str
    coins_count: Optional[int]
