let videos = [
  {
    title: "First video",
    views: 10,
    rating: 5,
    id: 1,
  },
  {
    title: "Second video",
    views: 10,
    rating: 5,
    id: 2,
  },
  {
    title: "Third video",
    views: 1,
    rating: 5,
    id: 3,
  },
  {
    title: "Fourth video",
    views: 10,
    rating: 5,
    id: 4,
  },
];
export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};
export const edit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};
