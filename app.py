# -*- coding:utf-8 -*
# import packages
from flask import Flask, request, jsonify, Response
import json
import argparse
import traceback

import functions.crawl as function

import home  # home page rendering 
    
##################
#                #
#   API server   #
#                #
##################
app = Flask(__name__)
app.register_blueprint(home.bp)

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
    
    app.run(host=host, port=port, debug=True)
    

