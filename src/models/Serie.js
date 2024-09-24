import mongoose, { Schema } from "mongoose";

const serieSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    genre: {
      type: String,
      require: true,
    },
    isSeries: {
      type: Boolean,
      require: true,
    },
    lastWatchedEpisode: {
      type: Number,
      default: 0,
    },
    totalEpisodes: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    review: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Serie = mongoose.models.Serie || mongoose.model("Serie", serieSchema);

export default Serie;
