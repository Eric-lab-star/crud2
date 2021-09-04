import User from "../models/User";

export const login = (req, res) => {
  res.render("Login", { pageTitle: "Login" });
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Create Account" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match",
    });
  }
  const joinVaildation = await User.exists({
    $or: [{ email, username, name }],
  });
  if (joinVaildation) {
    return res.render("join", {
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
