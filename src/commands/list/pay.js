const UserHook = require("../../hooks/UserHook.js");
const { MessageEmbed } = require("djst-client");

module.exports = {
	category: "economy",
	name: "pay",
	description: "Pay a user from your wallet to another user wallet",
	cooldown: 10,
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

		if (amount < 10000 || amount > 10000000) {
			return message.channel.send("Please enter valid amount between `10.000` and `10.000.000`")
		}

		if (amount > user.coins.wallet) {
			return message.channel.send("Your coins in wallet is not enough.");
		}


		let targetUser = await UserHook(target.id);

		user.coins.wallet = user.coins.wallet - parseInt(amount);
		targetUser.coins.wallet = targetUser.coins.wallet + parseInt(amount);
		user.save();
		targetUser.save();

		message.channel.send(`${message.author} pay \`${amount.toLocaleString()}\` coins to ${target}`);
		target.send(`You have been receive \`${amount.toLocaleString()}\` coins from **${message.author.tag}**`);
	}
}