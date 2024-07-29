const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  }
});

module.exports = mongoose.model('users', UserSchema);



// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   cart: [
//     {
//       item: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'items'
//       },
//       quantity: {
//         type: Number,
//         default: 1
//       }
//     }
//   ]
// });

// module.exports = mongoose.model('users', UserSchema);
