let methods = {
  meta: {
    name: "Quote",
    desc: "Get a random quote",
    alias: "",
    cat: "Fun",
    syntax: "{prefix}quote <ID - optional>"
  },
  run : async function(client, args, message) {
    const snek = require('snekfetch')
    let quote
    if (args.length == 0) {
      let data
        try{
          data = await snek.get('https://mk-web.glitch.me/api/quote?token=test')
        } catch(err) {
          message.channel.send("Server Temporarily Down")
          return;
        }
        quote = data.text
    } else {
      if (parseInt(args[0]) < 267 && parseInt(args[0]) >= 0) {
        let data 
        try {
          data = await snek.get('https://mk-web.glitch.me/api/quote?token=test&id='+args[0])
        } catch (err) {
          message.channel.send("Server Temporarily Down")
          return;
        }
        quote = data.text
      } else {
          message.reply("No such quote exists under ID: `"+args[0]+"`");
          return;
      }
    }
    message.channel.send('```' +quote+ '```');
  }
}

module.exports = methods;