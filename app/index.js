const express = require("express");
const path = require("path");
const session = require("express-session");
const rootRouter = require("./routers/root.router");

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//static file
const publicPathDirectory = path.join(__dirname, "public");
app.use(express.static(publicPathDirectory));
//session
app.use(
  session({
    secret: "xuyenle",
    resave: true,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});
app.use(rootRouter);

app.listen(port, function () {
  console.log(`server running: http://localhost:${port}`);
});

//setup sequelize
// const { sequelize } = require("./models");
// sequelize.sync({ alter: true });
