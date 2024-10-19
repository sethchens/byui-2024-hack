import firebase_admin
from PIL import Image
from model import resnet_50_model
from flask import Flask, request, jsonify
from firebase_admin import credentials, storage

# Init a flask instance
app = Flask(__name__)

# Init rersnet-50 model
model = resnet_50_model()

# init a firebase instance
cred = credentials.Certificate("Backend/Cred/byu-i-hackathon-firebase-adminsdk-rul0p-8b60a5a39e.json")
firebase_admin.initialize_app(cred, {
    
    # Since we're using firebase storage
    'storageBucket': 'gs://byu-i-hackathon.appspot.com'
})

# Create a reference to the storage of the firebase project
bucket = storage.bucket()

# Define a url decorator for the client to upload the iamge
@app.route('/upload', methods=['POST'])
def upload_proccess_image():

    # In order to make this to work, the name of the file input field should be 'file' as well
    if 'uploadedFile' not in request.files:
        return jsonify('error', 'No file uploaded.')

    file = request.files['file']
    if file:
        image = Image.open(file.stream)
        detections = model.proccess(image)
        return jsonify({'detections': detections})
    else:
        return jsonify({'error': "App error!"})
    

    '''
    The output from the model should look something liek this:
    {
        "detections": [
            {
            "label": "person",
            "confidence": 0.95,
            "box": [50.5, 30.1, 200.3, 400.7]
            },
            ...
        ]
    }
    This means that the button should be await and catch the return output :)
    '''
    