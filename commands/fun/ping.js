module.exports = {
  name: 'ping',
  args: false,
  guildOnly: true,
  description: 'Ping!',
  execute(message, args) {
    message.channel.send('Pong.');
  },
};
