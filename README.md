# Website Text Checker with Playwright and Discord Webhook

This Node.js script uses **Playwright** to check if a website contains specified text on load.
It sends a notification to a **Discord webhook** indicating whether the text was found.

---

## Requirements

* Node.js (v14 or newer recommended)
* A Discord webhook URL

---

## ⚙️ Setup

**Clone or download this repository**

---

**Install dependencies**

```bash
npm install
```

---

**Install Playwright browsers**

Playwright requires a one-time browser install:

```bash
npx playwright install
```

---

**Create a `.env` file**

In your project root:

```env
DISCORD_WEBHOOK_URL=YOUR_DISCORD_WEBHOOK_URL
```

You can copy `example.env` as a template:

```bash
cp example.env .env
```

Make sure your real webhook is in `.env`
`.env` is ignored by git (see `.gitignore`)

---

## Configuration

Open `checkTextAndNotify.js` and update:

```javascript
const URL = 'https://example.com';        // URL to check
const TEXT_TO_FIND = 'Example Domain';    // Text to look for
```

---

## Run

Run the script:

```bash
node checkTextAndNotify.js
```

The script will:

Open the page in a headless browser
Check for the specified text
Send a Discord message with the result

---

## Files

* `checkTextAndNotify.js` — main Node.js script
* `.env` — contains your Discord webhook URL (not committed)
* `example.env` — example structure for the `.env`
* `.gitignore` — excludes `node_modules`, `.env`, Playwright outputs, etc.

---

## Notes

* You can change `waitUntil` in `page.goto` if you want to wait for full load or network idle.
* This script can be extended for multiple URLs, scheduling, or more complex text checks.
* Remember to **keep your webhook URL safe** — don't share your `.env`.

---