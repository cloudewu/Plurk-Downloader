# Plurk Downloader - Frontend

This is the frontend repo of [Plurk Downloader](https://plurk-downloader.vercel.app/).

If you want to see the full source code, checks the [root repo](https://github.com/cloudewu/Plurk-Downloader).

## Get Started

### Dependencies

This repo version-controlled the pacakges with the [zero-install](https://yarnpkg.com/features/zero-installs) feature provided by Yarn.

That means, you can directly do `yarn dev` and start developing once you clone the repo. Technically it should work.

However, given that the [husky hooks](https://typicode.github.io/husky/) requires at least once yarn-install to take effects, we still recommend you do the installation once cloning this repo:

```bash
# make sure you are under the app/ folder
yarn
```

### Environment variables

Export `API_DOMAIN` as a environment variables, or write it in the `.env.local`.

If you are not serving a API server yourself, set it to the production API url.

If you have setup a API server yourself, set it as where you hosted it.

### Develop

```bash
# to watch the file changes
yarn dev

# to serve a optimized build
yarn build && yarn start
```

### Deploy

The web application is deployed on [Vercel](https://vercel.com/).

## Contribute

A [pre-commit hook] is set-up to ensure the code quality of this repo. Make sure you install the husky hook (by `yarn install`) and pass the quality check before pushing the commits.
