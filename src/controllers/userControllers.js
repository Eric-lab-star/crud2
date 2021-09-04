import User from "../models/User";

export const login = (req, res) => {
  res.render("Login", { pageTitle: "Login" });
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Create Account" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, password, location } = req.body;
  const users = await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect("/users/login");
};
