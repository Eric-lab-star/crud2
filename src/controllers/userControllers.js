import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Create Account" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(404).render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match",
    });
  }
  const joinVaildation = await User.exists({
    $or: [{ email, username, name }],
  });
  if (joinVaildation) {
    return res.status(404).render("join", {
      pageTitle: "Join",
      errorMessage: "This account is already taken",
    });
  }

  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect("/users/login");
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { name } = req.body;
  const exists = await User.exists({ name });
  if (!exists) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "This name does not exists",
    });
  }
  res.redirect("/");
};
