const dotenv = require("dotenv");
dotenv.config();

const config = {
  app: {
    port: process.env.PORT || 4000,
  },
  database: {
    url: process.env.MONGO_URI,
  },
  security: {
    jwtSecret: process.env.JWT_SECRET || "defaultsecret",
    jwtExpiryIn: process.env.JWT_EXPIRES_IN || "24h",
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  mailService: {
    userName: process.env.SMTP_USER,
    passWord: process.env.SMTP_PASS,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
  },
  queue: {
    attempts: 3,   // Retry limit
    backoff: 5000  // Retry delay in ms
  },
};

export default config;
