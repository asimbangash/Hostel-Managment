const mongoose = require("mongoose");

const messModel = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        message: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: 'unread'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Messeges", messModel);
