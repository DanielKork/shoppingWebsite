import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful');
      navigate('/');
    } catch (err) {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     document.body.classList.add('login-body');
//     return () => {
//       document.body.classList.remove('login-body');
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/auth/login', { email, password });
//       localStorage.setItem('token', res.data.token);
//       setMessage('Login successful');
//       navigate('/home');
//     } catch (err) {
//       setMessage('Invalid credentials');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Login;

