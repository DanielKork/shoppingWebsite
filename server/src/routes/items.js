const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route   GET api/items
// @desc    Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/items
// @desc    Create an item
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newItem = new Item({ name });
    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
