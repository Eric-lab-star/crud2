import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  view: { type: Number, default: 1 },
  rating: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  description: { type: String, reqired: true },
  hashtag: [{ type: String, required: true, trim: true }],
});

videoSchema.static("formatHashtag", function (hashtag) {
  return hashtag
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
