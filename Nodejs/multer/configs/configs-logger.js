const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const configLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(
      format.colorize(),
      format.json(),
      label({ label: "winston logger" }),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      myFormat
    ),
    //defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),

     // Write error logs to error.log
    new transports.File({ filename: 'logs/error.log', level: 'error' }),

    // Write all logs to combined.log
    new transports.File({ filename: 'logs/combined.log' }),
    ],
  });
};

module.exports = configLogger;
