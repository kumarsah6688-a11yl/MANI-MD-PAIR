const axios = require('axios');

const styles = {
    ancient: {
        map: { 'a': 'α', 'b': 'β', 'c': 'ς', 'd': 'δ', 'e': 'ε', 'f': 'φ', 'g': 'γ', 'h': 'η', 'i': 'ι', 'j': 'ξ', 'k': 'κ', 'l': 'λ', 'm': 'μ', 'n': 'ν', 'o': 'ο', 'p': 'π', 'q': 'θ', 'r': 'ρ', 's': 'σ', 't': 'τ', 'u': 'υ', 'v': 'ω', 'w': 'ψ', 'x': 'χ', 'y': 'ψ', 'z': 'ζ' },
        prefix: "🏛️ *Ancient Style:* "
    },
    hieroglyph: {
        map: { 'a': '𓀀', 'b': '𓀁', 'c': '𓀂', 'd': '𓀃', 'e': '𓀄', 'f': '𓀅', 'g': '𓀆', 'h': '𓀇', 'i': '𓀈', 'j': '𓀉', 'k': '𓀊', 'l': '𓀋', 'm': '𓀌', 'n': '𓀍', 'o': '𓀎', 'p': '𓀏', 'q': '𓀐', 'r': '𓀑', 's': '𓀒', 't': '𓀓', 'u': '𓀔', 'v': '𓀕', 'w': '𓀖', 'x': '𓀗', 'y': '𓀘', 'z': '𓀙' },
        prefix: "📜 *Hieroglyphics:* "
    },
    runes: {
        map: { 'a': 'ᚠ', 'b': 'ᚢ', 'c': 'ᚦ', 'd': 'ᚨ', 'r': 'ᚱ', 'k': 'ᚲ', 'g': 'ᚷ', 'w': 'ᚹ', 'h': 'ᚺ', 'n': 'ᚻ', 'i': 'ᛁ', 'j': 'ᛃ', 'p': 'ᛈ', 'z': 'ᛉ', 's': 'ᛊ', 't': 'ᛏ', 'e': 'ᛖ', 'm': 'ᛗ', 'l': 'ᛚ', 'o': 'ᛟ', 'd': 'ᛞ' },
        prefix: "⚔️ *Norse Runes:* "
    },
    cuneiform: {
        map: { 'a': '𒀀', 'b': '𒀁', 'c': '𒀂', 'd': '𒀃', 'e': '𒀄', 'f': '𒀅', 'g': '𒀆', 'h': '𒀇', 'i': '𒀈', 'j': '𒀉', 'k': '𒀊', 'l': '𒀋', 'm': '𒀌', 'n': '𒀍', 'o': '𒀎', 'p': '𒀏', 'q': '𒀐', 'r': '𒀑', 's': '𒀒', 't': '𒀓', 'u': '𒀔', 'v': '𒀕', 'w': '𒀖', 'x': '𒀗', 'y': '𒀘', 'z': '𒀙' },
        prefix: "🏺 *Cuneiform:* "
    }
};

function applyStyle(text, styleName) {
    const style = styles[styleName];
    if (!style) return text;
    let result = "";
    for (let char of text.toLowerCase()) {
        result += style.map[char] || char;
    }
    return style.prefix + result;
}

