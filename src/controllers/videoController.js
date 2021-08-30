export const home = (req, res) => {
  const videos = [
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
      views: 10,
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
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => res.render("watch", { pageTitle: "Watch" });
