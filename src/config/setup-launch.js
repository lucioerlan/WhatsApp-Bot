const puppeteer = require('puppeteer');
const { join } = require('path');

const setup = async () => {
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === 'production',
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    slowMo: 50,
    userDataDir: join(process.cwd(), 'ChromeSession'),
    args: [
      '--no-default-browser-check',
      '--no-sandbox',
      '--no-experiments',
      '--disable-infobars',
      '--disable-web-security',
      '--disable-site-isolation-trials',
      '--disable-extensions',
      '--disable-default-apps',
      '--disable-notifications',
      '--ignore-gpu-blacklist',
      '--ignore-certificate-errors',
      '--ignore-certificate-errors-spki-list',
      '--enable-features=NetworkService',
      '--log-level=3',
      '--disable-setuid-sandbox',
      '--window-size=720,1020',
      '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36',
    ]
  });

  return browser;
};

module.exports = {
  setup,
};
