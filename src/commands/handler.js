const fs = require("fs");

module.exports = (client) => {
	fs.readdir("src/commands/list", (err, files) => {
		files.forEach(file => {
			if (!file.endsWith(".js")) return;
			const fileConfig = require(`./list/${file}`);
			client.createCommand(fileConfig);
		})
	})	
}