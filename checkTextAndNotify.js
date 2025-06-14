const { chromium } = require('playwright');
const axios = require('axios');
require('dotenv').config();

// CONFIG
const URL = 'https://demo.kevinsiraki.com/ip'; // The website to check (using load balancer IP text as it changes per request.)
const TEXT_TO_FIND = '192.168.1.86'; // The text you're looking for, alternates between 192.168.1.86 (Raspberry Pi 4 Node) and 192.168.1.134 (Raspberry Pi 5 Node)
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

if (!DISCORD_WEBHOOK_URL) {
  console.error('❌ DISCORD_WEBHOOK_URL is not set in .env');
  process.exit(1);
}

async function sendDiscordNotification(message) {
  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: message
    });
    console.log('✅ Discord notification sent!');
  } catch (error) {
    console.error('❌ Failed to send Discord notification:', error.message);
  }
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
    const pageContent = await page.content();

    if (pageContent.includes(TEXT_TO_FIND)) {
      console.log(`✅ The text "${TEXT_TO_FIND}" was found.`);
      await sendDiscordNotification(`✅ The text "${TEXT_TO_FIND}" was found on ${URL}`);
    } else {
      console.log(`❌ The text "${TEXT_TO_FIND}" was NOT found.`);
      await sendDiscordNotification(`❌ The text "${TEXT_TO_FIND}" was NOT found on ${URL}`);
    }
  } catch (err) {
    console.error('❌ Error during check:', err.message);
    await sendDiscordNotification(`❌ Error during check on ${URL}: ${err.message}`);
  } finally {
    await browser.close();
  }
})();
