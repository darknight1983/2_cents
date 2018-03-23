const mongoose = require('mongoose');
const Comment = require('./commentModel');

// Reference to the Schema Constructor
const Schema = mongoose.Schema;

// Create ArticleSchema object.
const ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: Comment
    }
  ]
});

// Create the model based on the ArticleSchema defined above.
const Article = mongoose.model("Article", ArticleSchema)

// Export the Article model
module.exports = Article;
