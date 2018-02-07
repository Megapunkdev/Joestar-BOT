// WORK IN PROGRESS

module.exports = {
	name: 'kick',
	description: 'Permet de renvoyer un membre du serveur',
	usage: '<utilisateur> <durée>',
	guildOnly: true,
	execute(message) {
		if(!message.mentions.users.size) {
			return message.reply('Vous devez selectionner un membre à kick.');
		}
		const taggedUser = message.mentions.users.first();

		message.channel.send(`Une demande de kick à été envoyée concernant ${taggedUser.username}.`);
	},
};