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
      let cat = {}
      let object = {cats: []}
      let space;
      for(let i = 0; i < list.length; i++) {
        if(list[i] != 'handler.js' && list[i] != 'API' && list[i] != 'Modules') {
          let tmp = require('./'+list[i])
          tmp = tmp.meta
          //console.log(tmp)
          space = ""
          for(let i3 = tmp.name.length; i3 < 12; i3 ++) { space += " ";}
          if(tmp.cat != 'Private' && object[tmp.cat] != undefined) object[tmp.cat].push(prefix+tmp.name+(space)+':: '+tmp.desc+'\n')
          if(tmp.cat != 'Private' && object[tmp.cat] == undefined) {
            object.cats.push(tmp.cat)
            object[tmp.cat] = [prefix+tmp.name+(space)+':: '+tmp.desc+'\n']
          }
        }
      }
      let tmp = ''
      for(let i = 0; i < object.cats.length; i++){
        tmp += '\n=== '+object.cats[i]+' ===\n';
        for(let i2 = 0; i2 < object[object.cats[i]].length; i2++){
          tmp += object[object.cats[i]][i2]+'\n'
        }
      }
      try{
        message.author.send('```asciidoc'+tmp+'```')
      } catch (err) {
        message.reply('Oh No!\nI couldnt send docs to your DM.')
        return;
      }
      message.channel.send("Help Docs have been sent to your DM")
      return;
    }
}

module.exports = methods;