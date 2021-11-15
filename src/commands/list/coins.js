const UserHook = require("../../hooks/UserHook.js");
const { MessageEmbed } = require("djst-client");

module.exports = {
	category: "economy",
	name: "coins",
	aliases: ["cash", "c"],
	description: "Show your current coins",
	cooldown: 5,
	execute: async (message, args, client) => {

		const user = await UserHook(message.author.id);
		const robChance = getRandomInt(1, 100);
		let isRob = false;
		let robMoney = 0;

		if (robChance < 10) {
			if (user.coins.wallet > 0) {
				if (user.coins.wallet < 50000) {
					robMoney = user.coins.wallet;
					user.coins.wallet = user.coins.wallet - user.coins.wallet;
					user.save();
					isRob = true;
				} else {
					let takeMoney = parseInt(getRandomInt(10000, 2000000));
					if (takeMoney > user.coins.wallet) {
						takeMoney = user.coins.wallet;
					};

					robMoney = takeMoney;
					user.coins.wallet = user.coins.wallet - takeMoney;
					user.save();
					isRob = true;
				}				
			}
		}

		const embed = new MessageEmbed()
		.setAuthor(message.author.tag, message.author.displayAvatarURL({type: "png"}))
		.setColor('#383939')
		.setDescription(`this is **${message.author.tag}** coins in bank and wallet.`)
		.addField('wallet', user.coins.wallet.toLocaleString(), true)
		.addField('bank', user.coins.bank.toLocaleString(), true)
		.setFooter('(C) Vins 2106, Indonesia')

		message.channel.send({
			content: `<@${message.author.id}> coin's`,
			embeds: [embed]
		});

		if (isRob) {
			return message.channel.send({
				content: `${message.author} you have been robbed by someone and lost \`${robMoney.toLocaleString()}\` coins\nPlace your coins in bank to make the coins safety.`
			})
		}

	}
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
