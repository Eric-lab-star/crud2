import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

export const getUpload = (req, res) => {
  return res.render("uploadVideos", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtag } = req.body;
  const {
    session: {
      user: { _id },
    },
    files: { video, thumb },
  } = req;
  console.log(thumb, video);
  try {
    const newVideo = await Video.create({
      owner: _id,
      title,
      fileUrl: video[0].location,
      thumbUrl: thumb[0].location,
      description,
      hashtag: hashtag
        .split(",")
        .map((word) => (word.startsWith("#") ? word : `#${word}`)),
    });

    const user = await User.findById(_id);

    user.videos.push(newVideo._id);

    user.save();

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("uploadVideos", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");

  if (!video) {
    return res.render("404", { pageTitle: "Video not Found" });
  }
  return res.render("watch", {
    pageTitle: video.title,
    video,
  });
};

export const getEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const video = await Video.findById(id);
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtag } = req.body;
  const video = await Video.findOne({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }

  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video");
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtag: Video.formatHashtag(hashtag),
  });
  req.flash("success", "change saved");

  return res.redirect("/");
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video");
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search Videos", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};
export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();
  return res.sendStatus(201);
};
