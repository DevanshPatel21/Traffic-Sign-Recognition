// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Signup() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/signup', { username, password });
//       alert(response.data.message);
//       navigate('/');
//     } catch (error) {
//     //   alert(error.response?.data?.message || 'Signup failed');
//         toast.error("Failed to SignUp")
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="auth-container"
//     >
//       <h1>Signup</h1>
//       <input
//         className='Username'
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         className='Username'
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={handleSignup}
//       >
//         Signup
//       </motion.button>
//       <p>
//         Already have an account? <Link to="/">Login</Link>
//       </p>
//     </motion.div>
//   );
// }

// export default Signup;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    if (username.trim().length < 3) {
      toast.error("Username must be at least 3 characters long");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (password.includes(' ')) {
      toast.error("Password cannot contain spaces");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;
    
    try {
      const response = await axios.post('http://44.226.145.213/signup', { username, password });
      toast.success(response.data.message || "Signup successful");
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="auth-container"
    >
      <h1>Signup</h1>
      <input
        className='Username'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className='Password'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSignup}
        disabled={!username || !password}
      >
        Signup
      </motion.button>
      <p>
        Already have an account? <Link to="/" className='signup'>Login</Link>
      </p>
    </motion.div>
  );
}

export default Signup;
