const { downloadImg } = require('../resources/download-img');
const { infiniteScroll } = require('../resources/infinite-scroll');
const {
  Pinterest,
  Whatsapp,
  Group,
  Attach,
  Image,
  Message,
  Submit,
} = require('../utils/selectors');

/**
 * The BotService Class.
 *
 * @method image download images
 * @method link open whatsapp
 * @method send message group
 */

class BotService {
  constructor() {
    this.counter = 0;
  }

  async image(page) {
    await page.goto(Pinterest);

    await downloadImg(page);
    await page.evaluate(infiniteScroll);

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


module.exports = new BotService;
