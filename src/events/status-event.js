const { client } = require('../bot.js');

// logging to the console if the bot is ready
client.once('ready', () => {
  logger.log('info', 'Ready!');
});

client.on('error', err => logger.log('error', err));

client.login(process.env.TOKEN);