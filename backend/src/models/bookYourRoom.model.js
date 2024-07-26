const mongoose = require("mongoose");

const bookYourRoomSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  roomNo: {
    type: Number,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  vacateDate: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  hostelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostHostel'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
}, { timestamps: true });

module.exports = mongoose.model("BookYourRoom", bookYourRoomSchema);
