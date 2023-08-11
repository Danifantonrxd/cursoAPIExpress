require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  port: process.env.PORT || 5432,
  dbUser: process.env.POSTGRES_USER,
  dbPassword: process.env.POSTGRES_PASSWORD,
  dbHost: process.env.POSTGRES_HOST,
  dbName: process.env.POSTGRES_DATABASE,
  dbPort: process.env.DB_PORT,
}

module.exports = {
  config
}
