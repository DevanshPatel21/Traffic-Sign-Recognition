# import numpy as np
# import cv2
# import pickle

# #############################################
# frameWidth = 640  # CAMERA RESOLUTION
# frameHeight = 480
# brightness = 180
# threshold = 0.75  # PROBABILITY THRESHOLD
# font = cv2.FONT_HERSHEY_SIMPLEX
# ##############################################

# # SETUP THE VIDEO CAMERA
# cap = cv2.VideoCapture(0)
# cap.set(3, frameWidth)
# cap.set(4, frameHeight)
# cap.set(10, brightness)

# # IMPORT THE TRAINED MODEL
# with open("model_trained.p", "rb") as pickle_in:  # Use 'with' to handle files properly
#     model = pickle.load(pickle_in)


# # IMAGE PROCESSING FUNCTIONS
# def grayscale(img):
#     return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


# def equalize(img):
#     return cv2.equalizeHist(img)


# def preprocessing(img):
#     img = grayscale(img)
#     img = equalize(img)
#     img = img / 255.0  # Normalize pixel values
#     return img


# # CLASS NAME FUNCTION
# def getClassName(classNo):
#     classes = {
#         0: 'Speed Limit 20 km/h', 1: 'Speed Limit 30 km/h', 2: 'Speed Limit 50 km/h',
#         3: 'Speed Limit 60 km/h', 4: 'Speed Limit 70 km/h', 5: 'Speed Limit 80 km/h',
#         6: 'End of Speed Limit 80 km/h', 7: 'Speed Limit 100 km/h', 8: 'Speed Limit 120 km/h',
#         9: 'No passing', 10: 'No passing for vehicles over 3.5 metric tons',
#         11: 'Right-of-way at the next intersection', 12: 'Priority road', 13: 'Yield',
#         14: 'Stop', 15: 'No vehicles', 16: 'Vehicles over 3.5 metric tons prohibited',
#         17: 'No entry', 18: 'General caution', 19: 'Dangerous curve to the left',
#         20: 'Dangerous curve to the right', 21: 'Double curve', 22: 'Bumpy road',
#         23: 'Slippery road', 24: 'Road narrows on the right', 25: 'Road work',
#         26: 'Traffic signals', 27: 'Pedestrians', 28: 'Children crossing',
#         29: 'Bicycles crossing', 30: 'Beware of ice/snow', 31: 'Wild animals crossing',
#         32: 'End of all speed and passing limits', 33: 'Turn right ahead', 34: 'Turn left ahead',
#         35: 'Ahead only', 36: 'Go straight or right', 37: 'Go straight or left',
#         38: 'Keep right', 39: 'Keep left', 40: 'Roundabout mandatory',
#         41: 'End of no passing', 42: 'End of no passing by vehicles over 3.5 metric tons'
#     }
#     return classes.get(classNo, "Unknown")


# # MAIN LOOP
# while True:
#     # READ IMAGE FROM CAMERA
#     success, imgOriginal = cap.read()
#     if not success:
#         break

#     # PROCESS IMAGE
#     img = cv2.resize(imgOriginal, (32, 32))  # Resize to model input size
#     img = preprocessing(img)
#     cv2.imshow("Processed Image", img)

#     # PREPARE IMAGE FOR PREDICTION
#     img = img.reshape(1, 32, 32, 1)

#     # PREDICT IMAGE CLASS
#     predictions = model.predict(img)
#     classIndex = np.argmax(predictions, axis=-1)[0]  # Get class index
#     probabilityValue = np.max(predictions)  # Get highest probability

#     # DISPLAY RESULTS
#     cv2.putText(imgOriginal, "CLASS:", (20, 35), font, 0.75, (0, 0, 255), 2, cv2.LINE_AA)
#     cv2.putText(imgOriginal, "PROBABILITY:", (20, 75), font, 0.75, (0, 0, 255), 2, cv2.LINE_AA)

