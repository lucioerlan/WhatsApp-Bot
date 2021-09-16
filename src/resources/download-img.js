const { join } = require('path');
const { existsSync, mkdirSync, writeFileSync } = require('fs');
const { logger } = require('../utils/logger');

/**
 * download images Pinterest
 * @function {downloadImg}
 */

const downloadImg = (page) => {
  let count = 0;

  page.on('response', async (res) => {
    const matches = /.*\.(jpg)$/.exec(res.url());

    if (matches && matches.length === 2) {
      const ext = matches[1];
      const buffer = await res.buffer();
      const folder = join(process.env.IMAGES);

      if (!existsSync(folder)) return mkdirSync(folder, { recursive: true });

      writeFileSync(
        `${folder}-${count}.${ext}`,
        buffer,
        'base64',
        logger.info(`Image Saved! ${res.url()}`)
      );
      count += 1;
    }
  });
};

module.exports = {
  downloadImg,
};
