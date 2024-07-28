import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAZ, setSortAZ] = useState(false);
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

    fetchItems();
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

  return (
    <div className="home">
      <header className="home-header">
        <h1>Our Store</h1>
        <button className="cart-button" onClick={() => navigate('/cart')}>
          <FontAwesomeIcon icon={faShoppingCart} /> Cart
        </button>
      </header>
      <div className="home-content">
        <aside className="filter-sidebar">
          <h2>Filter and Sort</h2>
          <div className="filter-item">
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
            className="search-bar"
          />
          <div className="item-list">
            {filteredItems.map((item) => (
              <div key={item._id} className="item">
                <img src={item.image} alt={item.name} className="item-image" />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="item-actions">
                  <button className="add-to-cart" onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
                  <button className="buy">Buy</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import './Home.css';

// const Home = () => {
//   const [items, setItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const res = await axios.get('/api/items');
//         setItems(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchItems();
//   }, []);

//   const handleAddToCart = async (itemId) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.error('No token found');
//         return;
//       }
//       await axios.post('/api/users/cart', { itemId }, {
//         headers: {
//           'x-auth-token': token
//         }
//       });
//       alert('Item added to cart');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="home">
//       <header className="home-header">
//         <h1>Our Store</h1>
//         <button className="cart-button" onClick={() => navigate('/cart')}>
//           <FontAwesomeIcon icon={faShoppingCart} /> Cart
//         </button>
//       </header>
//       <div className="item-list">
//         {items.map((item) => (
//           <div key={item._id} className="item">
//             <img src={item.image} alt={item.name} className="item-image" />
//             <h3>{item.name}</h3>
//             <p>{item.description}</p>
//             <div className="item-actions">
//               <button className="add-to-cart" onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
//               <button className="buy">Buy</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

