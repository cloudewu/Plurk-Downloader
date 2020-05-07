# -*- coding:utf-8 -*
# import packages
from flask import Flask, render_template, request, jsonify, Response
import json
import traceback
import functions.crawl as function

import home  # home page rendering 
    
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
            print('Receive link \n', url)
            response = function.get_content_by_link(url)
            return jsonify(response)
        except Exception as e:
            print("ERROR", {'error': str(e), 'trace': traceback.format_exc()})
            response = {
                "status_code": 500,
                "status":"fail", 
                "reason":"Internal Server Error"
            }
            return jsonify(response)


# download makedown by link
@app.route('/download_makedown',methods=['GET','POST'])
def download_makedown():
    if request.method == 'GET':
        return "please choose post method"

    if request.method == 'POST':
        return "post"
        

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    return response

if __name__ == '__main__':
    # register blueprints
    app.register_blueprint(home.bp)
    
    app.run(host='0.0.0.0', port=8765, debug=True)
    

