const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },

  poster: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Comment", commentSchema);
