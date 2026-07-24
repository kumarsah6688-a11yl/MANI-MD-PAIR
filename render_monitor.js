const axios = require('axios');

const RENDER_URL = process.env.RENDER_EXTERNAL_URL;
const INTERVAL = 5 * 60 * 1000; // 5 minutes

function startMonitor() {
    if (!RENDER_URL) {
        console.log('[Render Monitor] RENDER_EXTERNAL_URL not set. Skipping self-ping.');
        return;
    }

    console.log(`[Render Monitor] Starting self-ping for: ${RENDER_URL}`);
    
    setInterval(async () => {
        try {
            await axios.get(RENDER_URL);
            console.log(`[Render Monitor] Self-ping successful at ${new Date().toLocaleTimeString()}`);
        } catch (error) {
            console.error(`[Render Monitor] Self-ping failed: ${error.message}`);
        }
    }, INTERVAL);
}

module.exports = { startMonitor };
