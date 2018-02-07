const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Liste toutes les commandes disponibles et leurs utilisations.',
	usage: '[nom de la commande]',
	execute(message, args) {
		const { commands } = message.client;
		const data = [];

		if (!args.length) {
			data.push('Voici la liste de toutes mes commandes:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nVous pouvez utiliser \`${prefix}help [nom de la commande]\` afin d'obtenir des informations sur une commande spécifique !`);
		}
		else {
			if (!commands.has(args[0])) {
				return message.reply('Ce n\'est pas une commande valide !');
			}

			const command = commands.get(args[0]);

			data.push(`**Nom:** ${command.name}`);

			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.usage) data.push(`**Utilisation:** ${prefix}${command.name} ${command.usage}`);

		}

		message.author.send(data, { split: true })
			.then(() => {
				if (message.channel.type !== 'dm') {
					return message.reply('je vous ai envoyé un MP avec toutes les commandes !');
				}
			})
			.catch(() => message.reply('Impossible de vous envoyer un MP !'));
	},
};