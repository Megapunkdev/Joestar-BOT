module.exports = {
	name: 'avatar',
	description: 'Affichage d\'avatar',
	usage: '<@utilisateur>',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Ton avatar: ${message.author.displayAvatarURL()}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `Avatar de : ${user.username} ${user.displayAvatarURL()}`;
		});

		message.channel.send(avatarList);
	},
};