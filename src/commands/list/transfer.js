const UserHook = require("../../hooks/UserHook.js");
const { MessageEmbed } = require("djst-client");

module.exports = {
	category: "economy",
	name: "transfer",
	aliases: ["tf"],
	description: "Transfer a coins from your bank to another user bank",
	cooldown: 15,
	execute: async (message, args, client) => {

		const user = await UserHook(message.author.id);

		if (!args[0]) {
			return message.channel.send("Please mentions a user or give a user id");
		}

		let target = message.mentions.users.first() || await client.users.fetch(args[0]);
		let amount = parseInt(args[1]);

		if (!target) {
			return message.channel.send("Please mentions a user or give a user id.");
		};

		if (!amount || isNaN(amount)) {
			return message.channel.send("Please provide valid amount");
		};

		if (amount < 15000 || amount > 10000000) {
			return message.channel.send("Please enter valid amount between `15.000` and `10.000.000`")
		}

		if (amount > user.coins.bank) {
			return message.channel.send("Your coins in bank is not enough.");
		}


		let targetUser = await UserHook(target.id);

		user.coins.bank = user.coins.bank - parseInt(amount);
		targetUser.coins.bank = targetUser.coins.bank + (parseInt(amount) - 5000);
		user.save();
		targetUser.save();

		message.channel.send(`${message.author} transfer \`${amount.toLocaleString()}\` coins to ${target}\nadministrative costs: \`5.000\``);
		target.send(`You have been receive \`${amount.toLocaleString()}\` coins to your bank. from **${message.author.tag}**`);
	}
}