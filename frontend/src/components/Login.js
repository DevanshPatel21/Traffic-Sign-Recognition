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
import { motion } from 'framer-motion';
import '../App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const token = await userCredential.user.getIdToken();

      setToken(token);
      localStorage.setItem('token', token);

      toast.success('Login successful! 🎉');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      setToken(token);
      localStorage.setItem('token', token);

      toast.success(`Welcome back, ${user.displayName}`);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Google login failed');
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
      <input
        className='Username'
        type="email"
        placeholder="Email"
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
        onClick={handleLogin}
      >
        Login
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGoogleLogin}
        style={{ marginTop: '10px' }}
      >
        Login with Google
      </motion.button>

      <p>
        Don’t have an account? <Link to="/signup" className='signup'>Sign up</Link>
      </p>
    </motion.div>
  );
}

export default Login;
