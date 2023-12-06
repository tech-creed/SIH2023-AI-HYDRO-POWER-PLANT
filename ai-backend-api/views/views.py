from flask import request

from app import *

@app.route('/')
def home():
    return 'hello'