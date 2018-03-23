let methods = {
  run : async function(client, member) {
    if(!client.ready) return;
    //console.log("start")
    //console.log(member)
    if (member.guild.id == "395657844982022145") {
      //console.log(member.user.username+'#'+member.user.discriminator);
      member.addRole(member.guild.roles.find("name", "Member"));
      let chan = (member.user.username+'#'+member.user.discriminator).replace(/ +/g,'-').replace('#', '_').toLowerCase();
      chan = member.guild.channels.find('name', chan);
      //console.log(chan.overwritePermissions(member, {'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'ATTACH_FILES': true, 'READ_MESSAGES': true}, 'JOIN-PERMS'));
    } else {
      try {
      //console.log("else")
      const guild = member.guild;
      let defaultChannel = guild.channels.find("name", client.settings.get(member.guild.id).joinChannel);
      //if (!defaultChannel) defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
      //if (client.settings.get(member.guild.id).welcomeMessageOn != "true" && client.settings.get(member.guild.id).welcomeMessageOn != "True") return;
      try {
        const { user } = member;
        const img = await member.user.displayAvatarURL.replace(/\.(gif|jpg|png|jpeg)\?size=2048/g, '.png?size=128');
     
        await defaultChannel.send({ files: [{ attachment: await client.API.welcome("gearz", user.bot, img, user.tag,`${member.guild.name}#${member.guild.memberCount}`), name: "welcome.png"}] })
        //defaultChannel.send("Everyone look like your doing something as\n**" + member.user.username+"** Has arrived");
      } catch (err) {
        console.log("error");
      }
      } catch (err) {}
    }
  }
}

module.exports = methods;
