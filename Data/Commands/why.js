module.exports = {
  meta: {
    name: "Why",
    desc: "Why are you blacklisted ?",
    alias: "",
    cat: "Utils",
    syntax: "{prefix}why"
  },
  
  run: async function(client, args, message){
    let data = client.bans[message.author.id]
    if(data == undefined) return;
    else{
      try {
        message.channel.send('```asciidoc'+`
=== Blacklisted ===

User   :: ${data.tag}
Date   :: ${data.date}
Reason :: ${data.reason}

=== Blacklisted ===
`+'```');
      } catch (err) {}
    }
  }
}