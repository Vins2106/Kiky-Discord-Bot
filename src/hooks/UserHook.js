const User = require('../schemas/User.js');
const client = require("../../index.js");

module.exports = (ID) => new Promise(async (resolve, reject) => {
	let checkUser = await User.findOne({ID});

	if (!checkUser) {
		let newUser = new User({
			ID
		});

		return resolve(newUser);
	} else if (checkUser) {
		return resolve(checkUser);
	};
})