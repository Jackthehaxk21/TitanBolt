module.exports = {
  meta: {
    name: "fml",
    desc: "Get a random FML",
    alias: "",
    cat: "Fun",
    syntax: "{prefix}fml"
  },
  run: async function(client, args, message) {
    let data
    const snek = require('snekfetch')
    try {
      data = await snek.get('https://mk-web.glitch.me/api/fml?token=test')
    } catch (err) {
      message.channel.send("Service Temporarily Unavailable")
      return;
    }
    message.channel.send('`'+JSON.parse(data.text).body+'`')
    return;
  }
}