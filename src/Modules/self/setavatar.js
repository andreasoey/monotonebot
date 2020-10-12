const { Command } = require('discord.js-commando')

module.exports = class SetAvatarCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setavatar',
      group: 'self',
      memberName: 'setavatar',
      description: 'set avatar from given url',
      examples: ['setavatar C:\\Users\\ASUS\\Pictures\\minecraft\\creeper.png',
        'setavatar https://upload.wikimedia.org/wikipedia/fr/thumb/0/05/Discord.svg/1200px-Discord.svg.png'],
      ownerOnly: true,
      argsType: 'multiple',
    });
  }

  async run(msg, args) {
    let isLink = args.join(' ').match(/(?:https?|\.\/|\w\:(\\|\/)).*(?:png|jpg|jpeg)/);
    if (!isLink) {
      return msg.say('Please check the path or link');
    }
    msg.client.user.setAvatar(args.join(' '))
      .then(msg.say(`Avatar will be updated soon`))
      .catch(err => {
        msg.say('Please check your url');
        logger.log('error', err);
      });
  }

  async onBlock(msg, reason, data) {
    let parent = await super.onBlock(msg, reason, data);
    parent.delete({ timeout: 9000 })
  }

  onError(err, message, args, fromPattern, result) {
    super.onError(err, message, args, fromPattern, result)
      .then(msgParent => msgParent.delete({ timeout: 9000 }));
  }
};


