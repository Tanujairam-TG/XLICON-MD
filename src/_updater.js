const DB = require('../lib/scraper');
const { execSync } = require('child_process');
const { tlang, Config, prefix, cmd } = require('../lib');

cmd({
    pattern: "update",
    desc: "Shows repo's refreshed commits.",
    category: "misc",
    filename: __filename
},
async (Void, citel, text, { isCreator }) => {
    if (!isCreator) {
        return citel.reply('This command is only for my owner');
    }

    try {
        let commits = await DB.syncgit();

        if (commits.total === 0) {
            citel.reply(`Hey ${citel.pushName}. You have the latest version installed.`);
        } else {
            let update = await DB.sync();
            return await Void.sendMessage(citel.chat, { text: update });
        }
    } catch (error) {
        console.error('Error during update check:', error);
        citel.reply('An error occurred while checking for updates. Please try again later.');
    }
});
