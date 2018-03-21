let methods = {
  run : async function(client, message, Discord) {
    if(message.channel.type == 'dm' && !message.author.bot) {
      if(message.content != 'support') {
        message.channel.send('Only the support command works here type support to activate the command.')
        return;
      } else {
        const support_command = require('../../Commands/support.js')
        support_command.run(client, message)
        return;
      }
    }
    if(message.channel.type == 'dm') return;
    if(client.ready != true) return;
    let settings = require('../../../settings.json');
    //console.log(message.mentions.users.first().id)
    try {
    if(message.mentions.users.first().id != undefined && message.mentions.users.first().id != null && !message.author.bot) {
      if(message.mentions.users.first().id in client.afk) message.reply(client.afk[message.mentions.users.first().id].replace('{USER}',message.mentions.users.first().username))
    } } catch (err) {}
    //INSERT NEW PREFIX HERE
    let prefix;
    try {
      prefix = client.settings.get(message.guild.id).prefix;
    } catch (err) {
      client.settings.set(message.guild.id, settings);
      prefix = client.settings.get(message.guild.id).prefix
    }
    
    if(prefix == 'Undefined' || prefix == undefined) {
      client.settings.set(message.guild.id, settings);
      prefix = client.settings.get(message.guild.id).prefix
    }
    
    
    
    const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
    prefix = prefixMention.test(message.content) ? message.content.match(prefixMention)[0] + " " : prefix;
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    
    
    
    //message.channel.send(prefix)
   // if(prefix);
    //console.log(prefix);
    //console.log("after");
    if(message.author.bot && message.author.id != 395520567815569409) return;
    client.user.setPresence({game: {name: " @Jackthehack help | Guilds: " + client.guilds.size, type: 0}});
    const commandHandler = require('../../../Data/Commands/handler.js');
    
    let newTime = Date.now();
    
    const updateMoney = async function(message, amount = 0) {
    try {
      let data = client.points.get(message.author.id)
      data.money += amount;
      data.daily = newTime;
      client.points.set(message.author.id, data);
      return;
    } catch (err) {
      const set = require('../../../points.json');
      let data = set;
      data.money += amount;
      data.daily = newTime;
      client.points.set(message.author.id, data);
      return;
    }
    }
    if (Math.floor(Math.random() * 5) == 2) updateMoney(message, 5);
    
    const updatePoints = async function(message, amount=1) {
    try {
      let data = client.points.get(message.author.id);
      data.points += amount;
      let curLevel = Math.floor(0.35 * Math.sqrt(data.points + 1));
      if (curLevel > data.level) {
        //level up
        data.level += 1;
        if (client.settings.get(message.guild.id).levelUpMessageOn == "true" || client.settings.get(message.guild.id).levelUpMessageOn == "True") {
            message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
        }
      }
      client.points.set(message.author.id, data);
    } catch(e) {
      let newTime = Date.now();
      let data = require('../../../points.json');
      data.points += amount;
      data.daily = newTime;
      let curLevel = Math.floor(0.35 * Math.sqrt(data.points + 1));
      /*if (curLevel > data.level) {
        //level up
        data.level += 1;
        if (client.settings.get(message.guild.id) == "true" || client.settings.get(message.guild.id) == "True") {
            message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
        }
      }*/
      client.points.set(message.author.id, data);
    
    }
    }
  //prefix = client.settings.get(message.guild.id).prefix;
  if (message.channel.type != 'dm') updatePoints(message);
  commandHandler.handle(client, message, prefix, Discord);
  return;
  }
}

module.exports = methods;