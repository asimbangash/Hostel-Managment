const Message = require('../models/contactMess.model'); // Adjust the path as necessary

// Create a new message
const createMessage = async (req, res) => {
    const { id } = req.user;
    const userId = id;
    const { message } = req.body;

    if (!userId || !message) {
        return res.status(400).json({ error: 'User ID and message are required' });
    }

    try {
        const newMessage = new Message({
            userId,
            message
        });

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create message' });
    }
};

// Get all messages
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};

module.exports = { createMessage, getAllMessages }

