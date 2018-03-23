var methods = {
  meta: {
    name: "Support",
    desc: "Request Support",
    alias: "",
    cat: "Utils",
    syntax: "{prefix}support"
  },
  run: function(client, args, message) {
    if (message.channel.type == 'dm') {
        let mes = (`

== NOTICE ==

By clicking join you agree to the following ::

TB-SupportStaff may collect information using 'TitanBolt' 
and collect any data provided publically and collected privately

TB-SupportStaff are not reliable for any damages this may cause to your servers bot 'TitanBolt'
We as a third-party cannot release any details collected using TitanBolt

Your conversations with TB-SupportStaff may be kept for training and security purposes.

----- AS OF 1st January 2018 -----
TB will not collect any private data
----------------------------------

We hope to see you soon ::
`);
        message.channel.send("```asciidoc"+mes+"```");
        var SUPPORT = client.guilds.get("395657844982022145");
        console.log('Support Case created for : '+message.author.tag.replace(/ +/g,'-').replace('#', '_').toLowerCase());
        SUPPORT.createChannel(message.author.tag.replace(/ +/g,'-').replace('#', '_').toLowerCase(), 'text').then(c => {
          c.send('Welcome to TB-Support !\nPlease send a question regarding me and a support member will reply shortly !');
          c.createInvite().then(invite =>
            message.channel.send(invite.url)
          );
        });
       } else {
        message.channel.send("**support** | ⚠️ | This command can only be used in DM with me !");
    }
  }
  
}

module.exports = methods;