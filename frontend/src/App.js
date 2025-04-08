// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Dashboard from './components/Dashboard';

// function App() {
//   const [token, setToken] = useState(localStorage.getItem('token') || null);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login setToken={setToken} />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={token ? <Dashboard token={token} setToken={setToken} /> : <Login setToken={setToken} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// src/App.js
import Login from './components/Login';     // Remove the curly braces
import Signup from './components/Signup';   // Remove the curly braces
import Dashboard from './components/Dashboard'; // Remove the curly braces
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <Router>
      <div>
        <ToastContainer position="top-left" autoClose={3000} />
      </div>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={token ? <Dashboard token={token} setToken={setToken} /> : <Login setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;