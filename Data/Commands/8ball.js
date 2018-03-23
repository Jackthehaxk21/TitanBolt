 let methods = {
  meta: {
    name: "8Ball",
    desc: "What does the ball say ?",
    alias: "",
    cat: "Social",
    syntax: "{prefix}8ball <QUESTION>"
  },
  run : function(client, args, message) {
      const eight_ball = require('../8Ball.json');
      if (args[0] == undefined) {
          message.channel.send("🎱 | ⚠️ No questions provided ⚠️");
          return;
      }
      message.channel.send("🎱 | "+eight_ball[Math.floor(Math.random() * eight_ball.length)]);
  }
  
}

module.exports = methods;