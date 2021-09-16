require('dotenv').config();

const { spawn } = require('child_process');
const { schedule } = require('node-cron');

schedule(process.env.SCHEDULE_TIME, () => {
  spawn('node', ['src/tasks/bot-task.js'], {
    stdio: 'inherit',
  });
}); // run every 24 hours -> https://crontab.cronhub.io
