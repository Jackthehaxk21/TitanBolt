var methods = {
  meta: {
    name: "Help",
    desc: "Get all Help Docs",
    alias: "Docs,Info",
    cat: "Utils",
    syntax: "{prefix}help"
  },
    run: function(client, args, message, prefix) {
        const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
        if(prefixMention.test(message.content)) {
          prefix = client.settings.get(message.guild.id).prefix;
          //CHANGE TO client.settings.prefix
        }
      const fs = require('fs')
      let list = fs.readdirSync('./Data/Commands/')
      //list = list.split(',')
      let full = '```asciidoc'
      let space;
      for(let i = 0; i < list.length; i++) {
        if(list[i] != 'handler.js' && list[i] != 'API' && list[i] != 'Modules') {
          let tmp = require('./'+list[i])
          tmp = tmp.meta
          //console.log(tmp)
          space = ""
          for(let i = tmp.name.length; i < 12; i ++) { space += " ";}
          if(tmp.cat != 'Private') full += '\n'+prefix+tmp.name+(space)+':: '+tmp.desc
        }
      }
      full += '```'
      try{
        message.author.send(full)
      } catch (err) {
        message.reply('Oh No!\nI couldnt send docs to your DM.')
        return;
      }
      message.channel.send("Help Docs have been sent to your DM")
      return;
    }
}

module.exports = methods;