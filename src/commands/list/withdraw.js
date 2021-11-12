const UserHook = require("../../hooks/UserHook.js");

module.exports = {
	category: "economy",
	name: "withdraw",
	aliases: ["wd"],
	description: "With your coins into from bank to wallet",
	cooldown: 10,
	execute: async (message, args, client) => {

		let user = await UserHook(message.author.id);
		let amount = args[0];

		if (!amount) return message.channel.send("Please provide the amount.")

		if (args[0] == "all") {
			amount = user.coins.bank;
		}

		if (isNaN(amount)) return message.channel.send("The amount must be a number.");
		if (amount <= 10 * 1000) return message.channel.send("The minimum amount to withdraw is `50.000`");
		if (amount > user.coins.bank) return message.channel.send(`Your coins in bank is not enough to with \`${amount.toLocaleString()}\``)


		user.coins.wallet = user.coins.wallet + parseInt(amount);
		user.coins.bank = user.coins.bank - parseInt(amount);
		user.save();

		message.channel.send(`You withdraw \`${parseInt(amount).toLocaleString()}\` from bank`);
	}
}