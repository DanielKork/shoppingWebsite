const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Item = require('../models/Item');

// @route   POST api/items
// @desc    Create an item
// @access  Public (or Private if authentication is needed)
router.post('/', auth, async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const newItem = new Item({
      name,
      description,
      price: price || 0,
      image
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/items
// @desc    Create an item
// @access  Private (admin only)
router.post('/', [auth, admin], async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const newItem = new Item({
      name,
      description,
      price: price || 0,
      image,
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/items
// @desc    Get all items
// @access  Public (or Private if authentication is needed)
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/items/:id
// @desc    Get item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/items/:id
// @desc    Update an item
// @access  Private (admin only)
router.put('/:id', [auth, admin], async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    let item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: { name, description, price, image } },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Private (admin only)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;