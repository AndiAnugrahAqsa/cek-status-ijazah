// config.js
import dotenv from "dotenv"
dotenv.config();
const config = {
  saltRounds: parseInt(process.env.SALT_ROUNDS),
  tokenKey: process.env.TOKEN_KEY,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  port: process.env.PORT,
};

export default config