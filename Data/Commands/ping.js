let methods = {
  meta: {
    name: "Ping",
    desc: "Ping API and Bot",
    alias: "",
    cat: "Utils",
    syntax: "{prefix}ping"
  },
  run : async function(client, args, message) {
    const msg = await message.channel.send('Ping!');
    msg.edit(`🏓 Pong! (Roundtrip took: ${msg.createdTimestamp - message.createdTimestamp}ms. ❤️: ${Math.round(client.ping)}ms.)`);
  }
}

module.exports = methods;