const settings = require('../settings');

async function allmenuCommand(sock, from, msg) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeStr = `${hours}h ${minutes}m ${seconds}s`;
    
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    const menuTemplate = `╭────────────────────────────────────────────╮
│             👾 𝗠𝗔𝗡𝗜 𝗠𝗗 𝗣𝗔𝗜𝗥 👾
│      Premium Multi Device WhatsApp Bot
╰────────────────────────────────────────────╯

╭─〔 👤 USER INFO 〕
│ 👤 Name      : ${msg.pushName || 'User'}
│ 🆔 Number    : ${from.split('@')[0]}
│ ⭐ Premium   : Free
│ 👑 Role      : User
│ 🌍 Mode      : Public
│ ⚡ Prefix    : ${settings.prefix}
│ 🕒 Runtime   : ${uptimeStr}
│ 📅 Date      : ${date}
│ 🕰 Time      : ${time}
│ 💻 Version   : ${settings.version}
│ 🤖 Commands  : Real & Working
╰──────────────────────────────

╭─〔 👤 OWNER COMMANDS 〕
│ ❏ .private
│ ❏ .public
│ ❏ .owner
│ ❏ .setname
│ ❏ .block
│ ❏ .unblock
│ ❏ .bcgc
│ ❏ .bcall
│ ❏ .restart
│ ❏ .shutdown
│ ❏ .mode
│ ❏ .deleteall
│ ❏ .clone
│ ❏ .crash
│ ❏ .freeze
│ ❏ .bug
│ ❏ .nuke
╰──────────────────────────────

╭─〔 🛡️ PROTECTION MENU 〕
│ ❏ .antilink
│ ❏ .anticall
│ ❏ .antidelete
│ ❏ .antistatus
│ ❏ .antibug
╰──────────────────────────────

╭─〔 🤖 AI & AUTO MENU 〕
│ ❏ .ai
│ ❏ .chatbot
│ ❏ .gali
│ ❏ .status / .autostatus
│ ❏ .autoreacts
│ ❏ .autoread
╰──────────────────────────────

╭─〔 😂 FUN MENU 〕
│ ❏ .joke
│ ❏ .meme
│ ❏ .dare
│ ❏ .truth
│ ❏ .ascii
│ ❏ .roast
│ ❏ .compliment
│ ❏ .ship
│ ❏ .emojimix
│ ❏ .character
│ ❏ .quote
│ ❏ .fact
│ ❏ .trivia
│ ❏ .coinflip
│ ❏ .roll
│ ❏ .riddle
│ ❏ .wyr
╰──────────────────────────────

╭─〔 🛠️ TOOLS & UTILS 〕
│ ❏ .ping
│ ❏ .dp
│ ❏ .vv
│ ❏ .translate
│ ❏ .base64
│ ❏ .qr
│ ❏ .shorturl
│ ❏ .calc
│ ❏ .weather
│ ❏ .github
│ ❏ .ipinfo
│ ❏ .tempmail
│ ❏ .fakeinfo
│ ❏ .binlookup
│ ❏ .whois
│ ❏ .dnslookup
│ ❏ .portscan
│ ❏ .screenshot
│ ❏ .define
│ ❏ .google
│ ❏ .wiki
│ ❏ .yts
│ ❏ .playstore
│ ❏ .npm
│ ❏ .sticker
│ ❏ .toimg
│ ❏ .tomp3
│ ❏ .tts
│ ❏ .blur
│ ❏ .invert
│ ❏ .crop
│ ❏ .flip
│ ❏ .grayscale
│ ❏ .removebg
│ ❏ .upscale
╰──────────────────────────────

╭─〔 📥 DANGEROUS MENU 〕
│ ❏ .report
│ ❏ .spam
│ ❏ .smsbomb
│ ❏ .callbomb
╰──────────────────────────────

╭─〔 🕋 ISLAMIC MENU 〕
│ ❏ .quran
│ ❏ .hadith
│ ❏ .prayer
│ ❏ .qibla
│ ❏ .asmaulhusna
╰──────────────────────────────

╭─〔 📊 SYSTEM INFO 〕
│ ❏ .uptime
│ ❏ .serverinfo
│ ❏ .speedtest
│ ❏ .device
│ ❏ .runtime
╰──────────────────────────────

╭─〔 ⚙️ EXTRA UTILS 〕
│ ❏ .timer
│ ❏ .password
│ ❏ .morse
│ ❏ .binary
│ ❏ .hex
│ ❏ .pastebin
│ ❏ .news
│ ❏ .crypto
│ ❏ .movie
│ ❏ .anime
│ ❏ .manga
│ ❏ .lyrics
│ ❏ .remind
│ ❏ .tagme
│ ❏ .mention
│ ❏ .snipe
│ ❏ .editmsg
│ ❏ .react
│ ❏ .send
│ ❏ .forward
│ ❏ .clear
╰──────────────────────────────

╭─〔 ✨ NEW SPECIALS 〕
│ ❏ .ancient
│ ❏ .hieroglyph
│ ❏ .runes
│ ❏ .cuneiform
│ ❏ .papyrus
│ ❏ .parchment
│ ❏ .codex
│ ❏ .fossil
│ ❏ .ruins
│ ❏ .tree
│ ❏ .forest
│ ❏ .ocean
│ ❏ .mountain
│ ❏ .sunset
│ ❏ .rainbow
│ ❏ .storm
│ ❏ .tornado
│ ❏ .tsunami
│ ❏ .earth
│ ❏ .moon
│ ❏ .tide
│ ❏ .airquality
│ ❏ .uvindex
│ ❏ .pollen
│ ❏ .poem
│ ❏ .song
│ ❏ .rap
│ ❏ .script
│ ❏ .recipe
│ ❏ .cocktail
│ ❏ .perfume
│ ❏ .art
│ ❏ .sculpture
│ ❏ .tattoo
│ ❏ .mural
│ ❏ .encrypt
│ ❏ .decrypt
│ ❏ .selfdestruct
│ ❏ .burnafter
│ ❏ .anonymous
│ ❏ .incognito
│ ❏ .fakecall
│ ❏ .fakescreen
│ ❏ .stealth
╰──────────────────────────────

╭────────────────────────────────────────────╮
│      👾 Thank You For Using 𝗠𝗔𝗡𝗜 👾
│      💻 Fast • Stable • Powerful • Real Cmds
╰────────────────────────────────────────────╯`;

    await sock.sendMessage(from, { 
        image: { url: settings.startimage },
        caption: menuTemplate
    }, { quoted: msg });
}

module.exports = allmenuCommand;
