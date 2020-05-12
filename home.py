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

@bp.route('/download')
def download():
	query = request.args.get('content')
	encodeURI = 'data:text/plain;charset=UTF-8,' + urllib.parse.quote(query)
	return render_template('download.html', content=query, link=encodeURI)
