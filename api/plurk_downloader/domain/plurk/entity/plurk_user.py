from pydantic import BaseModel


class PlurkUser(BaseModel):
    id: str
    display_name: str
    nickname: str
