let methods = {
  run: async function(client, args, message){
    return;
    const snekfetch = require('snekfetch')
    const { body } = await snekfetch.get("https://mk-dashboard.glitch.me/API/quote").set("Authentication", "TOKEN HERE");
    message.channel.send(body)
    return;
  }
}

module.exports = methods;