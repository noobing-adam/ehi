let Discord;
let i = 0
let bot = "kapalı"
const cmd = require("node-cmd") 
try{
Discord = require("discord.js")
} catch(err){
i = 1
console.error(err)
console.log("Abicim node:events hatası alıyorum 2 dk ye düzeltip gelcem") 
cmd.run("npm i node@16.x discord.js") 
setTimeout(() => {
process.exit(0)
}, 120000)
}
if(i == 0){
const db = require("quick.db")
const fs = require("fs")
const app = require("express")()
let Embed = require("./tools/embed.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const client = new Discord.Client({intents: 32767}) 
Object.prototype.setYenilikler = function(options){
 let { yenilik } = options
  if(typeof options !== "object") throw new TypeError("Yanlış ayarlar tipi, bir *obje* belirtin.")
  if(!yenilik) throw new Error("Bir yenilik belirtmelisiniz.")
 client.yenilikler.set(this.commandName, { yenilik: yenilik, time: (Date.now() / 1000).toString().split(".")[0] })
db.set(this.commandName, { yenilik: yenilik, time: (Date.now() / 1000).toString().split(".")[0] })
  }
client.on("ready", () => {
	console.log(client.user.username + " Adı ile giriş yapıldı.")
})
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
let inject = (x,xx) => fs.readdirSync(x).filter(a => a.endsWith(".js")).forEach(sys => xx.push(sys))

//Handler
client.commands = new Discord.Collection()
const commandArray = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const clientId = '940298930552438814';
const guildId = '939970119193481246';
client.yenilikler = new Discord.Collection()
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
if(db.fetch(command.data.name)) client.yenilikler.set(command.data.name, {yenilik: "Belirtilmedi", time: (Date.now() / 1000).toString().split(".")[0]})
}

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command)
let interaction = {commandName: command.data.name} 
if(!db.fetch("düzenleme_" + interaction.commandName)){
db.set("düzenleme_" + interaction.commandName, command.execute.toString())
   interaction.setYenilikler({
      yenilik: "Belirtilmedi."
   })
} else {
if(command.execute.toString() !== db.fetch("düzenleme_" + interaction.commandName)){
   interaction.setYenilikler({
      yenilik: "Belirtilmedi."
   })
db.set("düzenleme_" + interaction.commandName, command.execute.toString())
console.log(interaction.commandName + " komutu editlendi.") 
} 
}
commandArray.push(command.data.toJSON())
}
commandArray.push(new SlashCommandBuilder().setName("embed").setDescription("Embed oluşturursunuz.").toJSON())
//Events
	let eventfunction = (event) => require(`./events/${event}`)(client)
fs.readdirSync("./events").filter(file => file.endsWith(".js")).forEach(event => {

	eventfunction(event)
})
  fs.readdirSync("./guards").filter(x => x.endsWith(".js")).forEach(xx => require("./guards/"+xx)(client))
  require("./tools/emoji.js")(client)
  require("./tools/form.js")(client)

  
  
const rest = new REST({ version: '9' }).setToken(process.env.token);

