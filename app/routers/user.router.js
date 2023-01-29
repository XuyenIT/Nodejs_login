const express = require("express");
const {
  listUser,
  getFormCreateUser,
  getFormLogin,
  createUser,
  checkLogin,
  logout,
  getDetailUser,
  handleActiveUser,
} = require("../controllers/user.controller");
const { isAuth, loggedin } = require("../middlewares/auth.middleware");
const userRouter = express.Router();
userRouter.get("/", isAuth, (req, res) => {
  res.redirect("/login");
});
userRouter.get("/login", isAuth, getFormLogin);
userRouter.post("/login", checkLogin);
userRouter.get("/list_user", loggedin, listUser);
userRouter.get("/create_user", loggedin, getFormCreateUser);
userRouter.post("/create_user", createUser);
userRouter.get("/logout", logout);
userRouter.get("/detail_user", getDetailUser);
userRouter.get("/active/:id", handleActiveUser);

module.exports = userRouter;
