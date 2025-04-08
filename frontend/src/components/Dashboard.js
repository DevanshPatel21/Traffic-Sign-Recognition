// import React, { useRef, useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';

// function Dashboard({ token, setToken }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [prediction, setPrediction] = useState(null);

//   useEffect(() => {
//     const setupWebcam = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.onloadedmetadata = () => {
//             videoRef.current.play().catch(err => console.error("Autoplay prevented:", err));
//           };
//         }
//       } catch (err) {
//         console.error("Webcam error:", err);
//       }
//     };

//     setupWebcam();

//     // Predict every second
//     const interval = setInterval(predictFrame, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const predictFrame = async () => {
//     const video = videoRef.current;
//     if (!video || video.readyState !== 4) return; // Ensure video is ready

//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0);
//     const imgData = canvas.toDataURL('image/jpeg');

//     try {
//       const response = await axios.post('http://localhost:5000/predict', 
//         { image: imgData }, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPrediction(response.data);
//     } catch (error) {
//       console.error('Prediction error:', error);
//       if (error.response?.status === 401) {
//         alert('Session expired. Please log in again.');
//         localStorage.removeItem('token');
//         setToken(null);
//       }
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="dashboard"
//     >
//       <h1>Traffic Sign Recognition</h1>
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={handleLogout}
//         style={{ position: 'absolute', top: '20px', right: '20px' }}
//       >
//         Logout
//       </motion.button>
//       <video ref={videoRef} style={{ width: '800px', height: '600px', borderRadius: '10px' }} />
//       <canvas ref={canvasRef} className="three-canvas" />
//       {prediction && (
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: 'spring', stiffness: 260, damping: 20 }}
//           className="prediction"
//         >
//           <p>Class: {prediction.class}</p>
//           <p>Probability: {prediction.probability}%</p>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }

// export default Dashboard;
// ****************************************************************************************************************************************
// import React, { useRef, useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';

// function Dashboard({ token, setToken }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const predictionRef = useRef(null);
//   const streamRef = useRef(null); 

//   const [prediction, setPrediction] = useState(null);
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const [isPredicting, setIsPredicting] = useState(false);

//   // Start Camera
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//       videoRef.current.onloadedmetadata = () => {
//         videoRef.current.play();
//       };
//       streamRef.current = stream;
//       setIsCameraOn(true);
//     } catch (error) {
//       console.error("Webcam error:", error);
//     }
//   };

//   // Stop Camera
//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }
//     setIsCameraOn(false);
//   };

//   // Capture Frame and Predict
//   const predictFrame = async () => {
//     if (!isPredicting || !videoRef.current || videoRef.current.readyState !== 4) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     canvas.width = videoRef.current.videoWidth || 640;
//     canvas.height = videoRef.current.videoHeight || 480;

//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     const imgData = canvas.toDataURL("image/jpeg");

//     console.log("Captured Image Data (First 100 chars):", imgData.slice(0, 100));

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/predict",
//         { image: imgData },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data?.class) {
//         console.log("Prediction:", response.data);
//         setPrediction(response.data);
//         predictionRef.current?.scrollIntoView({ behavior: "smooth" }); // Only scroll if there's a prediction
//       } else {
//         console.error("Invalid prediction response:", response.data);
//       }
//     } catch (error) {
//       console.error("Prediction API error:", error);
//       if (error.response?.status === 401) {
//         alert("Session expired. Please log in again.");
//         localStorage.removeItem("token");
//         setToken(null);
//       }
//     }
//   };

//   useEffect(() => {
//     let interval;
//     if (isPredicting) {
//       interval = setInterval(predictFrame, 2000);
//     }
//     return () => clearInterval(interval);
//   }, [isPredicting]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="dashboard"
//       style={{ height: "100vh", overflowY: "auto", padding: "20px", textAlign: "center" }}
//     >
//       <h1>Traffic Sign Recognition</h1>

//       <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={setToken.bind(null, null)} style={{ position: "absolute", top: "20px", right: "20px" }}>
//         Logout
//       </motion.button>

//       <div>
//         {!isCameraOn ? (
//           <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={startCamera}>
//             Start Camera
//           </motion.button>
//         ) : (
//           <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={stopCamera}>
//             Stop Camera
//           </motion.button>
//         )}

//         {!isPredicting ? (
//           <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setIsPredicting(true)} style={{ marginLeft: "10px" }}>
//             Start Prediction
//           </motion.button>
//         ) : (
//           <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setIsPredicting(false)} style={{ marginLeft: "10px" }}>
//             Stop Prediction
//           </motion.button>
//         )}
//       </div>

//       <video ref={videoRef} style={{ width: "800px", height: "600px", borderRadius: "10px", background: "#000" }} />

//       <canvas ref={canvasRef} style={{ display: "none" }} />

//       {prediction && (
//         <motion.div
//           ref={predictionRef}
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
//           style={{ marginTop: "20px", padding: "10px", background: "#000", borderRadius: "10px" }}
//         >
//           <div className='class'>  
//           <p><strong>Class:</strong> {prediction.class}</p>
//           <p><strong>Probability:</strong> {prediction.probability}%</p>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }

// export default Dashboard;

//////****************************************************************************************************************************************************************************************** */

// import React, { useRef, useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Dashboard({ token, setToken }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const predictionRef = useRef(null);
//   const streamRef = useRef(null);

