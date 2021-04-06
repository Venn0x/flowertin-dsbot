const fs = require('fs');
const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const { prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const token = process.env.TOKEN;

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
});

client.once('ready', () => console.log('Bot running!'));
client.login(token);

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  try {
    client.commands.get(commandName).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});
