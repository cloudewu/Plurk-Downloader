# -*- coding:utf-8 -*
# import packages
from flask import Blueprint, render_template, request
import urllib.parse

bp = Blueprint('index', __name__)

'''
    render index page
'''
@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/download', methods=['POST'])
def download():
	if request.method == 'GET':
		return "Currently not allowed"
	elif request.method == 'POST':
		content = request.form['content']
		query = urllib.parse.unquote(content)
		encodeURI = 'data:text/plain;charset=UTF-8,' + query
		return render_template('download.html', content=query, link=encodeURI)
