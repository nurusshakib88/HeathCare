const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                // required: true
            },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  comments: [{
    text: String,
    commentator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
