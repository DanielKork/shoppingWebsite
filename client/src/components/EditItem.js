import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditItem.css';

const EditItem = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`/api/items/${id}`);
        const item = res.data;
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setImage(item.image);
      } catch (err) {
        console.error('Error fetching item:', err);
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      await axios.put(`/api/items/${id}`, { name, description, price, image }, {
        headers: {
          'x-auth-token': token,
        },
      });
      alert('Item updated successfully');
      navigate('/home'); // Redirect to home page after successful update
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  return (
    <div className="edit-item-container">
      <h2 className="edit-item-header">Edit Item</h2>
      <form className="edit-item-form" onSubmit={handleSubmit}>
        <div className="edit-item-form-group">
          <label className="edit-item-form-label" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="edit-item-form-input"
          />
        </div>
        <div className="edit-item-form-group">
          <label className="edit-item-form-label" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="edit-item-form-textarea"
          />
        </div>
        <div className="edit-item-form-group">
          <label className="edit-item-form-label" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="edit-item-form-input"
          />
        </div>
        <div className="edit-item-form-group">
          <label className="edit-item-form-label" htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="edit-item-form-input"
          />
        </div>
        <button type="submit" className="edit-item-button">Update Item</button>
      </form>
    </div>
  );
};

export default EditItem;
