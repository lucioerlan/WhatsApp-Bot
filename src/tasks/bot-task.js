const { logger } = require('../utils/logger');
const BotStart = require('../facades/bot-facade');

class Application {
  static async start() {
    try {
      logger.info('Application in execution');

      BotStart.initialize();
    } catch (err) {
      logger.error(err);
    }
  }
}

Application.start();
