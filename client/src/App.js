import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';
import AddItem from './components/AddItem';
import Home from './components/Home';
import Cart from './components/Cart';
import EditItem from './components/EditItem';
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
            <Route path="/edit/:id" element={<EditItem />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
