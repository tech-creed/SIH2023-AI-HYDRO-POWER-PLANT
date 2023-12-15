from flask import jsonify, request
import numpy as np
import tensorflow as tf
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from app import *
# from functions import *

import requests
from PIL import Image
import io
import base64

modelURL = "http://localhost:7860/"

df=pd.read_csv("data/rainfall in india 1901-2015.csv")
zx=pd.read_csv("data/district wise rainfall normal.csv")

def colors_from_values(values, palette_name):
    # normalize the values to range [0, 1]
    normalized = (values - min(values)) / (max(values) - min(values))
    # convert to indices
    indices = np.round(normalized * (len(values) - 1)).astype(np.int32)
    # use the indices to get the colors
    palette = sns.color_palette(palette_name, len(values))
    return np.array(palette).take(indices, axis=0)

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

@app.route('/rainfall', methods = ['GET', 'POST'])
def rainfallAnalysis():
    print(request.json)
    state = zx[zx.STATE_UT_NAME == request.json['state']]

    plt.figure(figsize=(25,10))
    sns.barplot(data=state,x="DISTRICT", y="ANNUAL", palette=colors_from_values(state["ANNUAL"], "YlOrRd"))
    plt.xticks(rotation=90)

    plt.savefig('../public/graph/district-wise-bar.png', bbox_inches='tight')

    plt.figure(figsize=(25,10))
    sns.barplot(data=state, x="YEAR",y="ANNUAL", palette=colors_from_values(state["ANNUAL"], "YlOrRd"))
    plt.xticks(rotation=90)
    plt.savefig('../public/graph/state-bar.png', bbox_inches='tight')

    imgPath = ['../public/graph/district-wise-bar.png', '../public/graph/state-bar.png']

    return jsonify({'generatedGraphPath': imgPath}) 


@app.route('/text2img', methods = ['GET', 'POST'])
def prompt2img():
    print(request.json['prompt'])
    t2i_data = {
        "prompt" : request.json['prompt'],
        "sampler_name" : "DPM++ 2M Karras",
        "batch_size": 4,
        "steps" : 30,
        "cfg_scale": 9,
        "width": 480,
        "height": 620,
        "negative_prompt": ""
    }
    responce = requests.post(modelURL+'sdapi/v1/txt2img', json=t2i_data)

    imgPath = []
    for i in range(len(responce.json()['images'])):
        image = d_base64_image(responce.json()['images'][i])
        image.save('../public/generated/'+str(i)+".png")
        imgPath.append("/generated/"+str(i)+".png")

    return jsonify({'generatedImagePath': imgPath}) 

@app.route('/img2img', methods = ['GET', 'POST'])
def img2img():

    image = request.json['image']
    mask = request.json['mask']

    image = d_base64_image(image)
    mask = d_base64_image(mask)

    image = image.resize((512, 512)) 
    mask = mask.resize((512, 512)) 

    image = e_image_base64(image)
    mask = e_image_base64(mask)

    # image = image.split(',')[-1]
    # mask = mask.split(',')[-1]

    if(request.json['prompt']):
        request.json['prompt'] = request.json['prompt']
    else:
        request.json['prompt'] = 'run of river hydro power plant'

    i2i_data = {
    "sampler": "DPM++ 2M Karras",
    "init_images":[image],
    "mask":mask,
    "denoising_strength" : 0.75,
    "prompt" : request.json['prompt'],
    "batch_size": 3,
    "steps": 30,
    "cfg_scale" : 7.5,
    "width": 512,
    "height": 512,
    "negative_prompt":"",
    "mask_blur":4,
    "inpainting_fill":1,
    "inpaint_full_res": False
    }

    responce = requests.post(modelURL+'sdapi/v1/img2img', json=i2i_data)
    imgPath = []
    imageOrg = d_base64_image(image)
    imageOrg.save('../public/generated/org.png')

    for i in range(len(responce.json()['images'])):
        image = d_base64_image(responce.json()['images'][i])
        image.save('../public/generated/'+str(i)+".png")
        imgPath.append("/generated/"+str(i)+".png")
    return jsonify({'generatedImagePath': imgPath}) 
    



# @app.route('/calculator', methods = ['GET', 'POST'])
# def calculator():
#     # Example input parameters
#     efficiency_total = 0.85
#     water_density = 1000
#     gravity_acceleration = 9.81
#     flow_rate = 10
#     head_height = 20
#     friction_factor = 0.02
#     velocity = 5

#     # Example usage for type
#     capacity = 200  # in megawatts
#     reservoir_size = 1500  # in million cubic meters
#     presence_of_dam = True

#     # Calculate power output and efficiencies
#     power_turbine = calculate_hydro_power(efficiency_total, water_density, gravity_acceleration, flow_rate, head_height)
#     turbine_efficiency = calculate_turbine_efficiency(power_turbine, water_density, gravity_acceleration, flow_rate, head_height)
#     generator_efficiency = calculate_generator_efficiency(power_turbine * turbine_efficiency, power_turbine)
#     head_losses = calculate_penstock_head_losses(friction_factor, velocity, gravity_acceleration)

#     # Estimate sizes of components
#     turbine_size = estimate_turbine_size(flow_rate, head_height)
#     generator_size = estimate_generator_size(power_turbine * turbine_efficiency)
#     penstock_size = estimate_penstock_size(flow_rate, velocity)

#     hydro_type = classify_hydro_type(capacity, reservoir_size, presence_of_dam)

#     output = { 
#         'power_output':power_turbine, 
#         'turbine_efficiency':turbine_efficiency, 
#         'generator_efficiency':generator_efficiency, 
#         'head_losses':head_losses, 
#         'turbine_size':turbine_size, 
#         'generator_size':generator_size, 
#         'penstock_size':penstock_size,
#         'hydro_type':hydro_type
#     }
#     # Power Output :Watts
#     # Penstock Head Losses:  meters
#     # Turbine Size (Diameter):  meters
#     # Generator Size (Capacity):  Watts
#     # Penstock Size (Diameter):  meters