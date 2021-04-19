const { createLogger, format, transports } = require('winston');

const { combine, timestamp, simple, json, colorize = true } = format;
const { datetimeNow } = require('../utils/current');

/**
 * logger instance
 * @returns {LoggerInstance} winLogger
 */

const timezonedTime = () => {
  return datetimeNow();
};

const logger = createLogger({
  format:  combine(timestamp({ format: timezonedTime }), colorize(), simple(), json()),
  transports: [
    new transports.Console({
      colorize: true,
    }),
    new transports.File({
      filename: 'bot.log',
       maxSize: '50m',
      maxFiles: '20d',
      eol: '\r\n'
   }),
  ],
});

module.exports = {
  logger,
}; 
