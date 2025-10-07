// logger.js
const configLogger = require("./configs-logger");

let logger = configLogger(); // always create

if (process.env.NODE_ENV === "production") {
  // remove console transport in prod, only use files
  logger.clear();
  //   logger.add(new (require('winston').transports.File)({ filename: 'prod.log' }));
}

module.exports = logger;