#     if probabilityValue > threshold:
#         cv2.putText(imgOriginal, f"{classIndex} {getClassName(classIndex)}", (120, 35), font, 0.75, (0, 0, 255), 2,
#                     cv2.LINE_AA)
#         cv2.putText(imgOriginal, f"{round(probabilityValue * 100, 2)}%", (180, 75), font, 0.75, (0, 0, 255), 2,
#                     cv2.LINE_AA)

#     cv2.imshow("Result", imgOriginal)

#     # EXIT LOOP ON 'Q' KEY PRESS
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # RELEASE CAMERA AND CLOSE WINDOWS
# cap.release()
# cv2.destroyAllWindows()
## *****************************************************************************************************************************
# import numpy as np
# import cv2
# import pickle

# #############################################
# frameWidth = 800  # Increased window size
# frameHeight = 600
# brightness = 180
# threshold = 0.75  # PROBABILITY THRESHOLD
# font = cv2.FONT_HERSHEY_SIMPLEX
# ##############################################

# # SETUP THE VIDEO CAMERA
# cap = cv2.VideoCapture(0)
# cap.set(3, frameWidth)
# cap.set(4, frameHeight)
# cap.set(10, brightness)

# # IMPORT THE TRAINED MODEL
# with open("model_trained.p", "rb") as pickle_in:
#     model = pickle.load(pickle_in)

# # IMAGE PROCESSING FUNCTIONS
# def grayscale(img):
#     return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# def equalize(img):
#     return cv2.equalizeHist(img)

# def preprocessing(img):
#     img = grayscale(img)
#     img = equalize(img)
#     img = img / 255.0  # Normalize pixel values
#     return img

# # CLASS NAME FUNCTION
# def getClassName(classNo):
#     classes = {
#         0: 'Speed Limit 20 km/h', 1: 'Speed Limit 30 km/h', 2: 'Speed Limit 50 km/h',
#         3: 'Speed Limit 60 km/h', 4: 'Speed Limit 70 km/h', 5: 'Speed Limit 80 km/h',
#         6: 'End of Speed Limit 80 km/h', 7: 'Speed Limit 100 km/h', 8: 'Speed Limit 120 km/h',
#         9: 'No passing', 10: 'No passing for vehicles over 3.5 metric tons',
#         11: 'Right-of-way at the next intersection', 12: 'Priority road', 13: 'Yield',
#         14: 'Stop', 15: 'No vehicles', 16: 'Vehicles over 3.5 metric tons prohibited',
#         17: 'No entry', 18: 'General caution', 19: 'Dangerous curve to the left',
#         20: 'Dangerous curve to the right', 21: 'Double curve', 22: 'Bumpy road',
#         23: 'Slippery road', 24: 'Road narrows on the right', 25: 'Road work',
#         26: 'Traffic signals', 27: 'Pedestrians', 28: 'Children crossing',
#         29: 'Bicycles crossing', 30: 'Beware of ice/snow', 31: 'Wild animals crossing',
#         32: 'End of all speed and passing limits', 33: 'Turn right ahead', 34: 'Turn left ahead',
#         35: 'Ahead only', 36: 'Go straight or right', 37: 'Go straight or left',
#         38: 'Keep right', 39: 'Keep left', 40: 'Roundabout mandatory',
#         41: 'End of no passing', 42: 'End of no passing by vehicles over 3.5 metric tons'
#     }
#     return classes.get(classNo, "Unknown")

# # MAIN LOOP
# while True:
#     # READ IMAGE FROM CAMERA
#     success, imgOriginal = cap.read()
#     if not success:
#         break

#     # PROCESS IMAGE
#     img = cv2.resize(imgOriginal, (32, 32))  # Resize to model input size
#     img = preprocessing(img)
#     cv2.imshow("Processed Image", img)

#     # PREPARE IMAGE FOR PREDICTION
#     img = img.reshape(1, 32, 32, 1)

#     # PREDICT IMAGE CLASS
#     predictions = model.predict(img)
#     classIndex = np.argmax(predictions, axis=-1)[0]  # Get class index
#     probabilityValue = np.max(predictions)  # Get highest probability

