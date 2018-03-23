let methods = {
  meta: {
    name: "Reboot",
    desc: "Reboot Bot",
    alias: "",
    cat: "Private",
    syntax: "{prefix}reboot"
  },
  run : async function(client, args, message) {
    if (message.author.id != process.env.ownerID) {
        message.channel.send('**reboot **| 🔐 | You cannot reboot me, You are not my creater <@282819886198030336> 💻');
        return;
    }
    await message.channel.send('**SYSTEM **| ⚠️ | Rebooting...');
    await console.log('**SYSTEM **| ⚠️ | Rebooting...');
    process.exit();
    return;
  }
}

module.exports = methods;