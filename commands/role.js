module.exports = {
	name: 'role',
	description: 'Assigne un role à un membre du serveur.',
	args: true,
	usage: '<utilisateur> <role>',
	execute(message) {
		message.channel.send('bravo !');
	},
};