module.exports = {
  name: 'avatar',
  args: false,
  guildOnly: false,
  description: 'Sends user avatar',
  async execute(message, args) {
    if (message.author.id === '710985034726637611') return;
    await message.channel.send(message.author.avatarURL());
  },
};
