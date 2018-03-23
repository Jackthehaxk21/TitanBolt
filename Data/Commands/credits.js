module.exports = {
  meta: {
    name: "credits",
    desc: "Show the bot credits",
    alias: "",
    cat: "Utils",
    syntax: "{prefix}credits"
  },
  run : function(client, args, message) {
        var help = `
==== All Credits ====

Bot-Owner    :: Jackthehaxk21#8860

QA Testers   :: ThatBirdGuyMees#4196
                Jackthehaxk21#8860
                SkilledTheGamer#4759
                UserBot#1670 [BOT]

Idiot API    :: York#0001

Profile Pic  :: https://thenounproject.com/rflor/

Joke Assets  :: taivo@pungas.ee

Quote Assets :: https://gist.github.com/JanGross

==== All Credits ====
`;
        message.channel.send(help, {code:'asciidoc'});
        return;
    }
}