#     # DRAW BLACK BACKGROUND FOR TEXT
#     overlay = imgOriginal.copy()
#     cv2.rectangle(overlay, (10, 10), (400, 100), (0, 0, 0), -1)
#     alpha = 0.6  # Transparency factor
#     cv2.addWeighted(overlay, alpha, imgOriginal, 1 - alpha, 0, imgOriginal)

#     # DISPLAY RESULTS
#     cv2.putText(imgOriginal, "CLASS:", (20, 35), font, 0.75, (255, 255, 255), 2, cv2.LINE_AA)
#     cv2.putText(imgOriginal, "PROBABILITY:", (20, 75), font, 0.75, (255, 255, 255), 2, cv2.LINE_AA)

#     if probabilityValue > threshold:
#         cv2.putText(imgOriginal, f"{classIndex} {getClassName(classIndex)}", (120, 35), font, 0.75, (255, 255, 255), 2, cv2.LINE_AA)
#         cv2.putText(imgOriginal, f"{round(probabilityValue * 100, 2)}%", (180, 75), font, 0.75, (255, 255, 255), 2, cv2.LINE_AA)

#     cv2.imshow("Result", imgOriginal)

#     # EXIT LOOP ON 'Q' KEY PRESS
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # RELEASE CAMERA AND CLOSE WINDOWS
# cap.release()
# cv2.destroyAllWindows()

# ******************************************************************************************************************************************************

        
# import numpy as np
# import cv2
# import pickle
# from flask import Flask, request, jsonify
# from flask_jwt_extended import JWTManager, jwt_required, create_access_token
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_cors import CORS
# import base64
# from io import BytesIO
# from PIL import Image
# import sys
# import os
# from pymongo import MongoClient
# import logging

# # Configure logging
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)

# app = Flask(__name__)
# app.config['JWT_SECRET_KEY'] = 'devanshpatel21062003'  # Change to a secure key in production
# jwt = JWTManager(app)
# CORS(app)  # Enable CORS for all routes

# # MongoDB setup
# MONGO_URI = 'mongodb://localhost:27017/'
# client = MongoClient(MONGO_URI)
# db = client['traffic_sign_users']
# users_collection = db['users']

# #############################################
# frameWidth = 800
# frameHeight = 600
# brightness = 180
# threshold = 0.75
# font = cv2.FONT_HERSHEY_SIMPLEX
# ##############################################

# # Get the directory where the script is located
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# MODEL_PATH = os.path.join(BASE_DIR, "model_trained.p")

# # Load the trained model
# try:
#     with open(MODEL_PATH, "rb") as pickle_in:
#         model = pickle.load(pickle_in)
# except FileNotFoundError:
#     print(f"Error: 'model_trained.p' not found at {MODEL_PATH}. Ensure it’s in the same directory as this script.")
#     sys.exit(1)
# except Exception as e:
#     print(f"Error loading model: {e}")
#     sys.exit(1)

# # Image processing functions
# def grayscale(img):
#     return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# def equalize(img):
#     return cv2.equalizeHist(img)

# def preprocessing(img):
#     img = grayscale(img)
#     img = equalize(img)
#     img = img / 255.0
#     return img

