require('dotenv').config();
const BotService = require('./service/bot-service');

const botService = new BotService();

botService.initialize();
