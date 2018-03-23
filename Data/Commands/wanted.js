let methods = {
  meta: {
    name: "Wanted",
    desc: "Generate a wanted poster",
    alias: "",
    cat: "Image",
    syntax: "{prefix}wanted"
  },
  run: async function(client, args, message) {
    const img = await message.author.displayAvatarURL.replace(/\.(gif|jpg|png|jpeg)\?size=2048/g, '.png?size=128');
        
    await message.channel.send({ files: [{ attachment: 
        await client.API.wanted(img), name: 'wanted.png' }] }); ;
  }
}

module.exports = methods;