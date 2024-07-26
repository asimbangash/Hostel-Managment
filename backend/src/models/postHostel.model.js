const { boolean } = require("joi");
const mongoose = require("mongoose");

const postHostelSchema = mongoose.Schema(
  {
    hostelName: {
      type: String,
      required: true,
      unique: true,
    },
    hostelType: {
      type: String,
      required: true,
    },
    hostelContact: {
      type: String,
      required: true,
    },
    hostelAddress: {
      type: String,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    images: {
      type: [String],
      // required: true,
    },
    accountName: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    accountEmail: {
      type: String,
      required: true,
      unique: true,
    },
    accountPass: {
      type: String,
      requried: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    rentPeriod: {
      type: String,
      required: true,
    },
    bills: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      required: true,
    },
    bathroom: {
      type: String,
      required: true,
    },
    mess: {
      type: String,
      required: true,
    },
    lawn: {
      type: String,
      required: true,
    },
    numberOfRooms: {
      type: Number,
      required: true,
    },
    parking: {
      type: String,
      requried: true,
    },
    geyser: {
      type: String,
      requried: true,
    },
    securityGuard: {
      type: String,
      requried: true,
    },
    studyRoom: {
      type: String,
      requried: true,
    },
    gym: {
      type: String,
      requried: true,
    },
    cctv: {
      type: String,
      requried: true,
    },
    wifi: {
      type: String,
      requried: true,
    },
    laundary: {
      type: String,
      requried: true,
    },
    mineralWater: {
      type: String,
      requried: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "pending",
    },
    active: {
      type: String,
      default: "TRUE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostHostel", postHostelSchema);
