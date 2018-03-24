var methods = {
  meta: {
    name: "Blacklist",
    desc: "Blacklist a user - OWNER ONLY",
    alias: "",
    cat: "Private",
    syntax: "{prefix}blacklist @USER <reason>"
  },
    run: async function(client, args, message) {
            if(message.author.id != process.env.ownerID) {
                message.reply("**blacklist **| ⚠️ | You don't have permissions to use this.");
                return;
            }
      
            var toBan = message.mentions.members.first();
            if(!toBan) {
                message.reply("**blacklist **| ⚠️ | Please mention a valid member.");
                return;
            }
            var name = toBan.user.tag;
            var reason = args.join(' ').replace(args[0], '');
            if (!reason) {
                message.reply("**blacklist **| ⚠️ | Please indicate a reason!");
                return;
            }
            if(client.bans[toBan.user.id] != undefined) {
                message.reply("**blacklist **| ⚠️ | User already blacklisted");
                return;
            }
            try {
                client.bans[toBan.user.id] = {
                  tag: name,
                  date: Date.now(),
                  reason: reason
                }
                message.channel.send('**blacklist **| ✅ | '+name+" has been blacklisted");
            } catch (e) {
                message.reply('**blacklist **| ⚠️ | Sorry '+message.author+' I couldn\'t blacklist that person');
                return;
            }
            //message.channel.send('BAN ERROR');
  }
}

module.exports = methods;