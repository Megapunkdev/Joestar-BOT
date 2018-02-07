module.exports = {
	name: 'args-info',
	description: 'Obtention d\'arguments de commande',
	usage: '<argument>',
	args: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Argument(s): ${args}`);
	},
};