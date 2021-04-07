/* eslint-disable consistent-return */
const fs = require('fs');
const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const { prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const token = process.env.TOKEN;

const commandFolders = fs.readdirSync('./commands');

commandFolders.forEach((folder) => {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith('.js'));

  commandFiles.forEach((file) => {
    const commandPath = `./commands/${folder}/${file}`;
    const command = require(commandPath);

    client.commands.set(command.name, command);
  });
});

client.once('ready', () => console.log('Bot running!'));
client.login(token);

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  //  Checks if command exists.
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  //  Checks if command is allowed to run in DMs or not, and sends a message accordingly.
  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply("I can't execute that command inside DMs!");
  }

  //  Checks if command requires arguments.
  if (command.args && !args.length) {
    let reply = "You didn't provide any arguments.";
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.reply(reply);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});
