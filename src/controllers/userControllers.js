import User from "../models/User";
import bcrypt from "bcrypt";

export const user = (req, res) => {
  return res.send("user");
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitel: "Join" });
};

export const postJoin = async (req, res) => {
  const { username, name, password, location, email, password2 } = req.body;
  const exist = await User.exists({ username });
  if (exist) {
    return res.render("login", {
      errorMessage: " This username already exists",
    });
  }
  if (password !== password2) {
    return res.render("login", { errorMessage: "Password Validation Fail" });
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
    return res.redirect("/join", { errorMessage: error._message });
  }
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const exist = await User.exists({ username });

  if (!exist) {
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
  req.sesion.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