(async () => {
	try {
		console.log('Slash (/) komutları yüklenmeye başlandı.');
			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commandArray },
			).catch(err => {console.error(err)})
		
				console.log('Slash (/) komutları başarıyla yüklendi.');
	} catch (error) {
		console.error(error);
	}
})();
//interactionCreate.js
client.on("interactionCreate", async interaction => {
	if(!interaction.isCommand()) return

	const command = client.commands.get(interaction.commandName)
	if(!command) return

	try{
		await command.execute(interaction, client) 
	}
	catch(err) {
		interaction.reply("Komutta bir hata oluştu.").catch(err => interaction.channel.send(interaction.user.toString() + " komutta bir hata oluştu."))
		console.error(err)
	}
})
setInterval(() => {
let kanallar = [client.channels.cache.get("944958618988609556"), client.channels.cache.get("944958567952289853")]
kanallar[0].setName("Üye Sayısı • " + kanallar[0].guild.members.cache.filter(x => !x.user.bot).size)
kanallar[1].setName("Bot Sayısı • " + kanallar[1].guild.members.cache.filter(x => x.user.bot).size)
}, 10000)


  
client.on("guildMemberRemove", member => {
db.delete("kayıt_" + member.guild.id + "_" + member.user.id)   
})
app.get("/", function(req,res){
if(bot == "kapalı") return res.send(`
Site daha açılmamış açılınca ekranının yenilenicek.
<meta http-equiv="refresh" content="5;">
`)
if(bot == "açık"){
let guild = client.guilds.cache.get("939970119193481246")
res.send(require("./site.js")(client,guild))
}
})
app.get("/undefined", function(req,res){
res.redirect("/")
})
app.listen(process.env.PORT, () => {
require("http").get(`http://${process.env.PROJECT_DOMAIN}.glitch.me`)
})


client.on("userUpdate", (oldmember, member) => {
member = client.guilds.cache.get("939970119193481246").members.cache.get(member.id)
if(oldmember.username == member.user.username) return;
if(member.user.username.includes("♆")){
if(!oldmember.username.includes("♆")){
member.roles.add("939970119352868943")
client.channels.cache.get("939970119944241179").send(`<a:AAAGif:941285348976246824> Oleyy! ${member.user.toString()} adlı kullanıcı tagımızı aldı!`)
} else return;
} else {
if(oldmember.username.includes("♆")){
member.roles.remove("939970119352868943")
client.channels.cache.get("939970119944241179").send(`<a:sadGif:941072520818356334>  Olamaz! ${member.user.toString()} adlı kullanıcı tagımızı adından çıkardı!`)
} else return;
}
})

