const NewsletterModel = require("../models/Newsletter.model");

const Newsletter = async (req, res) => {
    const { email } = req.body;
    const { id } = req.user;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const newSubscription = await NewsletterModel.create({ email, id });
        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Email already subscribed' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = { Newsletter };
