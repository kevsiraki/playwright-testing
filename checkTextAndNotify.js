const { chromium } = require('playwright');
const axios = require('axios');
require('dotenv').config();

// CONFIG
const URL = 'https://www.kevinsiraki.com/playwright-test'; // The website to check
const TEXT_TO_FIND = 'Hello World!'; // The text you're looking for
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
