import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
