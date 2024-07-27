import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Ensure this CSS file is imported

const Home = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="home">
      <h2>Items List</h2>
      <button onClick={() => navigate('/cart')}>Go to Cart</button>
      <div className="item-list">
        {items.map((item) => (
          <div key={item._id} className="item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <button onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
            <button onClick={() => alert('Buying functionality not implemented yet')}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Home.css'; // Ensure this CSS file is imported

// const Home = () => {
//   const [items, setItems] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');

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

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/items/${id}`);
//       setItems(items.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleUpdate = async (id) => {
//     try {
//       const res = await axios.put(`/api/items/${id}`, { name, description });
//       setItems(items.map((item) => (item._id === id ? res.data : item)));
//       setEditing(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="home">
//       <h2>Items List</h2>
//       <div className="item-list">
//         {items.map((item) => (
//           <div key={item._id} className="item">
//             {editing === item._id ? (
//               <div>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//                 <button onClick={() => handleUpdate(item._id)}>Save</button>
//                 <button onClick={() => setEditing(null)}>Cancel</button>
//               </div>
//             ) : (
//               <div>
//                 <h3>{item.name}</h3>
//                 <p>{item.description}</p>
//                 <button onClick={() => { setEditing(item._id); setName(item.name); setDescription(item.description); }}>Edit</button>
//                 <button onClick={() => handleDelete(item._id)}>Delete</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

