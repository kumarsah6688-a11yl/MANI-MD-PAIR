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
│ 🤖 Commands  : 300+
╰──────────────────────────────

╭─〔 👤 GENERAL MENU 〕
│ ❏ .menu
│ ❏ .help
│ ❏ .ping
│ ❏ .runtime
│ ❏ .owner
│ ❏ .script
│ ❏ .repo
│ ❏ .donate
│ ❏ .rules
│ ❏ .support
╰──────────────────────────────

╭─〔 🤖 AI MENU 〕
│ ❏ .ai
│ ❏ .gpt
│ ❏ .gemini
│ ❏ .claude
│ ❏ .imagine
│ ❏ .translate
│ ❏ .rewrite
│ ❏ .summarize
│ ❏ .explain
│ ❏ .chat
╰──────────────────────────────

╭─〔 📥 DOWNLOADER MENU 〕
│ ❏ .play
│ ❏ .song
│ ❏ .ytmp3
│ ❏ .ytmp4
│ ❏ .spotify
│ ❏ .tiktok
│ ❏ .instagram
│ ❏ .facebook
│ ❏ .twitter
│ ❏ .mediafire
│ ❏ .gdrive
│ ❏ .apk
│ ❏ .gitclone
│ ❏ .movie
│ ❏ .anime
╰──────────────────────────────

╭─〔 🎵 MUSIC MENU 〕
│ ❏ .lyrics
│ ❏ .playlist
│ ❏ .shazam
│ ❏ .bass
│ ❏ .nightcore
│ ❏ .volume
╰──────────────────────────────

╭─〔 🎬 VIDEO MENU 〕
│ ❏ .video
│ ❏ .reels
│ ❏ .story
│ ❏ .shorts
│ ❏ .trim
│ ❏ .compress
╰──────────────────────────────

╭─〔 🖼 IMAGE MENU 〕
│ ❏ .toimg
│ ❏ .sticker
│ ❏ .meme
│ ❏ .removebg
│ ❏ .enhance
│ ❏ .upscale
│ ❏ .wallpaper
╰──────────────────────────────

╭─〔 😂 FUN MENU 〕
│ ❏ .joke
│ ❏ .truth
│ ❏ .dare
│ ❏ .meme
│ ❏ .fact
│ ❏ .ship
│ ❏ .rate
│ ❏ .8ball
╰──────────────────────────────

╭─〔 🎮 GAME MENU 〕
│ ❏ .ttt
│ ❏ .casino
│ ❏ .slot
│ ❏ .dice
│ ❏ .quiz
│ ❏ .math
│ ❏ .rps
╰──────────────────────────────

╭─〔 🔍 SEARCH MENU 〕
│ ❏ .google
│ ❏ .youtube
│ ❏ .github
│ ❏ .npm
│ ❏ .apksearch
│ ❏ .image
│ ❏ .wiki
╰──────────────────────────────

╭─〔 🛠 TOOLS MENU 〕
│ ❏ .tts
│ ❏ .qr
│ ❏ .shorturl
│ ❏ .tinyurl
│ ❏ .calc
│ ❏ .weather
│ ❏ .time
│ ❏ .ip
│ ❏ .whois
│ ❏ .base64
│ ❏ .binary
│ ❏ .encode
│ ❏ .decode
╰──────────────────────────────

╭─〔 📦 CONVERTER MENU 〕
│ ❏ .tomp3
│ ❏ .tovn
│ ❏ .togif
│ ❏ .toaudio
│ ❏ .tosticker
│ ❏ .tourl
│ ❏ .tofile
╰──────────────────────────────

╭─〔 🎭 ANIME MENU 〕
│ ❏ .waifu
│ ❏ .neko
│ ❏ .anime
│ ❏ .manga
│ ❏ .character
│ ❏ .cosplay
╰──────────────────────────────

╭─〔 👑 GROUP MENU 〕
│ ❏ .tagall
│ ❏ .hidetag
│ ❏ .kick
│ ❏ .add
│ ❏ .promote
│ ❏ .demote
│ ❏ .mute
│ ❏ .unmute
│ ❏ .warn
│ ❏ .welcome
│ ❏ .goodbye
│ ❏ .antilink
│ ❏ .antispam
│ ❏ .delete
╰──────────────────────────────

╭─〔 📢 CHANNEL MENU 〕
│ ❏ .channelinfo
│ ❏ .follow
│ ❏ .unfollow
│ ❏ .forward
│ ❏ .post
╰──────────────────────────────

╭─〔 💎 PREMIUM MENU 〕
│ ❏ .premium
│ ❏ .vip
│ ❏ .claim
│ ❏ .balance
│ ❏ .daily
│ ❏ .weekly
╰──────────────────────────────

╭─〔 ⚙ SETTINGS MENU 〕
│ ❏ .prefix
│ ❏ .mode
│ ❏ .language
│ ❏ .autoread
│ ❏ .autotyping
│ ❏ .autostatus
╰──────────────────────────────

╭─〔 👑 OWNER MENU 〕
│ ❏ .self
│ ❏ .public
│ ❏ .restart
│ ❏ .shutdown
│ ❏ .block
│ ❏ .unblock
│ ❏ .ban
│ ❏ .unban
│ ❏ .broadcast
│ ❏ .join
│ ❏ .leave
│ ❏ .getfile
│ ❏ .setppbot
│ ❏ .setname
│ ❏ .setbio
│ ❏ .update
│ ❏ .eval
│ ❏ .exec
│ ❏ .shell
╰──────────────────────────────

╭────────────────────────────────────────────╮
│      👾 Thank You For Using MANI MD 👾
│      💻 Fast • Stable • Powerful • 300+
╰────────────────────────────────────────────╯`;

    await sock.sendMessage(from, { 
        image: { url: settings.startimage },
        caption: menuTemplate
    }, { quoted: msg });
}

module.exports = allmenuCommand;
