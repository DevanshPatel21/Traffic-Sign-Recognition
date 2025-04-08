// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Login({ setToken }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/login', { username, password });
//       const token = response.data.access_token;
//       setToken(token);
//       localStorage.setItem('token', token);
//       navigate('/dashboard');
//     } catch (error) {
//        toast.error(error.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="auth-container"
//     >
//       <h1>Login</h1>
//       <input className='Username'
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
//         onClick={handleLogin}
//       >
//         Login
//       </motion.button>
//       <p>
//         Don’t have an account? <Link to="/signup">Sign up</Link>
//       </p>
//     </motion.div>
//   );
// }

// export default Login;

// ())()()()()()()()()()()()()()()()((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import 'E:/Traffic-Sign-Recognition-App/frontend/src/App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const token = response.data.access_token;
      setToken(token);
      localStorage.setItem('token', token);
      
      // Show success toast
      toast.success('Login successful! 🎉');

      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="auth-container"
    >
      <h1>Login</h1>
      <input className='Username'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className='Username'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogin}
      >
        Login
      </motion.button>
      <p>
        Don’t have an account? <Link to="/signup" className='signup'>Sign up</Link>
      </p>
    </motion.div>
  );
}

export default Login;
