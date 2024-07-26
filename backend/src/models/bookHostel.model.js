const mongoose = require("mongoose");

const bookHostelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'PostHostel'
    }
}, { timestamps: true });

module.exports = mongoose.model("BookHostel", bookHostelSchema);
