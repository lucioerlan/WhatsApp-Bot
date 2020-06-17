const fs = require('fs');
const puppeteer = require('puppeteer');
const cron = require('node-cron');
const selector = require('../utils/selectors');
require('colors');
require('dotenv').config();


console.log(`
    ${'Created By  : Erlan Lucio'.magenta}
    ${'Version     : 0.1'.yellow}
    ${'Description : Service that downloads all good morning images'.green}
                  
`.red);
console.log(` ${'>>'.yellow} Service Started service runs from month to month on the first day` + '\n');


cron.schedule('0 0 1 * *', async function fn() {
  // will run 12:00AM on the first of every month
  
    (async () => {
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: './user_data_pinterest',
        args: ['--window-size=900,650',],
      });
      const page = await browser.newPage();
      
      let counter = 0;
      page.on('response', async (response) => {
        const matches = /.*\.(jpg)$/.exec(response.url());
        if (matches && matches.length === 2) {
          const extension = matches[1];
          const buffer = await response.buffer();
          fs.writeFileSync(
            `src/images/image-${counter}.${extension}`,
            buffer,
            'base64',
            console.log(`Image Saved Successfully! ${response.url()}`.yellow)
          );
          counter += 1;
        }
      });

      
      async function scrollToBottom() {
        await new Promise((resolve) => {
          const distance = 100;
          const delay = 300;
          const timer = setInterval(() => {
            document.scrollingElement.scrollBy(0, distance);
            if (
              document.scrollingElement.scrollTop + window.innerHeight >=
              document.scrollingElement.scrollHeight
            ) {
              clearInterval(timer);
              resolve();
            }
          }, delay);
        });
      }

      await page.goto('https://br.pinterest.com/raimunda5181/bom-dia');

      if (await page.$(selector.submitPinterest)) {

      await page.click(selector.submitPinterest);
      await page.type(selector.emailPinterest, process.env.EMAIL_PINTEREST);
      await page.type(selector.passwordPinterest, process.env.PASSWORD_PINTEREST);
      await page.keyboard.press('Enter');
      await page.waitFor(10000);
      await page.evaluate(scrollToBottom);
      await browser.close();

      } else {

      await page.waitFor(5000);
      await page.evaluate(scrollToBottom);
      await browser.close();
      
      }

    })();

  return fn; 
  }).start();
