const methods = {
  handle : function(client, message, prefix, Discord) {
    //must be after trim because of the @ prefix !!
    let data = client.settings.get(message.guild.id);
    prefix = data.prefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    if(client.coolDown.has(message.author.id+'-'+message.guild.id)) {
      if(client.coolDown.get(message.author.id+'-'+message.guild.id) <= Date.now()) {
        client.coolDown.delete(message.author.id+'-'+message.guild.id)
        return;
      }
      var time = client.coolDown.get(message.author.id+'-'+message.guild.id);
      message.channel.send(message.author.username+' please dont use me too fast !\nTry again in '+Math.round((time-Date.now())/1000)+' Seconds')
      return;
    }
    if(message.author.id != process.env.ownerID) {
      client.coolDown.set(message.author.id+'-'+message.guild.id, Date.now()+(10000));
      setTimeout(() => {
        //try { msg.delete() } catch(err){console.log(err)}
        client.coolDown.delete(message.author.id+'-'+message.guild.id);
      }, 10000);
    }
    const log = async function(client, args, command) {
      if(message.author.id == process.env.ownerID) return;
        var MK = client.guilds.get("393114138135625749")
        //console.log(MK);
        var MK = MK.channels.find("name", "bot-log");
        MK.send({embed: {
    color: 0x00bfff,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Command Log - **"+command+"**",
    description: "",
    fields: [{
        name: "**Guild:**",
        value: message.guild.name+" | "+message.guild.id
      },
      {
        name: "**User:**",
        value: message.author.tag+" | "+message.author.id
      },
      {
        name: "**Message:**",
        value: message.content
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Jackthehack21#8860"
    }
  }
});
        //let msg = await MK.send('[**'+message.author.tag+'**] | Command: **'+command+'**');
        //msg.edit('[**'+(msg.createdAt).toString().replace(' GMT+0000 (UTC)','')+'**] [**'+message.guild.name+'**] [**'+message.author.tag+'**] | Command: **'+command+'** | Full Msg: **'+message.content+'**');
        console.log('['+message.author.tag+'] | Command: '+command);
        return;
    }
    if(client.bans[message.author.id] != undefined) {
      message.reply('You are blacklisted from using me.\nFor details please use command `'+prefix+'why`')
      return;
    }
    try{
      let meta = require('./'+command.toLowerCase()+'.js')
      let data = meta.meta
      log(client, args, data.name)
      meta.run(client, args, message, prefix)
      //if file exists run it, else check all alias's
    } catch (err) {
      const fs = require('fs')
      let list = fs.readdirSync('./Data/Commands/')
      //list = list.split(',')
      for(let i = 0; i < list.length; i++) {
        if(list[i] != 'handler.js' && list[i] != 'API' && list[i] != 'Modules') {
          let tmp = require('./'+list[i])
          let tmp2 = tmp.meta
          let alias = tmp2.alias.split(',')
          if(alias.length == 0) return;
          for(let i = 0; i < alias.length; i++){
            if(alias[i].toLowerCase() == command.toLowerCase()){
              tmp.run(client, args, message, prefix)
            }
          }
        }
      }
      //console.log(err)
    }
  }
}

module.exports = methods;