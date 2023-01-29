const { Sequelize } = require("sequelize");
const {
  DB,
  USER,
  PASSWORD,
  HOST,
  dialect,
  PORT,
} = require("../configs/db.config");
const UserModel = require("./user.model");
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,
  port: PORT,
});
const User = UserModel(sequelize);
module.exports = {
  User,
  sequelize,
};