# # Class name function
# def getClassName(classNo):
#     classes = {
#         0: 'Speed Limit 20 km/h', 1: 'Speed Limit 30 km/h', 2: 'Speed Limit 50 km/h',
#         3: 'Speed Limit 60 km/h', 4: 'Speed Limit 70 km/h', 5: 'Speed Limit 80 km/h',
#         6: 'End of Speed Limit 80 km/h', 7: 'Speed Limit 100 km/h', 8: 'Speed Limit 120 km/h',
#         9: 'No passing', 10: 'No passing for vehicles over 3.5 metric tons',
#         11: 'Right-of-way at the next intersection', 12: 'Priority road', 13: 'Yield',
#         14: 'Stop', 15: 'No vehicles', 16: 'Vehicles over 3.5 metric tons prohibited',
#         17: 'No entry', 18: 'General caution', 19: 'Dangerous curve to the left',
#         20: 'Dangerous curve to the right', 21: 'Double curve', 22: 'Bumpy road',
#         23: 'Slippery road', 24: 'Road narrows on the right', 25: 'Road work',
#         26: 'Traffic signals', 27: 'Pedestrians', 28: 'Children crossing',
#         29: 'Bicycles crossing', 30: 'Beware of ice/snow', 31: 'Wild animals crossing',
#         32: 'End of all speed and passing limits', 33: 'Turn right ahead', 34: 'Turn left ahead',
#         35: 'Ahead only', 36: 'Go straight or right', 37: 'Go straight or left',
#         38: 'Keep right', 39: 'Keep left', 40: 'Roundabout mandatory',
#         41: 'End of no passing', 42: 'End of no passing by vehicles over 3.5 metric tons'
#     }
#     return classes.get(classNo, "Unknown")

# # Signup endpoint
# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()
#     if not data or 'username' not in data or 'password' not in data:
#         return jsonify({'message': 'Missing username or password'}), 400
#     username = data['username']
#     password = data['password']

#     if users_collection.find_one({'username': username}):
#         return jsonify({'message': 'User already exists'}), 400

#     hashed_password = generate_password_hash(password)
#     users_collection.insert_one({'username': username, 'password': hashed_password})
#     return jsonify({'message': 'User created successfully'}), 201

# # Login endpoint
# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     if not data or 'username' not in data or 'password' not in data:
#         return jsonify({'message': 'Missing username or password'}), 400
#     username = data['username']
#     password = data['password']

#     user = users_collection.find_one({'username': username})
#     if not user or not check_password_hash(user['password'], password):
#         return jsonify({'message': 'Invalid credentials'}), 401

#     access_token = create_access_token(identity=username)
#     return jsonify({'access_token': access_token}), 200

# # Prediction endpoint
# @app.route('/predict', methods=['POST'])
# @jwt_required()
# def predict():
#     data = request.get_json()
#     if not data or 'image' not in data:
#         logger.error("No image data provided in request")
#         return jsonify({'message': 'No image provided'}), 400
    
#     try:
#         img_data = data['image']
#         logger.debug(f"Received image data length: {len(img_data)}")
#         img_bytes = base64.b64decode(img_data.split(',')[1])  # Remove 'data:image/jpeg;base64,' prefix
#         img = Image.open(BytesIO(img_bytes)).convert('RGB')
#         img = np.array(img)
#         logger.debug(f"Image array shape: {img.shape}")
#     except Exception as e:
#         logger.error(f"Error decoding image: {str(e)}")
#         return jsonify({'message': f'Error decoding image: {str(e)}'}), 400

#     try:
#         # Process image
#         img = cv2.resize(img, (32, 32))
#         img = preprocessing(img)
#         img = img.reshape(1, 32, 32, 1)
#         logger.debug(f"Processed image shape: {img.shape}")

#         # Predict
#         predictions = model.predict(img)
#         logger.debug(f"Predictions shape: {predictions.shape}, values: {predictions}")
#         if predictions.shape != (1, 43):  # Validate expected shape (43 classes)
#             raise ValueError(f"Unexpected predictions shape: {predictions.shape}, expected (1, 43)")

#         classIndex = int(np.argmax(predictions, axis=-1)[0])  # Convert to Python int
#         probabilityValue = float(np.max(predictions))  # Convert to Python float
#         logger.debug(f"Class index: {classIndex}, Probability: {probabilityValue}")

#         result = {
#             'class': f"{classIndex} {getClassName(classIndex)}" if probabilityValue > threshold else "Unknown",
#             'probability': round(probabilityValue * 100, 2)  # Ensure JSON-serializable
#         }
#         logger.debug(f"Sending response: {result}")
#         return jsonify(result), 200
#     except Exception as e:
#         logger.error(f"Error during prediction: {str(e)}")
#         return jsonify({'message': f'Error during prediction: {str(e)}'}), 500

