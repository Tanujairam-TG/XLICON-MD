const axios = require('axios');
const fs = require('fs-extra');
const { plugins, plugindb, remove, isUrl, cmd, tlang, Config } = require('../lib');

cmd({
  pattern: "plugins",
  alias: ['plugin'],
  category: "owner",
  desc: "Shows a list of all externally installed modules",
  filename: __filename
}, async (Void, citel, text, { isCreator }) => {
  if (!isCreator) return citel.reply(tlang().owner);
  const allmodtext = `*All Installed Modules are:*\n\n${await plugins()}`;
  return citel.reply(allmodtext);
});

cmd({
  pattern: "remove",
  alias: ['uninstall'],
  category: "owner",
  desc: "Removes external modules.",
  filename: __filename
}, async (Void, citel, text, { isCreator }) => {
  if (!isCreator) return citel.reply(tlang().owner);
  if (!text) return citel.reply("*_Uhh Please, Provide Me Plugin Name_*");

  if (text === 'alls') {
    await plugindb.collection.drop();
    return citel.reply('Deleted all plugins from Secktor.');
  }

  try {
    const kill = await remove(text.split(" ")[0]);
    delete require.cache[require.resolve(__dirname + "/" + text + ".js")];
    fs.unlinkSync(__dirname + "/" + text + ".js");
    await citel.reply(`*_${kill}_* \n*Please Wait _${Config.botname}_ Restarting_*`);
    const { exec } = require("child_process");
    exec('pm2 restart all');
  } catch (e) {
    return citel.reply("*_Plugin Not Found In MongoDB Server_*");
  }
});

cmd({
  pattern: "install",
  category: "owner",
  desc: "Installs external modules.",
  filename: __filename
}, async (Void, citel, text, { isCreator }) => {
  if (!isCreator) return citel.reply(tlang().owner);
  if (!text) {
    return citel.reply("*_Uhh Please, Provide Me Plugin Name_*");
  }

  // Insert your logic to install external modules here
});
     
