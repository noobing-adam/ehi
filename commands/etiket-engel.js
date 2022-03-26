const { SlashCommandBuilder } = require("@discordjs/builders")
const db = require("quick.db")
const Embed = require("../tools/embed.js")
module.exports = {
  data: new SlashCommandBuilder()
  .setName("etiket-engel")
  .setDescription("Etiket engele birilerini eklersiniz.")
  .addStringOption(o => 
                  o
                   .setName("işlem")
                   .setDescription("Yapılacak işlem.")
                   .addChoice("ekle", "ekle")
                   .addChoice("çıkar", "çıkar")
                   .addChoice("listele", "listele")
                   .setRequired(true)
                  )
  .addUserOption(o => 
                o
                 .setName("eklenecek-kullanıcı")
                .setDescription("Eklenecek veya Çıkarılacak kişi.")        
                ),
   execute(interaction, client) {
if(!require("../ayarlar.json").owners.includes(interaction.user.id)) return interaction.reply("Bu komut bir kaç günlüğüne es geçilmiştir!!!")
      var etiketengelarray = db.fetch("etiket_engel_" + interaction.guild.id)
    let işlem = interaction.options.getString("işlem")
    let member = interaction.options.getUser("eklenecek-kullanıcı")
    if(işlem == "ekle") {
      if(!db.fetch("etiket_engel_" + interaction.guild.id))db.set("etiket_engel_" + interaction.guild.id, ["for an array error", "for an array error"], )
      interaction.reply({ embeds: [Embed(`${client.emoji("tik")} | İşlem başarılı!`, `İşlem başarılı. ${member} kullanıcısı listeye eklendi. Artık bir kişi bu kullanıcıyı etiketleyince, susturma çarpanına göre susturma uygulayacağım.`)]})
    db.push("etiket_engel_" + interaction.guild.id, member.id)
    } else if(işlem == "çıkar") {
let i = 1
let array = []
      db.fetch("etiket_engel_" + interaction.guild.id).filter(x => x !== "for an array error" || x !== "for an array error").forEach(xx => {
array.push(`${i}. kişi: <@${xx}>`)
i++
      })
     setTimeout(() => {   
      interaction.reply({ embeds: [Embed("Kimi çıkartacaksınız?", `${array.join("\n")} \n Bu listeye bakarak kimi çıkaracağına karar verebilirsin. Karar verince, chate kaçıncı kullanıcıyı çıkartmak istediğinizi yazın.`)]})
let filter = {filter: x => x.author.id == interaction.user.id, max: 1, time: 60000, errors: ["time"]}
interaction.channel.awaitMessages(filter).then(c => {
let msg = c.first()
if(isNaN(msg.content))return interaction.followUp("Yazdığın yazı bir sayı olmadığı için işlem iptal edildi.")
if(!etiketengelarray[eval(msg.content-1)]) return interaction.followUp("O numaraya sahip bir kullanıcı bulunamadı.")
let oser = etiketengelarray[msg.content-1]
etiketengelarray = etiketengelarray.filter(x => x !== etiketengelarray[msg.content-1])
db.set("etiket_engel_" + interaction.guild.id, etiketengelarray)
interaction.followUp({embeds: [Embed("İşlem başarılı başarıyla kişi etiket engel listesinden çıkarıldı","artık biri <@" + oser + "> kişisine etiket spamı yapınca ceza vermeyeceğim.","info")]})
}).catch(err => {interaction.followUp("Bir mesaj yazmadığın veya kodda bir hata çıktığı için işlem iptal edildi.")})
     }, 50) 
    } else if(işlem == "listele"){
let i = 1
let array = []
      db.fetch("etiket_engel_" + interaction.guild.id).filter(x => x !== "for an array error" || x !== "for an array error").forEach(xx => {
array.push(`${i}. kişi: <@${xx}>`)
i++
      })
     setTimeout(() => {   
      interaction.reply({ embeds: [Embed("Kişiler listeleniyor.", `${array.join("\n")} `,"info")]})
     }, 50)
}
  }
}