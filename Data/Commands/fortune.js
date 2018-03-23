let methods = {
  meta: {
    name: "Fortune",
    desc: "Get a random Fortune",
    alias: "",
    cat: "Fun",
    syntax: "{prefix}fortune"
  },
  run : function(client, args, message) {
    const fortune = require('../fortune-cookie.json');
    var ID = Math.floor(Math.random() * fortune.length); 
    var randomAnswer = fortune[ID];
    message.channel.send('```'+ randomAnswer + '```');
  }
}

module.exports = methods;