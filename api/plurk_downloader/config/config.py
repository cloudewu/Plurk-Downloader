import os

from pydantic import BaseSettings


class Config(BaseSettings):
    APP_DOMAIN: str
    PLURK_API_KEY: str
    PLURK_API_SECRET: str
    PLURK_ACCESS_TOKEN: str
    PLURK_ACCESS_SECRET: str

    class Config:
        env_file = os.path.join('plurk_downloader', 'config', '.env')
        secrets_dir = os.path.join('plurk_downloader', 'config', 'secrets')
