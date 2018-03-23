module.exports.meta = {
  name: "play",
  desc: "Youtube Command",
  alias: "yt,youtube,music",
  cat: "Music",
  syntax: "SEE {prefix}play help"
},
module.exports.run = async function(client, args, message, prefix){
  const ytdl = require('ytdl-core');
  let voiceChannel;
  if (message.channel.type == 'text') {
    voiceChannel = message.member.voiceChannel;
  }
  try {
    voiceChannel.leave();
  } catch(er){}
  if(args[0] == 'help') {
    //help docs
    return message.channel.send('```asciidoc'+`
=== Music Docs ===

${prefix}play -link <www.youtube.com link here>
${prefix}play -search <music search text>
${prefix}play -leave (Leaves music channel)

MADE BY Jackthehaxk21#8860

=== Music Docs ===
`+'```')
  }
  if(args.length == 0) return message.reply('Please use `'+prefix+'play help` to see help');
  if((args[0] != '-link' && args[0] != '-search')&& args[0] != '-leave') return message.reply('Wrong tag please use `'+prefix+'play help`')
  if(args.length < 2 && args[0] != '-leave') return message.reply('Please use `'+prefix+'play help` to see help');
  let tag = args.shift();
  if(tag == '-link'){
    if (!voiceChannel) {
      message.channel.send("You are not in a voice channel to play music!");
      return;
    }
    let link = args.shift()
    let TMP = link.replace('https://www.youtube.com/watch?v=','{TMP}').replace('https://youtu.be/','{TMP}');
    if(!(TMP.includes('{TMP}'))) return message.channel.send('Invalid link');
    let id = link.replace('https://www.youtube.com/watch?v=','').replace('https://youtu.be/','');
    let broken;
    ytdl.getInfo(id,  (err, info) => {
      if (err) {
        message.channel.send("Invalid Youtube video");
        broken = true;
      }
      else broken = false;
    });
    if(broken) return;
    try {
      voiceChannel.join()
        .then(connection => {
          message.channel.send('Now playing: <'+link+'>')
          const stream = ytdl(link, { filter: 'audioonly', quality: 'lowest' });
          const dispatcher = connection.playStream(stream);
          dispatcher.on('end', () => {
            voiceChannel.leave();
          });
        });
    } catch (err) {
      message.reply("Oh No, I cant join you're voice channel\nIs there space ?\nAm i allowed ?");
    }
  }
  if(tag == '-search'){
    if (!voiceChannel) {
      message.channel.send("You are not in a voice channel to play music!");
      return;
    }
    const key = process.env.YT_KEY; 
      const yss = require('youtube-simple-search');
      
      function search(text) {
        global.searched = text;
        yss( {key: key, query: text, maxResults: 1}, callback );
        //console.log('Search');
      }
      async function callback(result) {
        let YT_DATA = [];
	      YT_DATA = result;
        //if (YT_DATA[0].snippet.title && YT_DATA[1].snippet.title && YT_DATA[2].snippet.title && YT_DATA[3].snippet.title && YT_DATA[4].snippet.title) message.channel.send('**YouTube** | No results found.');
        //console.log(YT_DATA[0]);
        //console.log(YT_DATA[1]);
        try {
            let tmp = YT_DATA[0].id.videoId
            /*.addField('1) ' + YT_DATA[0].snippet.title,
                    YT_DATA[0].snippet.description)//+"https://www.youtube.com/watch?v=" + YT_DATA[0].id.videoId)*/
          } catch (err) {
            message.channel.send('No results found for your search.'); 
            return;
          }
        message.channel.send('```asciidoc'+`
=== Now Playing: ===

Title :: ${YT_DATA[0].snippet.title}

Desc  :: ${YT_DATA[0].snippet.description}

Link  :: https://www.youtube.com/watch?v=${YT_DATA[0].id.videoId}

`+'```');
        //message.channel.send("Playing: <https://www.youtube.com/watch?v="+YT_DATA[0].id.videoId+'>')
        try {
      voiceChannel.join()
        .then(connection => {
          const stream = ytdl("https://www.youtube.com/watch?v="+YT_DATA[0].id.videoId, { filter: 'audioonly', quality: 'lowest' });
          const dispatcher = connection.playStream(stream);
          dispatcher.on('end', () => {
            voiceChannel.leave();
          });
        });
    } catch (err) {
      message.reply("Oh No, I cant join you're voice channel\nIs there space ?\nAm i allowed ?");
    }
        //console.log(YT_DATA);
      }
      search(args.join(' '));
  }
  if(tag == '-leave'){
    let voiceChannel;
    if (message.channel.type == 'text') {
      voiceChannel = message.member.voiceChannel;
    }
    if(!voiceChannel) return message.reply('You have to be in the voice channel you want me to leave');
    if (voiceChannel.connection) {
      voiceChannel.leave();
      message.channel.send("Stopped Music");
    } else {
      message.channel.send("Stopped Music");
    }
  }
}