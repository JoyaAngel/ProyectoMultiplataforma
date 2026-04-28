const { Sequelize } = require('sequelize');

const username = "postgres";
const password = "230919";
const host = "localhost";

const sequelize = new Sequelize("proyecto", username, password, {
  host: host,
  dialect: 'postgres',
});

module.exports = {
  sequelize
};