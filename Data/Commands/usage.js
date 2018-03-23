let methods = {
  meta: {
    name: "Usage",
    desc: "See Command Usage",
    alias: "",
    cat: "Utils",
    syntax: "{prefix}usage <Command Name>"
  },
  run: function(client, args, message, prefix) {
    let command = args[0];
    if (command == undefined || command == null) {
      message.channel.send('**Usage **| ⚠️ | Invalid usage e.g. usage kick');
      return;
    } else {
      command = command.toLowerCase();
      try {
        let meta = require('./'+command+'.js').meta
        let alias = meta.alias
        if(alias == '') alias = 'None'
        var txt = `
Title   :: ${meta.name}
Desc    :: ${meta.desc}
Usage   :: ${meta.syntax.replace('{prefix}', prefix)} 
Alias   :: ${alias}
`;
        message.channel.send(txt, {code:'asciidoc'});
        return;
      } catch (e) {
        message.channel.send('**usage** | ⚠️ | Command `'+command+'` Not found.');
        return;
      }
    }
  }
}

module.exports = methods;