# # Local testing function (original logic)
# def run_local():
#     cap = cv2.VideoCapture(0)
#     if not cap.isOpened():
#         print("Error: Could not open webcam.")
#         return
    
#     cap.set(3, frameWidth)
#     cap.set(4, frameHeight)
#     cap.set(10, brightness)

#     while True:
#         success, imgOriginal = cap.read()
#         if not success:
#             print("Error: Failed to capture image.")
#             break

#         img = cv2.resize(imgOriginal, (32, 32))
#         img = preprocessing(img)
#         cv2.imshow("Processed Image", img)

#         img = img.reshape(1, 32, 32, 1)
#         predictions = model.predict(img)
#         classIndex = np.argmax(predictions, axis=-1)[0]
#         probabilityValue = np.max(predictions)

#         overlay = imgOriginal.copy()
#         cv2.rectangle(overlay, (10, 10), (400, 100), (0, 0, 0), -1)
#         alpha = 0.6
#         cv2.addWeighted(overlay, alpha, imgOriginal, 1 - alpha, 0, imgOriginal)

#         cv2.putText(imgOriginal, "CLASS:", (20, 35), font, 0.75, (255, 255, 255), 2, cv2.LINE_AA)
#         cv2.putText(imgOriginal, "PROBABILITY:", (20, 75), font, 0.75, (255, 255, 255), 2, cv2.LINE_AA)

#         if probabilityValue > threshold:
#             cv2.putText(imgOriginal, f"{classIndex} {getClassName(classIndex)}", (120, 35), font, 0.75, (255, 255, 255), 2, cv2.LINE_AA)
#             cv2.putText(imgOriginal, f"{round(probabilityValue * 100, 2)}%", (180, 75), font, 0.75, (255, 255, 255), 2, cv2.LINE_AA)

#         cv2.imshow("Result", imgOriginal)

#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     cap.release()
#     cv2.destroyAllWindows()

# if __name__ == '__main__':
#     if len(sys.argv) > 1 and sys.argv[1] == '--local':
#         run_local()  # Run original local version
#     else:
#         app.run(debug=True, host='0.0.0.0', port=5000)  # Run Flask API

#*************************************************************************************************#

# import numpy as np
# import cv2
# import pickle
# from flask import Flask, request, jsonify
# from flask_jwt_extended import JWTManager, jwt_required, create_access_token
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_cors import CORS
# import base64
# from io import BytesIO
# from PIL import Image
# import sys
# import os
# from pymongo import MongoClient
# import logging

# # Configure logging
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)

# app = Flask(__name__)
# app.config['JWT_SECRET_KEY'] = 'devanshpatel21062003'  # Change to a secure key in production
# jwt = JWTManager(app)
# CORS(app)  # Enable CORS for all routes

# # MongoDB setup
# MONGO_URI = 'mongodb://localhost:27017/'
# client = MongoClient(MONGO_URI)
# db = client['traffic_sign_users']
# users_collection = db['users']

# #############################################
# frameWidth = 800
# frameHeight = 600
# brightness = 180
# threshold = 0.75
# font = cv2.FONT_HERSHEY_SIMPLEX
# ##############################################

# # Get the directory where the script is located
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# MODEL_PATH = os.path.join(BASE_DIR, "model_trained.p")

# # Load the trained model
# try:
#     with open(MODEL_PATH, "rb") as pickle_in:
#         model = pickle.load(pickle_in)
# except FileNotFoundError:
#     print(f"Error: 'model_trained.p' not found at {MODEL_PATH}. Ensure it’s in the same directory as this script.")
#     sys.exit(1)
# except Exception as e:
#     print(f"Error loading model: {e}")
#     sys.exit(1)

# # Image processing functions
# def grayscale(img):
#     return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# def equalize(img):
#     return cv2.equalizeHist(img)

