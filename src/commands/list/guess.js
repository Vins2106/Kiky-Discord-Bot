const UserHook = require("../../hooks/UserHook.js");
const emoji = require("../../assets/config.json");
const Games = new Map();

module.exports = {
	category: "mini-game",
	name: "guess",
	aliases: [],
	description: "Guess where the emoji",
	cooldown: 60 * 5,
	execute: async (message, args, client) => {

		const user = await UserHook(message.author.id);

		let checkGames = Games.get(`guess-${message.author.id}`);
		if (checkGames) return message.channel.send("You already play guess game.");

		let reward = getRandomArbitrary(50 * 1000, 200 * 1000);

		let emojis = {
			yes: "🎉",
			no: "💩"
		}

		let box = [
			'1️⃣', '2️⃣', '3️⃣',
			'4️⃣', '5️⃣', '6️⃣',
			'7️⃣', '8️⃣', '9️⃣'
		];

		let rightBox = getRandomArbitrary(0, 8);



		let requiredNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		let guessNumber = [];
		let filter = m => m.author.id == message.author.id;
		let collector = message.channel.createMessageCollector(filter, {max: 8, time: 30 * 1000});

		function msgContainer() {
			return `

guess the right number...
your time is **30 seconds**
${8 - guessNumber.length} try left...
you will get \`${reward.toLocaleString()}\` coins.`
		}

		let msg = await message.channel.send(`
${box[0]}${box[1]}${box[2]}
${box[3]}${box[4]}${box[5]}
${box[6]}${box[7]}${box[8]}
${msgContainer()}`);

		Games.set(`guess-${message.author.id}`, true);

		let right = false;
		collector.on("collect", async (m) => {

			if (m.author.id == client.user.id) return;
			if (m.author.bot) return;

			if (isNaN(m.content)) {
				message.channel.send("The message must be a number, your chance has been take 1.");
				return;
			}

			if (m.content < 0 && m.content > 9) {
				message.channel.send("The guess number must be between 1 and 9, your chance has been take 1.");
				return;
			}
			await updateMsg(m.content);
		})

		collector.on("end", m => {
			if (right) {
 				return;
			} else if (!right) {
				return message.channel.send("You lost :( \ntry again later...")
			}
		})

		async function updateMsg(num) {
			if (8 - guessNumber.length == 0) {
				return collector.stop();
			}

			if (num == rightBox) {
				box[rightBox - 1] = emojis.yes;
				right = true;
				user.coins.wallet = user.coins.wallet + parseInt(reward);
				user.save();
				msg.delete();
				message.channel.send(`
${box[0]}${box[1]}${box[2]}
${box[3]}${box[4]}${box[5]}
${box[6]}${box[7]}${box[8]}


You right! congratulations :tada: \nyour got \`${reward.toLocaleString()}\` ${emoji.coin}.`);
				return collector.stop();
			} else {
				guessNumber.push(num - 1);
				box[num - 1] = emojis.no;
			}



			msg.delete();
			msg = await message.channel.send(`
${box[0]}${box[1]}${box[2]}
${box[3]}${box[4]}${box[5]}
${box[6]}${box[7]}${box[8]}
${msgContainer()}`)		
		}

	}
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}