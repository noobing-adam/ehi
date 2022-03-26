const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const ms = require("ms")
const Embed = require("../tools/embed.js")
const db = require("quick.db")
const moment = require("moment")
require("moment-duration-format")
module.exports = {
data: new SlashCommandBuilder()
    .setName("end")
    .setDescription("Çekilişi bitirirsiniz.")
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
if(gw.time < Date.now()) return err("Çekiliş zaten bitmiş.")
if(db.fetch("gw_"+gw.msg)) return err("Çekiliş zaten bitmiş.")
setTimeout(async() => {
db.set("gw_"+gw.msg, true)
interaction.reply({content: "Çekiliş başarıyla bitirildi."})
let msg = await interaction.channel.messages.fetch(gw.msg).catch(err => {return gw.channel.send("Bu kanaldaki " + gw.prize + " çekilişi bitirilmeye çalışıldı ama mesaj bulunamadı.")})
let users = db.fetch("users_" + gw.msg)
let wnrs = []
if(!users || users == []) return msg.reply("Çekilişe hiçbir kişi katılmadığı için çekiliş iptal edildi.")
if(users.length < gw.winner_count) return msg.reply("Çekilişe yeterli katılım yapılmadığı için çekiliş iptal edildi.")
let i = 1
users.forEach(user => {
if(i > gw.winnerCount) return;
user = users[Math.floor(Math.random() * users.length)]
wnrs.push(user)
users = users.filter(x => x!==user)
i++
}) 

setTimeout(async() => {
msg.reply(":tada: Çekiliş Bitti :tada:\n" + wnrs.map(x => `<@${x}>`) + " kişileri **" + gw.prize + "** kazandı.")
}, 10)
}, 1)

} 
}  