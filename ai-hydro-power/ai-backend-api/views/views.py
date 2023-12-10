from flask import jsonify, request
import numpy as np
import tensorflow as tf

from app import *

import requests
from PIL import Image
import io
import base64

modelURL = "http://localhost:7860/"

def d_base64_image(encoding):
    if(encoding.startswith("data:image/")):
        encoding = encoding.split(";")[1].split(',')[1]
    image = Image.open(io.BytesIO(base64.b64decode(encoding)))
    return image

def e_image_base64(image):
    with io.BytesIO() as output_bytes:
        image.save(output_bytes, format="PNG")
        bytes_data = output_bytes.getvalue()
    return base64.b64encode(bytes_data).decode('utf-8')

@app.route('/text2img', methods = ['GET', 'POST'])
def prompt2img():
    print(request.json['prompt'])
    t2i_data = {
        "prompt" : request.json['prompt'],
        "sampler_name" : "DPM++ 2M Karras",
        "batch_size": 2,
        "steps" : 30,
        "cfg_scale": 9,
        "width": 480,
        "height": 620,
        "negative_prompt": "no river"
    }
    responce = requests.post(modelURL+'sdapi/v1/txt2img', json=t2i_data)

    imgPath = []
    for i in range(len(responce.json()['images'])):
        image = d_base64_image(responce.json()['images'][i])
        image.save('../public/generated/'+str(i)+".png")
        imgPath.append("/generated/"+str(i)+".png")

    return jsonify({'generatedImagePath': imgPath}) 
    