//   const [prediction, setPrediction] = useState(null);
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const [isPredicting, setIsPredicting] = useState(false);

//   // Start Camera
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//       videoRef.current.onloadedmetadata = () => {
//         videoRef.current.play();
//       };
//       streamRef.current = stream;
//       setIsCameraOn(true);
//     } catch (error) {
//       console.error("Webcam error:", error);
//     }
//   };

//   // Stop Camera
//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }
//     setIsCameraOn(false);
//   };

//   // Capture Frame and Predict
//   const predictFrame = async () => {
//     if (!isPredicting || !videoRef.current || videoRef.current.readyState !== 4) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     canvas.width = videoRef.current.videoWidth || 640;
//     canvas.height = videoRef.current.videoHeight || 480;

//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     const imgData = canvas.toDataURL("image/jpeg");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/predict",
//         { image: imgData },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data?.class) {
//         setPrediction(response.data);
//         predictionRef.current?.scrollIntoView({ behavior: "smooth" });
//       } else {
//         console.error("Invalid prediction response:", response.data);
//       }
//     } catch (error) {
//       console.error("Prediction API error:", error);
//       if (error.response?.status === 401) {
//         toast.error("Session expired. Please log in again.");
//         localStorage.removeItem("token");
//         setToken(null);
//       }
//     }
//   };

//   useEffect(() => {
//     let interval;
//     if (isPredicting) {
//       interval = setInterval(predictFrame, 2000);
//     }
//     return () => clearInterval(interval);
//   }, [isPredicting]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="dashboard"
//       style={{ height: "100vh", overflowY: "auto", padding: "20px", textAlign: "justify" }}
//     >
//       <h1 style={{ textAlign: "center" }}>Traffic Sign Recognition</h1>

//       <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={setToken.bind(null, null)} style={{ position: "absolute", top: "20px", right: "20px" }}>
//         Logout
//       </motion.button>

//       <div style={{ textAlign: "center" }}>
//         {!isCameraOn ? (
//           <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={startCamera}>
//             Start Camera
//           </motion.button>
//         ) : (
//           <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={stopCamera}>
//             Stop Camera
//           </motion.button>
//         )}

//         {!isPredicting ? (
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => {
//               if (!isCameraOn) {
//                 toast.warning("Please turn on the camera first!");
//                 return;
//               }
//               setIsPredicting(true);
//             }}
//             style={{ marginLeft: "10px" }}
//           >
//             Start Prediction
//           </motion.button>
//         ) : (
//           <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setIsPredicting(false)} style={{ marginLeft: "10px" }}>
//             Stop Prediction
//           </motion.button>
//         )}
//       </div>

//       <video ref={videoRef} style={{ width: "800px", height: "600px", borderRadius: "10px", background: "#000", display: "block", margin: "20px auto" }} />

//       <canvas ref={canvasRef} style={{ display: "none" }} />

//       {prediction && (
//         <motion.div
//           ref={predictionRef}
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
//           style={{ marginTop: "20px", padding: "10px", background: "#000", borderRadius: "10px", textAlign: "center", color: "#fff" }}
//         >
//           <p><strong>Class:</strong> {prediction.class}</p>
//           <p><strong>Probability:</strong> {prediction.probability}%</p>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }

// export default Dashboard;

// )((((((((((((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))))))))))

import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

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

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imgData = canvas.toDataURL("image/jpeg");

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        { image: imgData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data?.class) {
        setPrediction(response.data);
        predictionRef.current?.scrollIntoView({ behavior: "smooth" });
        // toast.success(`Prediction: ${response.data.class} (${response.data.probability}%) ✅`);
      } else {
        // toast.warning("Invalid prediction response! ⚠️");
        console.error("Invalid prediction response:", response.data);
      }
    } catch (error) {
      toast.error("Prediction API error! ❌");
      console.error("Prediction API error:", error);
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
      className="dashboard"
      style={{ height: "100vh", overflowY: "auto", padding: "20px", textAlign: "justify" }}
    >
      <h1 style={{ textAlign: "center" }}>Traffic Sign Recognition</h1>

      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => {
        localStorage.removeItem("token");
        setToken(null);
        toast.info("Logged out successfully! 🚪");
      }} style={{ position: "absolute", top: "50px", right: "20px" }}>
        Logout
      </motion.button>

      <div style={{ textAlign: "center" }}>
        {!isCameraOn ? (
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={startCamera}>
            Start Camera
          </motion.button>
        ) : (
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={stopCamera}>
            Stop Camera
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
            style={{ marginLeft: "10px" }}
          >
            Start Prediction
          </motion.button>
        ) : (
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => {
            setIsPredicting(false);
            toast.info("Prediction stopped! ⏹️");
          }} style={{ marginLeft: "10px" }}>
            Stop Prediction
          </motion.button>
        )}
      </div>

      <video ref={videoRef} style={{ width: "800px", height: "600px", borderRadius: "10px", background: "#000", display: "block", margin: "20px auto" }} />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {prediction && (
        <motion.div
          ref={predictionRef}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{ marginTop: "20px", padding: "10px", background: "#000", borderRadius: "10px", textAlign: "center", color: "#fff" }}
        >
          <p><strong>Class:</strong> {prediction.class}</p>
          <p><strong>Probability:</strong> {prediction.probability}%</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Dashboard;
