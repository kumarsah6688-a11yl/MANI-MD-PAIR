const axios = require('axios');

module.exports = async function(sock, chatId, msg, q) {
    if (!q) return await sock.sendMessage(chatId, { text: '⚠️ Usage: .pinterest <search_term>' }, { quoted: msg });
    
    try {
        await sock.sendMessage(chatId, { react: { text: '🔍', key: msg.key } });
        
        // Free and reliable Image Generation API as a powerful alternative for search
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(q)}?width=1024&height=1024&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;
        
        await sock.sendMessage(chatId, { 
            image: { url: imageUrl },
            caption: `🎨 *𝗠𝗔𝗡𝗜 👾 AI IMAGE GENERATOR*\n\n📝 *Prompt:* ${q}\n✨ *Quality:* HD\n🚀 *Status:* Success\n\n> © POWERED BY 𝗠𝗔𝗡𝗜 👾`
        }, { quoted: msg });

        await sock.sendMessage(chatId, { react: { text: '✅', key: msg.key } });
    } catch (e) {
        console.error('Pinterest/Image Error:', e);
        await sock.sendMessage(chatId, { text: '❌ Error: ' + e.message }, { quoted: msg });
    }
};
