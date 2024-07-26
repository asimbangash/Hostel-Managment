const multer = require("multer");
const upload = multer().array("images");
const PostHostel = require("../models/postHostel.model.js");

const createHostel = async (req, res) => {
  const { id } = req.user;
  try {
    const images = req.files.map((file) => file.filename);

    const {
      hostelName,
      hostelType,
      hostelContact,
      hostelAddress,
      location,
      accountName,
      accountNumber,
      accountEmail,
      accountPass,
      rent,
      rentPeriod,
      bills,
      condition,
      floor,
      bathroom,
      mess,
      lawn,
      numberOfRooms,
      parking,
      geyser,
      securityGuard,
      studyRoom,
      gym,
      cctv,
      wifi,
      laundary,
      mineralWater,
    } = req.body;

    const postHostel = await PostHostel.create({
      ownerId: id,
      hostelName,
      hostelType,
      hostelContact,
      hostelAddress,
      location,
      images,
      accountName,
      accountNumber,
      accountEmail,
      accountPass,
      rent,
      rentPeriod,
      bills,
      condition,
      floor,
      bathroom,
      mess,
      lawn,
      numberOfRooms,
      parking,
      geyser,
      securityGuard,
      studyRoom,
      gym,
      cctv,
      wifi,
      laundary,
      mineralWater,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    console.log("Error creating hostel:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllHostels = async (req, res) => {
  const { status } = req.query;

  if (status) {
    const hostels = await PostHostel.find({ status: status });
    res.status(200).json({ hostels });
  } else {
    const hostels = await PostHostel.find({});
    res.status(200).json({ hostels });
  }
};
const getAllActiveHostels = async (req, res) => {
  const { active } = req.query;
  if (active) {
    const hostels = await PostHostel.find({ active: active });
    res.status(200).json({ hostels });
  } else {
    const hostels = await PostHostel.find({});
    res.status(200).json({ hostels });
  }
};

const getHostel = async (req, res) => {
  const { id: hostelId } = req.params;
  try {
    const hostel = await PostHostel.findOne({ _id: hostelId });
    if (!hostel) {
      return res
        .status(404)
        .json(`No hostel available with this id ${hostelId}`);
    }

    const relatedHostels = await PostHostel.find({
      rent: {
        $lte: hostel.rent,
        $gte: hostel.rent - 2000,
      },
      _id: { $ne: hostel._id }, // Exclude the original hostel from the results
    });

    res.status(200).json({ hostel, relatedHostels });
  } catch (error) {
    console.log("Error fecthing hostel", error);
    res.status(500).json("Internal server error");
  }
};

const updateHostelStatus = async (req, res) => {
  const { id } = req.params;
  const { status, value } = req.body;
  if (status) {
    try {
      const hostel = await PostHostel.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
      );
      if (!hostel) {
        return res.status(404).json({ error: "Hostel not found" });
      }
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update hostel status" });
    }
  } else {
    try {
      const hostel = await PostHostel.findByIdAndUpdate(
        id,
        { active: value },
        { new: true }
      );
      console.log(hostel);
      if (!hostel) {
        return res.status(404).json({ error: "Hostel not found" });
      }
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update hostel status" });
    }
  }
};

const updateHostel = async (req, res) => {
  const { id } = req.params;
  let data = req.body;
  delete data._id;
  delete data.createdAt;
  delete data.updatedAt;
  delete data.__v;
  try {
    const hostel = await PostHostel.findByIdAndUpdate(id, data, { new: true });
    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }
    res.status(200).json(hostel);
  } catch (error) {
    res.status(500).json({ error: "Failed to update hostel status" });
  }
};

const deleteHostel = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedHostel = await PostHostel.findByIdAndDelete(id);
    if (!deletedHostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error deleting hostel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createHostel,
  getAllHostels,
  getHostel,
  updateHostelStatus,
  deleteHostel,
  updateHostel,
  getAllActiveHostels,
};
