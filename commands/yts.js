const yts = require('yt-search');

module.exports = async function(sock, chatId, msg, q) {
    if (!q) return await sock.sendMessage(chatId, { text: '\u26A0\uFE0F .yts <search>' }, { quoted: msg });
    
    const ui = require('../lib/ui');
    try {
        await sock.sendMessage(chatId, { text: ui.search(q) }, { quoted: msg });
        
        const search = await yts(q);
        const videos = search.videos.slice(0, 8);
        
        if (!videos.length) return await sock.sendMessage(chatId, { text: '\u274C No results!' }, { quoted: msg });
        
        let text = `*\u1F50E YouTube Search: ${q}*\n\n`;
        videos.forEach((v, i) => {
            text += `${i+1}. *${v.title}*\n` +
                `\u1F464 ${v.author.name} | \u23F1\uFE0F ${v.duration.timestamp}\n` +
                `\u1F517 ${v.url}\n\n`;
        });
        
        await sock.sendMessage(chatId, { text }, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(chatId, { text: ui.failed(e.message) }, { quoted: msg });
    }
};
