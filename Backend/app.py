import torch
import requests
import firebase_admin
from PIL import Image
from flask import Flask, request, jsonify
from firebase_admin import credentials, storage
from transformers import DetrImageProcessor, DetrForObjectDetection

app = Flask(__name__)