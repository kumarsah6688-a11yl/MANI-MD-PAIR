const os = require('os');

const templates = {
    search: (query) => `╭─────────────────────────────⭓
│        🔍 SEARCH SYSTEM
├─────────────────────────────
│ ⏳ Initializing search...
│ 📝 Query    : ${query}
│ 🌐 Engine   : Multi Search
│ ⚡ Status   : Searching...
│
│ ▰▰▱▱▱▱▱▱ 25%
╰─────────────────────────────⭓`,

    download: (title, quality = 'Auto', speed = 'High', progress = '65') => `╭─────────────────────────────⭓
│      📥 DOWNLOAD ENGINE
├─────────────────────────────
│ 🎬 Media      : ${title}
│ 📦 Quality    : ${quality}
│ 🚀 Speed      : ${speed}
│ 📊 Progress   : ${progress}%
│
│ ▰▰▰▰▰▱▱▱ 65%
╰─────────────────────────────⭓`,

    ai: () => `╭─────────────────────────────⭓
│         🤖 AI CORE
├─────────────────────────────
│ 🧠 Analyzing Request...
│ 💭 Generating Response...
│ ⚡ Optimizing Output...
│
│ ▰▰▰▱▱▱▱▱ 40%
╰─────────────────────────────⭓`,

    tagall: (message) => `╭─────────────────────────────⭓
│        📢 TAG ALL
├─────────────────────────────
│ 👥 Mentioning Members...
│ 💬 Message:
│ ${message}
│
│ ⚡ Please wait...
╰─────────────────────────────⭓`,

    processing: () => `╭─────────────────────────────⭓
│       ⚙️ PROCESSING
├─────────────────────────────
│ 🔄 Executing Command...
│ ⏳ Please Wait...
│
│ ▰▰▰▰▰▰▱▱ 80%
╰─────────────────────────────⭓`,

    uploading: (filename, size = 'Unknown') => `╭─────────────────────────────⭓
│        ☁️ UPLOADING
├─────────────────────────────
│ 📄 File      : ${filename}
│ 📦 Size      : ${size}
│ 🚀 Uploading...
│
│ ▰▰▰▰▰▰▰▱ 90%
╰─────────────────────────────⭓`,

    success: (time = new Date().toLocaleTimeString()) => `╭─────────────────────────────⭓
│        ✅ SUCCESS
├─────────────────────────────
│ 🎉 Task Completed
│ ⚡ Status : Success
│ 🕒 Time   : ${time}
│ ✨ Thank you for using the bot!
╰─────────────────────────────⭓`,

    failed: (error) => `╭─────────────────────────────⭓
│         ❌ FAILED
├─────────────────────────────
│ 🚫 Task Failed
│ 📄 Reason : ${error}
│ 🔄 Try Again Later
╰─────────────────────────────⭓`,

    security: () => `╭─────────────────────────────⭓
│       🛡 SECURITY CHECK
├─────────────────────────────
│ 🔍 Scanning Request...
│ 🔐 Validating Access...
│ ✅ Secure Connection
╰─────────────────────────────⭓`,

    status: (ping, ram, uptime) => `╭─────────────────────────────⭓
│        🚀 BOT STATUS
├─────────────────────────────
│ 🟢 Status : Online
│ ⚡ Ping   : ${ping} ms
│ 💾 RAM    : ${ram}
│ ⏱ Uptime : ${uptime}
╰─────────────────────────────⭓`
};

module.exports = templates;
