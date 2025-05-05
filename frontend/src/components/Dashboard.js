import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Dashboard({ token, setToken }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const predictionRef = useRef(null);
  const streamRef = useRef(null);

  const [prediction, setPrediction] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);

  const navigate = useNavigate();

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
      };
      streamRef.current = stream;
      setIsCameraOn(true);
      toast.success("Camera started successfully! 🎥");
    } catch (error) {
      toast.error("Failed to start the camera! ❌");
      console.error("Webcam error:", error);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    // Check if prediction is running
    if (isPredicting) {
      toast.error("Please stop prediction first! ⚠️");
      return;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOn(false);
    toast.info("Camera stopped! 🛑");
  };

  // Capture Frame and Predict
  const predictFrame = async () => {
    if (!isPredicting || !videoRef.current || videoRef.current.readyState !== 4) return;

    try {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // First, draw the video frame at original size
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Create a temporary canvas for resizing
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 32;
        tempCanvas.height = 32;
        const tempCtx = tempCanvas.getContext('2d');

        // Draw the original image scaled down to 32x32
        tempCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 32, 32);

        // Get image data
        const imageData = tempCtx.getImageData(0, 0, 32, 32);
        const data = imageData.data;
        
        // Create a true grayscale representation
        // Instead of modifying the original data, extract just the grayscale values
        const grayscalePixels = new Float32Array(32 * 32);
        
        for (let i = 0, j = 0; i < data.length; i += 4, j++) {
            // Convert RGB to grayscale using weighted average
            grayscalePixels[j] = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
        }

        // Send the raw grayscale pixel data
        console.log("Sending prediction request...");
        const response = await axios.post(
            `${API_URL}/predict`,
            { 
                imageData: Array.from(grayscalePixels),
                width: 32,
                height: 32
            },
            { 
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data?.success) {
            setPrediction({
                class: response.data.class,
                probability: response.data.probability
            });
            // Remove or comment out this line to stop auto-scrolling
            //  predictionRef.current?.scrollIntoView({ behavior: "smooth" });
        } else {
            toast.warning("Received invalid prediction data ⚠️");
            console.error("Invalid prediction response:", response.data);
        }
    } catch (error) {
        console.error("Prediction error details:", error.response?.data || error.message);
        toast.error(`Prediction failed: ${error.response?.data?.error || error.message} ❌`);
        
        if (error.response?.status === 401) {
            toast.error("Session expired. Please log in again.");
            localStorage.removeItem("token");
            setToken(null);
        }
    }
  };

  useEffect(() => {
    let interval;
    if (isPredicting) {
      interval = setInterval(predictFrame, 2000);
    }
    return () => clearInterval(interval);
  }, [isPredicting]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="dashboard-full"
      style={{ 
        minHeight: "100vh",
        padding: "0",
        margin: "0",
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background decorative elements */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="dashboard-header">
        <h1>Traffic Sign Recognition</h1>
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.95 }} 
          onClick={() => {
            localStorage.removeItem("token");
            setToken(null);
            toast.info("Logged out successfully! 🚪");
          }}
          className="logout-btn"
        >
          Logout
        </motion.button>
      </div>

      <div className="dashboard-content">
        {/* Camera Section */}
        <div className="camera-section">
          <div className="camera-container">
            <video 
              ref={videoRef} 
              className="camera-feed"
            />
            
            <div className="controls-container">
              {!isCameraOn ? (
                <motion.button 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={startCamera}
                  className="camera-btn"
                >
                  <i className="fas fa-video"></i> Start Camera
                </motion.button>
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={stopCamera}
                  className="camera-btn stop"
                >
                  <i className="fas fa-video-slash"></i> Stop Camera
                </motion.button>
              )}

              {!isPredicting ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (!isCameraOn) {
                      toast.warning("Please turn on the camera first! ⚠️");
                      return;
                    }
                    setIsPredicting(true);
                    toast.success("Prediction started! 🔍");
                  }}
                  className="predict-btn"
                >
                  <i className="fas fa-play"></i> Start Prediction
                </motion.button>
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={() => {
                    setIsPredicting(false);
                    toast.info("Prediction stopped! ⏹️");
                  }}
                  className="predict-btn stop"
                >
                  <i className="fas fa-stop"></i> Stop Prediction
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Prediction Section */}
        <div className="prediction-section">
          <div className="prediction-container">
            {prediction ? (
              <motion.div
                ref={predictionRef}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="prediction-result"
              >
                <h2>Prediction Result</h2>
                <div className="sign-display">
                  <div className="sign-icon"></div>
                  <p><span className="class">Class: {prediction.class}</span></p>
                </div>
                <div className="probability-bar">
                  <div className="probability-fill" style={{ width: `${prediction.probability}%` }}></div>
                  <span className="probability-text">{prediction.probability}%</span>
                </div>
              </motion.div>
            ) : (
              <div className="prediction-empty">
                <div className="empty-icon">
                  <i className="fas fa-traffic-light"></i>
                </div>
                <h2>No Prediction Yet</h2>
                <p>Start camera and prediction to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </motion.div>
  );
}

export default Dashboard;
