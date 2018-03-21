var methods = {
    run: async function(client, args, message){
      //console.log(message.member.roles);
      let member;
      let member2;
      try {
      if(message.mentions.users.first() == undefined) {
        member = message.author;
        member2 = message.member
      } else {
        member = message.mentions.users.first()
        member2 = message.mentions.members.first()
      }
      let game = member.presence.game;
      try{
      if(game.type == 0) game = "Playing: '"+game.name+"'";
      if(game.type == 1) game = "Streaming: '"+game.name+"'";
      if(game.type == 2) game = "Listening To: '"+game.name+"'";
      if(game.type == 3) game = "Watching: '"+game.name+"'";
      } catch(err) {}
      if(game == undefined || game == null) game = 'Not playing...';
      let nick = member2.nickname;
      if(nick == undefined) nick = member.username;
      let prefab = `
Information for ${member.username}#${member.discriminator}

General
------------------------------
ID             :: ${member.id}
Nickname       :: ${nick}
Created On     :: ${member.createdAt.toString()}

Other
------------------------------
Current Status :: ${member.presence.status} - ${game}
Roles          :: ${member2.roles.size} Roles:
${member2.roles.map(r => r.name).join(', ')}

`;
      message.channel.send('```asciidoc'+prefab+'```');
      } catch (err) {
        console.log(err)
        message.channel.send('A error occured, let me try a simplified version...');
        try {
          if(message.mentions.members.first() == undefined) {
        member = message.author;
      } else {
        member = message.mentions.users.first()
      }
      let game = member.presence.game;
      try{
      if(game.type == 0) game = "Playing: '"+game.name+"'";
      if(game.type == 1) game = "Streaming: '"+game.name+"'";
      if(game.type == 2) game = "Listening To: '"+game.name+"'";
      if(game.type == 3) game = "Watching: '"+game.name+"'";
      } catch(err) {}
      if(game == undefined || game == null) game = 'Not playing...';
      let nick = message.member.nickname;
      if(nick == undefined) nick = message.author.username;
      let prefab = `
Information for ${member.username}#${member.discriminator}

General
------------------------------
ID             :: ${member.id}
Nickname       :: ${nick}
Created On     :: ${member.createdAt.toString()}

Other
------------------------------
Current Status :: ${member.presence.status} - ${game}

`;
      message.channel.send('```asciidoc'+prefab+'```');
        } catch (err) {
          message.channel.send('Oh No, my backup plan failed sorry\nTo help us fix this please use the support command !'); 
        }
      }
    }
}

module.exports = methods;