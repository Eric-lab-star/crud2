let videos = [
  {
    title: "first video",
    view: 1,
    rating: 3,
    id: 1,
  },
  {
    title: "second video",
    view: 12,
    rating: 3,
    id: 2,
  },
  {
    title: "third video",
    view: 12,
    rating: 3,
    id: 3,
  },
  {
    title: "fourth video",
    view: 12,
    rating: 3,
    id: 4,
  },
];

export const home = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });

export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const video = videos[id - 1];
  videos[id - 1].title = title;
  return res.redirect("/");
};
