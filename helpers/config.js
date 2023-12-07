import dotenv from "dotenv"

dotenv.config();

const config = {
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
  TOKEN_KEY: process.env.TOKEN_KEY,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.PORT,
};

export default config