let customAnimals = require("../schemas/Animals.js");


module.exports = {
	config: {
		default_power: 10,
	},
	animals: [
		{
			"name": "Cat",
			"owned": 0,
			"skills": [
				{
					"name": "speed",
					"max_power": 10,
					"default_power": 3
				},
				{
					"name": "jump",
					"max_power": 10,
					"default_power": 5
				},
				{
					"name": "scratch",
					"max_power": 10,
					"default_power": 7
				}
			],
			"emoji": "🐱",
			"id": Number("0001")
		},
		{
			"name": "Dog",
			"owned": 0,
			"skills": [
				{
					"name": "speed",
					"default_power": 7
				},
				{
					"name": "jump",
					"max_power": 10,
					"default_power": 8
				},
				{
					"name": "scratch",
					"default_power": 5
				}
			],
			"emoji": "🐶",
			"id": Number("0002")
		}	
	]
}