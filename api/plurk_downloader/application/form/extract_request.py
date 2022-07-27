from pydantic import BaseModel, validator, root_validator
from typing import Optional

from ...infrastructure.coder import b36_decode, is_b36_str


class ExtractRequest(BaseModel):
    plurk_id: int
    plurk_id_base36: Optional[str]
    plurk_url: Optional[str]

    @root_validator(pre=True)
    def field_preprocess(cls, values):
        id = values.get('plurk_id')
        id_base36 = values.get('plurk_id_base36')
        if id_base36 and not id:
            values['plurk_id'] = b36_decode(id_base36)
        return values

    @root_validator
    def check_ids_match(cls, values):
        id = values.get('plurk_id')
        id_base36 = values.get('plurk_id_base36')
        if id and id_base36:
            assert b36_decode(id_base36) == id
        return values

    @validator('plurk_id_base36')
    def check_plurk_id_base36(cls, value):
        assert is_b36_str(value), 'should be base36 encoded'
        return value
