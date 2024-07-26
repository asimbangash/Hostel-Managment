const postHostelModel = require("../models/postHostel.model");

const searchHostel = async (req, res) => {
  try {
    const { searchTitle, category } = req.body;

    // Build the match criteria
    let matchCriteria = {};

    if (searchTitle) {
      matchCriteria.hostelAddress = { $regex: searchTitle, $options: 'i' }; // Case-insensitive partial match
    }

    if (category) {
      matchCriteria.hostelType = category; // Exact match for category
    }

    const pipeline = [
      { $match: matchCriteria }
    ];

    const searchHostel = await postHostelModel.aggregate(pipeline);

    res.status(200).json({ success: true, searchHostel });

  } catch (error) {
    console.log("Error while Searching Hostel", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { searchHostel };
