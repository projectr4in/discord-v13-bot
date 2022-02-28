const {readdirSync} = require("fs");

module.exports = {
  name: "help",
  aliases: ["h", "commands"],
  usage: '!help <komut>',
  category: "Bot",
  description: "Tüm komutları veya belirli bir komutu döndürün!",
  run: async (client, message, args) => {
    const row = new client.discord.MessageActionRow()
	.addComponents(
	new client.discord.MessageButton()
          .setLabel("GitHub")
          .setStyle("LINK")
          .setURL("https://github.com/projectr4in"),
        new client.discord.MessageButton()
          .setLabel("Support")
          .setStyle("LINK")
          .setURL("https://r4in.glitch.me/")
    );
    
    if (!args[0]) {

      const botCommandsList = [];
      readdirSync(`./commands/Bot`).forEach((file) => {
        const filen = require(`../../commands/Bot/${file}`);
        const name = `\`${filen.name}\``
        botCommandsList.push(name);
      });

      const utilityCommandsList = [];
      readdirSync(`./commands/Utility`).forEach((file) => {
        const filen = require(`../../commands/Utility/${file}`);
        const name = `\`${filen.name}\``
        utilityCommandsList.push(name);
      });

      const helpEmbed = new client.discord.MessageEmbed()
        .setTitle(`${client.user.username} Yardim`)
        .setDescription(` Merhaba **<@${message.author.id}>**, Ben <@${client.user.id}>. \nKomutlar hakkında daha fazla bilgi görmek için \`!help <command>\` komutunu kullanabilirsiniz!\n**Toplam Komutlar:** ${client.commands.size}\n**Total SlashCommands:** ${client.slashCommands.size}`)
        .addField("🤖 - Bot Komutları", botCommandsList.map((data) => `${data}`).join(", "), true)
	.addField("🛠 - Diğer Komutlar", utilityCommandsList.map((data) => `${data}`).join(", "), true)
        .setColor(client.config.embedColor)
        .setFooter(client.config.embedfooterText, client.user.avatarURL());
      
      message.reply({embeds: [helpEmbed], allowedMentions: {repliedUser: false}, components: [row]});
    } else {
      const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

      if (!command) {
        message.reply({content: `"${args[0]}" adinda herhangi bir komut yok.`, allowedMentions: {repliedUser: false}});
      } else {

        let command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
        let name = command.name;
        let description = command.description || "Kategori belirtilmedi!"
        let usage = command.usage || "Kategori belirtilmedi!"
        let aliases = command.aliases || "Kategori belirtilmedi!"
        let category = command.category || "Kategori belirtilmedi!"

        let helpCmdEmbed = new client.discord.MessageEmbed()
          .setTitle(`${client.user.username} Help | \`${(name.toLocaleString())}\` Command`)
          .addFields(
            { name: "Aciklama", value: `${description}` },
            { name: "Kullanim", value: `${usage}` },
            { name: "Komut", value: `${aliases}` },
            { name: 'Kategori', value: `${category}` })
          .setColor(client.config.embedColor)
          .setFooter(client.config.embedfooterText, client.user.avatarURL());
        
        message.reply({embeds: [helpCmdEmbed], allowedMentions: {repliedUser: false}});
      }
    }
  },
};
