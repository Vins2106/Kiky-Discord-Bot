const { MessageEmbed } = require("djst-client");

module.exports = {
	category: "general",
	name: "help",
	aliases: ["h", "cmds"],
	description: "Show you all commands",
	cooldown: 10,
	execute: async (message, args, client) => {

		let chooseModule = args[0];

		const embed = new MessageEmbed()
		.setAuthor(client.user.tag, client.user.displayAvatarURL({format: "png"}))
		.setColor('#383939')
		.setDescription("We are provide the best as we can!")


		if (!chooseModule) {
			client.getModules().map(mod => {
				embed.addField(mod.name + ' - ' + mod.cmds.length, `\`\`\`md
${mod.cmds.map(x => x.name).join(", ")}
\`\`\``, true)
			})
			embed.setFooter("type './help [category-name]'\n(C) 2021 Vins 2106, Indonesia")

			message.channel.send({
				embeds: [embed]
			})
		} else if (chooseModule) {
			let getMod = client.getModules().get(chooseModule.toLowerCase());
			if (!getMod) return message.channel.send(`Cannot find **${chooseModule}** on our system.`);

			getMod.cmds.map(cmd => {
				embed.addField(cmd.name, `\`\`\`md
aliases: ${cmd.aliases ? cmd.aliases.join(", ") : "No aliases"}

description: ${cmd.description || "No description"}

cooldown: ${cmd.cooldown}s

example: ${client.opt.prefix}${cmd.name}
\`\`\``, true)
			})			
			embed.setFooter("(C) 2021 Vins 2106, Indonesia")			

			message.channel.send({
				embeds: [embed]
			})
		}

	}
}