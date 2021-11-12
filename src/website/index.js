module.exports = (client) => {
	const express = require("express");
	const app = express();
	const cors = require("cors");
	const path = require("path");

	app.use(cors());
	app.set('views', path.join(__dirname, '/pages'));
	app.use(express.static(__dirname + "/public"));

	app.get("/", async (req, res) => {
		res.send("Kiky-remake")
	});

	app.listen(3000, () => {
		console.log(`[website]: running`);
	})
}