const moment = require("moment")
require("moment-duration-format")
module.exports = (client, guild) => `
 </html>
       <title>${guild.name}</title> 
<head>
	<style>
		body {			background: url(https://images-ext-1.discordapp.net/external/rOGcXFbjpT3NWq2yiFb1S5ON4UaB1cU0M4Ugf-Oy9D4/%3Fsize%3D1024/https/cdn.discordapp.com/icons/939970119193481246/a_da01edb9b8d19954fe3e87e2fd878555.gif) no-repeat fixed;
			background-size: 100%;
		}
	</style>
<font color="white"><a align="middle"><h1>${guild.name}</h1></a></font> 
</head>
<a data-test="test" rel="nofollow" style="word-wrap: break-word;" target="_blank" onclick="return dhExternalLinkRedirect("/")" href="https://discord.gg/eJ6q4pHcBy" target="_blank" data-href="https://discord.gg/eJ6q4pHcBy" target="_blank"><input type="button" value="Discord Sunucumuz Katılmak için tıklayın." onclick="location.href=this.parentNode.click()"></a> 
<font color="white"><h3>Sunucu İstatistikleri</h3> </font>
<font color="white"><h4> Üye sayısı: ${guild.memberCount}</h4></font>
<font color="white"><h4> Kanal sayısı: ${guild.channels.cache.size}</h4></font>
<font color="white"><h4> Aktif üye sayısı: ${guild.members.cache.filter(x => !x.user.bot && x.presence && x.presence.status && x.presence.status !== "offline").size}</h4></font>
<font color="white"><h4> Deaktif üye sayısı: ${guild.members.cache.filter(x => !x.user.bot && (!x.presence || !x.presence.status || x.presence.status == "offline")).size}</h4></font>
<font color="white"><h4> Sesteki üye sayısı: ${guild.members.cache.filter(x => !x.user.bot && (x.voice && x.voice.channel && x.voice.channel !== undefined && x.voice.channel !== null)).size}</h4></font>
<script type="text/javascript" src="https://webkodu.ozgurlukicin.com/kod-kaynak/wk-kar-efekt.js"></script>
<br>
<font color="white"><h3>Bot İstatistikleri</h3> </font>
<font color="white"><h4> Uptime: ${moment.duration(client.uptime).format("h [saat], m [dakika], s [saniye]")}</h4></font>
<font color="white"><h4> Ping: ${client.ws.ping}</h4></font>
    <marquee behavior="alternate" bgColor="#a1a6ad" style="color:black;">Penthos Dünyanın en iyi public sunucusu</marquee> 
</body>
 </html/>
` 