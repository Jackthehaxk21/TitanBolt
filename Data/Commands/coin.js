var methods = {
  meta: {
    name: "Coin",
    desc: "Flip a coin",
    alias: "flip",
    cat: "Fun",
    syntax: "{prefix}coin"
  },
    run : function(client, args, message) {
            var coin = ['Heads','Tails'];
            if (args[0] != undefined) {
              message.channel.send("**Coin** | ⚠️ | No arguments are needed.\n ");
            }
            var random = Math.floor(Math.random()*2);
            message.channel.send("**Coin** | "+coin[random]);
    }
}

module.exports = methods;