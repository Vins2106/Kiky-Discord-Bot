const UserHook = require("../../hooks/UserHook.js");

module.exports = {
	category: "economy",
	name: "work",
	description: "Get a coins",
	cooldown: 120,
	execute: async (message, args, client) => {

		let salary = getRandomArbitrary(800000, 1200000);

		let user = await UserHook(message.author.id);

		user.coins.wallet += parseInt(salary);
		user.save();

		message.channel.send(`Your salary is \`${salary.toLocaleString()}\` after working...`);

	}
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}