const Reviews = require("../models/reviews.model.js");

const createReviews = async (req, res) => {
  try {
    const { numberOfStars, comments } = req.body;
    const userId = req.user.id;

    const reviews = await Reviews.create({ numberOfStars, comments, userId });
    return res.status(201).json({ reviews });
  } catch (error) {
    console.log("Error while Creating Reviews", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllReviews = async (req, res) => {
  const reviews = await Reviews.find({});
  return res.status(200).json(reviews);
};

const getReviews = async (req, res) => {
  const { id: reviewsId } = req.params;
  try {
    const review = await Reviews.findOne({ _id: reviewsId });
    if (!review) {
      return res
        .status(404)
        .json(`No hostel available with this id ${reviewsId}`);
    }
    res.status(200).json(review);
  } catch (error) {
    console.log("Error fecthing reviews", error);
    res.status(500).json("Internal server error");
  }
};

module.exports = { createReviews, getAllReviews, getReviews };
