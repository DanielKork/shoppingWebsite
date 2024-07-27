const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

// @route   POST api/users/cart
// @desc    Add item to cart
// @access  Private
router.post('/cart', auth, async (req, res) => {
  const { itemId } = req.body;

  try {
    console.log('Req.user in route:', req.user); // Add this line
    const user = await User.findById(req.user.id);
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    // Check if item is already in the cart
    const itemInCart = user.cart.find(cartItem => cartItem.item.toString() === itemId);

    if (itemInCart) {
      // If item is already in the cart, increase the quantity
      itemInCart.quantity += 1;
    } else {
      // If item is not in the cart, add it
      user.cart.push({ item: itemId, quantity: 1 });
    }

    await user.save();
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/cart
// @desc    Get user's cart items
// @access  Private
router.get('/cart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.item');
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/users/cart/:itemId
// @desc    Update item quantity in cart
// @access  Private
router.put('/cart/:itemId', auth, async (req, res) => {
  const { quantity } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const itemInCart = user.cart.find(cartItem => cartItem.item.toString() === req.params.itemId);

    if (itemInCart) {
      itemInCart.quantity = quantity;
      await user.save();
      res.json(user.cart);
    } else {
      res.status(404).json({ msg: 'Item not found in cart' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/users/cart/:itemId
// @desc    Delete item from cart
// @access  Private
router.delete('/cart/:itemId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(cartItem => cartItem.item.toString() !== req.params.itemId);
    await user.save();
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Item = require('../models/Item');
// const auth = require('../middleware/auth');

// // @route   POST api/users/cart
// // @desc    Add item to cart
// // @access  Private
// router.post('/cart', auth, async (req, res) => {
//   const { itemId } = req.body;

//   try {
//     console.log('Req.user in route:', req.user); // Add this line
//     const user = await User.findById(req.user.id);
//     const item = await Item.findById(itemId);

//     if (!item) {
//       return res.status(404).json({ msg: 'Item not found' });
//     }

//     // Check if item is already in the cart
//     const itemInCart = user.cart.find(cartItem => cartItem.item.toString() === itemId);

//     if (itemInCart) {
//       // If item is already in the cart, increase the quantity
//       itemInCart.quantity += 1;
//     } else {
//       // If item is not in the cart, add it
//       user.cart.push({ item: itemId, quantity: 1 });
//     }

//     await user.save();
//     res.json(user.cart);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;
