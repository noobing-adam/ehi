const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const ms = require("ms")
const Embed = require("../tools/embed.js")
const db = require("quick.db")
const moment = require("moment")
require("moment-duration-format")
module.exports = {
data: new SlashCommandBuilder()
    .setName("reroll")
    .setDescription("Çekiliş kazananını yeniden belirlersiniz")
    .addStringOption(option => 
  option.setName("çekiliş")
  .setDescription("Çekilişin ödülü ya da çekiliş mesajının id'sini giriniz.")
  .setRequired(true) 
)
,execute(interaction, client) {
  let err = asd => interaction.reply({embeds: [Embed(`${client.emoji("carpi")} | Hata!`, asd, "warn", "no")]})
let girilen = interaction.options.getString("çekiliş")
let gw = db.fetch("giveaways").find(x => x.msg == girilen || (x.prize == girilen && x.channel == interaction.channel))
if(!gw)  return err("Böyle bir çekiliş bulunamadı.") 
if(gw.time > Date.now()) return err("Çekiliş daha bitmemiş.")
  if(!db.fetch("users_" + gw.msg) || db.fetch("users_" + gw.msg).length < 1) return err("Bu çekilişe kimse katılmamış.")
  let users = db.fetch("users_" + gw.msg)
  let random = users[Math.floor(Math.random() * users.length)]
interaction.reply(`**:tada:Reroll Atıldı:tada:**\nYeni kazanan(lar), ${interaction.guild.members.cache.get(random).toString()} olarak belirlendi.`)
} 
}  