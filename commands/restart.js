const { SlashCommandBuilder} = require("@discordjs/builders")
const Embed = require("../tools/embed.js")
module.exports = {
  
  data: new SlashCommandBuilder()
  .setName("restart")
  .setDescription("Botu kapatıp açar."),
 execute(interaction, client) {
if(require("../ayarlar.json").owners.includes(interaction.user.id))
  interaction.reply({ embeds: [Embed("", `${client.emoji("tik")} | Bot kapanıp açılıyor...`)]})
  setTimeout(() => process.exit(0), 3000)
  client.on('ready', async () => {
  await  interaction.channel.send("Bot açıldı!")
  })
  
}
  
}