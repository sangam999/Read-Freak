const dotenv = require('dotenv');

const env = dotenv.config();

if (!env) {
    throw new Error("Cannot find .env file");
}

export default {
    port : process.env.PORT,
    DB_URL : process.env.DB_URL  ,
    JWT_KEY : process.env.JWT,
    JWT_ALGO : process.env.JWT_ALGO,

}