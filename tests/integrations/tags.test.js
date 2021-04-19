const { baseUrl } = require('../fixtures/config');

beforeAll(async () => {
  await page.goto(baseUrl);
});

describe('Test turned off', () => {
  test('Logout', async () => {
    const container = await page.evaluate(() =>
      document.querySelector('_2wP_Y')
    );
    expect(container).not.toBeUndefined();
  });
});

describe('Test header and title of the page', () => {
  test( 'Title of the page', async () => {    
    const title = await page.title();
      expect(title).toBe('WhatsApp');
    });
});

describe('test page description exists', () => {
  test('description of the page', async () => {
    const title = await page.evaluate(
      (el) => el.innerHTML,
       await page.$('.landing-title._24CXv')
    );
    expect(title).toBe('To use WhatsApp on your computer:');
  });
});
