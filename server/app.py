# -*- coding:utf-8 -*
# import packages
from mdutils.mdutils import MdUtils # help to create a markdown file
from bs4 import BeautifulSoup as bs # for html parsing
import requests as rq
import slimit
from slimit.parser import Parser
from slimit.visitors.nodevisitor import ASTVisitor
from flask import Flask, render_template, request, jsonify, Response
import json
import os
import sys
import time



"""
" A Visitor inheritate slimit.visitors.ASTVisitor.
" To traverse the parse tree and transform to python dictionary
"""
class JSVisitor(ASTVisitor):
    def __init__(self, dic):
        self.json = dic
    """
    "  Traverse function
    """
    def visit_Object(self, node):
        for prop in node:
            left, right = prop.left, prop.right
            key = left.value[1:-1]   # deliminate quotes
            try:
                value = self.GetValue(right)
            except ValueError as e:
                print("ValueError: {}".format(str(e)))
            # print("Property key={}, value={}".format(key, value))
            self.json[key] = value
            # visit all children in turn
            self.visit(prop)
    """
    "  To get and transform values from AST nodes.
    """    
    def GetValue(self, node):
        node_type = type(node)
        if node_type is slimit.ast.NewExpr:
            return "NewExpr"
        if node_type is slimit.ast.Boolean:
            if node.value == 'false':
                return False
            if node.value == 'true':
                return True
            raise ValueError("Unknow value of node: {}".format(node.value))
        if node_type is slimit.ast.String:
            return node.value[1:-1]   # deliminate quotes
        if node_type is slimit.ast.Number:
            return int(node.value)
        if node_type is slimit.ast.Null:
            return None
        if node_type is slimit.ast.Array:
            array = [self.GetValue(n) for n in node.items]
            return array
        raise ValueError("Unknow node type: {}".format(node_type))


def get_content_by_link(plurk_url):
    
    # request plurk content from plurk.com
    with rq.Session() as sess:    
        plurk = sess.get(plurk_url)
        if plurk.status_code == rq.codes.ok:
            print("Request Success! Status: {}.".format(plurk.status_code))
        else:
            print("Request fail. Status: {}.".format(plurk.status_code))
            return 'Fail QAQ'
            
    # read content of HTML
    soup = bs(plurk.text)
    # extract the last script out
    script = soup.find_all("script")[-1].string
    
    plurk_content = {}

    parser = Parser()
    json_tree = parser.parse(script)    # construct parse tree
    visitor = JSVisitor(plurk_content)
    visitor.visit(json_tree)            # traverse the tree

    # response
    request_url = "https://www.plurk.com/Responses/get"
    data = {'plurk_id': plurk_content.get('id'), 'from_response_id': '0'}
    print(data)
    
    with rq.Session() as sess:
        # request response from Responses/get, and use plurk_id as data to tell website which plurk we are requesting
        # sess.post means HTTP POST
        response = sess.post(request_url, data=data)
        if response.status_code == rq.codes.ok:
            print("Request Success! Status: {}.".format(response.status_code))
        else:
            print("Request fail. Status: {}.".format(response.status_code))
    
    response_content = response.json()
    return plurk_content, soup, response_content
    

##################### 
#                   #
#   Main Function   #
#                   #
##################### 
def get_raw_plurk(link):
    plurk_info, plurk_html, content = get_content_by_link(link)

    head = plurk_html.find_all("div", class_="plurk")  
    string = ''
    for owo in head[0].find("div", class_="text_holder"):
        string += str(owo)  

    raw_data = {
        "plurk_info": {
            "plurk_id":plurk_info.get('id'),
            "user_id":plurk_info.get('user_id'),
            "favorite_count":plurk_info.get('favorite_count'),
            "response_count":plurk_info.get('response_count'),
            "replurkers_count":plurk_info.get('replurkers_count'),
            "coins":plurk_info.get('coins'),
            "qualifier":plurk_info.get('qualifier'),
            "anonymous":plurk_info.get('anonymous'),
            "st_edited":plurk_info.get('st_edited'),
            "no_comments":plurk_info.get('no_comments'),
            "posted":plurk_info.get('posted'),
            "lang":plurk_info.get('lang'),
            "content":plurk_info.get('content'),
            "content_raw":plurk_info.get('content_raw'),
        },
        "plurk":{
            "poster_img": head[0].find("img").get("src"),
            "poster_name": head[0].find("a", class_="name").text,
            "post_time": head[0].find("time", class_="timeago")['datetime'],
            "post_content": string,
            "response_count": content.get('response_count')        
        },
        "response":[]
    }

    users = content.get('users')
    for response in content.get('responses'):
        user_id = str(response.get('user_id'))

        # user profile image
        has_profile_image = users.get(user_id).get('has_profile_image')
        avatar = users.get(user_id).get('avatar')
        if has_profile_image == 1 and avatar != None:
            user_img = "https://avatars.plurk.com/" + user_id + "-small"+str(avatar)+".gif"
        elif has_profile_image == 1 and avatar == None:
            user_img = "https://avatars.plurk.com/" + user_id + "-small.gif"
        else:
            user_img = "https://www.plurk.com/static/default_small.gif"

        # every response 
        raw_data['response'].append({
            "user_id": user_id,
            "user_img": user_img,
            "user_name": users.get(user_id).get('display_name'),
            "name_color": users.get(user_id).get('name_color'),
            "content_raw": response.get('content_raw'),
            "content": response.get('content'),
            "posted":response.get('posted')
        })

    return raw_data


##################
#                #
#   API server   #
#                #
##################
app = Flask(__name__)

@app.route('/')
def home():
    return 'connection success!!'

# upload json {"link":"https://~~~~"} to get clear data
@app.route('/backup',methods=['GET','POST'])
def upload_file():
    if request.method == 'GET':
        return "please choose post method"

    if request.method == 'POST':
        try:
            url = request.json.get('link')
            print('Receive link\n', url)
            raw_data = get_raw_plurk(url)
            print(raw_data)
        except Exception as e:
            print("ERROR", {'error': str(e), 'trace': traceback.format_exc()})
            return jsonify({'error': str(e), 'trace': traceback.format_exc()})


        return jsonify(raw_data)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1234, debug=True)
    

