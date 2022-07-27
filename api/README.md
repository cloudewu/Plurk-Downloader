# Plurk Downloader - Backend

This is the backend repo of [Plurk Downloader](https://plurk-downloader.vercel.app/).

If you want to see the full source code, checks the [root repo](https://github.com/cloudewu/Plurk-Downloader).

## Get Started

### Dependencies

We mainly use [poetry](https://python-poetry.org/) to manage package dependencies.

However, a `requirements.txt` still exists for [Deta deployment](#Deploy). Make sure to manually update the files as well after adding a dependency with poetry.

```bash
# make sure you are under api/ folder
poetry install
```

### Secrets

Secrets should be set in `plurk_downloader/config/.env.local` or be exposed as environment variables.

Get a set of API Keys from [Plurk App](https://www.plurk.com/PlurkApp/) and set it in the files.

### Develop

```bash
# to watch the file changes
poetry run uvicorn main:app --reload
```

### Deploy

The API is served on [Deta](https://www.deta.sh/).

## Contribute

Quality checks are not performed on backend code for now. It will be added soon ;)
