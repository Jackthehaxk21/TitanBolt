let methods = {
  meta: {
    name: "TEST",
    desc: "TESTING PURPOSE",
    alias: "",
    cat: "Private",
    syntax: "{prefix}test"
  },
  run: async function(client, args, message){
    return;
    const snekfetch = require('snekfetch')
    const body = await snekfetch.get("https://mk-web.glitch.me/API/quote").set("Authentication", "test");
    message.channel.send(body.text)
    return;
  }
}

module.exports = methods;