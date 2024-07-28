import React, { useState } from 'react';
import axios from 'axios';
import './AddItem.css';

const AddItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      await axios.post('/api/items', { name, description, price, image }, {
        headers: {
          'x-auth-token': token
        }
      });
      alert('Item added successfully');
      setName('');
      setDescription('');
      setPrice('');
      setImage('');
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <div className="add-item">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;



// import React, { useState } from 'react';
// import axios from 'axios';

// const AddItem = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/items', { name, description });
//       setMessage(`Item added: ${res.data.name}`);
//       setName('');
//       setDescription('');
//     } catch (err) {
//       console.error(err);
//       setMessage('Error adding item');
//     }
//   };

//   return (
//     <div>
//       <h2>Add Item</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description</label>
//           <input
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <button type="submit">Add Item</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default AddItem;
