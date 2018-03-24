let methods = {
  run : async function(client, prefix) {
    //console.log(process.memoryUsage())
    const fs = require('fs')
    client.afk = await JSON.parse(fs.readFileSync("./Data/afk.json", "utf8"));
    client.bans = await JSON.parse(fs.readFileSync("./Data/Bans.json", "utf8"));

    client.getIP = function(req) {
      var ip;
      if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
      } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
      } else {
        ip = req.ip;
      }
      return ip;
    }
    client.sendAPISPAM = async function(txt){
      var MK = client.guilds.get("393114138135625749")
      //console.log(MK);
      var MK2 = MK.channels.find("name", "api-spam");
      MK2.send('LOG | '+txt);
    }
    client.getQuote = async function(){
      const data = require('../../Quotes.json');
      let random = await Math.floor(Math.random()*266);
      let respond = await data[random]
      var MK = client.guilds.get("393114138135625749")
      //console.log(MK);
      var MK2 = MK.channels.find("name", "api-spam");
      MK2.send('API/quote - '+random);
      let dat = respond
      return dat;
    }
    client.getJoke = async function(){
      const data = require('../../Jokes.json');
      let num = await Math.floor(Math.random()*data.length)
      let random = await data[num]
      var MK = client.guilds.get("393114138135625749")
      //console.log(MK);
      var MK2 = MK.channels.find("name", "api-spam");
      MK2.send('API/joke - '+ num);
      return random;
      
    }
    client.getFortune = async function(){
      const data = require('../../fortune-cookie.json');
      let num = await Math.floor(Math.random()*data.length)
      let random = await data[num]
      var MK = client.guilds.get("393114138135625749")
      //console.log(MK);
      var MK2 = MK.channels.find("name", "api-spam");
      MK2.send('API/fortune - '+ num);
      return random;
    }
    client.commands = fs.readdirSync('./Data/Commands/')
    client.user.setPresence({game: {name: " tb!help | Servers: " + client.guilds.size, type: 0}});
    console.log('[SYS] | 💻 | I am ready!');
    const dbl = require('../../../Data/Functions/dbl.js');
    dbl.run(client);
    client.dreams = ['Test #1','Test #2']
    
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');

client.settings = new Enmap({ provider: new EnmapLevel({ name: 'settings' }) });
 
(async function() {
    await client.settings.defer;
    console.log(client.settings.size + ' keys loaded (settings)');
}());
    
// Oh look a shortcut to initializing;)
client.points = new Enmap({ provider: new EnmapLevel({ name: 'points' }) });
 
(async function() {
    await client.points.defer;
    console.log(client.points.size + ' keys loaded (points)');
}());
    
    
    client.coolDown = new Enmap({ provider: new EnmapLevel({ name: 'coolDown' }) });
 
(async function() {
    await client.coolDown.defer;
    console.log(client.coolDown.size + ' keys loaded (coolDown)');
}());
    
    const http = require('http')
    setInterval(() => {
      http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 25000);
    
    setInterval(() => {
      //console.log('ping');
      fs.writeFile("./Data/afk.json", JSON.stringify(client.afk), (err) => {
        if (err) console.error(err)
      });
  }, 15000);
    
    setInterval(() => {
      //console.log('ping');
      fs.writeFile("./Data/Bans.json", JSON.stringify(client.bans), (err) => {
        if (err) console.error(err)
      });
  }, 15000);
    
    
    
    client.ready = true;    
  }
}

module.exports = methods;