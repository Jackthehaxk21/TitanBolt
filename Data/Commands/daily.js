module.exports = {
  meta: {
    name: "Daily",
    desc: "Claim your daily money",
    alias: "",
    cat: "Social",
    syntax: "{prefix}daily"
  },
  run: async function(client, args, message) {
       //message.channel.send("Sorry but the social commands are down for repair\nVery sorry for any inconvienve caused.");
       //return;
       let newTime = Date.now()+86400000;
       try {
         let data = client.points.get(message.author.id+'-'+message.guild.id)
         if(data.daily <= Date.now()) {
           data.money += 100
           data.daily = newTime;
           message.channel.send('🏧 | You\'ve claimed your $100, come back in 24 hours for more !!');
          return;
         } else {
           message.channel.send('🏧 | Please wait '+(Math.floor((((Date.now()-data.daily)/1000)/60)/60))+'- Hours.');
           return;
         }
       } catch (err) {
         let data = require('../../points.json');
         data.money += 100;
         data.daily = newTime;
         message.channel.send('🏧 | You\'ve claimed your $100, come back in 24 hours for more !!');
         client.points.set(message.author.id+'-'+message.guild.id, data);
         return;
       }
  }
}