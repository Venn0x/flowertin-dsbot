const Discord = require('discord.js');
module.exports = {
  name: 'server-info',
  args: false,
  guildOnly: true,
  description: 'Sends server info',
  execute(message, args) {
    const serverInfoEmbed = new Discord.MessageEmbed();
    let serverDescription = message.member.guild.description;

    if (serverDescription === null) serverDescription = 'None';

    serverInfoEmbed
      .setColor('GOLD')
      .setAuthor(message.member.guild.name, message.member.guild.bannerURL())
      .setDescription('***Server info***')
      .addFields(
        {
          name: '`Member count`',
          value: `**${message.member.guild.memberCount}**`,
        },
        {
          name: '`Server description`',
          value: `**${serverDescription}**`,
        }
      );

    message.channel.send(serverInfoEmbed);
  },
};
