const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
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
// router.post('/', async (req, res) => {
//   const { name, description } = req.body;

//   try {
//     const newItem = new Item({ name, description });
//     const item = await newItem.save();
//     res.json(item);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

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

// Update an item
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;

  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Item removed' });
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
