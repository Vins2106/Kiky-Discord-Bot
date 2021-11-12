require("dotenv").config();

const DJST = require("djst-client");
let client = new DJST.Client({
	intents: ["GUILDS", "GUILD_MESSAGES"],
	prefix: "./",
	messages: {
		cooldown: "You have cooldown (**{cdTime}**) in **{command}**"
	},
	initCommands: true
});
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB, () => {
	console.log("[database]: connect")
})

const eventsHandler = require("./src/events/handler.js");
eventsHandler(client);

const commandsHandler = require("./src/commands/handler.js");
commandsHandler(client);

client.login(process.env.TOKEN);
require("./src/website/index.js")(client);
module.exports = client;