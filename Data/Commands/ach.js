module.exports.run = async function(client, args, message) {
  let text = args.join(" ");
      if (text.length < 1) return message.channel.send("You must give an achievement description.");
      if (text.length > 22) return message.channel.send("I can only handle a maximum of 22 characters");
      const img = await message.author.displayAvatarURL.replace(/\.(gif|jpg|png|jpeg)\?size=2048/g, '.png?size=32');
      await message.channel.send({ files: [{ attachment: 
        await client.API.achievement(img, text), name: 'achievement.png' }] }); ;
      return;
}