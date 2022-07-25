from pydantic import BaseModel


class PlurkResponseMD(BaseModel):
    id: str
    floor_id: int
    content: str
