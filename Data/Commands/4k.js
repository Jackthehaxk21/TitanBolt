const methods = { 
  meta: {
    name: "4k",
    desc: "Get a random 4k image",
    alias: "",
    cat: "Image",
    syntax: "{prefix}4k"
  },
  run: function(client, args, message){
    if (!message.channel.nsfw) return message.channel.send("🔞" + " Cannot display NSFW content in a SFW channel.");
    const randomPuppy = require('random-puppy');
    const request = require('snekfetch');
    const fs = require("fs") 
    var subreddits = [
        'NSFW_Wallpapers',
        'SexyWallpapers',
        'HighResNSFW',
        'nsfw_hd',
        'UHDnsfw'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
    randomPuppy(sub).then(url => {
      message.channel.send({ embed: { title: '4K', image: { url: url }} });
    })
  }
}

module.exports = methods;