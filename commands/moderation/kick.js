const Discord = require('discord.js');
module.exports = {
  name: 'kick',
  description: 'Tag a member and kick them.',
  args: true,
  guildOnly: true,
  execute(message, args) {
    //  Checks for tagged user.
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to kick them!');
    }
    // Check if member has permission.
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.channel.send('You have no permission to do that.');
    }

    const taggedUser = message.mentions.members.first();

    //  Constructs reason.
    const reasonArray = args;
    reasonArray.shift();
    const reason = reasonArray.length === 0 ? 'No reason stated' : reasonArray.join(' ');

    // Check if user can kick the tagged user
    const roleCheck = message.member.roles.highest.comparePositionTo(
      taggedUser.roles.highest
    );
    if (!roleCheck) return message.channel.send("You can't kick this user.");
    if (!taggedUser.kickable) {
      return message.channel.send("I can't kick this user.");
    }

    const kickMessage = new Discord.MessageEmbed();
    kickMessage
      .setColor('#AD1457')
      .setTitle('Moderation notice')
      .setDescription(`Kick message`)
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .addFields(
        { name: '`Reason`', value: `**${reason}**`, inline: true },
        {
          name: '`Kicked user`',
          value: `***__${taggedUser.user.username}__***`,
          inline: true,
        }
      )
      .setTimestamp();
    //  TODO: Add MongoDB connection to save moderation notices.
    return taggedUser.kick(reason).then(message.channel.send(kickMessage));
  },
};
