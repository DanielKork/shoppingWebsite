import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const res = await axios.get('/api/users/cart', {
          headers: {
            'x-auth-token': token
          }
        });
        setCartItems(res.data);
      } catch (err) {
        console.error('Error fetching cart items:', err);
      }
    };

    fetchCartItems();
  }, [refresh]);

  const handleDelete = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/users/cart/${itemId}`, {
        headers: {
          'x-auth-token': token
        }
      });
      setRefresh(!refresh);
      alert('Item removed from cart');
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleChangeQuantity = async (itemId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/users/cart/${itemId}`, { quantity }, {
        headers: {
          'x-auth-token': token
        }
      });
      setRefresh(!refresh);
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cartItems.map((cartItem) => (
          <div key={cartItem.item._id} className="cart-item">
            <img src={cartItem.item.image} alt={cartItem.item.name} className="cart-item-image" />
            <h3>{cartItem.item.name}</h3>
            <p>{cartItem.item.description}</p>
            <input
              type="number"
              value={cartItem.quantity}
              min="1"
              onChange={(e) => handleChangeQuantity(cartItem.item._id, e.target.value)}
            />
            <button onClick={() => handleDelete(cartItem.item._id)}>Delete</button>
          </div>
        ))}
        {/* Add placeholders to maintain layout consistency */}
        {Array.from({ length: (3 - (cartItems.length % 3)) % 3 }).map((_, index) => (
          <div key={index} className="cart-item placeholder"></div>
        ))}
      </div>
    </div>
  );
};

export default Cart;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Cart.css';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error('No token found');
//           return;
//         }
//         const res = await axios.get('/api/users/cart', {
//           headers: {
//             'x-auth-token': token
//           }
//         });
//         setCartItems(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const handleDelete = async (itemId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`/api/users/cart/${itemId}`, {
//         headers: {
//           'x-auth-token': token
//         }
//       });
//       setCartItems(cartItems.filter(item => item.item._id !== itemId));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChangeQuantity = async (itemId, quantity) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`/api/users/cart/${itemId}`, { quantity }, {
//         headers: {
//           'x-auth-token': token
//         }
//       });
//       setCartItems(cartItems.map(item => 
//         item.item._id === itemId ? { ...item, quantity } : item
//       ));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="cart">
//       <h2>Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="cart-list">
//           {cartItems.map((cartItem) => (
//             <div key={cartItem.item._id} className="cart-item">
//               <h3>{cartItem.item.name}</h3>
//               <p>{cartItem.item.description}</p>
//               <input
//                 type="number"
//                 value={cartItem.quantity}
//                 min="1"
//                 onChange={(e) => handleChangeQuantity(cartItem.item._id, e.target.value)}
//               />
//               <button onClick={() => handleDelete(cartItem.item._id)}>Delete</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
