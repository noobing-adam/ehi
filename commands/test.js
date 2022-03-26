const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
  data: new SlashCommandBuilder()
  .setName("test")
  .setDescription("test")
  , execute(interaction, client) {
    interaction.reply("asdasd")
    
  }
}