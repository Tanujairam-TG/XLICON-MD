const { cmd, tlang, sleep } = require('../lib');

cmd(
  {
    pattern: "restart",
    desc: "To restart bot",
    category: "tools",
    filename: __filename,
  },
  async (Void, citel, text, { isCreator }) => {
    if (!isCreator) return citel.reply(tlang().owner);

    const { exec } = require("child_process");

    // Notify the user that the bot is restarting
    citel.reply('Restarting...');

    try {
      // Add a delay of 2 seconds (2000ms) before restarting
      await sleep(2000);

      // Restart the bot using PM2 (ensure PM2 is installed and configured)
      exec('pm2 restart all', (error, stdout, stderr) => {
        if (error) {
          // Handle any errors that occurred during the restart
          console.error('Restart failed:', error);
          citel.reply('Restart failed. Check logs for details.');
        } else {
          console.log('Bot restarted successfully:', stdout);
          citel.reply('Bot restarted successfully.');
        }
      });
    } catch (err) {
      // Handle any exceptions that might occur
      console.error('Error during restart:', err);
      citel.reply('An error occurred during restart. Check logs for details.');
    }
  }
);
