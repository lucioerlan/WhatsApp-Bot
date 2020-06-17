module.exports = {
  apps: [
    {
      name: 'WHATSAPP_BOT',
      script: './src/index.js',
      instances: 1,
      autorestart: true,
      watch: true,
    },
  ],
};
