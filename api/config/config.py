import os

from pydantic import BaseSettings


class Config(BaseSettings):
    PLURK_API_KEY: str
    PLURK_API_SECRET: str
    PLURK_ACCESS_TOKEN: str
    PLURK_ACCESS_SECRET: str

    class Config:
        secrets_dir = os.path.join('config', 'secrets')
