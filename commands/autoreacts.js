async function autoreactsCommand(sock, from, msg, isAdmin, session, botData, saveBotData, args) {
    if (!isAdmin) return await sock.sendMessage(from, { text: "❌ Only owner can use this command." }, { quoted: msg });
    
    const action = args[0]?.toLowerCase();
    const userId = session.userId;

    if (!botData.statusSettings[userId]) botData.statusSettings[userId] = {};
    const settings = botData.statusSettings[userId];

    if (action === 'on') {
        settings.autoReact = true;
        saveBotData();
        await sock.sendMessage(from, { text: "✅ Auto-React Enabled!" }, { quoted: msg });
    } else if (action === 'off') {
        settings.autoReact = false;
        saveBotData();
        await sock.sendMessage(from, { text: "❌ Auto-React Disabled!" }, { quoted: msg });
    } else if (action === 'set' && args[1]) {
        const emojis = args.slice(1).join('').split('');
        settings.customEmojis = emojis;
        saveBotData();
        await sock.sendMessage(from, { text: `✅ Custom Auto-React Emojis Set: ${emojis.join(' ')}` }, { quoted: msg });
    } else if (action === 'reset') {
        settings.customEmojis = null;
        saveBotData();
        await sock.sendMessage(from, { text: "✅ Auto-React Emojis Reset to Default." }, { quoted: msg });
    } else {
        await sock.sendMessage(from, { 
            text: "❌ *Auto-React Usage:*\n\n" +
                  ".autoreacts on - Enable auto-react\n" +
                  ".autoreacts off - Disable auto-react\n" +
                  ".autoreacts set <emojis> - Set custom emojis\n" +
                  ".autoreacts reset - Reset to default emojis"
        }, { quoted: msg });
    }
}

module.exports = autoreactsCommand;
