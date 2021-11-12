const fs = require("fs");

module.exports = (client) => {

	fs.readdir("src/events/list", (err, files) => {
		files.forEach(file => {
			if (!file.endsWith(".js")) return;

			const fileConfig = require(`./list/${file}`);

			client.on(fileConfig.name, (...args) => {
				fileConfig.run(...args, client)
			});

			console.log("[bot]: load event " + fileConfig.name);
		});
	})

}