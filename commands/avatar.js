module.exports = {
  name: 'avatar',
  description: 'Sends user avatar',
  async execute(message, args) {
    await message.channel.send(message.author.avatarURL());
  },
};
