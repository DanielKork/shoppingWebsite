import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetch('/api/items')
//       .then(response => response.json())
//       .then(data => setItems(data))
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <ul>
//           {items.map(item => (
//             <li key={item._id}>{item.name}</li>
//           ))}
//         </ul>
//       </header>
//     </div>
//   );
// }

// export default App;


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
