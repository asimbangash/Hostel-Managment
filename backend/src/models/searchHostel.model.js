const mongoose = require("mongoose");

const searchHostelSchema = mongoose.Schema({
  searchTitle: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SearchHostel", searchHostelSchema);
