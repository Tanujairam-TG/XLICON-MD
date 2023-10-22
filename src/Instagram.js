const { cmd } = require('../lib');
const fetch = require('node-fetch');

cmd({
    pattern: "insta",
    desc: "Download Instagram post.",
    category: "downloader",
    filename: __filename
},
async (Void, citel, text) => {
    if (!text) return citel.reply('Give me an Instagram post URL.');
    
    let data;
    try {
        data = await (await fetch('https://inrl-web.onrender.com/api/insta?url=' + text)).json();
    } catch (error) {
        return citel.reply('An error occurred: ' + error.message);
    }

    return Void.sendMessage(citel, { 'video': { 'url': data[0] } });
});
