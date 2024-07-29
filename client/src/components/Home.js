import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAZ, setSortAZ] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('/api/items');
        setItems(res.data);
        setFilteredItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('/api/auth', {
            headers: { 'x-auth-token': token }
          });
          setUser(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
    fetchUser();
  }, []);

  const handleAddToCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      await axios.post('/api/users/cart', { itemId }, {
        headers: {
          'x-auth-token': token
        }
      });
      alert('Item added to cart');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/items/${itemId}`, {
        headers: { 'x-auth-token': token }
      });
      setItems(items.filter(item => item._id !== itemId));
      setFilteredItems(filteredItems.filter(item => item._id !== itemId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterAndSortItems(e.target.value, sortAZ);
  };

  const handleSortChange = () => {
    const newSortAZ = !sortAZ;
    setSortAZ(newSortAZ);
    filterAndSortItems(searchQuery, newSortAZ);
  };

  const filterAndSortItems = (search, sort) => {
    let filtered = items;
    if (search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sort) {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredItems(filtered);
  };

  const getPlaceholderItems = () => {
    const placeholders = [];
    if (filteredItems.length % 3 !== 0) {
      const count = 3 - (filteredItems.length % 3);
      for (let i = 0; i < count; i++) {
        placeholders.push(<div key={`placeholder-${i}`} className="home item placeholder" />);
      }
    }
    return placeholders;
  };

  return (
    <div className="home">
      <header className="home-header">
        <h1>Our Store</h1>
        <button className="home cart-button" onClick={() => navigate('/cart')}>
          <FontAwesomeIcon icon={faShoppingCart} /> Cart
        </button>
        {user && user.role === 'admin' && (
          <button className="home add-item-button" onClick={() => navigate('/add-item')}>
            Add Item
          </button>
        )}
      </header>
      <div className="home-content">
        <aside className="home filter-sidebar">
          <h2>Filter and Sort</h2>
          <div className="home filter-item">
            <input
              type="checkbox"
              id="sortAZ"
              checked={sortAZ}
              onChange={handleSortChange}
            />
            <label htmlFor="sortAZ">Sort A to Z</label>
          </div>
        </aside>
        <main className="item-section">
          <input
            type="text"
            placeholder="Search items"
            value={searchQuery}
            onChange={handleSearch}
            className="home search-bar"
          />
          <div className="home item-list">
            {filteredItems.map((item) => (
              <div key={item._id} className="home item">
                <img src={item.image} alt={item.name} className="home item-image" />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="home item-price">${(item.price || 0).toFixed(2)}</p>
                <div className="home item-actions">
                  <button className="home add-to-cart" onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
                  {user && user.role === 'admin' && (
                    <>
                      <button className="home edit-item" onClick={() => navigate(`/edit/${item._id}`)}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                      <button className="home delete-item" onClick={() => handleDeleteItem(item._id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
            {getPlaceholderItems()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;