import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // Ensure this CSS file is imported

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('/api/items');
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="home">
      <h2>Items List</h2>
      <div className="item-list">
        {items.map((item) => (
          <div key={item._id} className="item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

