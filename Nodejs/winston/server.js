const logger = require("./configs/logger");

if (logger) {
  logger.info("This is an info message");
  logger.error("This is an error message");
  logger.warn("This is a warning message");
  logger.debug("This is a debug message\n");
} else {
  console.log("Logger is not configured for production environment.");
}
