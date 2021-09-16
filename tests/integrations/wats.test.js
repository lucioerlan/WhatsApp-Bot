const { baseUrl } = require('../fixtures/config');

beforeAll(async () => {
  await page.goto(baseUrl);
});

describe('wats-puppeteer', () => {
  
  test('Title of the page', async () => {
    const title = await page.title();
    expect(title).toBe('WhatsApp');
  });

  test('Should have a title header', async () => {
    const title = await page.$('.landing-headerTitle');
    const desc = await title.evaluate((item) => item.innerText);
    expect(desc).toBe('WHATSAPP WEB');
  });

  test('Page is loaded', async () => {
    const loaded = await page.evaluate(() => document.readyState);
    expect(loaded).toBe('complete');
  });
});

test('canvas watsapp screenshot', async () => {
  const image = await page.screenshot();
  expect(image).toBeDefined();
});

test('Canvas should have height', async () => {
  const canvas = await page.$('canvas');
  const height = await canvas.evaluate((item) => item.height);
  expect(height).toBe(264);
});

test('Should have a input field', async () => {
  const input = await page.$('input');
  expect(input).toBeDefined();
});

test('Should have a button', async () => {
  const button = await page.$('button');
  expect(button).toBeDefined();
});

test('Should have a button checkbox', async () => {
  const title = await page.$('._2lolS');
  const desc = await title.evaluate((item) => item.innerText);
  expect(desc).toBe('Manter este aparelho conectado');
});

test('Should have a input field', async () => {
  const input = await page.$('input[name=identifier]');
  expect(input).toBeDefined();
});