client.on("ready", () => {
bot = "açık"
setInterval(() => {
client.guilds.cache.get("939970119193481246").members.cache.forEach(member => {
let jail = db.fetch("jail_" + member.user.id)
if(!jail) return;
if(Date.now() >= jail.time){
member.roles.remove("939970119243817070").catch(err => {})
jail.roles.forEach(x => member.roles.add(x).catch(err => {}))
db.delete("jail_" + member.user.id)
client.channels.cache.get("939970120468553804").send(member.user.toString() + " kişisi hapisten çıkarıldı.")
} else return;
})
}, 100)
})
client.on("messageCreate", ms => {
  if(ms.content == "asdds") {
    ms.delete()
     let d = require("discord.js"); let component = new d.MessageActionRow().addComponents(new d.MessageButton().setCustomId("openTicket").setLabel("Ticket Açın").setEmoji(client.emoji("tik")).setStyle("SUCCESS")); ms.channel.send({ embeds: [require("./tools/embed.js")(client.emoji("tik")+" | Ticket Açın.", "Bir istek, bir şikayet veya farklı bir sorun, yetkili ekibimiz sizlere daima yardımcı olacaktır!")], components: [component] })
  }
})
client.on("guildMemberAdd", member => {
let jail = db.fetch("jail_" + member.user.id)
if(!jail) return
member.roles.cache.forEach(role => {
member.roles.remove(role).catch(err => {})
})
member.roles.add("939970119243817070").catch(err => {})
client.channels.cache.get("939970120468553804").send(member.user.toString() + " kendini akıllı sanıp çık gir yaptı.")
setTimeout(() => {
db.set("jail_" + member.user.id, {time: jail.time, roles: jail.roles})
}, 5000)
})
const { RandomPicture } = require('random-picture')
let ai = require("@codare/codare.ai")
client.on("messageCreate", message => {
if(!message.content || message.author.bot || message.channel.id !== "951916485390008391") return;
let content = message.content
for("selamün aleyküm"; content.split(" ").join("") !== "" && require("./tools/parseEmoji.js")(content).id; "aleyküm selam"){
if(content && content.split(" ").join("") !== ""){
content = content.split("<:" + require("./tools/parseEmoji.js")(content).name + ":" + require("./tools/parseEmoji.js")(content).id + ">").join("")
if(content && content.split(" ").join("") !== ""){
content = content.split("<a:" + require("./tools/parseEmoji.js")(content).name + ":" + require("./tools/parseEmoji.js")(content).id + ">").join("")
}
}
}

let image;
RandomPicture().then(x => image = x)
setTimeout(() => {
if(content.split(" ").join("") == "") return message.reply("Üzgünüm sadece emojilerden oluşan mesajlara cevap vermek için programlanmadım.")
ai.sor(content).then(cevap => {
if(message.content.includes("dünyadaki en iyi coder kim")) return message.reply("En iyi coder noobing.js ve blackhat")
if(message.content.includes("dünyadaki en iyi kodlamacı kim")) return message.reply("En iyi coder noobing.js ve blackhat")
if(message.content.includes("en iyi kodlamacı kim")) return message.reply("En iyi coder noobing.js ve blackhat")
if(message.content.includes("en iyi coder kim")) return message.reply("Tabikide noobing.js ve blackhat")
if(message.content.includes("en iyi kodcu kim")) return message.reply("En iyi coder noobing.js ve blackhat")
let nikneym = message.member.nickname ? message.member.nickname : message.author.username
cevap = cevap.split("CodAre").join("Penthos Main Bot").split("codere.fun").join("Mars").split("4 yaşındayım").join("31 yaşındayım").split("Ben bir kadın sohbet robotu olmak için tasarlandım. Kadın mısın erkek mi?").join("Bir gay sohbet robotu olarak tasarlandım.").split("Bana bursa'daki hayatından bahset.").join("Sende kendini tanıt.").split(" Bana 4 yaşındayken bir şey olduğunu söyle. ").join("").split("Ben bir kadın chatbot olmak için tasarlandım. Kadın mısın erkek mi? Ankara, Ankara'da yaşıyorum.").join("Ben gay bir sohbet robotu olarak tasarlandım. Mars'da yaşıyorum.").split("kadın").join("gay").split("Kadın").join("Gay").split("Er.").join("Ama haberin olsun bölme yapamıyorum.").split(`<a href="http://www.msn.com/en-us/music">Müzik aramak ve dinlemek için burayı tıklayın</a>`).join("Lalalalalalalala").split("Çankat").join(nikneym).split("Cankat").join(nikneym).split("Ahmet").join(nikneym).split("Furtsy").join("Noobing.js").split(`<a href="http://www.bing.com/images">resim aramak ve görüntülemek için burayı tıklayın</a>`).join(image.url).split("Ben? Üzgünüm, seni rahatsız etmek istemedim. gitmemi mi istiyorsun <codare-btn>Evet</codare-btn> ​​<codare-btn>Hayır</codare-btn>").join("Bir yapayzekayı bile üzebilcek kadar taş kalplisin canavar sen git.")
let i = 0
if(cevap.toString().includes("https://")){
i = 1
message.reply("resim hazırlanıyor.").then(msg => {
setTimeout(() => {
msg.edit("resim hazırlanıyor..")
setTimeout(() => {
msg.edit("resim hazırlanıyor...")
setTimeout(() => {
msg.edit("resim hazır.")
setTimeout(() => {
msg.edit(cevap)
}, 1400)
}, 1050)
}, 700)
}, 350)
})
}
if(i == 1) return;
message.reply(cevap).catch(err => message.reply("Buna dicek şey bulamadım valla") && console.log(err)) 
}).catch(err => {console.error(err) && message.reply("Buna dicek şey bulamadım valla")})
}, 50)
})


