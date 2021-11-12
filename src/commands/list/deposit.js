const { MessageEmbed } = require("djst-client");
const UserHook = require("../../hooks/UserHook.js");
const emoji = require("../../assets/config.json")

module.exports = {
	category: "economy",
	name: "deposit",
	aliases: ["dep"],
	description: "Deposit your coins into bank",
	cooldown: 5,
	execute: async (message, args, client) => {

		let user = await UserHook(message.author.id);
		let amount = args[0];

		if (!amount) return message.channel.send("Please provide the amount.")

		if (args[0] == "all") {
			amount = user.coins.wallet;
		}

		if (isNaN(amount)) return message.channel.send("The amount must be a number.");
		if (amount <= 10 * 1000) return message.channel.send("The minimum amount to deposit is `10.000`" + ` ${emoji.coin}`);
		if (amount > user.coins.wallet) return message.channel.send(`Your coins in wallet is not enough to deposit \`${amount.toLocaleString()}\` ${emoji.coin}`)


		user.coins.wallet = user.coins.wallet - parseInt(amount);
		user.coins.bank = user.coins.bank + parseInt(amount);
		user.save();

		message.channel.send(`You deposit \`${parseInt(amount).toLocaleString()}\` ${emoji.coin} to your bank`);
	}
}