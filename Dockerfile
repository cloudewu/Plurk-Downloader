FROM ubuntu:18.04

RUN apt-get update -y && \
    apt-get install -y python3 python3-pip python3-dev && \ 
    apt-get install nano

COPY ./requirements.txt /app/requirements.txt
COPY ./app.py /app

WORKDIR /app

RUN pip3 install -r requirements.txt

CMD ["python3","app.py"]