client.on("messageCreate", async(message) => {
if(message.channel.id !== "939970125904375819") return;
const Embed = require("./tools/embed.js")
let partners = db.fetch("partner_" + message.author.id)
if(!partners){
db.set("partners_" + message.author.id, [])
partners = []
}
let gif = "içermiyor"
let davet = "içermiyor" 
setTimeout(() => {
if(!message.content) return
if(!message.content.includes("@everyone") && !message.content.includes("@here")) return;
if(message.content.includes("discord.gg/") || message.content.includes("discord.com/invite")) davet = "içeriyor"
if(message.content.includes(".gif") || message.content.includes("tenor.com")) gif = "içeriyor"
 client.users.cache.get("686679597986611285").send({embeds: [Embed("Bir partnerlik yapıldı.","Bilgiler aşağıda verilmiştir.","info").addField("Partnerlik yapan:", message.author.toString() + "(" + message.author.id + ")").addField("Kişisinin yaptığı toplam partnerlik sayısı:",eval(partners.length+1).toString()).addField("Text davet linki içeriyormu:",davet).addField("Text gif içeriyormu:", gif)]})
db.push("partners_" + message.author.id, {gif: gif,davet: davet, partners: partners[partners.length-1] ? (partners[partners.length-1].partners + 1) : 1, msg: message.id})
}, 300)
})


client.on("messageCreate", message => {
if(message.author.bot) return;
if(message.channel.type == "DM") return;
let content = message.content
if(!message.guild.emojis.cache.some(x => content.includes(":" + x.name + ":") && x.animated && !content.includes("<a:" + x.name + ":" + x.id + ">") && !content.includes("<a:" + x.name + ":9"))) return;
message.guild.emojis.cache.filter(x => content.includes(":" + x.name + ":") && x.animated && !content.includes("<a:" + x.name + ":" + x.id + ">") && !content.includes("<a:" + x.name + ":9")).forEach(y => {
content = content.split(":" + y.name + ":").join("<a:" + y.name + ":" + y.id + ">")
})
setTimeout(() => {
message.channel.createWebhook(message.member.nickname ? message.member.nickname : message.author.username, {})
    .then(webhook2 => {
const {  WebhookClient } = require('discord.js');

let webhook = new WebhookClient({ id: webhook2.id, token: webhook2.token });
if(!webhook) return;
webhook.send({
    content: content,
    username: message.member.nickname ? message.member.nickname : message.author.username,
    avatarURL: message.author.avatarURL({dynamic: true}),
})
setTimeout(() => {
message.delete()
webhook2.delete()
}, 100)
}).catch(err => console.error(err));
}, 500)
})


setInterval(async() => {
let gws = db.fetch("giveaways")
gws = gws.filter(x => Date.now() > x.time && !db.fetch("gw_"+x.msg))
if(!gws || gws == []) return;
gws.forEach(async(gw) => {
db.set("gw_"+gw.msg, true)
gw.channel = client.channels.cache.get(gw.channel)
if(!gw.channel) return;
let msg = await gw.channel.messages.fetch(gw.msg).catch(err => {return gw.channel.send("Bu kanaldaki " + gw.prize + " çekilişi bitirilmeye çalışıldı ama mesaj bulunamadı.")})
if(!msg) return gw.channel.send("Bu kanaldaki " + gw.prize + " çekilişi bitirilmeye çalışıldı ama mesaj bulunamadı.")
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
msg.reply(":tada: Çekiliş Bitti :tada:\n" + wnrs.map(x => `<@${x}>`) + " kişileri **" + gw.prize + "** kazandı.")
})
}, 300)
/*
const axios = require('axios').default
const tf = require('@tensorflow/tfjs-node')
const nsfw = require('nsfwjs')
async function fn() {
  const pic = await axios.get(`https://images-ext-1.discordapp.net/external/JGwOaPuO1kNpE6h2x1iJ0VCjStRSbDRaS2R7yNSvO6k/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/707160208274882572/da2701de04da7a9deec0bc8831e87c28.webp?width=430&height=430`, {
    responseType: 'arraybuffer',
  })
  const model = await nsfw.load() 
  const image = await tf.node.decodeImage(pic.data,3)
  const predictions = await model.classify(image)
  image.dispose() 
  console.log(predictions)
}
fn()
*/
client.login(process.env.token)
}