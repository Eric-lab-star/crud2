import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: String,
  view: Number,
  rating: Number,
  createdAt: Date,
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
