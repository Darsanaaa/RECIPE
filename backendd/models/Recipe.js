const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
  ingredients: [String],
  steps: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);
