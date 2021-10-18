import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  hashtag: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtag", function (hashtag) {
  return hashtag
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
