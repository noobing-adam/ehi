
module.exports = (client) => {
  let global1 = {}

const { Modal, TextInputComponent, showModal } = require('discord-modals');
const discordModals = require("discord-modals");
discordModals(client);

client.on("interactionCreate",async int => {
	if(!int.isCommand()) return false;
let soru = x => new TextInputComponent().setPlaceholder('Cevabını buraya yaz').setLabel(x).setStyle("SHORT")

	if(int.commandName == "embed"){

		let modal = new Modal()
		.setCustomId("embed")
		.setTitle("Embed oluştur")
		.addComponents([
			soru('Title').setCustomId("title").setRequired(true),
			soru('Description').setCustomId("description").setRequired(true),
			soru('Color').setCustomId("color").setRequired(true),
			soru('Image').setCustomId("image"),
			soru('Thumbnail').setCustomId("thumbnail"),
		])

		showModal(modal,{
			client : client,
			interaction : int
		});

	};
});

client.on("modalSubmit",async modal => {
const Embed = require("./embed.js")
	if(modal.customId == "embed"){
let embed = Embed(modal.getTextInputValue("title"),modal.getTextInputValue("description"),modal.getTextInputValue("color"))
if(modal.getTextInputValue("image")) embed.setImage(modal.getTextInputValue("image"))
if(modal.getTextInputValue("thumbnail")) embed.setThumbnail(modal.getTextInputValue("thumbnail"))
modal.reply({embeds: [embed]})
modal.channel.send("Embed başarıyla oluşturuldu.")

	};
});
}

