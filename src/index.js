
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client();
const mongodb = require('../src/utils/mongodb');
require('dotenv').config();

(async () => {
  // client.commands = new Map();
  // client.events = new Map();
  // client.prefix = config.prefix;
  // await registerCommands(client, '../commands');
  // await registerEvents(client, '../events');
  // await client.login(process.env.DISCORD_TOKEN);
  await mongodb.updateMapping('hello', 30);
})();