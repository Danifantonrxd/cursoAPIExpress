require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  isProd: process.env.NODE_ENV === "production",

  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,

  emailAdmin: process.env.EMAIL_ADMIN,
  emailPassword: process.env.EMAIL_PASSWORD,

  port: process.env.PORT || 5432,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.POSTGRES_URL
}

module.exports = {
  config
}
