module.exports = {
  name: 'serverinfo',
  args: false,
  guildOnly: true,
  description: 'Sends server info',
  execute(message, args) {
    const Discord = require('discord.js');
    const Embed = new Discord.MessageEmbed();
    //To add info for server
    Embed.setImage(message.channel.guild.bannerURL());
    console.log(message.channel.guild.bannerURL());
    message.channel.send(Embed);
  },
};
