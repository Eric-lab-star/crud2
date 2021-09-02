import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtag } = req.body;
  await Video.create({
    title,
    description,
    hashtag: Video.formatHashtag(hashtag),
    createdAt: Date.now(),
  });
  return res.redirect("/");
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  return res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtag } = req.body;
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtag: hashtag
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`)),
  });
  return res.redirect("/");
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const video = Video.findByIdAndDelete(id);
  res.redirect("/");
};
