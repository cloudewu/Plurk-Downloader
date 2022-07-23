from pydantic import BaseModel


class ExtractRequest(BaseModel):
    plurk_id: str
