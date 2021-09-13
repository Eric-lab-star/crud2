import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  hashtag: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

videoSchema.static("formatHashtag", function (hashtag) {
  return hashtag
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
