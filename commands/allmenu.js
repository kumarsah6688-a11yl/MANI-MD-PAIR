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
│ 🤖 Commands  : 300+ Real & Working
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
│ ❏ .setppbot
│ ❏ .setppowner
│ ❏ .addpremium
│ ❏ .delpremium
│ ❏ .listpremium
│ ❏ .broadcast
│ ❏ .bcgroups
│ ❏ .bcallusers
╰──────────────────────────────

╭─〔 🛡️ PROTECTION MENU 〕
│ ❏ .antilink
│ ❏ .anticall
│ ❏ .antidelete
│ ❏ .antistatus
│ ❏ .antibug
│ ❏ .antiviewonce
│ ❏ .antispam
│ ❏ .antitoxic
│ ❏ .antivirtex
│ ❏ .antiforeign
╰──────────────────────────────

╭─〔 🤖 AI & AUTO MENU 〕
│ ❏ .ai
│ ❏ .chatbot
│ ❏ .gali
│ ❏ .status / .autostatus
│ ❏ .autoreacts
│ ❏ .autoread
│ ❏ .autotyping
│ ❏ .autoonline
│ ❏ .autoimage
│ ❏ .autovideo
│ ❏ .autoaudio
│ ❏ .gpt4
│ ❏ .gemini
│ ❏ .dalle
│ ❏ .midjourney
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
│ ❏ .hack
│ ❏ .iqtest
│ ❏ .gay
│ ❏ .lesbian
│ ❏ .checkme
│ ❏ .waifu
│ ❏ .husbu
│ ❏ .neko
╰──────────────────────────────

╭─〔 📥 DOWNLOAD MENU 〕
│ ❏ .musicmenu
│ ❏ .song
│ ❏ .video
│ ❏ .insta
│ ❏ .tiktok
│ ❏ .facebook
│ ❏ .youtube
│ ❏ .pinterest
│ ❏ .twitter
│ ❏ .reddit
│ ❏ .spotify
│ ❏ .mediafire
│ ❏ .apk
│ ❏ .gdrive
│ ❏ .gitclone
│ ❏ .threads
│ ❏ .snapchat
│ ❏ .soundcloud
│ ❏ .mega
│ ❏ .terabox
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
│ ❏ .pdf
│ ❏ .docx
│ ❏ .pptx
│ ❏ .txt
│ ❏ .ocr
╰──────────────────────────────

╭─〔 📥 DANGEROUS MENU 〕
│ ❏ .report
│ ❏ .spam
│ ❏ .smsbomb
│ ❏ .callbomb
│ ❏ .locspam
│ ❏ .vcardspam
│ ❏ .buttonspam
│ ❏ .pollspam
│ ❏ .contactspam
│ ❏ .ghostmode
│ ❏ .lag
│ ❏ .virtex
│ ❏ .crashgroup
╰──────────────────────────────

╭─〔 🕋 ISLAMIC MENU 〕
│ ❏ .quran
│ ❏ .hadith
│ ❏ .prayer
│ ❏ .qibla
│ ❏ .asmaulhusna
│ ❏ .kisahnabi
│ ❏ .tahlil
│ ❏ .doaharian
│ ❏ .ayatkursi
╰──────────────────────────────

╭─〔 📊 SYSTEM INFO 〕
│ ❏ .uptime
│ ❏ .serverinfo
│ ❏ .speedtest
│ ❏ .device
│ ❏ .runtime
│ ❏ .cpu
│ ❏ .ram
│ ❏ .os
│ ❏ .storage
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
│ ❏ .save
│ ❏ .get
│ ❏ .backup
│ ❏ .restore
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
│ ❏ .you
╰──────────────────────────────

╭─〔 🎮 GAME MENU 〕
│ ❏ .tictactoe
│ ❏ .math
│ ❏ .tebakgambar
│ ❏ .tebakkata
│ ❏ .tebaklirik
│ ❏ .tebaktebakan
│ ❏ .susunkata
│ ❏ .family100
│ ❏ .siapakahaku
│ ❏ .caklontong
╰──────────────────────────────

╭─〔 🖼️ IMAGE MENU 〕
│ ❏ .pinterest
│ ❏ .googleimage
│ ❏ .wallpaper
│ ❏ .aesthetic
│ ❏ .animeimage
│ ❏ .couple
│ ❏ .blackpink
│ ❏ .bts
│ ❏ .exo
╰──────────────────────────────

╭─〔 🏢 LOGO MENU 〕
│ ❏ .logo1
│ ❏ .logo2
│ ❏ .logo3
│ ❏ .logo4
│ ❏ .logo5
│ ❏ .gaminglogo
│ ❏ .text3d
│ ❏ .neonlogo
│ ❏ .glitchlogo
╰──────────────────────────────

╭────────────────────────────────────────────╮
│      👾 Thank You For Using 𝗠𝗔𝗡𝗜 👾
│      💻 Fast • Stable • Powerful • 300+ Cmds
╰────────────────────────────────────────────╯`;

    await sock.sendMessage(from, { 
        image: { url: settings.startimage },
        caption: menuTemplate
    }, { quoted: msg });
}

module.exports = allmenuCommand;
