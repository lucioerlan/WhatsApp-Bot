const puppeteer = require('puppeteer');
const selector = require('../utils/selectors');
const cron = require('node-cron');
require('colors');

console.log(`
    ${'Created By  : Erlan Lucio'.magenta}
    ${'Version     : 0.1'.yellow}
    ${'Description : Service that sends a photo of good morning in the family group'.green}
                  
`.red);
console.log(` ${'>>'.yellow} Service started runs from Monday to Friday at 7 AM` + '\n');


let counter = 0;
const task = cron.schedule('0 7 * * Monday-Friday', async function fn() {
   //will run at 7:00 AM - Monday,Friday

  if (counter >= 6000) {
    task.stop();
  }

  (async () => {
    try {
      const browser = await puppeteer.launch({
        headless: false,
        userDataDir: './user_data_whatsapp',
        ignoreHTTPSErrors: true,
        defaultViewport: null,
        args: [
          '--log-level=3',
          '--no-default-browser-check',
          '--disable-infobars',
          '--disable-web-security',
          '--disable-site-isolation-trials',
          '--no-experiments',
          '--ignore-gpu-blacklist',
          '--ignore-certificate-errors',
          '--ignore-certificate-errors-spki-list',
          '--disable-gpu',
          '--disable-extensions',
          '--disable-default-apps',
          '--enable-features=NetworkService',
          '--disable-setuid-sandbox',
          '--no-sandbox',
          '--window-size=900,650',
        ],
      });
      const page = await browser.newPage();
      await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36'
      );
      await page.goto(selector.whatsappLink);

      const myInterval = setInterval(async () => {
        if ((await page.waitForSelector(selector.clickGroup)) !== null) {
          await page.click(selector.clickGroup);

          await page.waitForSelector(selector.clickAttach);
          await page.click(selector.clickAttach);
          await page.setBypassCSP(true);

          await page.waitForSelector(selector.uploadImage);
          const fileInput = await page.$(selector.uploadImage);
          await fileInput.uploadFile(`src/images/image-${counter++}.jpg`);

          await page.waitForSelector(selector.sendMessage);
          await page.type(selector.sendMessage, 'Bom dia Familia!!');
          await page.keyboard.press('Enter');
          await page.waitFor(5000);
        }

        if (await page.$('div._1l3ap')) {
          console.log('Message not sent, we will try again in 50 seconds'.red);
        } else {
          clearInterval(myInterval);
          console.log('Message sent successfully'.green);
          await browser.close();
        }
      }, 50000);

    } catch (error) {
      console.log(error);
    }
  })();

  return fn; 
  }).start();