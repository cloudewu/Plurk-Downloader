# -*- coding:utf-8 -*
# import packages
from flask import Blueprint, render_template, request
import requests

bp = Blueprint('index', __name__)

'''
    render index page
'''
@bp.route('/')
def index():
    return render_template('index.html')

