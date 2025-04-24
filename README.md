# Traffic Sign Recognition

A web application that recognizes traffic signs in real-time using a deep learning model. This application captures video from your webcam and identifies traffic signs with high accuracy.

![Traffic Sign Recognition Demo](demo-screenshot.png)

## Features

- Real-time traffic sign detection through webcam
- High-accuracy classification of multiple traffic sign classes
- Responsive web interface with mobile support
- User authentication system
- Beautiful UI with visual feedback

## Technology Stack

- **Frontend**: React.js, Framer Motion, React-Toastify
- **Backend**: Flask (Python)
- **Machine Learning**: TensorFlow/Keras
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- pip
- Git

### Clone the Repository

```bash
git clone https://github.com/yourusername/Traffic-Sign-Recognition.git
cd Traffic-Sign-Recognition
```

### Backend Setup

1. Create and activate a virtual environment:

```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Edit the `.env` file with your settings

5. Run the backend server:

```bash
python app.py
```

The backend will start on http://localhost:5000

### Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
npm start
```

The frontend will be available at http://localhost:3000

## Usage

1. Navigate to http://localhost:3000 in your browser
2. Sign up for a new account or log in
3. Allow camera access when prompted
4. Click "Start Camera" to activate your webcam
5. Click "Start Prediction" to begin recognizing traffic signs
6. Hold a traffic sign image in front of your camera to see the predictions

## Model Information

The machine learning model is trained on the German Traffic Sign Recognition Benchmark (GTSRB) dataset, consisting of over 50,000 images across 43 different traffic sign classes.

The model achieves approximately 95% accuracy on the test dataset.

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Log in and get JWT token

### Prediction
- `POST /predict` - Send an image for traffic sign prediction (requires authentication)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [German Traffic Sign Recognition Benchmark](https://benchmark.ini.rub.de/gtsrb_news.html) for the dataset
- [TensorFlow](https://www.tensorflow.org/) for the machine learning framework
- [React](https://reactjs.org/) for the frontend framework
