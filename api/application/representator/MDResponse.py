from pydantic import BaseModel


class MDResponse(BaseModel):
    title: str
    content: str
