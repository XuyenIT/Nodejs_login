const isAuth = (req, res, next) => {
  if (req.session.loggedin) {
    res.locals.user = req.session.user;
    res.redirect("/list_user");
  } else {
    next();
  }
};
const loggedin = (req, res, next) => {
  if (req.session.loggedin) {
    res.locals.user = req.session.user;
    next();
  } else {
    res.redirect("/login");
  }
};
module.exports = {
  isAuth,
  loggedin,
};