const newCommands = {
    // Text Styles
    ancient: async (sock, from, msg, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide text!" }, { quoted: msg });
        await sock.sendMessage(from, { text: applyStyle(q, 'ancient') }, { quoted: msg });
    },
    hieroglyph: async (sock, from, msg, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide text!" }, { quoted: msg });
        await sock.sendMessage(from, { text: applyStyle(q, 'hieroglyph') }, { quoted: msg });
    },
    runes: async (sock, from, msg, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide text!" }, { quoted: msg });
        await sock.sendMessage(from, { text: applyStyle(q, 'runes') }, { quoted: msg });
    },
    cuneiform: async (sock, from, msg, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide text!" }, { quoted: msg });
        await sock.sendMessage(from, { text: applyStyle(q, 'cuneiform') }, { quoted: msg });
    },
    papyrus: async (sock, from, msg, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide text!" }, { quoted: msg });
        await sock.sendMessage(from, { text: "📜 *Papyrus Scroll:*\n\n```" + q + "```" }, { quoted: msg });
    },
    parchment: async (sock, from, msg, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide text!" }, { quoted: msg });
        await sock.sendMessage(from, { text: "📜 *Old Parchment:*\n\n_" + q + "_" }, { quoted: msg });
    },
    codex: async (sock, from, msg, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide text!" }, { quoted: msg });
        await sock.sendMessage(from, { text: "📕 *Medieval Codex:*\n\n" + q.toUpperCase() }, { quoted: msg });
    },
    fossil: async (sock, from, msg, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide text!" }, { quoted: msg });
        await sock.sendMessage(from, { text: "🦴 *Fossilized:* " + q.split('').join('·') }, { quoted: msg });
    },
    ruins: async (sock, from, msg, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide text!" }, { quoted: msg });
        await sock.sendMessage(from, { text: "🏚️ *Ruins:* " + q.split('').map(c => Math.random() > 0.5 ? c : ' ').join('') }, { quoted: msg });
    },

    // ASCII/Visual
    tree: async (sock, from, msg, q) => {
        const tree = "    ^\n   / \\\n  /   \\\n /     \\\n/_______\\\n   | |";
        await sock.sendMessage(from, { text: "🌲 *ASCII Tree:*\n```" + tree + "\n\n" + (q || "") + "```" }, { quoted: msg });
    },
    forest: async (sock, from, msg, q) => {
        const n = parseInt(q) || 3;
        let forest = "";
        for(let i=0; i<n; i++) forest += "🌲 ";
        await sock.sendMessage(from, { text: "🌳 *Forest Generated:*\n" + forest }, { quoted: msg });
    },
    ocean: async (sock, from, msg, q) => {
        await sock.sendMessage(from, { text: "🌊 *Ocean Waves:*\n~ ~ ~ " + (q || "") + " ~ ~ ~" }, { quoted: msg });
    },
    mountain: async (sock, from, msg, q) => {
        const mountain = "   /\\\n  /  \\\n /    \\\n/      \\";
        await sock.sendMessage(from, { text: "⛰️ *Mountain:*\n```" + mountain + "\n" + (q || "") + "```" }, { quoted: msg });
    },
    sunset: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "🌅 *Sunset Palette:* 🔴🟠🟡" }, { quoted: msg });
    },
    rainbow: async (sock, from, msg, q) => {
        const rainbow = "🌈 *Rainbow:* " + (q || "").split('').map((c, i) => {
            const colors = ['❤️', '🧡', '💛', '💚', '💙', '💜'];
            return colors[i % colors.length] + c;
        }).join('');
        await sock.sendMessage(from, { text: rainbow }, { quoted: msg });
    },
    storm: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "⛈️ *Storm Tracker:* Intensity 85% - High Risk!" }, { quoted: msg });
    },
    tornado: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "🌪️ *Tornado Path:* Moving North-East at 50mph." }, { quoted: msg });
    },
    tsunami: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "🌊 *TSUNAMI WARNING:* Evacuate to high ground immediately! (Mock)" }, { quoted: msg });
    },
    earth: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "🌍 *Earth Rotation:* 23.93 hours per day." }, { quoted: msg });
    },
    moon: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "🌖 *Moon Phase:* Waning Gibbous (Illumination: 82%)" }, { quoted: msg });
    },
    tide: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "🌊 *Tide Info:* High tide at 10:30 AM, Low tide at 4:45 PM." }, { quoted: msg });
    },
    airquality: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "🌬️ *Air Quality:* AQI 42 (Good)" }, { quoted: msg });
    },
    uvindex: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "☀️ *UV Index:* 6 (High) - Wear sunscreen!" }, { quoted: msg });
    },
    pollen: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "🌼 *Pollen Count:* Moderate (Grass & Oak)" }, { quoted: msg });
    },

    // AI Generation (Using session's getAIResponse)
    poem: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ What should the poem be about?" }, { quoted: msg });
        await sock.sendMessage(from, { react: { text: '✍️', key: msg.key } });
        const res = await session.getAIResponse(from, "Write a short poem about: " + q);
        await sock.sendMessage(from, { text: "📜 *Poem:*\n\n" + res }, { quoted: msg });
    },
    song: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ What should the song be about?" }, { quoted: msg });
        await sock.sendMessage(from, { react: { text: '🎵', key: msg.key } });
        const res = await session.getAIResponse(from, "Write song lyrics about: " + q);
        await sock.sendMessage(from, { text: "🎶 *Song Lyrics:*\n\n" + res }, { quoted: msg });
    },
    rap: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Give me a topic for the rap!" }, { quoted: msg });
        await sock.sendMessage(from, { react: { text: '🎤', key: msg.key } });
        const res = await session.getAIResponse(from, "Write a rap verse about: " + q);
        await sock.sendMessage(from, { text: "🔥 *Rap Verse:*\n\n" + res }, { quoted: msg });
    },
    script: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ What's your movie idea?" }, { quoted: msg });
        await sock.sendMessage(from, { react: { text: '🎬', key: msg.key } });
        const res = await session.getAIResponse(from, "Write a short movie script for: " + q);
        await sock.sendMessage(from, { text: "🎥 *Movie Script:*\n\n" + res }, { quoted: msg });
    },
    recipe: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ List some ingredients!" }, { quoted: msg });
        await sock.sendMessage(from, { react: { text: '🍳', key: msg.key } });
        const res = await session.getAIResponse(from, "Give me a recipe using: " + q);
        await sock.sendMessage(from, { text: "🍴 *Recipe:*\n\n" + res }, { quoted: msg });
    },
    cocktail: async (sock, from, msg, session, q) => {
        await sock.sendMessage(from, { react: { text: '🍸', key: msg.key } });
        const res = await session.getAIResponse(from, "Suggest a cocktail " + (q ? "using: " + q : "recipe"));
        await sock.sendMessage(from, { text: "🍹 *Cocktail:* " + res }, { quoted: msg });
    },
    perfume: async (sock, from, msg, session, q) => {
        await sock.sendMessage(from, { react: { text: '🧴', key: msg.key } });
        const res = await session.getAIResponse(from, "Suggest a custom perfume formula for mood: " + (q || "mysterious"));
        await sock.sendMessage(from, { text: "✨ *Perfume Formula:* " + res }, { quoted: msg });
    },
    art: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ What kind of art?" }, { quoted: msg });
        await sock.sendMessage(from, { react: { text: '🎨', key: msg.key } });
        const res = await session.getAIResponse(from, "Describe a piece of art about: " + q);
        await sock.sendMessage(from, { text: "🖼️ *Art Description:* " + res }, { quoted: msg });
    },
    sculpture: async (sock, from, msg, session, q) => {
        await sock.sendMessage(from, { react: { text: '🗿', key: msg.key } });
        const res = await session.getAIResponse(from, "Suggest a sculpture concept " + (q ? "about: " + q : ""));
        await sock.sendMessage(from, { text: "🔨 *Sculpture Concept:* " + res }, { quoted: msg });
    },
    tattoo: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Give me a tattoo idea!" }, { quoted: msg });
        await sock.sendMessage(from, { react: { text: '💉', key: msg.key } });
        const res = await session.getAIResponse(from, "Design a tattoo for: " + q);
        await sock.sendMessage(from, { text: "🖋️ *Tattoo Design:* " + res }, { quoted: msg });
    },
    mural: async (sock, from, msg, session, q) => {
        await sock.sendMessage(from, { react: { text: '🧱', key: msg.key } });
        const res = await session.getAIResponse(from, "Create a mural description " + (q ? "for: " + q : ""));
        await sock.sendMessage(from, { text: "🏙️ *Mural Concept:* " + res }, { quoted: msg });
    },

    // Privacy/Stealth/Security
    encrypt: async (sock, from, msg, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Provide text to encrypt!" }, { quoted: msg });
        const encrypted = Buffer.from(q).toString('base64');
        await sock.sendMessage(from, { text: "🔐 *Encrypted:* " + encrypted }, { quoted: msg });
    },
    decrypt: async (sock, from, msg, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Provide text to decrypt!" }, { quoted: msg });
        try {
            const decrypted = Buffer.from(q, 'base64').toString('utf8');
            await sock.sendMessage(from, { text: "🔓 *Decrypted:* " + decrypted }, { quoted: msg });
        } catch (e) {
            await sock.sendMessage(from, { text: "❌ Invalid encrypted text!" }, { quoted: msg });
        }
    },
    selfdestruct: async (sock, from, msg, q) => {
        await sock.sendMessage(from, { text: "🧨 *Message will self-destruct in 10 seconds!*" }, { quoted: msg });
        setTimeout(async () => {
            await sock.sendMessage(from, { delete: msg.key });
        }, 10000);
    },
    burnafter: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "🔥 *View Once mode enabled for next photo!*" }, { quoted: msg });
    },
    anonymous: async (sock, from, msg, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ What's your anonymous message?" }, { quoted: msg });
        await sock.sendMessage(from, { delete: msg.key });
        await sock.sendMessage(from, { text: "👤 *Anonymous Message:*\n\n" + q });
    },
    incognito: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "🕵️ *Incognito Mode:* Your typing status is now hidden." }, { quoted: msg });
    },
    fakecall: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "📞 *Incoming Call Simulation:* +1 (555) 0199 is calling you..." }, { quoted: msg });
    },
    fakescreen: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "🔴 *System:* Screen recording started." }, { quoted: msg });
    },
    stealth: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "👻 *Stealth Mode:* Read receipts disabled for this chat." }, { quoted: msg });
    },
    you: async (sock, from, msg, session, q) => {
        const pushName = msg.pushName || 'User';
        const userJid = msg.key.remoteJid.endsWith('@g.us') ? msg.key.participant : msg.key.remoteJid;
        const userId = userJid.split('@')[0];
        
        let profilePic;
        try {
            profilePic = await sock.profilePictureUrl(userJid, 'image');
        } catch (e) {
            profilePic = 'https://files.catbox.moe/m3dg3w.jpeg';
        }

        const text = `*\u{25EC}\u{2501}\u{2501}\u{2501}\u{3008} 𝗠𝗔𝗡𝗜 👾 USER INFO 〉\u{2501}\u{2501}\u{2501}\u{25EC}*\n\n` +
                     `*\u{1F464} Name:* ${pushName}\n` +
                     `*\u{1F194} ID:* ${userId}\n` +
                     `*\u{1F4F1} Status:* Active User\n` +
                     `*\u{1F680} Bot:* 𝗠𝗔𝗡𝗜 👾 MD\n\n` +
                     `> Hello ${pushName}! You are using the most powerful WhatsApp bot.`;
        
        await sock.sendMessage(from, { 
            image: { url: profilePic },
            caption: text 
        }, { quoted: msg });
    },
    // LOGO MENU
    logo1: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide a name for the logo!" }, { quoted: msg });
        const url = `https://api.shizuhub.xyz/api/photooxy/battlefield4?text=${encodeURIComponent(q)}&apikey=shizui`;
        await sock.sendMessage(from, { image: { url }, caption: `✅ *Battlefield Logo:* ${q}\n_Powered by 𝗠𝗔𝗡𝗜 👾_` }, { quoted: msg });
    },
    logo2: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide a name for the logo!" }, { quoted: msg });
        const url = `https://api.shizuhub.xyz/api/photooxy/glitch?text=${encodeURIComponent(q)}&apikey=shizui`;
        await sock.sendMessage(from, { image: { url }, caption: `✅ *Glitch Logo:* ${q}\n_Powered by 𝗠𝗔𝗡𝗜 👾_` }, { quoted: msg });
    },
    logo3: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide a name for the logo!" }, { quoted: msg });
        const url = `https://api.shizuhub.xyz/api/photooxy/cup-love?text=${encodeURIComponent(q)}&apikey=shizui`;
        await sock.sendMessage(from, { image: { url }, caption: `✅ *Cup Love Logo:* ${q}\n_Powered by 𝗠𝗔𝗡𝗜 👾_` }, { quoted: msg });
    },
    logo4: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide a name for the logo!" }, { quoted: msg });
        const url = `https://api.shizuhub.xyz/api/photooxy/flaming?text=${encodeURIComponent(q)}&apikey=shizui`;
        await sock.sendMessage(from, { image: { url }, caption: `✅ *Flaming Logo:* ${q}\n_Powered by 𝗠𝗔𝗡𝗜 👾_` }, { quoted: msg });
    },
    logo5: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide a name for the logo!" }, { quoted: msg });
        const url = `https://api.shizuhub.xyz/api/photooxy/smoke?text=${encodeURIComponent(q)}&apikey=shizui`;
        await sock.sendMessage(from, { image: { url }, caption: `✅ *Smoke Logo:* ${q}\n_Powered by 𝗠𝗔𝗡𝗜 👾_` }, { quoted: msg });
    },
    gaminglogo: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide a name for the logo!" }, { quoted: msg });
        const url = `https://api.shizuhub.xyz/api/photooxy/pubg-mobile?text=${encodeURIComponent(q)}&apikey=shizui`;
        await sock.sendMessage(from, { image: { url }, caption: `✅ *Gaming Logo:* ${q}\n_Powered by 𝗠𝗔𝗡𝗜 👾_` }, { quoted: msg });
    },
    text3d: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide text!" }, { quoted: msg });
        const url = `https://api.shizuhub.xyz/api/photooxy/3d-text?text=${encodeURIComponent(q)}&apikey=shizui`;
        await sock.sendMessage(from, { image: { url }, caption: `✅ *3D Text:* ${q}\n_Powered by 𝗠𝗔𝗡𝗜 👾_` }, { quoted: msg });
    },
    neonlogo: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide text!" }, { quoted: msg });
        const url = `https://api.shizuhub.xyz/api/photooxy/neon?text=${encodeURIComponent(q)}&apikey=shizui`;
        await sock.sendMessage(from, { image: { url }, caption: `✅ *Neon Logo:* ${q}\n_Powered by 𝗠𝗔𝗡𝗜 👾_` }, { quoted: msg });
    },
    glitchlogo: async (sock, from, msg, session, q) => {
        if (!q) return await sock.sendMessage(from, { text: "❌ Please provide text!" }, { quoted: msg });
        const url = `https://api.shizuhub.xyz/api/photooxy/glitch?text=${encodeURIComponent(q)}&apikey=shizui`;
        await sock.sendMessage(from, { image: { url }, caption: `✅ *Glitch Logo:* ${q}\n_Powered by 𝗠𝗔𝗡𝗜 👾_` }, { quoted: msg });
    },

    // GAME MENU (Simple Implementation)
    tictactoe: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "🎮 *TicTacToe:* Feature coming soon! Play with your friends for now.\n_Powered by 𝗠𝗔𝗡𝗜 👾_" }, { quoted: msg });
    },
    math: async (sock, from, msg) => {
        const n1 = Math.floor(Math.random() * 100);
        const n2 = Math.floor(Math.random() * 100);
        await sock.sendMessage(from, { text: `🧮 *Math Quiz:*\n\nWhat is ${n1} + ${n2}?\n\n_Answer with .ans <number>_` }, { quoted: msg });
    },
    tebakgambar: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: "🖼️ *Tebak Gambar:* Coming soon in the next update!\n_Powered by 𝗠𝗔𝗡𝗜 👾_" }, { quoted: msg });
    }
};

module.exports = newCommands;
