import User from "../models/User";

export const login = (req, res) => {
  res.render("Login", { pageTitle: "Login" });
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Create Account" });
};
export const postJoin = (req, res) => {
  return res.redirect("/");
};
