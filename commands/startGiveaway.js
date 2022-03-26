const db = require("quick.db")
const Embed = require("../tools/embed.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const ms = require("ms")
module.exports = {
data: new SlashCommandBuilder()
  .setName("çekiliş")
  .setDescription("Çekiliş yaparsınız.")
  .addStringOption(option =>
		option.setName('ödül')
			.setDescription('Çekilişin ödülü.')
			.setRequired(true)
                  ) 
  .addStringOption(option =>
		option.setName('süre')
			.setDescription('Çekilişin süresi.')
			.setRequired(true)
                  )
  .addIntegerOption(option => 
    option.setName("kazanan-sayısı")
			.setDescription('Çekilişi kazanacak kişi sayısı.')
			.setRequired(true)
)

,execute(interaction, client) {
  let row = new Discord.MessageActionRow()
  .addComponents(
  new Discord.MessageButton()
    .setCustomId("katıl")
    .setEmoji("🎉")
    .setLabel("") 
    .setStyle("SUCCESS")
  )
    let time = ms(interaction.options.getString("süre"))
    let dctime = `${((Date.now() + time) / 1000).toString().split(".")[0]}`
    let ödül = interaction.options.getString("ödül")
    let kazanan = interaction.options.getInteger("kazanan-sayısı")
if(isNaN(time)) return interaction.reply({embeds: [Embed("Girdiğin süre düzgün bir süre değil.","Süreleri ingilizce formatta girmeniz gerekmektedir.\nÖrnek:\n1day = 1 gün","warn")], ephemeral: true})
let kanal = interaction.channel
let siu = Embed(":tada: Yeni çekiliş! :tada:",`**${ödül}** kazanmak istiyorsan butona tıkla!`,"info", "no")
.addField(client.emoji("dot")+" | Çekiliş Süresi:", ` <t:${dctime}:R>(<t:${dctime}:D>)`) 
.addField(client.emoji("dot")+" | Kazanan Sayısı:", kazanan.toString()) 
.addField(client.emoji("dot")+" | Sponsor:", interaction.user.toString())
interaction.reply({content: "Çekiliş bu kanalda başlatıldı. ", ephemeral:true})
kanal.send({ 
  content: "**:tada: Yeni çekiliş :tada:**",
  embeds: [siu],
  components: [row]
}).then(data => {
db.push("giveaways", {channel: kanal.id, msg: data.id, winners_count: kazanan, prize: ödül, time: (Date.now() + time)})
}).catch(err => {
interaction.followUp({content: "Çekiliş bir hata çıktığı için başlatılamadı.", ephemeral: true})
console.log(err)
})
}
}