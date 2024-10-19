# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`
from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import storage, firestore
import os
from google.cloud import storage as gcs
from model import resnet_50_model
from PIL import Image

firebase_admin.initialize_app()
# initialize_app()
#
#
# @https_fn.on_request()
# def on_request_example(req: https_fn.Request) -> https_fn.Response:
#     return https_fn.Response("Hello world!")

model = resnet_50_model()

def request_proccess(file):
    image = Image.open(file.stream)
    detections = model.proccess(image)
    return jsonify({'detections': detections})