# def preprocessing(img):
#     img = grayscale(img)
#     img = equalize(img)
#     img = img / 255.0
#     return img

# # Class name function
# def getClassName(classNo):
#     classes = {
#         0: 'Speed Limit 20 km/h', 1: 'Speed Limit 30 km/h', 2: 'Speed Limit 50 km/h',
#         3: 'Speed Limit 60 km/h', 4: 'Speed Limit 70 km/h', 5: 'Speed Limit 80 km/h',
#         6: 'End of Speed Limit 80 km/h', 7: 'Speed Limit 100 km/h', 8: 'Speed Limit 120 km/h',
#         9: 'No passing', 10: 'No passing for vehicles over 3.5 metric tons',
#         11: 'Right-of-way at the next intersection', 12: 'Priority road', 13: 'Yield',
#         14: 'Stop', 15: 'No vehicles', 16: 'Vehicles over 3.5 metric tons prohibited',
#         17: 'No entry', 18: 'General caution', 19: 'Dangerous curve to the left',
#         20: 'Dangerous curve to the right', 21: 'Double curve', 22: 'Bumpy road',
#         23: 'Slippery road', 24: 'Road narrows on the right', 25: 'Road work',
#         26: 'Traffic signals', 27: 'Pedestrians', 28: 'Children crossing',
#         29: 'Bicycles crossing', 30: 'Beware of ice/snow', 31: 'Wild animals crossing',
#         32: 'End of all speed and passing limits', 33: 'Turn right ahead', 34: 'Turn left ahead',
#         35: 'Ahead only', 36: 'Go straight or right', 37: 'Go straight or left',
#         38: 'Keep right', 39: 'Keep left', 40: 'Roundabout mandatory',
#         41: 'End of no passing', 42: 'End of no passing by vehicles over 3.5 metric tons'
#     }
#     return classes.get(classNo, "Unknown")

# # Signup endpoint
# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()
#     if not data or 'username' not in data or 'password' not in data:
#         return jsonify({'message': 'Missing username or password'}), 400
#     username = data['username']
#     password = data['password']

#     if users_collection.find_one({'username': username}):
#         return jsonify({'message': 'User already exists'}), 400

#     hashed_password = generate_password_hash(password)
#     users_collection.insert_one({'username': username, 'password': hashed_password})
#     return jsonify({'message': 'User created successfully'}), 201

# # Login endpoint
# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     if not data or 'username' not in data or 'password' not in data:
#         return jsonify({'message': 'Missing username or password'}), 400
#     username = data['username']
#     password = data['password']

#     user = users_collection.find_one({'username': username})
#     if not user or not check_password_hash(user['password'], password):
#         return jsonify({'message': 'Invalid credentials'}), 401

#     access_token = create_access_token(identity=username)
#     return jsonify({'access_token': access_token}), 200

# # Prediction endpoint
# @app.route('/predict', methods=['POST'])
# @jwt_required()
# def predict():
#     data = request.get_json()
#     if not data or 'image' not in data:
#         logger.error("No image data provided in request")
#         return jsonify({'message': 'No image provided'}), 400
    
#     try:
#         img_data = data['image']
#         logger.debug(f"Received image data length: {len(img_data)}")
#         img_bytes = base64.b64decode(img_data.split(',')[1])  # Remove 'data:image/jpeg;base64,' prefix
#         img = Image.open(BytesIO(img_bytes)).convert('RGB')
#         img = np.array(img)
#         logger.debug(f"Image array shape: {img.shape}")
#     except Exception as e:
#         logger.error(f"Error decoding image: {str(e)}")
#         return jsonify({'message': f'Error decoding image: {str(e)}'}), 400

#     try:
#         # Process image
#         img = cv2.resize(img, (32, 32))
#         img = preprocessing(img)
#         img = img.reshape(1, 32, 32, 1)
#         logger.debug(f"Processed image shape: {img.shape}")

