import User from "../models/User";
import bcrypt from "bcrypt";

export const user = (req, res) => {
  return res.send("user");
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { username, name, password, location, email, password2 } = req.body;
  const exist = await User.exists({ username });
  if (exist) {
    return res.render("join", {
      errorMessage: " This username already exists",
      pageTitle: "Join",
    });
  }
  if (password !== password2) {
    return res.render("join", {
      errorMessage: "Password Validation Fail",
      pageTitle: "join",
    });
  }
  try {
    await User.create({
      username,
      name,
      password,
      location,
      email,
      password,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.render("/join", {
      pageTitle: "Join",
    });
  }
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.render("login", {
      pageTitle: "Login",
      errorMessage: "This username does not exists",
    });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.render("Login", {
      pageTitle: "Login",
      errorMessage: "Password confirmation failed",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
