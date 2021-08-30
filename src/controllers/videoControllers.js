let videos = [
  {
    title: "first",
    view: 1,
    id: 1,
  },
  {
    title: "second",
    view: 19,
    id: 2,
  },
  {
    title: "third",
    view: 19,
    id: 3,
  },
  {
    title: "fourth",
    view: 19,
    id: 4,
  },
];

export const home = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `${video.title}`, video });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect("/");
};
