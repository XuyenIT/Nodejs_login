const bcrypt = require("bcryptjs");

const { User } = require("../models");
const getFormCreateUser = (req, res) => {
  res.render("user/create_user");
};
const listUser = async (req, res) => {
  const listUser = await User.findAll();
  res.render("user/list_user", { listUser });
};
const getFormLogin = (req, res) => {
  res.render("user/login");
};
const checkLogin = async (req, res) => {
  const { email, password } = req.body;
  //tim user dua tren email
  const user = await User.findOne({ where: { email } });
  if (user) {
    //kiem tra mat khau dung hay ko
    const isAuth = bcrypt.compareSync(password, user.password);
    if (isAuth) {
      req.session.loggedin = true;
      req.session.user = user;
      if (user.role == 1) {
        res.redirect("/list_user");
      } else {
        res.redirect("/detail_user");
      }
    } else {
      res.send("Password ko hop le");
    }
  } else {
    res.redirect("/login");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) res.send("error");
    res.redirect("/login");
  });
};
const createUser = async (req, res) => {
  const { email, fullName, address, password, age, role } = req.body;
  try {
    // tao 1 chuoi ngau nhien
    const salt = bcrypt.genSaltSync(10);
    //ma hoa chuoi ngau nhien salt+ password
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      email,
      fullName,
      address,
      password: hashPassword,
      age,
      role,
    });
    res.redirect("/list_user");
  } catch (error) {
    console.log("error create User: ", error.errors[0].message);
  }
};
const getDetailUser = async (req, res) => {
  const userDetail = req.session.user;
  res.render("user/detail_user", { userDetail });
};
const handleActiveUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  console.log("user", user);
  if (user) {
    User.update(
      { status: !user.status },
      {
        where: { id },
      }
    );
  }

  res.redirect("/list_user");
  console.log("id", id);
};
module.exports = {
  listUser,
  getFormCreateUser,
  getFormLogin,
  createUser,
  checkLogin,
  logout,
  getDetailUser,
  handleActiveUser,
};
