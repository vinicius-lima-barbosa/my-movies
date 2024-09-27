import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    genre: {
      type: String,
      require: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
