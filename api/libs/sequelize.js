const { Sequelize } = require("sequelize");
const { config } = require("../../config/config");
const setupModels = require("../db/models")

let URI = "";
const options = {
  dialect: "postgres",
  logging: true,
};

if(config.isProd){
  URI = config.dbUrl;// + "?sslmode=require";

  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const sequelize = new Sequelize(URI , options);

/* const sequelize = new Sequelize(config.dbName, USER, PASSWORD, {
  dialect: 'postgres',
  dialectOptions: {
    // Your pg options here

  }
}); */

setupModels(sequelize);

//sequelize.sync();

module.exports = sequelize;
