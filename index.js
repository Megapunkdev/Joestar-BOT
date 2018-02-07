const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands');

// loop through all the command files and map the name and data of each commands 
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// ready callback to make sure the bot is working
client.on('ready', () => {
	console.log('Prêt !');
	client.user.setActivity('the World burn', { type: 'WATCHING' });
});

// commands callback and security check
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) {
		return message.reply(`Commande non valide !\nUtilisez ${prefix}help afin d'obtenir la liste des commandes.`);
	}

	const command = client.commands.get(commandName);

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('Je ne peux effectuer cette commande dans un MP !');
	}

	if (command.args && !args.length) {
		let reply = `Vous devez ajouter un argument à cette commande, ${message.author}.`;

		if (command.usage) {
			reply += `\nL'utilisation adequate de cette commande est la suivante: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.replay(reply);
	}

	try {
		command.execute(message, args);
	}
	catch(error) {
		message.console(error);
		message.replay('La commande que vous avez effectué n\'a pas fonctionné.');
	}

	client.on('error', (e) => console.error(e));

	client.on('warn', (e) => console.warn(e));

});

client.login(token);