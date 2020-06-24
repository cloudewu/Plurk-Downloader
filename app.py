# -*- coding:utf-8 -*
# import packages
from flask import Flask, request, jsonify, Response, render_template
import json
import argparse
import traceback
import urllib.parse

import functions.crawl as function

# import home  # home page rendering
    
##################
#                #
#   API server   #
#                #
##################
app = Flask(__name__)

# get clear txt by link
@app.route('/backup',methods=['GET','POST'])
def upload_file():
    if request.method == 'GET':
        return "please choose post method"

    if request.method == 'POST':
        try:
            url = request.json.get('link')  
        except Exception as e:
            print('Exception:  ',e)
            response = {
                "status_code": 500, 
                "reason": "Internal Server Error. Cannot get input link"
            }
            return jsonify(response)

        print('\n\nReceive link: ', url, '\n\n')
        response = function.get_content_by_link(url)
        return jsonify(response)


# download makedown by link
@app.route('/download_makedown',methods=['GET','POST'])
def download_makedown():
    if request.method == 'GET':
        return "please choose post method"

    if request.method == 'POST':
        return "download beautiful makedown >///<"
        

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    return response

@app.route('/')
@app.route('/index')
def root():
    return render_template('index.html')

def index():
    return render_template('index.html')

@app.route('/download')
def download():
	query = request.args.get('content')
	encodeURI = 'data:text/plain;charset=UTF-8,' + urllib.parse.quote(query)
	return render_template('download.html', content=query, link=encodeURI)

def parse_arg():
    # [Note] If you modify the default value here, please update Dockerfile at the same time #
    parser = argparse.ArgumentParser()
    parser.add_argument('host', nargs='?', default='localhost', type=str, help='Application host IP')
    parser.add_argument('port', nargs='?', default=8000, type=int, help='Application host port')
    return parser.parse_args()

if __name__ == '__main__':
    args = parse_arg()
    host, port = args.host, args.port
    
    # register blueprints
    # app.register_blueprint(home.bp)
    
    app.run(host=host, port=port, debug=True)
    

