module.exports = {
  name: "ping",
  aliases: ["pong", "latency"],
  category: "Utility",
  description: "Botun pingini kontrol edin!",
  run: async (client, message, args) => {
    const msg = await message.channel.send(`🏓 Ping...`);

    const pingEmbed = new client.discord.MessageEmbed()
      .setTitle(':signal_strength: Bot Ping')
      .addField("Zaman", `${Math.floor(msg.createdAt - message.createdAt)}ms`, true)
      .addField("Ping", `${client.ws.ping}ms`, true)
      .setColor(client.config.embedColor)
      .setFooter(client.config.embedfooterText, client.user.avatarURL());

    await message.reply({embeds: [pingEmbed], allowedMentions: {repliedUser: false}});

    msg.delete();
  },
};
