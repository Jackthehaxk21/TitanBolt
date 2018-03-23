//HERE
//HERE
//HERE
var methods = {
  meta: {
    name: "money",
    desc: "Get your money balance",
    alias: "balance",
    cat: "Social",
    syntax: "{prefix}money"
  },
  run: async function(client, args, message) {
       //message.channel.send("Sorry but the social commands are down for repair\nVery sorry for any inconvienve caused.");
       //return;
       let newTime = Date.now();
       try {
         let data = client.points.get(message.author.id+'-'+message.guild.id);
         message.channel.send('🏧 | You have $'+data.money);
         return;
       } catch (err) {
         let data = require('../../points.json');
         data.daily = newTime;
         client.points.set(message.author.id+'-'+message.guild.id, data);
         message.channel.send('🏧 | You have $0 ');
       }
  },
  
  owner: async function(client, args, message) {
       if(message.author.id != process.env.ownerID) return;
       if(args.length != 2) return;
       let m =  parseInt(args[1]);
       let guyID = await message.mentions.members.first();
       //console.log(guyID);
       let newTime = Date.now();
       try {
         let data = client.points.get(guyID.id+'-'+message.guild.id);
         data.money += m;
         client.points.set(guyID.id+'-'+message.guild.id, data);
         message.channel.send('**OVERIDE **| 🏦 | You\'ve given '+guyID.user.username+' $'+m);
         message.channel.send('**OVERIDE **| 🏦 | '+guyID.user.username+' now has $'+(parseInt(data.money)+m));
         return;
       } catch (err) {
         let data = require('../../points.json');
         data.money += m;
         data.daily = newTime;
         client.points.set(guyID.id+'-'+message.guild.id, data);
         message.channel.send('**OVERIDE **| 🏦 | You\'ve given '+guyID.user.username+' $'+m);
         message.channel.send('**OVERIDE **| 🏦 | '+guyID.user.username+' now has $'+m);
         return;
       }
  }
}

module.exports = methods;