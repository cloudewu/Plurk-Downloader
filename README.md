# Plurk-Downloader
A download helper to help users save certain plurk content.

## Build docker image
1. clone and enter this repository
2. build docker image: `docker build -t plurk-downloader .`
3. run docker containter: `docker run --rm -dp 8000:8000 plurk-downloader`
4. open your browser and open `http://localhost:8000`

## Useful Link
 * [Git cheat sheet][git]
 * [使用 Go 撰寫 Plurk 噗浪偷偷說網路爬蟲][go-crawler]
 * [python - Beautiful Soup 4.4.0 Docs][bs4]
 * [python - Requests Docs][requests]
 * [Plurk API 2.0][plurkAPI]

## Current task
 * filter useful content

## Progress
 **Plurk request**
  - [x] Request plurk content
  - [x] Filter useful content
  - [x] Transform to markdown syntax

 **Web deploy**
  - [x] Basic download page
  - [x] Beautify the page
  - [ ] Deploy web app

 **Bonus function**
  - [x] Dockerize the app
  - [ ] Custom select what to include (time/likes/replurks, etc)
  - [ ] Only download plurk-owner's response
  - [ ] Filter specific plurker
  - [ ] Filter specific content

 **Other**
  - [ ] Different download format(pdf/jpeg, etc?)
  - [ ] Different program language(practice purpose)
  - [ ] Support mobile url


[git]: https://hackmd.io/Lbv2CVgQSFGicwa1ZVXcOw
[go-crawler]: https://city.shaform.com/zh/2019/01/11/plurk-crawler/
[bs4]: https://www.crummy.com/software/BeautifulSoup/bs4/doc/
[requests]: https://2.python-requests.org/en/master/user/quickstart/
[plurkAPI]: https://www.plurk.com/API 
