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

@app.route('/img2img', methods = ['GET', 'POST'])
def prompt2img():
    image = request.json['image']
    mask = request.json['mask']

    image = Image.open(image)
    mask = Image.open(mask)

    image = e_image_base64(image)
    mask = e_image_base64(mask)

    i2i_data = {
    "sampler": "DPM++ 2M Karras",
    "init_images":[image],
    "mask":mask,
    "denoising_strength" : 0.75,
    "prompt" : "run of river hydro power plant",
    "batch_size": 3,
    "steps": 20,
    "cfg_scale" : 7.5,
    "width": 512,
    "height": 512,
    "negative_prompt":"",
    "mask_blur":4,
    "inpainting_fill":1,
    "inpaint_full_res": True,
    "inpaint_full_res_padding":32
    }

    responce = requests.post(modelURL+'sdapi/v1/img2img', json=i2i_data)
    imgPath = []
    for i in range(len(responce.json()['images'])):
        image = d_base64_image(responce.json()['images'][i])
        image.save('../public/generated/'+str(i)+".png")
        imgPath.append("/generated/"+str(i)+".png")

    return jsonify({'generatedImagePath': imgPath}) 
    