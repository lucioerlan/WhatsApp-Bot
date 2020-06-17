describe('Suite case', () => {

    beforeAll(async () => {
      try {
        await page.goto('https://web.whatsapp.com/')
      } catch (e) {
        console.error(e);
      }
    });
  
    it ('I hope you render', async () => {
      const container = await page.evaluate(() => (
        document.querySelector('_2wP_Y')
      ));
      expect(container).not.toBeUndefined();
    });
  
  });