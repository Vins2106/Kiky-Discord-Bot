module.exports = {
	name: "ready",
	run: (client) => {
		client.setStatus({
			status: "idle",
			name: "remake process",
			type: "LISTENING"		
		})

		console.log(`[bot]: ready as ${client.user.username}`)
	}
}