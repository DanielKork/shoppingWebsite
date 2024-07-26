const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route   POST api/items
// @desc    Create an item
// @access  Public (or Private if authentication is needed)
router.post('/', async (req, res) => {
  const { name, description } = req.body;

  try {
    const newItem = new Item({ name, description });
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

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const Item = require('../models/Item');

// // @route   GET api/items
// // @desc    Get all items
// router.get('/', async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// });

// // @route   POST api/items
// // @desc    Create an item
// router.post('/', async (req, res) => {
//   const { name } = req.body;
//   try {
//     const newItem = new Item({ name });
//     const item = await newItem.save();
//     res.json(item);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;
