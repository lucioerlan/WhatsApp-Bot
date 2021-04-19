const { downloadImg } = require('../resources/resp-page');
const { setup } = require('../config/setup');
const {
  Pinterest,
  Whatsapp,
  Group,
  Attach,
  Image,
  Message,
  Submit,
} = require('../utils/selectors');
const { scrollTo } = require('../resources/scroll-to');

/**
 * The BotService Class.
 *
 * @method initialize puppeteer configuration
 * @method image download images
 * @method link open whatsapp
 * @method send image and message
 */


class BotService {
  constructor() {
    this.counter = 0;
  }

  async initialize() {
    const browser = await setup();
    const [page] = await browser.pages();

    this.image(page);
  }

  async image(page) {
    await page.goto(Pinterest);

    await downloadImg(page);
    await page.evaluate(scrollTo);

    this.link(page);
  }

  async link(page) {
    await page.goto(Whatsapp);
    await page.waitForSelector(Group);
    await page.click(Group);

    await page.waitForSelector(Attach);
    await page.click(Attach);

    this.send(page);
  }

  async send(page) {
    const fileInput = await page.$(Image);
    await fileInput.uploadFile(
      `${process.env.IMAGES}-${(this.counter += 1)}.jpg`
    );

    await page.waitForSelector(Message);
    await page.type(Message, 'Bom dia Familia 💕');

    await page.click(Submit);
  }
}


module.exports = BotService;
