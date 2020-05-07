# -*- coding:utf-8 -*
# import packages
from mdutils.mdutils import MdUtils 
from bs4 import BeautifulSoup as bs 
import requests as rq
import slimit
from slimit.parser import Parser
from slimit.visitors.nodevisitor import ASTVisitor
import json


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


# ########################## #
# 預設得到乾淨的txt
# [success]
# "title":<html_title>,
# "time":<plurk_time>,
# "content":<content>,
def get_content_by_link(plurk_url):
    # request plurk content from plurk.com
    try:
        with rq.Session() as sess:    
            plurk = sess.get(plurk_url)
            if plurk.status_code == rq.codes.ok:
                print("Request Success! Status: {}.".format(plurk.status_code))

                # read content of HTML
                soup = bs(plurk.text,features="lxml")
                # extract the last script out
                script = soup.find_all("script")[-1].string
                
                plurk_content = {}

                parser = Parser()
                json_tree = parser.parse(script)    # construct parse tree
                visitor = JSVisitor(plurk_content)
                visitor.visit(json_tree)            # traverse the tree

                request_url = "https://www.plurk.com/Responses/get"
                data = {'plurk_id': plurk_content.get('id'), 'from_response_id': '0'}
                
                with rq.Session() as sess:
                    # request response from Responses/get, and use plurk_id as data to tell website which plurk we are requesting
                    # sess.post means HTTP POST
                    response = sess.post(request_url, data=data)
                    if response.status_code == rq.codes.ok:
                        print("Request Success! Status: {}.".format(response.status_code))
                        response_content = response.json()
                    
                        # if response get success then create raw data for return
                        head = soup.find_all("div", class_="plurk")  
                        string = ''
                        for owo in head[0].find("div", class_="text_holder"):
                            string += str(owo)

                        detailed_data = {
                            "plurk_info": {
                                "plurk_id":plurk_content.get('id'),
                                "user_id":plurk_content.get('user_id'),
                                "favorite_count":plurk_content.get('favorite_count'),
                                "response_count":plurk_content.get('response_count'),
                                "replurkers_count":plurk_content.get('replurkers_count'),
                                "coins":plurk_content.get('coins'),
                                "qualifier":plurk_content.get('qualifier'),
                                "anonymous":plurk_content.get('anonymous'),
                                "st_edited":plurk_content.get('st_edited'),
                                "no_comments":plurk_content.get('no_comments'),
                                "posted":plurk_content.get('posted'),
                                "lang":plurk_content.get('lang'),
                                "content":plurk_content.get('content'),
                                "content_raw":plurk_content.get('content_raw'),
                            },    
                            "plurk":{
                                "poster_img": head[0].find("img").get("src"),
                                "poster_name": head[0].find("a", class_="name").text,
                                "post_content": string,
                                "time": head[0].find("time", class_="timeago")['datetime'] ,
                                "response_count": response_content.get('response_count')        
                            },
                            "response":[]
                        }

                        users = response_content.get('users')
                        for response in response_content.get('responses'):
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
                            detailed_data['response'].append({
                                "user_id": user_id,
                                "user_img": user_img,
                                "user_name": users.get(user_id).get('display_name'),
                                "name_color": users.get(user_id).get('name_color'),
                                "content_raw": response.get('content_raw'),
                                "content": response.get('content'),
                                "posted":response.get('posted')
                            })

                        # the data will be return
                        raw_data = {
                            "status_code": 200,  
                            "status": "success",
                            "time": head[0].find("time", class_="timeago")['datetime'],
                            "title": detailed_data["plurk"]["poster_name"] + "_" + head[0].find("div", class_="text_holder").text
                        }

                        raw_data["content"] = create_txt_content(detailed_data) 
                        
                        return raw_data

                    else:
                        print("Request fail. Status: {}.".format(response.status_code))
                        fail_response = {
                            "status_code": response.status_code,  
                            "status": "fail", 
                            "reason": "fail to request response from Responses/get"
                        }
                        return fail_response

            else:
                print("Request fail. Status: {}.".format(plurk.status_code))

                # server receive request but refuse to provide the service
                if plurk.status_code == 403:    
                    fail_response = {
                        "status_code": 403,
                        "status": "fail", 
                        "reason": "403 Forbidden"
                    }
                # other error when plurk server receive request
                else:
                    fail_response = {
                        "status_code": plurk.status_code,
                        "status": "fail", 
                        "reason": "there are something wrong"
                    }

                return fail_response
    
    except:
        fail_response = {
            "status_code": 500,
            "status": "fail", 
            "reason": "500 Internal Server Error"
        }
        print(fail_response)
        print()

        return fail_response


def create_txt_content(data):
    md_file = ""

    md_file += "**"+ data['plurk']['poster_name'] + "**  \n> " + data['plurk']['post_content'] + "\n"
    md_file += "*"+ data['plurk']['time'] + "*\n\n" + str(data['plurk']['response_count']) + "則回應\n---\n\n"

    for i in data['response']:
        md_file +=  "**"+i['user_name'] + "**  *"+ i['posted'] + "*\n\n"+ i['content_raw'] + "\n- - -\n\n" 

    return md_file
            

def create_makedown_content(data):
    md_file = ""

    md_file += "![U](" + data['plurk']['poster_img'] + ")"
    md_file += "**" + data['plurk']['poster_name']+ "**  \n" + data['plurk']['post_content'] + "  \n"
    md_file += data['plurk']['time'] + "\n___  \n"

    md_file += str(data['plurk']['response_count']) + "則回應"
    for i in data['response']:
        md_file += "\n\n" + "![U]("+i['user_img']+ ")\n"        
        md_file += i['user_name'] + "  \n"    
        md_file += i['content_raw'] + "  \n" + i['posted'] 

    return md_file

