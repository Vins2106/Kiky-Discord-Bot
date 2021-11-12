const { MessageEmbed } = require("djst-client");

module.exports = {
	category: "general",
	name: "faq",
	description: "F.A.Q",
	cooldown: 10,
	execute: async (message, args, client) => {

		const embed = new MessageEmbed()
		.setAuthor(client.user.tag, client.user.displayAvatarURL())
		.setColor("ffffff")
		.setDescription("frequently asked questions")
		.addField("1. Who make this bot?", "`Vins 2106` make me with love <3", true)
		.addField("2. What is the prefix?", "`./`", true)
		.setFooter("(C) Vins 2106, Indonesia")

		message.author.send({

			embeds: [embed]
		});
		message.channel.send(`${message.author} Check your DM's`).then(m => {
			setTimeout(() => {
				m.delete();
			}, 10000)
		})

	}
}