const mongoose = require("mongoose");
const queriesSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  }, 
  answers: {
    type: [String],
    required: false
  }
});
const queries = (module.exports = mongoose.model("queries", queriesSchema));