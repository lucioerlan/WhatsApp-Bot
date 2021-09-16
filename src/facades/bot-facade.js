const BotService = require('../services/bot-service');
const { setup } = require('../config/setup-launch');

/**
 * The BotFacade Class.
 *
 * @method initialize puppeteer launch
 */

class BotFacade {
  async initialize() {
    const browser = await setup();
    const [page] = await browser.pages();

    return BotService.image(page);
  }
}

module.exports = new BotFacade;