#         # Predict
#         predictions = model.predict(img)
#         logger.debug(f"Predictions shape: {predictions.shape}, values: {predictions}")
#         if predictions.shape != (1, 43):  # Validate expected shape (43 classes)
#             raise ValueError(f"Unexpected predictions shape: {predictions.shape}, expected (1, 43)")

#         classIndex = int(np.argmax(predictions, axis=-1)[0])  # Convert to Python int
#         probabilityValue = float(np.max(predictions))  # Convert to Python float
#         logger.debug(f"Class index: {classIndex}, Probability: {probabilityValue}")

#         result = {
#             'class': f"{classIndex} {getClassName(classIndex)}" if probabilityValue > threshold else "Unknown",
#             'probability': round(probabilityValue * 100, 2)  # Ensure JSON-serializable
#         }
#         logger.debug(f"Sending response: {result}")
#         return jsonify(result), 200
#     except Exception as e:
#         logger.error(f"Error during prediction: {str(e)}")
#         return jsonify({'message': f'Error during prediction: {str(e)}'}), 500

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)  # Run Flask API

# ####### Final Code that Was Working is below #######



import numpy as np
import cv2
import pickle
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flask_wtf import CSRFProtect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from pymongo import MongoClient
import base64
from io import BytesIO
from PIL import Image
import sys
import os
import datetime
import logging
from flask_jwt_extended.exceptions import NoAuthorizationError
from werkzeug.exceptions import HTTPException

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'devanshpatel21062003'
app.config['WTF_CSRF_ENABLED'] = True
app.config['SECRET_KEY'] = 'supersecurekey_devansh'
jwt = JWTManager(app)
CORS(app)
csrf = CSRFProtect(app)

# MongoDB setup
MONGO_URI = 'mongodb+srv://devansh2106:<Devansh2106>@road-sign-recognition.hywk5v3.mongodb.net/traffic_sign_users?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true'
client = MongoClient(MONGO_URI)
db = client['traffic_sign_users']
users_collection = db['users']
attempts_collection = db['login_attempts']

# Constants for login lockout
MAX_ATTEMPTS = 3
LOCKOUT_DURATION = datetime.timedelta(minutes=5)

# Model setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model_trained.p")

try:
    with open(MODEL_PATH, "rb") as pickle_in:
        model = pickle.load(pickle_in)
except FileNotFoundError:
    print(f"Error: 'model_trained.p' not found at {MODEL_PATH}.")
    sys.exit(1)
except Exception as e:
    print(f"Error loading model: {e}")
    sys.exit(1)

# Preprocessing
def grayscale(img): return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
def equalize(img): return cv2.equalizeHist(img)
def preprocessing(img): return equalize(grayscale(img)) / 255.0

# Class mapping
def getClassName(classNo):
    classes = {
        0: 'Speed Limit 20 km/h', 1: 'Speed Limit 30 km/h', 2: 'Speed Limit 50 km/h',
        3: 'Speed Limit 60 km/h', 4: 'Speed Limit 70 km/h', 5: 'Speed Limit 80 km/h',
        6: 'End of Speed Limit 80 km/h', 7: 'Speed Limit 100 km/h', 8: 'Speed Limit 120 km/h',
        9: 'No passing', 10: 'No passing for vehicles over 3.5 metric tons',
        11: 'Right-of-way at the next intersection', 12: 'Priority road', 13: 'Yield',
        14: 'Stop', 15: 'No vehicles', 16: 'Vehicles over 3.5 metric tons prohibited',
        17: 'No entry', 18: 'General caution', 19: 'Dangerous curve to the left',
        20: 'Dangerous curve to the right', 21: 'Double curve', 22: 'Bumpy road',
        23: 'Slippery road', 24: 'Road narrows on the right', 25: 'Road work',
        26: 'Traffic signals', 27: 'Pedestrians', 28: 'Children crossing',
        29: 'Bicycles crossing', 30: 'Beware of ice/snow', 31: 'Wild animals crossing',
        32: 'End of all speed and passing limits', 33: 'Turn right ahead', 34: 'Turn left ahead',
        35: 'Ahead only', 36: 'Go straight or right', 37: 'Go straight or left',
        38: 'Keep right', 39: 'Keep left', 40: 'Roundabout mandatory',
        41: 'End of no passing', 42: 'End of no passing by vehicles over 3.5 metric tons'
    }
    return classes.get(classNo, "Unknown")

