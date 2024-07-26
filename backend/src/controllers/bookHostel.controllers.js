const bookHostelModel = require("../models/bookHostel.model");

const createBooking = async (req, res) => {
    const { hostelId } = req.body;
    const userId = req.user.id;
    try {
        await bookHostelModel.create({ hostelId, userId });
        res.status(201).json({ success: true });

    } catch (error) {
        console.log("Error creating hostel:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getAllBooking = async (req, res) => {
    const hostels = await PostHostel.find({});
    res.status(200).json({ hostels });
};

const getSingleBooking = async (req, res) => {
    const { id: hostelId } = req.params;
    console.log(id);
    try {
        const hostel = await PostHostel.findOne({ _id: hostelId });
        if (!hostel) {
            return res
                .status(404)
                .json(`No hostel available with this id ${hostelId}`);
        }
        res.status(200).json({ hostel });
    } catch (error) {
        console.log("Error fecthing hostel", error);
        res.status(500).json("Internal server error");
    }
};

module.exports = { createBooking, getAllBooking, getSingleBooking };
