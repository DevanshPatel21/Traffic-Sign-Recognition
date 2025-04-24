import base64
import io
import numpy as np
import pickle
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback
import logging
import os
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from functools import wraps

# Initialize Flask app
app = Flask(__name__)

# Configure CORS with environment-specific origins
ALLOWED_ORIGINS = os.environ.get('ALLOWED_ORIGINS', '*')
CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})

# Configure logging with more detail
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Use environment variable for secret key
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key')

# Improved model loading logic
def load_model():
    """Load model with multiple fallback paths"""
    possible_paths = [
        os.path.join(os.path.dirname(os.path.abspath(__file__)), 'model_trained.p'),
        './model_trained.p',
        '../model_trained.p',
        '/app/model_trained.p'
    ]
    
    for path in possible_paths:
        try:
            if os.path.exists(path):
                logger.info(f"Attempting to load model from: {path}")
                with open(path, 'rb') as f:
                    model = pickle.load(f)
                logger.info(f"Model loaded successfully from {path}")
                return model
        except Exception as e:
            logger.error(f"Failed to load model from {path}: {str(e)}")
    
    logger.error("Could not load model from any location")
    return None

# Load model
model = load_model()

# Label dictionary
label_dict = {
    0: "Speed Limit 20",
    1: "Speed Limit 30",
    2: "Speed Limit 50",
    3: "Speed Limit 60",
    4: "Speed Limit 70",
    5: "Speed Limit 80",
    6: "End of Speed Limit 80",
    7: "Speed Limit 100",
    8: "Speed Limit 120",
    9: "No passing",
    10: "No passing for vehicles over 3.5 metric tons",
    11: "Right-of-way at the next intersection",
    12: "Priority road",
    13: "Yield",
    14: "Stop",
    15: "No vehicles",
    16: "Vehicles over 3.5 metric tons prohibited",
    17: "No entry",
    18: "General caution",
    19: "Dangerous curve to the left",
    20: "Dangerous curve to the right",
    21: "Double curve",
    22: "Bumpy road",
    23: "Slippery road",
    24: "Road narrows on the right",
    25: "Road work",
    26: "Traffic signals",
    27: "Pedestrians",
    28: "Children crossing",
    29: "Bicycles crossing",
    30: "Beware of ice/snow",
    31: "Wild animals crossing",
    32: "End of all speed and passing limits",
    33: "Turn right ahead",
    34: "Turn left ahead",
    35: "Ahead only",
    36: "Go straight or right",
    37: "Go straight or left",
    38: "Keep right",
    39: "Keep left",
    40: "Roundabout mandatory",
    41: "End of no passing",
    42: "End of no passing by vehicles over 3.5 metric tons"
}

@app.route('/')
def home():
    logger.info("Root endpoint accessed")
    return "Flask backend is running!"

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        logger.debug(f"Signup data received: {data}")
        
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"message": "Username and password are required"}), 400
        if len(username.strip()) < 3:
            return jsonify({"message": "Username must be at least 3 characters"}), 400
        if len(password) < 6 or ' ' in password:
            return jsonify({"message": "Password must be at least 6 characters and contain no spaces"}), 400
        if username in users:
            return jsonify({"message": "Username already exists"}), 400

        users[username] = password
        logger.info(f"User {username} signed up successfully")
        return jsonify({"message": f"User {username} signed up successfully!"}), 200
    
    except Exception as e:
        logger.error(f"Signup error: {str(e)}")
        return jsonify({"message": "Internal server error"}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        logger.debug(f"Login data received: {data}")
        
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"message": "Username and password are required"}), 400
        if users.get(username) != password:
            return jsonify({"message": "Invalid username or password"}), 401

        logger.info(f"User {username} logged in successfully")
        return jsonify({
            "message": f"Welcome back, {username}!",
            "token": "dummy-token"
        }), 200
    
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({"message": "Internal server error"}), 500

# Add model status endpoint
@app.route('/api/status', methods=['GET'])
def status():
    """Check API and model status"""
    return jsonify({
        'status': 'online',
        'model_loaded': model is not None,
        'timestamp': datetime.now().isoformat()
    })

# Update the predict endpoint with better error handling
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        grayscale_pixels = np.array(data['imageData'], dtype=np.float32)
        width = data['width']
        height = data['height']
        
        # Reshape to match model input: (1, height, width, 1)
        image = grayscale_pixels.reshape(1, height, width, 1)
        
        # Your model prediction code...
        prediction = model.predict(image)
        
        # Rest of your prediction logic...
        predicted_class = int(np.argmax(prediction))
        confidence = float(np.max(prediction) * 100)

        # Get label from dictionary
        label = label_dict.get(predicted_class, "Unknown")

        logger.info(f"Prediction successful - Class: {label}, Confidence: {confidence}%")
        
        return jsonify({
            "success": True,
            "class": label,
            "probability": round(confidence, 2)
        }), 200

    except ValueError as ve:
        logger.error(f"Image processing error: {str(ve)}")
        return jsonify({"error": f"Image processing error: {str(ve)}"}), 400
    except Exception as e:
        logger.error(f"Prediction processing error: {str(e)}")
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

# Update the main execution
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    
    logger.info(f"Starting server on port {port} with debug={debug}")
    app.run(host='0.0.0.0', port=port, debug=debug)