# ----------------- ROUTES -------------------

@app.route('/signup', methods=['POST'])
@csrf.exempt
def signup():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Missing username or password'}), 400
    username = data['username']
    password = data['password']

    if users_collection.find_one({'username': username}):
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = generate_password_hash(password)
    users_collection.insert_one({'username': username, 'password': hashed_password})
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
@csrf.exempt
def login():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Missing username or password'}), 400

    username = data['username']
    password = data['password']

    # Check for lockout
    attempt_record = attempts_collection.find_one({'username': username})
    now = datetime.datetime.utcnow()
    if attempt_record and 'locked_until' in attempt_record:
        if now < attempt_record['locked_until']:
            remaining = (attempt_record['locked_until'] - now).seconds
            return jsonify({
                'message': f'Account temporarily locked. Try again in {remaining} seconds.'
            }), 403

    user = users_collection.find_one({'username': username})
    if not user or not check_password_hash(user['password'], password):
        # Track failed attempt
        if not attempt_record:
            attempts_collection.insert_one({
                'username': username,
                'attempts': 1,
                'last_attempt': now
            })
        else:
            attempts = attempt_record.get('attempts', 0) + 1
            if attempts >= MAX_ATTEMPTS:
                attempts_collection.update_one(
                    {'username': username},
                    {'$set': {
                        'attempts': attempts,
                        'locked_until': now + LOCKOUT_DURATION,
                        'last_attempt': now
                    }}
                )
                return jsonify({'message': 'Too many failed attempts. Try again later.'}), 403
            else:
                attempts_collection.update_one(
                    {'username': username},
                    {'$set': {'attempts': attempts, 'last_attempt': now}}
                )
        return jsonify({'message': 'Invalid credentials'}), 401

    # Successful login - reset attempts
    attempts_collection.delete_one({'username': username})
    access_token = create_access_token(identity=username)
    return jsonify({'access_token': access_token}), 200

@app.route('/predict', methods=['POST'])
@jwt_required()
@csrf.exempt
def predict():
    data = request.get_json()
    if not data or 'image' not in data:
        return jsonify({'message': 'No image provided'}), 400

    try:
        img_data = data['image']
        img_bytes = base64.b64decode(img_data.split(',')[1])
        img = Image.open(BytesIO(img_bytes)).convert('RGB')
        img = np.array(img)
        img = cv2.resize(img, (32, 32))
        img = preprocessing(img)
        img = img.reshape(1, 32, 32, 1)

        predictions = model.predict(img)
        if predictions.shape != (1, 43):
            raise ValueError(f"Unexpected predictions shape: {predictions.shape}")

        classIndex = int(np.argmax(predictions, axis=-1)[0])
        probabilityValue = float(np.max(predictions))

        result = {
            'class': f"{classIndex} {getClassName(classIndex)}" if probabilityValue > 0.75 else "Unknown",
            'probability': round(probabilityValue * 100, 2)
        }
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'message': f'Error during prediction: {str(e)}'}), 500

# ----------------- ERROR HANDLERS -------------------

@app.errorhandler(NoAuthorizationError)
def handle_auth_error(e):
    return jsonify({
        "message": "Authorization token is missing or invalid.",
        "hint": "Make sure to login and include your access token in the request header."
    }), 401

@app.errorhandler(HTTPException)
def handle_http_exception(e):
    return jsonify({
        "message": e.description,
        "code": e.code
    }), e.code

@app.errorhandler(Exception)
def handle_unexpected_error(e):
    logger.exception("An unexpected error occurred.")
    return jsonify({
        "message": "An unexpected error occurred.",
        "error": str(e)
    }), 500

# Run app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

# ####### Final Code that Was Working is above #######


