import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';
import AddItem from './components/AddItem';
import Home from './components/Home';
import Cart from './components/Cart';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;


// import React, { useEffect, useState } from 'react';
// import './App.css';

// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetch('/api')
//       .then(response => response.json())
//       .then(data => setMessage(data.message));
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>{message}</p>
//       </header>
//     </div>
//   );
// }

// export default App;
