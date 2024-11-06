const { Schema, Types, model } = require("mongoose");

const bookSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  isRented: {
    type: Boolean,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  file: { type: String,required:true},

  ratings: [
    {
      userId: { type: Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 }, // assuming a rating scale from 1 to 5
    },
  ],
  averageRating: { type: Number, default: 0 }, // to store the average rating
  owner: {
    type: Types.ObjectId,

    ref: "User",
    required: true,
  },

});
const Book = model("Book", bookSchema);

module.exports = { Book };
