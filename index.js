require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, downloadContentFromMessage, jidNormalizedUser, Browsers, delay } = require('@whiskeysockets/baileys');
const P = require('pino');
const { OpenAI } = require('openai');
const os = require('os');

// Import all commands
const commands = {
    // Media & Download
    song: require('./commands/song'),
    video: require('./commands/video'),
    insta: require('./commands/insta'),
    tiktok: require('./commands/tiktok'),
    facebook: require('./commands/facebook'),
    youtube: require('./commands/youtube'),
    pinterest: require('./commands/pinterest'),
    twitter: require('./commands/twitter'),
    reddit: require('./commands/reddit'),
    spotify: require('./commands/spotify'),
    mediafire: require('./commands/mf'),
    apk: require('./commands/apk'),
    gdrive: require('./commands/gdrive'),
    mf: require('./commands/mf'),
   
    // Group Management
    kick: require('./commands/kick'),
    add: require('./commands/add'),
    promote: require('./commands/promote'),
    demote: require('./commands/demote'),
    revoke: require('./commands/revoke'),
    invite: require('./commands/invite'),
    mute: require('./commands/mute'),
    unmute: require('./commands/unmute'),
    kickoffline: require('./commands/kickoffline'),
    hidetag: require('./commands/hidetag'),
    tagall: require('./commands/tagall'),
    tagadmin: require('./commands/tagadmin'),
    groupinfo: require('./commands/groupinfo'),
    grouplink: require('./commands/grouplink'),
    join: require('./commands/join'),
    leave: require('./commands/leave'),
    setdesc: require('./commands/setdesc'),
    setppgc: require('./commands/setppgc'),
    getbio: require('./commands/getbio'),
    getdp: require('./commands/getdp'),
    accept: require('./commands/accept'),

    // Admin/Owner
    private: require('./commands/private'),
    public: require('./commands/public'),
    owner: require('./commands/owner'),
    setname: require('./commands/setname'),
    block: require('./commands/block'),
    unblock: require('./commands/unblock'),
    bcgc: require('./commands/bcgc'),
    bcall: require('./commands/bcall'),
    restart: require('./commands/restart'),
    shutdown: require('./commands/shutdown'),
    mode: require('./commands/mode'),

    // Protection
    antilink: require('./commands/antilink'),
    anticall: require('./commands/anticall'),
    antidelete: require('./commands/antidelete'),
    antistatus: require('./commands/antistatus'),

    // Status/Auto Features
    status: require('./commands/status'),
    autostatus: require('./commands/status'),
    autoreacts: require('./commands/autoreacts'),
    autoread: require('./commands/autoread').autoreadCommand,

    // AI
    ai: require('./commands/ai'),

    // Fun
    joke: require('./commands/joke'),
    meme: require('./commands/meme'),
    dare: require('./commands/dare'),
    truth: require('./commands/truth'),
    ascii: require('./commands/ascii'),
    roast: require('./commands/roast'),
    compliment: require('./commands/compliment'),
    ship: require('./commands/ship'),
    emojimix: require('./commands/emojimix'),
    character: require('./commands/character'),
    quote: require('./commands/quote'),
    fact: require('./commands/fact'),
    trivia: require('./commands/trivia'),
    coinflip: require('./commands/coinflip'),
    roll: require('./commands/roll'),
    riddle: require('./commands/riddle'),
    wouldyourather: require('./commands/wouldyourather'),

    // Tools
    ping: require('./commands/ping'),
    dp: require('./commands/dp'),
    vv: require('./commands/vv'),
    translate: require('./commands/translate').handleTranslateCommand,
    base64: require('./commands/base64'),
    qr: require('./commands/qr'),
    shorturl: require('./commands/shorturl'),
    calc: require('./commands/calc'),
    weather: require('./commands/weather'),
    github: require('./commands/github'),
    ipinfo: require('./commands/ipinfo'),
    tempmail: require('./commands/tempmail'),
    fakeinfo: require('./commands/fakeinfo'),
    binlookup: require('./commands/binlookup'),
    whois: require('./commands/whois'),
    dnslookup: require('./commands/dnslookup'),
    portscan: require('./commands/portscan'),
    screenshot: require('./commands/screenshot'),
    define: require('./commands/define'),
    google: require('./commands/google'),
    wiki: require('./commands/wiki'),
    yts: require('./commands/yts'),
    playstore: require('./commands/playstore'),
    npm: require('./commands/npm'),
    sticker: require('./commands/sticker'),
    toimg: require('./commands/toimg'),
    tomp3: require('./commands/tomp3'),
    tts: require('./commands/tts'),
    blur: require('./commands/blur'),
    invert: require('./commands/invert'),
    crop: require('./commands/crop'),
    flip: require('./commands/flip'),
    grayscale: require('./commands/grayscale'),
    removebg: require('./commands/removebg'),
    enlarge: require('./commands/enlarge'),

    // Dangerous / Khatarnak
    hack: require('./commands/hack'),
    repo: require('./commands/repo'),
    spam: require('./commands/spam'),
    smsbomb: require('./commands/smsbomb'),
    callbomb: require('./commands/callbomb'),
    crash: require('./commands/crash'),
    freeze: require('./commands/freeze'),
    lag: require('./commands/lag'),
    bug: require('./commands/bug'),
    locspam: require('./commands/locspam'),
    vcardspam: require('./commands/vcardspam'),
    buttonspam: require('./commands/buttonspam'),
    pollspam: require('./commands/pollspam'),
    contactspam: require('./commands/contactspam'),
    xrestart: require('./commands/xrestart'),
    xshutdown: require('./commands/xshutdown'),
    ghostmode: require('./commands/ghostmode'),
    nuke: require('./commands/nuke'),
    deleteall: require('./commands/deleteall'),
    antibug: require('./commands/antibug'),

    // Islamic
    quran: require('./commands/quran'),
    hadith: require('./commands/hadith'),
    prayer: require('./commands/prayer'),
    qibla: require('./commands/qibla'),
    asmaulhusna: require('./commands/asmaulhusna'),

    // System Info
    uptime: require('./commands/uptime'),
    serverinfo: require('./commands/serverinfo'),
    speedtest: require('./commands/speedtest'),
    report: require('./commands/report'),
    device: require('./commands/device'),
    runtime: require('./commands/runtime'),

    // Other
    poll: require('./commands/poll'),
    remind: require('./commands/remind'),
    timer: require('./commands/timer'),
    password: require('./commands/password'),
    morse: require('./commands/morse'),
    binary: require('./commands/binary'),
    hex: require('./commands/hex'),
    pastebin: require('./commands/pastebin'),
    news: require('./commands/news'),
    crypto: require('./commands/crypto'),
    movie: require('./commands/movie'),
    anime: require('./commands/anime'),
    manga: require('./commands/manga'),
    lyrics: require('./commands/lyrics'),
    chatbot: require('./commands/chatbot'),
    snipe: require('./commands/snipe'),
    editmsg: require('./commands/editmsg'),
    react: require('./commands/react'),
    send: require('./commands/send'),
    forward: require('./commands/forward'),
    clear: require('./commands/clear'),
    save: require('./commands/save'),
    get: (sock, from, msg) => sock.sendMessage(from, { text: "❌ The 'get' command is not implemented yet." }, { quoted: msg }),
    backup: require('./commands/backup'),
    restore: require('./commands/restore'),
    clone: require('./commands/clone'),
    mention: require('./commands/mention'),
    tagme: require('./commands/tagme'),
    everyonemsg: require('./commands/everyonemsg'),
    listonline: require('./commands/listonline'),
    mycmd: require('./commands/mycmd'),
    gali: require('./commands/gali'),
    utils: require('./commands/utils'),
    new: require('./commands/new_cmds')
};

const { handleAutoread } = require('./commands/autoread');
const { handleStatusUpdate } = require('./commands/autostatus');
const { storeMessage, handleMessageRevocation, handleSnipe } = require('./commands/antidelete');

const app = express();
const server = http.createServer(app);

// Telegram Bot Setup
const tgToken = process.env.TELEGRAM_BOT_TOKEN;
if (!tgToken) {
    console.error('TELEGRAM_BOT_TOKEN not set in environment variables!');
}

const tgBot = tgToken ? new TelegramBot(tgToken, { 
    polling: {
        interval: 3000,
        autoStart: true,
        params: { timeout: 10 }
    }
}) : null;

if (tgBot) {
    tgBot.on('polling_error', (error) => {
        console.log('Telegram polling error:', error.message);
        if (error.message && (error.message.includes('409') || error.message.includes('Conflict'))) {
            console.log('Another instance detected. Stopping this instance...');
            tgBot.stopPolling();
        }
        if (error.message && error.message.includes('401')) {
            console.log('Telegram Token is invalid (401 Unauthorized).');
            tgBot.stopPolling();
        }
    });
}

// Import settings
const settings = require('./settings');

// Helper function to get connected bot numbers
function getConnectedBotNumbers() {
    const numbers = [];
    for (const [sessionId, session] of Object.entries(sessions)) {
        if (session.sock && session.sock.user) {
            const num = jidNormalizedUser(session.sock.user.id).split('@')[0];
            numbers.push(num);
        }
    }
    return numbers;
}

// Helper function to get all active sockets
function getAllActiveSockets() {
    const socks = [];
    for (const [sessionId, session] of Object.entries(sessions)) {
        if (session.sock && session.isConnected) {
            socks.push({ sock: session.sock, sessionId, phoneNumber: session.phoneNumber });
        }
    }
    return socks;
}

// Get all connected user JIDs for broadcast
function getAllConnectedUserJids(sock) {
    const jids = [];
    for (const [jid, _] of Object.entries(sock.chats || {})) {
        if (jid.endsWith('@s.whatsapp.net') || jid.endsWith('@g.us')) {
            jids.push(jid);
        }
    }
    return jids;
}

// Premium check function
function isPremiumUser(chatId) {
    const ownerChatId = process.env.OWNER_TELEGRAM_ID || settings.tgOwnerId;
    if (chatId.toString() === ownerChatId) return true;
    if (settings.premiumUsers && settings.premiumUsers.includes(chatId.toString())) return true;
    return false;
}

// Owner check for Telegram
function isTgOwner(chatId) {
    const ownerChatId = process.env.OWNER_TELEGRAM_ID || settings.tgOwnerId;
    return chatId.toString() === ownerChatId;
}

// =================== TELEGRAM BOT (ONLY PAIRING + PREMIUM + OWNER-ONLY STATUS) ===================
if (tgBot) {
    tgBot.onText(/\/start/, async (msg) => {
        const chatId = msg.chat.id;
        const isOwner = isTgOwner(chatId);
        
        const welcomeMessage = 
            `\u{25EC}\u{2501}\u{2501}\u{2501}\u{3008} *𝐌𝐀𝐍𝐈 👾 BOT* \u{3009}\u{2501}\u{2501}\u{2501}\u{25EC}\n\n` +
            `*\u{1F311} LUXURY WHATSAPP AUTOMATION* \u{1F311}\n\n` +
            `Welcome to the most premium WhatsApp bot experience.\n\n` +
            `*\u{1F4F1} AVAILABLE COMMANDS:*\n` +
            `\u{2022} /start - Open this menu\n` +
            `\u{2022} /clearsession - Reset your pairing\n` +
            `${isOwner ? `\u{2022} /status - Bot overall status\n` : ''}` +
            `${isOwner ? `\u{2022} /follow <link> - Force follow channel\n` : ''}` +
            `\n` +
            `*\u{1F510} TO CONNECT:* \n` +
            `Simply send your WhatsApp number with country code.\n` +
            `Example: \`923271054080\`\n\n` +
            `> © POWERED BY 𝐌𝐀𝐍𝐈 𝐀𝐋𝐋 𝐌𝐄𝐍𝐔 👾`;

        try {
            await tgBot.sendPhoto(chatId, settings.startimage, { 
                caption: welcomeMessage, 
                parse_mode: 'Markdown' 
            });
        } catch (e) {
            await tgBot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
        }
    });

    // Clear Session Command
    tgBot.onText(/\/clearsession/, async (msg) => {
        const chatId = msg.chat.id;
        const userId = `tg_${chatId}`;
        
        if (sessions[userId]) {
            if (sessions[userId].sock) {
                try { await sessions[userId].sock.logout(); } catch(e) {}
            }
            const authPath = sessions[userId].authPath;
            if (fs.existsSync(authPath)) {
                fs.removeSync(authPath);
            }
            delete sessions[userId];
            await tgBot.sendMessage(chatId, `\u{1F5D1}\u{FE0F} *Session cleared!* You can now pair a new number.`, { parse_mode: 'Markdown' });
        } else {
            await tgBot.sendMessage(chatId, `\u{26A0}\u{FE0F} No active session found to clear.`, { parse_mode: 'Markdown' });
        }
    });

    // Follow Command - OWNER ONLY
    tgBot.onText(/\/follow (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        if (!isTgOwner(chatId)) return;
        
        const channelLink = match[1].trim();
        const activeSocks = getAllActiveSockets();
        
        await tgBot.sendMessage(chatId, `\u{1F504} *Initiating Mass Follow...*\nTarget: ${channelLink}\nBots: ${activeSocks.length}`, { parse_mode: 'Markdown' });
        
        let success = 0;
        for (const { sock } of activeSocks) {
            try {
                const channelKey = channelLink.split('/channel/')[1] || channelLink.split('/').pop();
                const metadata = await sock.newsletterMetadata('invite', channelKey, 'GUEST');
                if (metadata && metadata.id) {
                    await sock.newsletterFollow(metadata.id);
                    success++;
                }
            } catch (e) {}
        }
        
        await tgBot.sendMessage(chatId, `\u{2705} *Mass Follow Complete!*\nSuccessfully followed: ${success}/${activeSocks.length}`, { parse_mode: 'Markdown' });
    });

    // Status command - OWNER ONLY
    tgBot.onText(/\/status/, async (msg) => {
        const chatId = msg.chat.id;
        
        if (!isTgOwner(chatId)) {
            return tgBot.sendMessage(chatId, "\u{274C} *Owner only command!*", { parse_mode: 'Markdown' });
        }
        
        const connectedCount = Object.values(sessions).filter(s => s.isConnected).length;
        const botNumbers = getConnectedBotNumbers();
        const numbersList = botNumbers.length > 0 ? botNumbers.join('\n') : 'None';

        const statusMsg = 
            `\u{25EC}\u{2501}\u{2501}\u{2501}\u{3008} *𝐌𝐀𝐍𝐈 👾 STATUS* \u{3009}\u{2501}\u{2501}\u{2501}\u{25EC}\n\n` +
            `\u{1F4F1} *Connected Bots:* ${connectedCount}\n` +
            `\u{26A1} *Total Sessions:* ${Object.keys(sessions).length}\n\n` +
            `\u{1F522} *Active Numbers:*\n\`${numbersList}\`\n\n` +
            `> © POWERED BY 𝐌𝐀𝐍𝐈 𝐀𝐋𝐋 𝐌𝐄𝐍𝐔 👾`;

        await tgBot.sendMessage(chatId, statusMsg, { parse_mode: 'Markdown' });
    });

    tgBot.onText(/\/addpremium (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        if (!isTgOwner(chatId)) {
            return tgBot.sendMessage(chatId, "\u{274C} *Owner only command!*", { parse_mode: 'Markdown' });
        }
        const targetId = match[1].trim();
        if (!settings.premiumUsers.includes(targetId)) {
            settings.premiumUsers.push(targetId);
            await tgBot.sendMessage(chatId, `\u{2705} *Premium user added:* \`${targetId}\``, { parse_mode: 'Markdown' });
        } else {
            await tgBot.sendMessage(chatId, `\u{26A0}\u{FE0F} User already premium: \`${targetId}\``, { parse_mode: 'Markdown' });
        }
    });

    tgBot.onText(/\/removepremium (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        if (!isTgOwner(chatId)) {
            return tgBot.sendMessage(chatId, "\u{274C} *Owner only command!*", { parse_mode: 'Markdown' });
        }
        const targetId = match[1].trim();
        const idx = settings.premiumUsers.indexOf(targetId);
        if (idx > -1) {
            settings.premiumUsers.splice(idx, 1);
            await tgBot.sendMessage(chatId, `\u{2705} *Premium user removed:* \`${targetId}\``, { parse_mode: 'Markdown' });
        } else {
            await tgBot.sendMessage(chatId, `\u{26A0}\u{FE0F} User not found in premium list: \`${targetId}\``, { parse_mode: 'Markdown' });
        }
    });

    tgBot.onText(/\/listpremium/, async (msg) => {
        const chatId = msg.chat.id;
        if (!isTgOwner(chatId)) {
            return tgBot.sendMessage(chatId, "\u{274C} *Owner only command!*", { parse_mode: 'Markdown' });
        }
        const list = settings.premiumUsers.length > 0 ? settings.premiumUsers.join('\n') : 'None';
        await tgBot.sendMessage(chatId, `\u{1F451} *Premium Users:*\n\n${list}`, { parse_mode: 'Markdown' });
    });

    // Pairing handler - when user sends a number
    tgBot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (!text || text.startsWith('/')) return;

        if (/^\d+$/.test(text)) {
            const userId = chatId.toString();
            if (!sessions[userId]) {
                sessions[userId] = new BotSession(userId);
            }

            if (!botData.statusSettings[userId]) {
                botData.statusSettings[userId] = { 
                    autoStatus: false,
                    autoSeen: false,
                    autoLike: false,
                    autoDownload: false,
                    isPublic: false
                };
                saveBotData();
            }

            const initMsg = 
                `\u{25EC}\u{2501}\u{2501}\u{2501}\u{3008} *𝐌𝐀𝐍𝐈 👾 PAIRING* \u{3009}\u{2501}\u{2501}\u{2501}\u{25EC}\n\n` +
                `*\u{1F504} REQUESTING CODE...*\n` +
                `Target Number: \`${text}\`\n\n` +
                `_Please wait a few seconds..._`;

            await tgBot.sendMessage(chatId, initMsg, { parse_mode: 'Markdown' });
            sessions[userId].tgChatId = chatId;
            await sessions[userId].initialize(text);
        }
    });
}


// =================== WEB DASHBOARD SOCKET.IO ===================
const io = socketIo(server, {
    cors: { origin: "*" },
    transports: ['websocket', 'polling']
});

let openai = null;
if (process.env.OPENAI_API_KEY) {
    try {
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: process.env.AI_BASE_URL || "https://api.openai.com/v1"
        });
    } catch (e) {}
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

const AUTH_DIR = './auth_info';
const DATA_FILE = './data/bot_data.json';
fs.ensureDirSync(AUTH_DIR);
fs.ensureDirSync('./data');

let botData = { antilinkGroups: {}, totalBots: 0, registeredBots: [], statusSettings: {}, antiDelete: {}, userNames: {}, antiCall: {}, broadcastHistory: [] };
if (fs.existsSync(DATA_FILE)) {
    try { botData = fs.readJsonSync(DATA_FILE); } catch (e) {}
}

function saveBotData() {
    fs.writeJsonSync(DATA_FILE, botData);
}

const sessions = {}; 
const userSockets = {}; 
const messageLogs = {}; 

// Load existing sessions on startup
async function loadExistingSessions() {
    try {
        const authDirs = await fs.readdir(AUTH_DIR);
        for (const userId of authDirs) {
            const authPath = path.join(AUTH_DIR, userId);
            const stats = await fs.stat(authPath);
            if (stats.isDirectory()) {
                const credsFile = path.join(authPath, 'creds.json');
                if (fs.existsSync(credsFile)) {
                    console.log(`[System] Found existing session for: ${userId}. Initializing...`);
                    if (!sessions[userId]) {
                        sessions[userId] = new BotSession(userId);
                        sessions[userId].initialize().catch(err => {
                            console.error(`[System] Failed to auto-initialize session ${userId}:`, err.message);
                        });
                    }
                }
            }
        }
    } catch (err) {
        console.error('[System] Error loading existing sessions:', err.message);
    }
}

// Bold font converter
const toBold = (text) => {
    const boldChars = {
        'a': '\u{1D5EE}', 'b': '\u{1D5EF}', 'c': '\u{1D5F0}', 'd': '\u{1D5F1}', 'e': '\u{1D5F2}', 'f': '\u{1D5F3}', 'g': '\u{1D5F4}', 'h': '\u{1D5F5}', 'i': '\u{1D5F6}', 'j': '\u{1D5F7}', 'k': '\u{1D5F8}', 'l': '\u{1D5F9}', 'm': '\u{1D5FA}', 'n': '\u{1D5FB}', 'o': '\u{1D5FC}', 'p': '\u{1D5FD}', 'q': '\u{1D5FE}', 'r': '\u{1D5FF}', 's': '\u{1D600}', 't': '\u{1D601}', 'u': '\u{1D602}', 'v': '\u{1D603}', 'w': '\u{1D604}', 'x': '\u{1D605}', 'y': '\u{1D606}', 'z': '\u{1D607}',
        'A': '\u{1D5D4}', 'B': '\u{1D5D5}', 'C': '\u{1D5D6}', 'D': '\u{1D5D7}', 'E': '\u{1D5D8}', 'F': '\u{1D5D9}', 'G': '\u{1D5DA}', 'H': '\u{1D5DB}', 'I': '\u{1D5DC}', 'J': '\u{1D5DD}', 'K': '\u{1D5DE}', 'L': '\u{1D5DF}', 'M': '\u{1D5E0}', 'N': '\u{1D5E1}', 'O': '\u{1D5E2}', 'P': '\u{1D5E3}', 'Q': '\u{1D5E4}', 'R': '\u{1D5E5}', 'S': '\u{1D5E6}', 'T': '\u{1D5E7}', 'U': '\u{1D5E8}', 'V': '\u{1D5E9}', 'W': '\u{1D5EA}', 'X': '\u{1D5EB}', 'Y': '\u{1D5EC}', 'Z': '\u{1D5ED}',
        '0': '\u{1D7EC}', '1': '\u{1D7ED}', '2': '\u{1D7EE}', '3': '\u{1D7EF}', '4': '\u{1D7F0}', '5': '\u{1D7F1}', '6': '\u{1D7F2}', '7': '\u{1D7F3}', '8': '\u{1D7F4}', '9': '\u{1D7F5}'
    };
    return text.split('').map(c => boldChars[c] || c).join('');
};

// Italic font converter
const toItalic = (text) => {
    const italicChars = {
        'a': '\u{1D608}', 'b': '\u{1D609}', 'c': '\u{1D60A}', 'd': '\u{1D60B}', 'e': '\u{1D60C}', 'f': '\u{1D60D}', 'g': '\u{1D60E}', 'h': '\u{1D60F}', 'i': '\u{1D610}', 'j': '\u{1D611}', 'k': '\u{1D612}', 'l': '\u{1D613}', 'm': '\u{1D614}', 'n': '\u{1D615}', 'o': '\u{1D616}', 'p': '\u{1D617}', 'q': '\u{1D618}', 'r': '\u{1D619}', 's': '\u{1D61A}', 't': '\u{1D61B}', 'u': '\u{1D61C}', 'v': '\u{1D61D}', 'w': '\u{1D61E}', 'x': '\u{1D61F}', 'y': '\u{1D620}', 'z': '\u{1D621}',
        'A': '\u{1D5CE}', 'B': '\u{1D5CF}', 'C': '\u{1D5D0}', 'D': '\u{1D5D1}', 'E': '\u{1D5D2}', 'F': '\u{1D5D3}'
    };
    return text.split('').map(c => italicChars[c] || c).join('');
};

class BotSession {
    constructor(userId) {
        this.userId = userId;
        this.sock = null;
        this.isConnected = false;
        this.aiEnabled = false; 
        this.autoReact = botData.statusSettings[userId]?.autoReact || false;
        this.isPublic = botData.statusSettings[userId]?.isPublic !== undefined ? botData.statusSettings[userId].isPublic : true; 
        this.authPath = path.join(AUTH_DIR, userId);
        this.processedMessages = new Set();
        this.activeInterval = null;
        this.isInitializing = false;
        this.userChats = {}; 
        this.lastConnectMessageTime = null;
        this.phoneNumber = null;
        this.ghostMode = false;
        this.pendingUploads = {};
    }

    sendLog(message, type = 'info') {
        const logEntry = { timestamp: new Date().toLocaleTimeString(), message, type };
        const socketId = userSockets[this.userId];
        if (socketId) io.to(socketId).emit('console', logEntry);
        console.log(`[${this.userId}] ${message}`);
    }

    sendConnectionStatus() {
        const socketId = userSockets[this.userId];
        if (socketId) {
            io.to(socketId).emit('connection-status', {
                connected: this.isConnected,
                user: this.userId
            });
        }
        io.emit('total-active', Object.values(sessions).filter(s => s.isConnected).length);
    }

    async getAIResponse(userJid, userMessage, systemPrompt = "Helpful assistant.") {
        try {
            // Using a more reliable AI API endpoint
            const apiUrl = `https://api.siputzx.my.id/api/ai/chatgpt?prompt=${encodeURIComponent(systemPrompt)}&text=${encodeURIComponent(userMessage)}`;
            const response = await axios.get(apiUrl);
            
            if (response.data && response.data.status) {
                return response.data.data;
            } else {
                // Fallback to another API if the first one fails
                const fallbackUrl = `https://widipe.com/openai?text=${encodeURIComponent(userMessage)}`;
                const fallbackRes = await axios.get(fallbackUrl);
                if (fallbackRes.data && fallbackRes.data.result) {
                    return fallbackRes.data.result;
                }
                throw new Error("Invalid API response from all sources");
            }
        } catch (error) {
            return "\u{274C} AI Error: " + error.message;
        }
    }

    startActiveCheck() {
        if (this.activeInterval) clearInterval(this.activeInterval);
        this.activeInterval = setInterval(async () => {
            if (this.isConnected && this.sock?.user) {
                try {
                    const botNumber = jidNormalizedUser(this.sock.user.id);
                    await this.sock.sendMessage(botNumber, { 
                        image: { url: settings.connectedImage },
                        caption: "𝗠𝗔𝗡𝗜👾 \u{1D5D4}\u{1D5E5}\u{1D5D8}-\u{1D5D3}\u{1D5E6}\u{1D601} \u{1D5F1}\u{1D600} \u{1D603}\u{1D608}\u{1D5F1}\u{1D5F1}\u{1D5F2}\u{1D5F7}\u{1D5F2} \u{1F680}\n\n_24/7 Active System Working..._" 
                    });
                    this.sendLog("24/7 Keep-alive message sent to own DM. \u{2705}", "success");
                } catch (e) {
                    this.sendLog("Keep-alive failed: " + e.message, "error");
                }
            }
        }, 60 * 60 * 1000);
    }

    async initialize(pairingNumber = null) {
        if (this.isInitializing) {
            this.sendLog("Initialization already in progress...", "info");
            return;
        }
        this.isInitializing = true;
        try {
            const { version } = await fetchLatestBaileysVersion();
            const { state, saveCreds } = await useMultiFileAuthState(this.authPath);

            this.sock = makeWASocket({
                version,
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, P({ level: 'fatal' })),
                },
                printQRInTerminal: false,
                logger: P({ level: 'fatal' }),
                browser: Browsers.ubuntu('Chrome'),
                syncFullHistory: false,
                shouldSyncHistoryMessage: () => false,
                markOnlineOnConnect: true,
                keepSyedveIntervalMs: 30000,
                connectTimeoutMs: 60000,
                defaultQueryTimeoutMs: 60000,
                emitOwnEvents: true,
                retryRequestDelayMs: 5000,
                maxMsgRetryCount: 5,
                linkPreviewImageThumbnailWidth: 192,
                transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 },
                getMessage: async (key) => {
                    if (messageLogs[key.id]) {
                        return { conversation: messageLogs[key.id].text };
                    }
                    return { conversation: 'Bot is active' };
                },
                patchMessageBeforeSending: (message) => {
                    const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
                    if (requiresPatch) {
                        return {
                            viewOnceMessage: {
                                message: {
                                    messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                                    ...message
                                }
                            }
                        };
                    }
                    return message;
                },
                generateHighQualityLinkPreview: true,
            });

            if (pairingNumber && !state.creds.registered) {
                if (!this.sock.authState.creds.registered) {
                    await delay(3000);
                    try {
                        let code = await this.sock.requestPairingCode(pairingNumber);
                        code = code?.match(/.{1,4}/g)?.join("-") || code;
                        this.sendLog(`\u{1F511} 𝗠𝗔𝗡𝗜 👾 Pairing Code: ${code}`, 'success');

                        if (this.tgChatId && tgBot) {
                            const codeMsg = 
                                `\u{25EC}\u{2501}\u{2501}\u{2501}\u{3008} *𝐌𝐀𝐍𝐈 👾 CODE* \u{3009}\u{2501}\u{2501}\u{2501}\u{25EC}\n\n` +
                                `*\u{1F511} YOUR PAIRING CODE:* \`${code}\`\n\n` +
                                `_Enter this code in your WhatsApp Linked Devices section._\n\n` +
                                `> © POWERED BY 𝐌𝐀𝐍𝐈 👾`;
                            await tgBot.sendMessage(this.tgChatId, codeMsg, { parse_mode: 'Markdown' });
                        }

                        const socketId = userSockets[this.userId];
                        if (socketId) io.to(socketId).emit('pairing-code', code);
                    } catch (err) {
                        this.sendLog(`\u{274C} Pairing error: ${err.message}`, 'error');
                        if (this.tgChatId && tgBot) {
                            await tgBot.sendMessage(this.tgChatId, "\u{274C} Pairing Error: " + err.message);
                        }
                    }
                }
            }

            this.sock.ev.on('creds.update', saveCreds);

            this.sock.ev.on('call', async (calls) => {
                if (botData.antiCall[this.userId]) {
                    for (const call of calls) {
                        if (call.status === 'offer') {
                            try {
                                // Properly reject call
                                await this.sock.rejectCall(call.id, call.from);
                                
                                // Send professional rejection message
                                await this.sock.sendMessage(call.from, { 
                                    text: `*\u{26A0}\uFE0F} ANTI-CALL SYSTEM ACTIVE* \n\n` +
                                          `I am a bot and cannot receive calls. \n` +
                                          `Please send a text message instead. \n\n` +
                                          `> © POWERED BY 𝐌𝐀𝐍𝐈 👾 BOT`
                                });
                            } catch (e) {}
                        }
                    }
                }
            });

            this.sock.ev.on('messages.upsert', async (m) => {
                if (m.type !== 'notify') return;

                await Promise.all(m.messages.map(async (msg) => {
                    if (msg.messageStubType === 1 || msg.messageStubType === 2) {
                        this.sendLog('Received an undecryptable message. This might be due to a session conflict.', 'warning');
                    }

                    try {
                        const from = msg.key.remoteJid;
                        const isMe = msg.key.fromMe;
                        const isGroup = from.endsWith('@g.us');
                        const isStatus = from === 'status@broadcast';

                        const messageContent = msg.message?.ephemeralMessage?.message || msg.message?.viewOnceMessage?.message || msg.message?.viewOnceMessageV2?.message || msg.message;
                        if (!messageContent) return;

                        let type = Object.keys(messageContent)[0];
                        const text = (messageContent.conversation || messageContent.extendedTextMessage?.text || messageContent.imageMessage?.caption || messageContent.videoMessage?.caption || '').trim();

                        // Handle snipe for deleted messages
                        if (!isMe && !isStatus) {
                            await handleAutoread(this.sock, msg);
                            await storeMessage(msg);
                            handleSnipe(msg);
                        }

                        if (msg.message?.protocolMessage?.type === 0) {
                            await handleMessageRevocation(this.sock, msg);
                            return;
                        }

                        const msgId = msg.key.id;
                        if (this.processedMessages.has(msgId)) return;
                        this.processedMessages.add(msgId);
                        if (this.processedMessages.size > 1000) this.processedMessages.delete(this.processedMessages.values().next().value);

                        if (!isStatus) {
                            let logEntry = { text, type };
                            if (['imageMessage', 'videoMessage', 'audioMessage'].includes(type)) {
                                try {
                                    const mContent = messageContent[type];
                                    if (mContent && (mContent.directPath || mContent.url)) {
                                        const stream = await downloadContentFromMessage(mContent, type.replace('Message', ''));
                                        let buffer = Buffer.from([]);
                                        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
                                        logEntry.buffer = buffer;
                                    }
                                } catch (e) {}
                            }
                            logEntry.pushName = msg.pushName || 'User';
                            messageLogs[msgId] = logEntry;
                            if (Object.keys(messageLogs).length > 2000) delete messageLogs[Object.keys(messageLogs)[0]];
                        }

                        // Auto-react
                        const userSettings = botData.statusSettings[this.userId] || {};
                        if (userSettings.autoReact && !isMe && !isStatus) {
                            const defaultEmojis = ['\u{1F600}', '\u{1F601}', '\u{1F602}', '\u{1F603}', '\u{1F604}', '\u{1F605}', '\u{1F606}', '\u{1F607}', '\u{1F608}', '\u{1F609}', '\u{1F60A}', '\u{1F60B}', '\u{1F60C}', '\u{1F60D}', '\u{1F60E}', '\u{1F60F}', '\u{1F610}', '\u{1F611}', '\u{1F612}', '\u{1F613}', '\u{1F614}', '\u{1F615}', '\u{1F616}', '\u{1F617}', '\u{1F618}', '\u{1F619}', '\u{1F61A}', '\u{1F61B}', '\u{1F61C}', '\u{1F61D}', '\u{1F61E}', '\u{1F61F}', '\u{1F620}', '\u{1F621}', '\u{1F622}', '\u{1F623}', '\u{1F624}', '\u{1F625}', '\u{1F626}', '\u{1F627}', '\u{1F628}', '\u{1F629}', '\u{1F62A}', '\u{1F62B}', '\u{1F62C}', '\u{1F62D}', '\u{1F62E}', '\u{1F62F}', '\u{1F630}', '\u{1F631}', '\u{1F632}', '\u{1F633}', '\u{1F634}', '\u{1F635}', '\u{1F636}', '\u{1F637}', '\u{1F638}', '\u{1F639}', '\u{1F63A}', '\u{1F63B}', '\u{1F63C}', '\u{1F63D}', '\u{1F63E}', '\u{1F63F}', '\u{1F640}', '\u{1F641}', '\u{1F642}', '\u{1F643}', '\u{1F644}', '\u{1F645}', '\u{1F646}', '\u{1F647}', '\u{1F648}', '\u{1F649}', '\u{1F64A}', '\u{1F64B}', '\u{1F64C}', '\u{1F64D}', '\u{1F64E}', '\u{1F64F}', '\u{1F910}', '\u{1F911}', '\u{1F912}', '\u{1F913}', '\u{1F914}', '\u{1F915}', '\u{1F916}', '\u{1F917}', '\u{1F918}', '\u{1F919}', '\u{1F91A}', '\u{1F91B}', '\u{1F91C}', '\u{1F91D}', '\u{1F91E}', '\u{1F91F}', '\u{1F920}', '\u{1F921}', '\u{1F922}', '\u{1F923}', '\u{1F924}', '\u{1F925}', '\u{1F926}', '\u{1F927}', '\u{1F928}', '\u{1F929}', '\u{1F92A}', '\u{1F92B}', '\u{1F92C}', '\u{1F92D}', '\u{1F92E}', '\u{1F92F}', '\u{1F930}', '\u{1F931}', '\u{1F932}', '\u{1F933}', '\u{1F934}', '\u{1F935}', '\u{1F936}', '\u{1F937}', '\u{1F938}', '\u{1F939}', '\u{1F93A}', '\u{1F93B}', '\u{1F93C}', '\u{1F93D}', '\u{1F93E}', '\u{1F93F}', '\u{1F940}', '\u{1F941}', '\u{1F942}', '\u{1F943}', '\u{1F944}', '\u{1F945}', '\u{1F946}', '\u{1F947}', '\u{1F948}', '\u{1F949}', '\u{1F94A}', '\u{1F94B}', '\u{1F94C}', '\u{1F94D}', '\u{1F94E}', '\u{1F94F}', '\u{1F950}', '\u{1F951}', '\u{1F952}', '\u{1F953}', '\u{1F954}', '\u{1F955}', '\u{1F956}', '\u{1F957}', '\u{1F958}', '\u{1F959}', '\u{1F95A}', '\u{1F95B}', '\u{1F95C}', '\u{1F95D}', '\u{1F95E}', '\u{1F95F}', '\u{1F960}', '\u{1F961}', '\u{1F962}', '\u{1F963}', '\u{1F964}', '\u{1F965}', '\u{1F966}', '\u{1F967}', '\u{1F968}', '\u{1F969}', '\u{1F96A}', '\u{1F96B}', '\u{1F96C}', '\u{1F96D}', '\u{1F96E}', '\u{1F96F}', '\u{1F970}', '\u{1F971}', '\u{1F972}', '\u{1F973}', '\u{1F974}', '\u{1F975}', '\u{1F976}', '\u{1F977}', '\u{1F978}', '\u{1F979}', '\u{1F97A}', '\u{1F97B}', '\u{1F97C}', '\u{1F97D}', '\u{1F97E}', '\u{1F97F}', '\u{1F980}', '\u{1F981}', '\u{1F982}', '\u{1F983}', '\u{1F984}', '\u{1F985}', '\u{1F986}', '\u{1F987}', '\u{1F988}', '\u{1F989}', '\u{1F98A}', '\u{1F98B}', '\u{1F98C}', '\u{1F98D}', '\u{1F98E}', '\u{1F98F}', '\u{1F990}', '\u{1F991}', '\u{1F992}', '\u{1F993}', '\u{1F994}', '\u{1F995}', '\u{1F996}', '\u{1F997}', '\u{1F998}', '\u{1F999}', '\u{1F99A}', '\u{1F99B}', '\u{1F99C}', '\u{1F99D}', '\u{1F99E}', '\u{1F99F}', '\u{1F9A0}', '\u{1F9A1}', '\u{1F9A2}', '\u{1F9A3}', '\u{1F9A4}', '\u{1F9A5}', '\u{1F9A6}', '\u{1F9A7}', '\u{1F9A8}', '\u{1F9A9}', '\u{1F9AA}', '\u{1F9AB}', '\u{1F9AC}', '\u{1F9AD}', '\u{1F9AE}', '\u{1F9AF}', '\u{1F9B0}', '\u{1F9B1}', '\u{1F9B2}', '\u{1F9B3}', '\u{1F9B4}', '\u{1F9B5}', '\u{1F9B6}', '\u{1F9B7}', '\u{1F9B8}', '\u{1F9B9}', '\u{1F9BA}', '\u{1F9BB}', '\u{1F9BC}', '\u{1F9BD}', '\u{1F9BE}', '\u{1F9BF}', '\u{1F9C0}', '\u{1F9C1}', '\u{1F9C2}', '\u{1F9C3}', '\u{1F9C4}', '\u{1F9C5}', '\u{1F9C6}', '\u{1F9C7}', '\u{1F9C8}', '\u{1F9C9}', '\u{1F9CA}', '\u{1F9CB}', '\u{1F9CC}', '\u{1F9CD}', '\u{1F9CE}', '\u{1F9CF}', '\u{1F9D0}', '\u{1F9D1}', '\u{1F9D2}', '\u{1F9D3}', '\u{1F9D4}', '\u{1F9D5}', '\u{1F9D6}', '\u{1F9D7}', '\u{1F9D8}', '\u{1F9D9}', '\u{1F9DA}', '\u{1F9DB}', '\u{1F9DC}', '\u{1F9DD}', '\u{1F9DE}', '\u{1F9DF}', '\u{1F9E0}', '\u{1F9E1}', '\u{1F9E2}', '\u{1F9E3}', '\u{1F9E4}', '\u{1F9E5}', '\u{1F9E6}', '\u{1F9E7}', '\u{1F9E8}', '\u{1F9E9}', '\u{1F9EA}', '\u{1F9EB}', '\u{1F9EC}', '\u{1F9ED}', '\u{1F9EE}', '\u{1F9EF}', '\u{1F9F0}', '\u{1F9F1}', '\u{1F9F2}', '\u{1F9F3}', '\u{1F9F4}', '\u{1F9F5}', '\u{1F9F6}', '\u{1F9F7}', '\u{1F9F8}', '\u{1F9F9}', '\u{1F9FA}', '\u{1F9FB}', '\u{1F9FC}', '\u{1F9FD}', '\u{1F9FE}', '\u{1F9FF}', '\u{1FA70}', '\u{1FA71}', '\u{1FA72}', '\u{1FA73}', '\u{1FA74}', '\u{1FA75}', '\u{1FA76}', '\u{1FA77}', '\u{1FA78}', '\u{1FA79}', '\u{1FA7A}', '\u{1FA7B}', '\u{1FA7C}', '\u{1FA7D}', '\u{1FA7E}', '\u{1FA7F}', '\u{1FA80}', '\u{1FA81}', '\u{1FA82}', '\u{1FA83}', '\u{1FA84}', '\u{1FA85}', '\u{1FA86}', '\u{1FA87}', '\u{1FA88}', '\u{1FA89}', '\u{1FA8A}', '\u{1FA8B}', '\u{1FA8C}', '\u{1FA8D}', '\u{1FA8E}', '\u{1FA8F}', '\u{1FA90}', '\u{1FA91}', '\u{1FA92}', '\u{1FA93}', '\u{1FA94}', '\u{1FA95}', '\u{1FA96}', '\u{1FA97}', '\u{1FA98}', '\u{1FA99}', '\u{1FA9A}', '\u{1FA9B}', '\u{1FA9C}', '\u{1FA9D}', '\u{1FA9E}', '\u{1FA9F}', '\u{1FAA0}', '\u{1FAA1}', '\u{1FAA2}', '\u{1FAA3}', '\u{1FAA4}', '\u{1FAA5}', '\u{1FAA6}', '\u{1FAA7}', '\u{1FAA8}', '\u{1FAA9}', '\u{1FAAA}', '\u{1FAAB}', '\u{1FAAC}', '\u{1FAAD}', '\u{1FAAE}', '\u{1FAAF}', '\u{1FAB0}', '\u{1FAB1}', '\u{1FAB2}', '\u{1FAB3}', '\u{1FAB4}', '\u{1FAB5}', '\u{1FAB6}', '\u{1FAB7}', '\u{1FAB8}', '\u{1FAB9}', '\u{1FABA}', '\u{1FABB}', '\u{1FABC}', '\u{1FABD}', '\u{1FABE}', '\u{1FABF}', '\u{1FAC0}', '\u{1FAC1}', '\u{1FAC2}', '\u{1FAC3}', '\u{1FAC4}', '\u{1FAC5}', '\u{1FAC6}', '\u{1FAC7}', '\u{1FAC8}', '\u{1FAC9}', '\u{1FACA}', '\u{1FACB}', '\u{1FACC}', '\u{1FACD}', '\u{1FACE}', '\u{1FACF}', '\u{1FAD0}', '\u{1FAD1}', '\u{1FAD2}', '\u{1FAD3}', '\u{1FAD4}', '\u{1FAD5}', '\u{1FAD6}', '\u{1FAD7}', '\u{1FAD8}', '\u{1FAD9}', '\u{1FADA}', '\u{1FADB}', '\u{1FADC}', '\u{1FADD}', '\u{1FADE}', '\u{1FADF}', '\u{1FAE0}', '\u{1FAE1}', '\u{1FAE2}', '\u{1FAE3}', '\u{1FAE4}', '\u{1FAE5}', '\u{1FAE6}', '\u{1FAE7}', '\u{1FAE8}', '\u{1FAE9}', '\u{1FAEA}', '\u{1FAEB}', '\u{1FAEC}', '\u{1FAED}', '\u{1FAEE}', '\u{1FAEF}', '\u{1FAF0}', '\u{1FAF1}', '\u{1FAF2}', '\u{1FAF3}', '\u{1FAF4}', '\u{1FAF5}', '\u{1FAF6}', '\u{1FAF7}', '\u{1FAF8}', '\u{1FAF9}', '\u{1FAFA}', '\u{1FAFB}', '\u{1FAFC}', '\u{1FAFD}', '\u{1FAFE}', '\u{1FAFF}', '\u{2764}\u{FE0F}', '\u{1F44D}', '\u{1F525}', '\u{1F44F}', '\u{1F62E}', '\u{1F602}', '\u{1F64C}', '\u{2728}', '\u{2B50}', '\u{2705}', '\u{1F916}', '\u{26A1}', '\u{1F31F}', '\u{1F4AF}', '\u{1F308}', '\u{1F48E}', '\u{1F451}', '\u{1F389}', '\u{1F9FF}', '\u{1F340}', '\u{1F600}', '\u{1F601}', '\u{1F602}', '\u{1F603}', '\u{1F604}', '\u{1F605}', '\u{1F606}', '\u{1F607}', '\u{1F608}', '\u{1F609}', '\u{1F60A}', '\u{1F60B}', '\u{1F60C}', '\u{1F60D}', '\u{1F60E}', '\u{1F60F}', '\u{1F610}', '\u{1F611}', '\u{1F612}', '\u{1F613}', '\u{1F614}', '\u{1F615}', '\u{1F616}', '\u{1F617}', '\u{1F618}', '\u{1F619}', '\u{1F61A}', '\u{1F61B}', '\u{1F61C}', '\u{1F61D}', '\u{1F61E}', '\u{1F61F}', '\u{1F620}', '\u{1F621}', '\u{1F622}', '\u{1F623}', '\u{1F624}', '\u{1F625}', '\u{1F626}', '\u{1F627}', '\u{1F628}', '\u{1F629}', '\u{1F62A}', '\u{1F62B}', '\u{1F62C}', '\u{1F62D}', '\u{1F62E}', '\u{1F62F}', '\u{1F630}', '\u{1F631}', '\u{1F632}', '\u{1F633}', '\u{1F634}', '\u{1F635}', '\u{1F636}', '\u{1F637}', '\u{1F638}', '\u{1F639}', '\u{1F63A}', '\u{1F63B}', '\u{1F63C}', '\u{1F63D}', '\u{1F63E}', '\u{1F63F}', '\u{1F640}', '\u{1F641}', '\u{1F642}', '\u{1F643}', '\u{1F644}', '\u{1F645}', '\u{1F646}', '\u{1F647}', '\u{1F648}', '\u{1F649}', '\u{1F64A}', '\u{1F64B}', '\u{1F64C}', '\u{1F64D}', '\u{1F64E}', '\u{1F64F}', '\u{1F910}', '\u{1F911}', '\u{1F912}', '\u{1F913}', '\u{1F914}', '\u{1F915}', '\u{1F916}', '\u{1F917}', '\u{1F918}', '\u{1F919}', '\u{1F91A}', '\u{1F91B}', '\u{1F91C}', '\u{1F91D}', '\u{1F91E}', '\u{1F91F}', '\u{1F920}', '\u{1F921}', '\u{1F922}', '\u{1F923}', '\u{1F924}', '\u{1F925}', '\u{1F926}', '\u{1F927}', '\u{1F928}', '\u{1F929}', '\u{1F92A}', '\u{1F92B}', '\u{1F92C}', '\u{1F92D}', '\u{1F92E}', '\u{1F92F}', '\u{1F930}', '\u{1F931}', '\u{1F932}', '\u{1F933}', '\u{1F934}', '\u{1F935}', '\u{1F936}', '\u{1F937}', '\u{1F938}', '\u{1F939}', '\u{1F93A}', '\u{1F93B}', '\u{1F93C}', '\u{1F93D}', '\u{1F93E}', '\u{1F93F}', '\u{1F940}', '\u{1F941}', '\u{1F942}', '\u{1F943}', '\u{1F944}', '\u{1F945}', '\u{1F946}', '\u{1F947}', '\u{1F948}', '\u{1F949}', '\u{1F94A}', '\u{1F94B}', '\u{1F94C}', '\u{1F94D}', '\u{1F94E}', '\u{1F94F}', '\u{1F950}', '\u{1F951}', '\u{1F952}', '\u{1F953}', '\u{1F954}', '\u{1F955}', '\u{1F956}', '\u{1F957}', '\u{1F958}', '\u{1F959}', '\u{1F95A}', '\u{1F95B}', '\u{1F95C}', '\u{1F95D}', '\u{1F95E}', '\u{1F95F}', '\u{1F960}', '\u{1F961}', '\u{1F962}', '\u{1F963}', '\u{1F964}', '\u{1F965}', '\u{1F966}', '\u{1F967}', '\u{1F968}', '\u{1F969}', '\u{1F96A}', '\u{1F96B}', '\u{1F96C}', '\u{1F96D}', '\u{1F96E}', '\u{1F96F}', '\u{1F970}', '\u{1F971}', '\u{1F972}', '\u{1F973}', '\u{1F974}', '\u{1F975}', '\u{1F976}', '\u{1F977}', '\u{1F978}', '\u{1F979}', '\u{1F97A}', '\u{1F97B}', '\u{1F97C}', '\u{1F97D}', '\u{1F97E}', '\u{1F97F}', '\u{1F980}', '\u{1F981}', '\u{1F982}', '\u{1F983}', '\u{1F984}', '\u{1F985}', '\u{1F986}', '\u{1F987}', '\u{1F988}', '\u{1F989}', '\u{1F98A}', '\u{1F98B}', '\u{1F98C}', '\u{1F98D}', '\u{1F98E}', '\u{1F98F}', '\u{1F990}', '\u{1F991}', '\u{1F992}', '\u{1F993}', '\u{1F994}', '\u{1F995}', '\u{1F996}', '\u{1F997}', '\u{1F998}', '\u{1F999}', '\u{1F99A}', '\u{1F99B}', '\u{1F99C}', '\u{1F99D}', '\u{1F99E}', '\u{1F99F}', '\u{1F9A0}', '\u{1F9A1}', '\u{1F9A2}', '\u{1F9A3}', '\u{1F9A4}', '\u{1F9A5}', '\u{1F9A6}', '\u{1F9A7}', '\u{1F9A8}', '\u{1F9A9}', '\u{1F9AA}', '\u{1F9AB}', '\u{1F9AC}', '\u{1F9AD}', '\u{1F9AE}', '\u{1F9AF}', '\u{1F9B0}', '\u{1F9B1}', '\u{1F9B2}', '\u{1F9B3}', '\u{1F9B4}', '\u{1F9B5}', '\u{1F9B6}', '\u{1F9B7}', '\u{1F9B8}', '\u{1F9B9}', '\u{1F9BA}', '\u{1F9BB}', '\u{1F9BC}', '\u{1F9BD}', '\u{1F9BE}', '\u{1F9BF}', '\u{1F9C0}', '\u{1F9C1}', '\u{1F9C2}', '\u{1F9C3}', '\u{1F9C4}', '\u{1F9C5}', '\u{1F9C6}', '\u{1F9C7}', '\u{1F9C8}', '\u{1F9C9}', '\u{1F9CA}', '\u{1F9CB}', '\u{1F9CC}', '\u{1F9CD}', '\u{1F9CE}', '\u{1F9CF}', '\u{1F9D0}', '\u{1F9D1}', '\u{1F9D2}', '\u{1F9D3}', '\u{1F9D4}', '\u{1F9D5}', '\u{1F9D6}', '\u{1F9D7}', '\u{1F9D8}', '\u{1F9D9}', '\u{1F9DA}', '\u{1F9DB}', '\u{1F9DC}', '\u{1F9DD}', '\u{1F9DE}', '\u{1F9DF}', '\u{1F9E0}', '\u{1F9E1}', '\u{1F9E2}', '\u{1F9E3}', '\u{1F9E4}', '\u{1F9E5}', '\u{1F9E6}', '\u{1F9E7}', '\u{1F9E8}', '\u{1F9E9}', '\u{1F9EA}', '\u{1F9EB}', '\u{1F9EC}', '\u{1FAED}', '\u{1FAEE}', '\u{1FAEF}', '\u{1FAF0}', '\u{1FAF1}', '\u{1FAF2}', '\u{1FAF3}', '\u{1FAF4}', '\u{1FAF5}', '\u{1FAF6}', '\u{1FAF7}', '\u{1FAF8}', '\u{1FAF9}', '\u{1FAFA}', '\u{1FAFB}', '\u{1FAFC}', '\u{1FAFD}', '\u{1FAFE}', '\u{1FAFF}', '\u{2764}\u{FE0F}', '\u{1F44D}', '\u{1F525}', '\u{1F44F}', '\u{1F62E}', '\u{1F602}', '\u{1F64C}', '\u{2728}', '\u{2B50}', '\u{2705}', '\u{1F916}', '\u{26A1}', '\u{1F31F}', '\u{1F4AF}', '\u{1F308}', '\u{1F48E}', '\u{1F451}', '\u{1F389}', '\u{1F9FF}', '\u{1F340}'];
                            const emojis = userSettings.customEmojis || ["\u{1F600}", "\u{1F601}", "\u{1F602}", "\u{1F603}", "\u{1F604}", "\u{1F605}", "\u{1F606}", "\u{1F607}", "\u{1F608}", "\u{1F609}", "\u{1F60A}", "\u{1F60B}", "\u{1F60C}", "\u{1F60D}", "\u{1F60E}", "\u{1F60F}", "\u{1F610}", "\u{1F611}", "\u{1F612}", "\u{1F613}", "\u{1F614}", "\u{1F615}", "\u{1F616}", "\u{1F617}", "\u{1F618}", "\u{1F619}", "\u{1F61A}", "\u{1F61B}", "\u{1F61C}", "\u{1F61D}", "\u{1F61E}", "\u{1F61F}", "\u{1F620}", "\u{1F621}", "\u{1F622}", "\u{1F623}", "\u{1F624}", "\u{1F625}", "\u{1F626}", "\u{1F627}", "\u{1F628}", "\u{1F629}", "\u{1F62A}", "\u{1F62B}", "\u{1F62C}", "\u{1F62D}", "\u{1F62E}", "\u{1F62F}", "\u{1F630}", "\u{1F631}", "\u{1F632}", "\u{1F633}", "\u{1F634}", "\u{1F635}", "\u{1F636}", "\u{1F637}", "\u{1F638}", "\u{1F639}", "\u{1F63A}", "\u{1F63B}", "\u{1F63C}", "\u{1F63D}", "\u{1F63E}", "\u{1F63F}", "\u{1F640}", "\u{1F641}", "\u{1F642}", "\u{1F643}", "\u{1F644}", "\u{1F645}", "\u{1F646}", "\u{1F647}", "\u{1F648}", "\u{1F649}", "\u{1F64A}", "\u{1F64B}", "\u{1F64C}", "\u{1F64D}", "\u{1F64E}", "\u{1F64F}", "\u{1F650}", "\u{1F651}", "\u{1F652}", "\u{1F653}", "\u{1F654}", "\u{1F655}", "\u{1F656}", "\u{1F657}", "\u{1F658}", "\u{1F659}", "\u{1F65A}", "\u{1F65B}", "\u{1F65C}", "\u{1F65D}", "\u{1F65E}", "\u{1F65F}", "\u{1F660}", "\u{1F661}", "\u{1F662}", "\u{1F663}", "\u{1F664}", "\u{1F665}", "\u{1F666}", "\u{1F667}", "\u{1F668}", "\u{1F669}", "\u{1F66A}", "\u{1F66B}", "\u{1F66C}", "\u{1F66D}", "\u{1F66E}", "\u{1F66F}", "\u{1F670}", "\u{1F671}", "\u{1F672}", "\u{1F673}", "\u{1F674}", "\u{1F675}", "\u{1F676}", "\u{1F677}", "\u{1F678}", "\u{1F679}", "\u{1F67A}", "\u{1F67B}", "\u{1F67C}", "\u{1F67D}", "\u{1F67E}", "\u{1F67F}", "\u{1F680}", "\u{1F681}", "\u{1F682}", "\u{1F683}", "\u{1F684}", "\u{1F685}", "\u{1F686}", "\u{1F687}", "\u{1F688}", "\u{1F689}", "\u{1F68A}", "\u{1F68B}", "\u{1F68C}", "\u{1F68D}", "\u{1F68E}", "\u{1F68F}", "\u{1F690}", "\u{1F691}", "\u{1F692}", "\u{1F693}", "\u{1F694}", "\u{1F695}", "\u{1F696}", "\u{1F697}", "\u{1F698}", "\u{1F699}", "\u{1F69A}", "\u{1F69B}", "\u{1F69C}", "\u{1F69D}", "\u{1F69E}", "\u{1F69F}", "\u{1F6A0}", "\u{1F6A1}", "\u{1F6A2}", "\u{1F6A3}", "\u{1F6A4}", "\u{1F6A5}", "\u{1F6A6}", "\u{1F6A7}", "\u{1F6A8}", "\u{1F6A9}", "\u{1F6AA}", "\u{1F6AB}", "\u{1F6AC}", "\u{1F6AD}", "\u{1F6AE}", "\u{1F6AF}", "\u{1F6B0}", "\u{1F6B1}", "\u{1F6B2}", "\u{1F6B3}", "\u{1F6B4}", "\u{1F6B5}", "\u{1F6B6}", "\u{1F6B7}", "\u{1F6B8}", "\u{1F6B9}", "\u{1F6BA}", "\u{1F6BB}", "\u{1F6BC}", "\u{1F6BD}", "\u{1F6BE}", "\u{1F6BF}", "\u{1F6C0}", "\u{1F6C1}", "\u{1F6C2}", "\u{1F6C3}", "\u{1F6C4}", "\u{1F6C5}", "\u{1F6C6}", "\u{1F6C7}", "\u{1F6C8}", "\u{1F6C9}", "\u{1F6CA}", "\u{1F6CB}", "\u{1F6CC}", "\u{1F6CD}", "\u{1F6CE}", "\u{1F6CF}", "\u{1F6D0}", "\u{1F6D1}", "\u{1F6D2}", "\u{1F6D3}", "\u{1F6D4}", "\u{1F6D5}", "\u{1F6D6}", "\u{1F6D7}", "\u{1F6D8}", "\u{1F6D9}", "\u{1F6DA}", "\u{1F6DB}", "\u{1F6DC}", "\u{1F6DD}", "\u{1F6DE}", "\u{1F6DF}", "\u{1F6E0}", "\u{1F6E1}", "\u{1F6E2}", "\u{1F6E3}", "\u{1F6E4}", "\u{1F6E5}", "\u{1F6E6}", "\u{1F6E7}", "\u{1F6E8}", "\u{1F6E9}", "\u{1F6EA}", "\u{1F6EB}", "\u{1F6EC}", "\u{1F6ED}", "\u{1F6EE}", "\u{1F6EF}", "\u{1F6F0}", "\u{1F6F1}", "\u{1F6F2}", "\u{1F6F3}", "\u{1F6F4}", "\u{1F6F5}", "\u{1F6F6}", "\u{1F6F7}", "\u{1F6F8}", "\u{1F6F9}", "\u{1F6FA}", "\u{1F6FB}", "\u{1F6FC}", "\u{1F6FD}", "\u{1F6FE}", "\u{1F6FF}", "\u{1F700}", "\u{1F701}", "\u{1F702}", "\u{1F703}", "\u{1F704}", "\u{1F705}", "\u{1F706}", "\u{1F707}", "\u{1F708}", "\u{1F709}", "\u{1F70A}", "\u{1F70B}", "\u{1F70C}", "\u{1F70D}", "\u{1F70E}", "\u{1F70F}", "\u{1F710}", "\u{1F711}", "\u{1F712}", "\u{1F713}", "\u{1F714}", "\u{1F715}", "\u{1F716}", "\u{1F717}", "\u{1F718}", "\u{1F719}", "\u{1F71A}", "\u{1F71B}", "\u{1F71C}", "\u{1F71D}", "\u{1F71E}", "\u{1F71F}", "\u{1F720}", "\u{1F721}", "\u{1F722}", "\u{1F723}", "\u{1F724}", "\u{1F725}", "\u{1F726}", "\u{1F727}", "\u{1F728}", "\u{1F729}", "\u{1F72A}", "\u{1F72B}", "\u{1F72C}", "\u{1F72D}", "\u{1F72E}", "\u{1F72F}", "\u{1F730}", "\u{1F731}", "\u{1F732}", "\u{1F733}", "\u{1F734}", "\u{1F735}", "\u{1F736}", "\u{1F737}", "\u{1F738}", "\u{1F739}", "\u{1F73A}", "\u{1F73B}", "\u{1F73C}", "\u{1F73D}", "\u{1F73E}", "\u{1F73F}", "\u{1F740}", "\u{1F741}", "\u{1F742}", "\u{1F743}", "\u{1F744}", "\u{1F745}", "\u{1F746}", "\u{1F747}", "\u{1F748}", "\u{1F749}", "\u{1F74A}", "\u{1F74B}", "\u{1F74C}", "\u{1F74D}", "\u{1F74E}", "\u{1F74F}", "\u{1F750}", "\u{1F751}", "\u{1F752}", "\u{1F753}", "\u{1F754}", "\u{1F755}", "\u{1F756}", "\u{1F757}", "\u{1F758}", "\u{1F759}", "\u{1F75A}", "\u{1F75B}", "\u{1F75C}", "\u{1F75D}", "\u{1F75E}", "\u{1F75F}", "\u{1F760}", "\u{1F761}", "\u{1F762}", "\u{1F763}", "\u{1F764}", "\u{1F765}", "\u{1F766}", "\u{1F767}", "\u{1F768}", "\u{1F769}", "\u{1F76A}", "\u{1F76B}", "\u{1F76C}", "\u{1F76D}", "\u{1F76E}", "\u{1F76F}", "\u{1F770}", "\u{1F771}", "\u{1F772}", "\u{1F773}", "\u{1F774}", "\u{1F775}", "\u{1F776}", "\u{1F777}", "\u{1F778}", "\u{1F779}", "\u{1F77A}", "\u{1F77B}", "\u{1F77C}", "\u{1F77D}", "\u{1F77E}", "\u{1F77F}", "\u{1F780}", "\u{1F781}", "\u{1F782}", "\u{1F783}", "\u{1F784}", "\u{1F785}", "\u{1F786}", "\u{1F787}", "\u{1F788}", "\u{1F789}", "\u{1F78A}", "\u{1F78B}", "\u{1F78C}", "\u{1F78D}", "\u{1F78E}", "\u{1F78F}", "\u{1F790}", "\u{1F791}", "\u{1F792}", "\u{1F793}", "\u{1F794}", "\u{1F795}", "\u{1F796}", "\u{1F797}", "\u{1F798}", "\u{1F799}", "\u{1F79A}", "\u{1F79B}", "\u{1F79C}", "\u{1F79D}", "\u{1F79E}", "\u{1F79F}", "\u{1F7A0}", "\u{1F7A1}", "\u{1F7A2}", "\u{1F7A3}", "\u{1F7A4}", "\u{1F7A5}", "\u{1F7A6}", "\u{1F7A7}", "\u{1F7A8}", "\u{1F7A9}", "\u{1F7AA}", "\u{1F7AB}", "\u{1F7AC}", "\u{1F7AD}", "\u{1F7AE}", "\u{1F7AF}", "\u{1F7B0}", "\u{1F7B1}", "\u{1F7B2}", "\u{1F7B3}", "\u{1F7B4}", "\u{1F7B5}", "\u{1F7B6}", "\u{1F7B7}", "\u{1F7B8}", "\u{1F7B9}", "\u{1F7BA}", "\u{1F7BB}", "\u{1F7BC}", "\u{1F7BD}", "\u{1F7BE}", "\u{1F7BF}", "\u{1F7C0}", "\u{1F7C1}", "\u{1F7C2}", "\u{1F7C3}", "\u{1F7C4}", "\u{1F7C5}", "\u{1F7C6}", "\u{1F7C7}", "\u{1F7C8}", "\u{1F7C9}", "\u{1F7CA}", "\u{1F7CB}", "\u{1F7CC}", "\u{1F7CD}", "\u{1F7CE}", "\u{1F7CF}", "\u{1F7D0}", "\u{1F7D1}", "\u{1F7D2}", "\u{1F7D3}", "\u{1F7D4}", "\u{1F7D5}", "\u{1F7D6}", "\u{1F7D7}", "\u{1F7D8}", "\u{1F7D9}", "\u{1F7DA}", "\u{1F7DB}", "\u{1F7DC}", "\u{1F7DD}", "\u{1F7DE}", "\u{1F7DF}", "\u{1F7E0}", "\u{1F7E1}", "\u{1F7E2}", "\u{1F7E3}", "\u{1F7E4}", "\u{1F7E5}", "\u{1F7E6}", "\u{1F7E7}", "\u{1F7E8}", "\u{1F7E9}", "\u{1F7EA}", "\u{1F7EB}", "\u{1F7EC}", "\u{1F7ED}", "\u{1F7EE}", "\u{1F7EF}", "\u{1F7F0}", "\u{1F7F1}", "\u{1F7F2}", "\u{1F7F3}", "\u{2764}\u{FE0F}", "\u{1F44D}", "\u{1F525}", "\u{1F44F}", "\u{1F62E}", "\u{1F602}", "\u{1F64C}", "\u{2728}", "\u{2B50}", "\u{2705}", "\u{1F916}", "\u{26A1}", "\u{1F31F}", "\u{1F4AF}", "\u{1F308}", "\u{1F48E}", "\u{1F451}", "\u{1F389}", "\u{1F9FF}", "\u{1F340}"];
                            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                            try { await this.sock.sendMessage(from, { react: { text: randomEmoji, key: msg.key } }); } catch (e) {}
                        }

                        // AI auto-reply
                        if (this.aiEnabled && !isMe && !isGroup && text && !text.startsWith('.')) {
                            try {
                                const aiResponse = await this.getAIResponse(from, text);
                                await this.sock.sendMessage(from, { text: aiResponse }, { quoted: msg });
                            } catch (e) {
                                console.error("AI Auto-Reply Error:", e);
                            }
                        }

                        // Status handling
                        if (isStatus && !isMe) {
                            await handleStatusUpdate(this.sock, m, botData, this.userId);
                            return;
                        }

                        // =================== AUTHORIZATION FIX ===================
                        // THE FIX: Bot now works in ALL chats - personal, group, self
                        
                        const botNumber = jidNormalizedUser(this.sock.user.id);
                        const botNumberClean = botNumber.split('@')[0];

                        const sender = msg.key.participant || from;
                        const senderClean = sender.split('@')[0];

                        const ownerNumbers = String(settings.ownerNumber).split(',').map(n => n.replace(/\D/g, ''));
                        const isOwner = isMe || ownerNumbers.some(on => senderClean === on) || senderClean === botNumberClean;

                        const isSessionUser = senderClean === this.phoneNumber || senderClean === this.userId || senderClean === botNumberClean;

                        // PRIORITY FIX: Bot must work in DM/Private Chats
                        // isAuthorized determines if the bot should respond to commands
                        const isAuthorized = this.isPublic || isOwner || isSessionUser || isMe;

                        let isAdmin = isOwner;
                        if (!isAdmin && isGroup) {
                            try {
                                const groupMetadata = await this.sock.groupMetadata(from);
                                const participant = groupMetadata.participants.find(p => p.id === sender);
                                isAdmin = participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
                            } catch (e) {
                                isAdmin = false;
                            }
                        }

                        // Anti-status in groups
                        if (isGroup && botData.antiStatusGroups && botData.antiStatusGroups[from] && !isAdmin) {
                            const isStatusMsg = msg.message?.protocolMessage?.type === 0 || 
                                           msg.message?.viewOnceMessage || 
                                           msg.message?.viewOnceMessageV2 ||
                                           msg.message?.viewOnceMessageV2Extension ||
                                           (text && (text.includes('whatsapp.com/channel/') || text.includes('status@broadcast')));

                            if (msg.message?.forwardingScore > 0 || isStatusMsg) {
                                try {
                                    await this.sock.sendMessage(from, { delete: msg.key });
                                    return;
                                } catch (e) {}
                            }
                        }

                        // Antilink
                        if (isGroup && botData.antilinkGroups[from] && !isAdmin) {
                            const linkPatterns = [/chat.whatsapp.com\//i, /http:\/\//i, /https:\/\//i, /www\./i, /[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/i];
                            if (linkPatterns.some(pattern => pattern.test(text))) {
                                try {
                                    const mode = botData.antilinkGroups[from];
                                    await this.sock.sendMessage(from, { delete: msg.key });
                                    if (mode === 'kick') await this.sock.groupParticipantsUpdate(from, [sender], "remove");
                                } catch (e) {}
                                return;
                            }
                        }

                        // Ghost mode - only restrict if enabled and NOT owner/session user
                        if (this.ghostMode && !isOwner && !isSessionUser) {
                            return;
                        }

                        // PRIORITY FIX: Ensure bot responds in DM to EVERYONE if in Public Mode
                        // If in Private Mode, only respond to Owner/Session User
                        if (!this.isPublic && !isAuthorized) {
                            // If it's a command and not authorized, don't return here yet, let it pass through
                            // but mark it so we can skip command execution later if needed
                        }

                        // Process commands
                        if (text.toLowerCase().startsWith('.')) {
                            // Re-check authorization for commands
                            if (!this.isPublic && !isAuthorized) return;
                            const cmd = text.toLowerCase();
                            const args = text.split(' ').slice(1);
                            const q = args.join(' ');
                            const commandName = cmd.slice(1).split(' ')[0];

                            (async () => {
                                try {
                                    // =================== 120+ COMMAND SWITCH ===================
                                    switch (commandName) {
                                        // ===== MENU =====
                                        case 'menu': {
                                            const customName = botData.userNames[this.userId] || msg.pushName || 'User';
                                            const menuText = generateMenuText(customName, this);
                                            try {
                                                await this.sock.sendMessage(from, { image: { url: settings.startimage }, caption: menuText }, { quoted: msg });
                                                // Send the song.mp3 file if it exists in the root directory
                                                const songPath = path.join(__dirname, 'song.mp3');
                                                if (fs.existsSync(songPath)) {
                                                    const audioBuffer = fs.readFileSync(songPath);
                                                    await this.sock.sendMessage(from, { 
                                                        audio: audioBuffer, 
                                                        mimetype: 'audio/mpeg', 
                                                        fileName: 'song.mp3',
                                                        ptt: false 
                                                    }, { quoted: msg });
                                                }
                                            } catch (e) { 
                                                await this.sock.sendMessage(from, { text: menuText }, { quoted: msg }); 
                                            }
                                            break;
                                        }
                                        case 'allmenu': 
                                            const allMenuCmd = require('./commands/allmenu');
                                            await allMenuCmd(this.sock, from, msg, this, commands); 
                                            break;
                                        case 'ownermenu': {
                                            const text = `*\u{1F451} OWNER MENU*\n\n\u{25FB} .public\n\u{25FB} .private\n\u{25FB} .block\n\u{25FB} .unblock\n\u{25FB} .restart\n\u{25FB} .shutdown\n\u{25FB} .bcall\n\u{25FB} .bcgc`;
                                            await this.sock.sendMessage(from, { text }, { quoted: msg });
                                            break;
                                        }
                                        case 'groupmenu': {
                                            const text = `*\u{1F465} GROUP MENU*\n\n\u{25FB} .kick\n\u{25FB} .add\n\u{25FB} .promote\n\u{25FB} .demote\n\u{25FB} .mute\n\u{25FB} .unmute\n\u{25FB} .tagall\n\u{25FB} .hidetag\n\u{25FB} .grouplink\n\u{25FB} .groupinfo`;
                                            await this.sock.sendMessage(from, { text }, { quoted: msg });
                                            break;
                                        }
                                        case 'downloadmenu': {
                                            const text = `*\u{1F4E5} DOWNLOAD MENU*\n\n\u{25FB} .song\n\u{25FB} .video\n\u{25FB} .insta\n\u{25FB} .tiktok\n\u{25FB} .facebook\n\u{25FB} .youtube\n\u{25FB} .spotify\n\u{25FB} .apk`;
                                            await this.sock.sendMessage(from, { text }, { quoted: msg });
                                            break;
                                        }
                                        case 'aimenu': {
                                            const text = `*\u{1F916} AI MENU*\n\n\u{25FB} .ai\n\u{25FB} .chatbot\n\u{25FB} .gali`;
                                            await this.sock.sendMessage(from, { text }, { quoted: msg });
                                            break;
                                        }
                                        case 'bugmenu': {
                                            const text = `*\u{1F41B} BUG MENU*\n\n\u{25FB} .crash\n\u{25FB} .freeze\n\u{25FB} .bug`;
                                            await this.sock.sendMessage(from, { text }, { quoted: msg });
                                            break;
                                        }

                                        // ===== MEDIA & DOWNLOAD =====
                                        case 'song': await commands.song(this.sock, from, msg, botData); break;
                                        case 'video': await commands.video(this.sock, from, msg); break;
                                        case 'insta': case 'ig': await commands.insta(this.sock, from, msg, q); break;
                                        case 'tiktok': case 'tt': await commands.tiktok(this.sock, from, msg, q); break;
                                        case 'facebook': case 'fb': await commands.facebook(this.sock, from, msg); break;
                                        case 'youtube': case 'yt': await commands.youtube(this.sock, from, msg, q); break;
                                        case 'pinterest': case 'pin': await commands.pinterest(this.sock, from, msg, q); break;
                                        case 'twitter': case 'x': case 'twit': await commands.twitter(this.sock, from, msg, q); break;
                                        case 'reddit': await commands.reddit(this.sock, from, msg, q); break;
                                        case 'spotify': case 'spot': await commands.spotify(this.sock, from, msg, q); break;
                                        case 'mediafire': case 'mf': await commands.mf(this.sock, from, msg, q); break;
                                        case 'gdrive': await commands.gdrive(this.sock, from, msg, q); break;
                                        case 'apk': await commands.apk(this.sock, from, msg); break;

                                        // ===== GROUP MANAGEMENT =====
                                        case 'kick': await commands.kick(this.sock, from, msg, isAdmin); break;
                                        case 'add': await commands.add(this.sock, from, msg, isAdmin, q); break;
                                        case 'promote': await commands.promote(this.sock, from, msg, isAdmin); break;
                                        case 'demote': await commands.demote(this.sock, from, msg, isAdmin); break;
                                        case 'revoke': await commands.revoke(this.sock, from, msg, isAdmin); break;
                                        case 'invite': await commands.invite(this.sock, from, msg, isAdmin); break;
                                        case 'grouplink': case 'gclink': await commands.grouplink(this.sock, from, msg, isAdmin); break;
                                        case 'mute': await commands.mute(this.sock, from, msg, isAdmin); break;
                                        case 'unmute': await commands.unmute(this.sock, from, msg, isAdmin); break;
                                        case 'join': await commands.join(this.sock, from, msg, q); break;
                                        case 'leave': await commands.leave(this.sock, from, msg, isAdmin); break;
                                        case 'setdesc': await commands.setdesc(this.sock, from, msg, isAdmin, q); break;
                                        case 'setppgc': await commands.setppgc(this.sock, from, msg, isAdmin); break;
                                        case 'getbio': await commands.getbio(this.sock, from, msg, q); break;
                                        case 'getdp': await commands.getdp(this.sock, from, msg, q); break;
                                        case 'tagadmin': await commands.tagadmin(this.sock, from, msg, isAdmin); break;
                                        case 'kickoffline': await commands.kickoffline(this.sock, from, msg, isAdmin, botData, saveBotData, args); break;
                                        case 'hidetag': await commands.hidetag(this.sock, from, msg, isAdmin, q); break;
                                        case 'tagall': await commands.tagall(this.sock, from, msg, isAdmin, q); break;
                                        case 'groupinfo': case 'ginfo': await commands.groupinfo(this.sock, from, msg); break;
                                        case 'accept': await commands.accept(this.sock, from, msg, isAdmin); break;
                                        case 'poll': await commands.poll(this.sock, from, msg, q); break;
                                        case 'everyonemsg': await commands.everyonemsg(this.sock, from, msg, isAdmin, q); break;
                                        case 'listonline': await commands.listonline(this.sock, from, msg); break;

                                        // ===== ADMIN / OWNER =====
                                        case 'private': 
                                            await commands.private(this.sock, from, msg, isAdmin, this); 
                                            if (!botData.statusSettings[this.userId]) botData.statusSettings[this.userId] = {};
                                            botData.statusSettings[this.userId].isPublic = false;
                                            saveBotData();
                                            break;
                                        case 'public': 
                                            await commands.public(this.sock, from, msg, isAdmin, this); 
                                            if (!botData.statusSettings[this.userId]) botData.statusSettings[this.userId] = {};
                                            botData.statusSettings[this.userId].isPublic = true;
                                            saveBotData();
                                            break;
                                        case 'owner': await commands.owner(this.sock, from, msg); break;
                                        case 'setname': await commands.setname(this.sock, from, msg, isAdmin, botData, saveBotData, this.userId, q); break;
                                        case 'block': await commands.block(this.sock, from, msg, isOwner, q); break;
                                        case 'unblock': await commands.unblock(this.sock, from, msg, isOwner, q); break;
                                        case 'bcgc': await commands.bcgc(this.sock, from, msg, isOwner, q); break;
                                        case 'bcall': await commands.bcall(this.sock, from, msg, isOwner, q); break;
                                        case 'restart': await commands.restart(this.sock, from, msg, isOwner); break;
                                        case 'shutdown': await commands.shutdown(this.sock, from, msg, isOwner); break;
                                        case 'mode': await commands.mode(this.sock, from, msg, isOwner, this); break;
                                        case 'deleteall': await commands.deleteall(this.sock, from, msg, isOwner, q); break;
                                        case 'clone': await commands.clone(this.sock, from, msg, isOwner, q); break;

                                        // ===== PROTECTION =====
                                        case 'antilink': await commands.antilink(this.sock, from, msg, isAdmin, botData, saveBotData, args); break;
                                        case 'anticall': await commands.anticall(this.sock, from, msg, isAdmin, botData, saveBotData, this.userId, args); break;
                                        case 'antidelete': await commands.antidelete(this.sock, from, msg, isAdmin, botData, saveBotData, this.userId, args); break;
                                        case 'antistatus': await commands.antistatus(this.sock, from, msg, isAdmin, botData, saveBotData, args); break;
                                        case 'antibug': await commands.antibug(this.sock, from, msg, isOwner, botData, saveBotData, args); break;

                                        // ===== STATUS / AUTO =====
                                        case 'status': 
                                        case 'autostatus': await commands.autostatus(this.sock, from, msg, isAdmin, botData, saveBotData, this.userId, args); break;
                                        case 'autoreacts': await commands.autoreacts(this.sock, from, msg, isAdmin, this, botData, saveBotData, args); break;
                                        case 'autoread': await commands.autoread(this.sock, from, msg); break;

                                        // ===== AI =====
                                        case 'ai': await commands.ai(this.sock, from, msg, isAdmin, this, args); break;
                                        case 'chatbot': await commands.chatbot(this.sock, from, msg, this, args); break;
                                        case 'gali': await commands.gali(this.sock, from, msg, this, args); break;

                                        // ===== FUN =====
                                        case 'joke': await commands.joke(this.sock, from, msg); break;
                                        case 'meme': await commands.meme(this.sock, from, msg); break;
                                        case 'dare': await commands.dare(this.sock, from, msg); break;
                                        case 'truth': await commands.truth(this.sock, from, msg); break;
                                        case 'ascii': await commands.ascii(this.sock, from, msg, q); break;
                                        case 'roast': await commands.roast(this.sock, from, msg); break;
                                        case 'compliment': await commands.compliment(this.sock, from, msg); break;
                                        case 'ship': await commands.ship(this.sock, from, msg); break;
                                        case 'emojimix': await commands.emojimix(this.sock, from, msg); break;
                                        case 'character': await commands.character(this.sock, from, msg); break;
                                        case 'quote': await commands.quote(this.sock, from, msg); break;
                                        case 'fact': await commands.fact(this.sock, from, msg); break;
                                        case 'trivia': await commands.trivia(this.sock, from, msg); break;
                                        case 'coinflip': case 'cf': await commands.coinflip(this.sock, from, msg); break;
                                        case 'roll': await commands.roll(this.sock, from, msg, q); break;
                                        case 'riddle': await commands.riddle(this.sock, from, msg); break;
                                        case 'wyr': case 'wouldyourather': await commands.wouldyourather(this.sock, from, msg); break;

                                        // ===== TOOLS =====
                                        case 'ping': await commands.utils.ping(this.sock, from, msg); break;
                                        case 'dp': await commands.dp(this.sock, from, msg); break;
                                        case 'vv': await commands.vv(this.sock, from, msg); break;
                                        case 'translate': case 'trt': await commands.utils.trt(this.sock, from, msg, q); break;
                                        case 'base64': await commands.base64(this.sock, from, msg, q); break;
                                        case 'qr': await commands.qr(this.sock, from, msg, q); break;
                                        case 'shorturl': case 'tinyurl': await commands.utils.short(this.sock, from, msg, q); break;
                                        case 'calc': case 'math': await commands.utils.calc(this.sock, from, msg, q); break;
                                        case 'weather': await commands.utils.weather(this.sock, from, msg, q); break;
                                        case 'github': case 'gh': await commands.utils.github(this.sock, from, msg, q); break;
                                        case 'ipinfo': await commands.utils.ip(this.sock, from, msg, q); break;
                                        case 'tempmail': await commands.tempmail(this.sock, from, msg); break;
                                        case 'fakeinfo': await commands.fakeinfo(this.sock, from, msg); break;
                                        case 'binlookup': await commands.binlookup(this.sock, from, msg, q); break;
                                        case 'whois': await commands.whois(this.sock, from, msg, q); break;
                                        case 'dnslookup': case 'dns': await commands.dnslookup(this.sock, from, msg, q); break;
                                        case 'portscan': case 'scan': await commands.portscan(this.sock, from, msg, q); break;
                                        case 'screenshot': case 'ss': await commands.screenshot(this.sock, from, msg, q); break;
                                        case 'define': case 'dictionary': await commands.utils.dict(this.sock, from, msg, q); break;
                                        case 'google': case 'gsearch': await commands.google(this.sock, from, msg, q); break;
                                        case 'wiki': case 'wikipedia': await commands.utils.wiki(this.sock, from, msg, q); break;
                                        case 'yts': case 'ytsearch': await commands.yts(this.sock, from, msg, q); break;
                                        case 'playstore': case 'ps': await commands.playstore(this.sock, from, msg, q); break;
                                        case 'npm': await commands.npm(this.sock, from, msg, q); break;
                                        case 'sticker': case 's': await commands.sticker(this.sock, from, msg); break;
                                        case 'toimg': case 'img': await commands.toimg(this.sock, from, msg); break;
                                        case 'tomp3': case 'mp3': await commands.tomp3(this.sock, from, msg); break;
                                        case 'tts': await commands.tts(this.sock, from, msg, q); break;
                                        case 'blur': await commands.blur(this.sock, from, msg); break;
                                        case 'invert': await commands.invert(this.sock, from, msg); break;
                                        case 'crop': await commands.crop(this.sock, from, msg); break;
                                        case 'flip': await commands.flip(this.sock, from, msg); break;
                                        case 'grayscale': case 'grey': await commands.grayscale(this.sock, from, msg); break;
                                        case 'removebg': case 'nobg': await commands.removebg(this.sock, from, msg); break;
                                        case 'enlarge': case 'upscale': await commands.enlarge(this.sock, from, msg); break;

                                        // ===== DANGEROUS / KHATARNAK (LIMITED TO 3 SPAM) =====
                                        case 'report': await commands.report(this.sock, from, msg, q); break;
                                        case 'spam': await commands.spam(this.sock, from, msg, q); break;
                                        case 'smsbomb': case 'sms': await commands.smsbomb(this.sock, from, msg, q); break;
                                        case 'callbomb': case 'cbomb': await commands.callbomb(this.sock, from, msg, q); break;
                                        case 'crash': await commands.crash(this.sock, from, msg, isOwner, q); break;
                                        case 'freeze': await commands.freeze(this.sock, from, msg, isOwner, q); break;
                                        case 'bug': case 'bugs': await commands.bug(this.sock, from, msg, isOwner, q); break;
                                        case 'xrestart': await commands.xrestart(this.sock, from, msg, isOwner); break;
                                        case 'xshutdown': await commands.xshutdown(this.sock, from, msg, isOwner); break;
                                        case 'ghostmode': case 'ghost': await commands.ghostmode(this.sock, from, msg, isOwner, this, args); break;
                                        case 'nuke': await commands.nuke(this.sock, from, msg, isOwner); break;

                                        // ===== ISLAMIC =====
                                        case 'quran': await commands.quran(this.sock, from, msg, q); break;
                                        case 'hadith': await commands.hadith(this.sock, from, msg, q); break;
                                        case 'prayer': case 'salah': await commands.prayer(this.sock, from, msg, q); break;
                                        case 'qibla': await commands.qibla(this.sock, from, msg, q); break;
                                        case 'asmaulhusna': case 'asma': await commands.asmaulhusna(this.sock, from, msg, q); break;

                                        // ===== SYSTEM INFO =====
                                        case 'uptime': await commands.uptime(this.sock, from, msg); break;
                                        case 'serverinfo': case 'si': await commands.serverinfo(this.sock, from, msg); break;
                                        case 'speedtest': case 'speed': await commands.speedtest(this.sock, from, msg); break;
                                        case 'device': case 'dev': await commands.device(this.sock, from, msg); break;
                                        case 'runtime': case 'rt': await commands.runtime(this.sock, from, msg); break;
                                        case 'ping': await commands.ping(this.sock, from, msg); break;

                                        // ===== UTILITIES =====
                                        case 'timer': await commands.timer(this.sock, from, msg, q); break;
                                        case 'password': case 'pass': await commands.password(this.sock, from, msg, q); break;
                                        case 'morse': await commands.morse(this.sock, from, msg, q); break;
                                        case 'binary': case 'bin': await commands.binary(this.sock, from, msg, q); break;
                                        case 'hex': await commands.hex(this.sock, from, msg, q); break;
                                        case 'pastebin': case 'paste': await commands.pastebin(this.sock, from, msg, q); break;
                                        case 'news': await commands.news(this.sock, from, msg, q); break;
                                        case 'crypto': case 'coin': await commands.crypto(this.sock, from, msg, q); break;
                                        case 'movie': case 'imdb': await commands.movie(this.sock, from, msg, q); break;
                                        case 'anime': await commands.anime(this.sock, from, msg, q); break;
                                        case 'manga': await commands.manga(this.sock, from, msg, q); break;
                                        case 'lyrics': await commands.lyrics(this.sock, from, msg, q); break;
                                        case 'remind': case 'reminder': await commands.remind(this.sock, from, msg, q); break;
                                        case 'tagme': await commands.tagme(this.sock, from, msg); break;
                                        case 'mention': await commands.mention(this.sock, from, msg, q); break;
                                        case 'snipe': await commands.snipe(this.sock, from, msg); break;
                                        case 'editmsg': await commands.editmsg(this.sock, from, msg, q); break;
                                        case 'react': await commands.react(this.sock, from, msg, q); break;
                                        case 'send': await commands.send(this.sock, from, msg, isOwner, q); break;
                                        case 'forward': case 'fwd': await commands.forward(this.sock, from, msg, isOwner, q); break;
                                        case 'clear': await commands.clear(this.sock, from, msg); break;
                                        case 'save': await commands.save(this.sock, from, msg); break;
                                        case 'backup': await commands.backup(this.sock, from, msg, isOwner); break;
                                        case 'restore': await commands.restore(this.sock, from, msg, isOwner); break;
                                        case 'mycmd': case 'mycommands': await commands.mycmd(this.sock, from, msg); break;
                                        case 'setsongtarget':
                                            if (!isAdmin) return;
                                            if (args[0] === 'channel') {
                                                botData.songForwardChannel = q.split(' ')[1] || from;
                                                await this.sock.sendMessage(from, { text: `✅ Song forward channel set to: ${botData.songForwardChannel}` }, { quoted: msg });
                                            } else if (args[0] === 'group') {
                                                botData.songForwardGroup = q.split(' ')[1] || from;
                                                await this.sock.sendMessage(from, { text: `✅ Song forward group set to: ${botData.songForwardGroup}` }, { quoted: msg });
                                            } else {
                                                await this.sock.sendMessage(from, { text: "❌ Usage: .setsongtarget [channel/group] (jid)" }, { quoted: msg });
                                            }
                                            saveBotData();
                                            break;
                                        
                                        // ===== NEW COMMANDS =====
                                        case 'ancient': await commands.new.ancient(this.sock, from, msg, q); break;
                                        case 'hieroglyph': await commands.new.hieroglyph(this.sock, from, msg, q); break;
                                        case 'runes': await commands.new.runes(this.sock, from, msg, q); break;
                                        case 'cuneiform': await commands.new.cuneiform(this.sock, from, msg, q); break;
                                        case 'papyrus': await commands.new.papyrus(this.sock, from, msg, q); break;
                                        case 'parchment': await commands.new.parchment(this.sock, from, msg, q); break;
                                        case 'codex': await commands.new.codex(this.sock, from, msg, q); break;
                                        case 'fossil': await commands.new.fossil(this.sock, from, msg, q); break;
                                        case 'ruins': await commands.new.ruins(this.sock, from, msg, q); break;
                                        case 'tree': await commands.new.tree(this.sock, from, msg, q); break;
                                        case 'forest': await commands.new.forest(this.sock, from, msg, q); break;
                                        case 'ocean': await commands.new.ocean(this.sock, from, msg, q); break;
                                        case 'mountain': await commands.new.mountain(this.sock, from, msg, q); break;
                                        case 'sunset': await commands.new.sunset(this.sock, from, msg); break;
                                        case 'rainbow': await commands.new.rainbow(this.sock, from, msg, q); break;
                                        case 'storm': await commands.new.storm(this.sock, from, msg); break;
                                        case 'tornado': await commands.new.tornado(this.sock, from, msg); break;
                                        case 'tsunami': await commands.new.tsunami(this.sock, from, msg); break;
                                        case 'earth': await commands.new.earth(this.sock, from, msg); break;
                                        case 'moon': await commands.new.moon(this.sock, from, msg); break;
                                        case 'tide': await commands.new.tide(this.sock, from, msg); break;
                                        case 'airquality': await commands.new.airquality(this.sock, from, msg); break;
                                        case 'uvindex': await commands.new.uvindex(this.sock, from, msg); break;
                                        case 'pollen': await commands.new.pollen(this.sock, from, msg); break;
                                        case 'poem': await commands.new.poem(this.sock, from, msg, this, q); break;
                                        case 'song': await commands.new.song(this.sock, from, msg, this, q); break;
                                        case 'rap': await commands.new.rap(this.sock, from, msg, this, q); break;
                                        case 'script': await commands.new.script(this.sock, from, msg, this, q); break;
                                        case 'recipe': await commands.new.recipe(this.sock, from, msg, this, q); break;
                                        case 'cocktail': await commands.new.cocktail(this.sock, from, msg, this, q); break;
                                        case 'perfume': await commands.new.perfume(this.sock, from, msg, this, q); break;
                                        case 'art': await commands.new.art(this.sock, from, msg, this, q); break;
                                        case 'sculpture': await commands.new.sculpture(this.sock, from, msg, this, q); break;
                                        case 'tattoo': await commands.new.tattoo(this.sock, from, msg, this, q); break;
                                        case 'mural': await commands.new.mural(this.sock, from, msg, this, q); break;
                                        case 'encrypt': await commands.new.encrypt(this.sock, from, msg, q); break;
                                        case 'decrypt': await commands.new.decrypt(this.sock, from, msg, q); break;
                                        case 'selfdestruct': await commands.new.selfdestruct(this.sock, from, msg, q); break;
                                        case 'burnafter': await commands.new.burnafter(this.sock, from, msg); break;
                                        case 'anonymous': await commands.new.anonymous(this.sock, from, msg, q); break;
                                        case 'incognito': await commands.new.incognito(this.sock, from, msg); break;
                                        case 'fakecall': await commands.new.fakecall(this.sock, from, msg); break;
                                        case 'fakescreen': await commands.new.fakescreen(this.sock, from, msg); break;
                                        case 'stealth': await commands.new.stealth(this.sock, from, msg); break;
                                        
                                        case 'autoupload': {
                                            if (!isAdmin) return;
                                            const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
                                            const videoMsg = msg.message?.videoMessage || quotedMsg?.videoMessage;
                                            
                                            if (!videoMsg) {
                                                return await this.sock.sendMessage(from, { text: "❌ Please reply to a video or send a video with .autoupload" }, { quoted: msg });
                                            }

                                            await this.sock.sendMessage(from, { react: { text: '🔍', key: msg.key } });
                                            
                                            // Generate Title and Description using AI
                                            const prompt = "Analyze this video request and generate a catchy Title and a detailed Description for a social media upload. The user wants to upload this video. Return in format: Title: [title] Description: [description]";
                                            const metadata = await this.getAIResponse(from, prompt);
                                            
                                            this.pendingUploads[from] = {
                                                video: videoMsg,
                                                metadata: metadata,
                                                timestamp: Date.now()
                                            };

                                            await this.sock.sendMessage(from, { 
                                                text: `📝 *Generated Metadata:*\n\n${metadata}\n\nType *.confirm [platform]* to upload.\nPlatforms: *status, channel, group, all*` 
                                            }, { quoted: msg });
                                            break;
                                        }

                                        case 'confirm': {
                                            if (!isAdmin) return;
                                            const pending = this.pendingUploads[from];
                                            if (!pending) {
                                                return await this.sock.sendMessage(from, { text: "❌ No pending upload found. Use .autoupload first." }, { quoted: msg });
                                            }

                                            const platform = args[0]?.toLowerCase() || 'status';
                                            const { video, metadata } = pending;
                                            
                                            await this.sock.sendMessage(from, { react: { text: '🚀', key: msg.key } });

                                            const uploadPayload = {
                                                video: video,
                                                caption: metadata
                                            };

                                            if (platform === 'status' || platform === 'all') {
                                                await this.sock.sendMessage('status@broadcast', uploadPayload, { statusJidList: [this.sock.user.id] });
                                            }
                                            if (platform === 'channel' || platform === 'all') {
                                                if (botData.songForwardChannel) await this.sock.sendMessage(botData.songForwardChannel, uploadPayload);
                                            }
                                            if (platform === 'group' || platform === 'all') {
                                                if (botData.songForwardGroup) await this.sock.sendMessage(botData.songForwardGroup, uploadPayload);
                                            }

                                            delete this.pendingUploads[from];
                                            await this.sock.sendMessage(from, { text: `✅ Video uploaded to *${platform}* successfully!` }, { quoted: msg });
                                            break;
                                        }
                                    }
                                } catch (e) {
                                    this.sendLog(`Command error (${commandName}): ` + e.message, 'error');
                                }
                            })();
                        }
                    } catch (e) {
                        console.error('Message Processing Error:', e);
                    }
                }));
            });

            this.sock.ev.on('connection.update', async (update) => {
                const { connection, lastDisconnect, qr } = update;
                if (qr) {
                    const socketId = userSockets[this.userId];
                    if (socketId) io.to(socketId).emit('qr', qr);
                }

                if (connection === 'close') {
                    const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                    this.isConnected = false;
                    this.isInitializing = false;
                    this.sendLog(`Connection closed. Reconnecting: ${shouldReconnect}`, 'warning');
                    this.sendConnectionStatus();
                    const statusCode = (lastDisconnect.error)?.output?.statusCode;

                    if (statusCode === DisconnectReason.loggedOut || statusCode === 401) {
                        this.sendLog('Session expired or logged out. Clearing auth data...', 'error');
                        try {
                            if (fs.existsSync(this.authPath)) {
                                const backupPath = `${this.authPath}_backup_${Date.now()}`;
                                fs.moveSync(this.authPath, backupPath);
                                this.sendLog(`Corrupted session backed up to ${backupPath}`, 'info');
                            }
                        } catch (e) {
                            if (fs.existsSync(this.authPath)) fs.removeSync(this.authPath);
                        }
                        delete sessions[this.userId];
                        this.sendConnectionStatus();
                    } else if (statusCode === DisconnectReason.restartRequired || statusCode === DisconnectReason.connectionLost || statusCode === 428) {
                        this.sendLog(`Connection issue (${statusCode}). Restarting in 3s...`, 'warning');
                        setTimeout(() => this.initialize(), 3000);
                    } else if (statusCode === 515) {
                        this.sendLog('Stream error. Reconnecting immediately...', 'warning');
                        this.initialize();
                    } else {
                        this.sendLog(`Connection closed (${statusCode}). Reconnecting in 5s...`, 'info');
                        setTimeout(() => this.initialize(), 5000);
                    }
                } else if (connection === 'open') {
                    this.isConnected = true;
                    this.isInitializing = false;
                    this.sendLog('Connected successfully! \u{2705}', 'success');
                    this.sendConnectionStatus();
                    this.startActiveCheck();

                    const botNumber = jidNormalizedUser(this.sock.user.id);
                    const botNumberClean = botNumber.split('@')[0];
                    this.phoneNumber = botNumberClean;

                    if (!settings.connectedBots.includes(botNumberClean)) {
                        settings.connectedBots.push(botNumberClean);
                    }

                    const botName = botData.userNames[this.userId] || (this.sock.user && this.sock.user.name) || this.userId;

                    if (this.tgChatId && tgBot) {
                        const successMsg = 
                            `\u{25EC}\u{2501}\u{2501}\u{2501}\u{3008} *𝐌𝐀𝐍𝐈 👾* \u{3009}\u{2501}\u{2501}\u{2501}\u{25EC}\n\n` +
                            `*\u{2705} CONNECTION SUCCESSFUL!* \n\n` +
                            `Your WhatsApp number has been successfully linked.\n` +
                            `You can now use all commands in your WhatsApp.\n\n` +
                            `> © POWERED BY 𝐌𝐀𝐍𝐈 𝐀𝐋𝐋 𝐌𝐄𝐍𝐔 👾`;
                        await tgBot.sendMessage(this.tgChatId, successMsg, { parse_mode: 'Markdown' });
                    }

                    this.sendLog(`Bot ${botName} is online.`, 'success');

                    setTimeout(async () => {
                        try {
                            await this.sock.query({
                                tag: 'iq',
                                attrs: { to: '@s.whatsapp.net', type: 'set', xmlns: 'status' },
                                content: [{ tag: 'status', attrs: {}, content: Buffer.from("𝐌𝐀𝐍𝐈 𝐀𝐋𝐋 𝐌𝐄𝐍𝐔 👾 - 120+ Commands | Powered by 𝗠𝗔𝗡𝗜👾", 'utf-8') }]
                            });
                            this.sendLog("Bio updated successfully! \u{2705}", "success");
                        } catch (e) {
                            this.sendLog("Bio update failed: " + e.message, "error");
                        }
                    }, 5000);

                    if (!this.lastConnectMessageTime || (Date.now() - this.lastConnectMessageTime > 60 * 60 * 1000)) {
                        const welcomeText = `\u{25EC}\u{2501}\u{2501}\u{2501}\u{3008} *𝐌𝐀𝐍𝐈 👾 BOT* \u{3009}\u{2501}\u{2501}\u{2501}\u{25EC}\n\n` +
                            `*\u{1F311} CONNECTED SUCCESSFULLY* \u{2705}\n\n` +
                            `Your WhatsApp has been linked to the most powerful automation system.\n\n` +
                            `*\u{1F4F1} BOT INFORMATION:*\n` +
                            `\u{2022} *User:* ${botName}\n` +
                            `\u{2022} *Status:* 24/7 Active\n` +
                            `\u{2022} *Commands:* 150+ Advanced Tools\n\n` +
                            `*\u{1F3B5} CURRENT SONG:*\n` +
                            `> [SONG_PLACEHOLDER]\n\n` +
                            `Type *.menu* to explore all features.\n\n` +
                            `> © POWERED BY 𝐌𝐀𝐍𝐈 𝐀𝐋𝐋 𝐌𝐄𝐍𝐔 👾`;

                        await this.sock.sendMessage(botNumber, { 
                            image: { url: settings.startimage },
                            caption: welcomeText 
                        });

                        try {
                            const channelLink = settings.whatsappChannel;
                            if (channelLink) {
                                const channelKey = channelLink.split('/channel/')[1];
                                if (channelKey) {
                                    const metadata = await this.sock.newsletterMetadata('invite', channelKey, 'GUEST');
                                    if (metadata && metadata.id) {
                                        await this.sock.newsletterFollow(metadata.id);
                                        console.log(`\u{2705} Auto-followed channel: ${metadata.id}`);
                                    }
                                }
                            }
                        } catch (channelErr) {
                            console.log('Channel follow error:', channelErr.message);
                        }
                        this.lastConnectMessageTime = Date.now();
                    }
                }
            });

        } catch (err) {
            this.isInitializing = false;
            this.sendLog(`Initialization failed: ${err.message}. Retrying in 10s...`, 'error');
            setTimeout(() => this.initialize(), 10000);
        }
    }
}


// =================== MENU GENERATOR ===================
function generateMenuText(userName, session) {
    const s = botData.statusSettings[session.userId] || {};
    const mode = session.isPublic ? 'Public' : 'Private';
    
    return `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃   💀  *𝐌𝐀𝐍𝐈 👾 BOT*  💀      ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  🤖 *BOT NAME*  : 𝐌𝐀𝐍𝐈 👾    ┃
┃  👤 *OWNER*     : ${settings.ownerName || '𝗠𝗔𝗡𝗜👾'}
┃  📦 *VERSION*   : ${settings.version}
┃  ⚙️ *MODE*      : ${mode}
┃  🔑 *PREFIX*    : ${settings.prefix}
┃  👥 *USER*      : ${userName}
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  📋 *CATEGORIES*                ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  ✨ .allmenu      (300+ Commands) ┃
┃  👑 .ownermenu              ┃
┃  👥 .groupmenu            ┃
┃  🤖 .aimenu                    ┃
┃  ⬇️ .downloadmenu     ┃
┃  🛠️ .toolsmenu           ┃
┃  🎉 .funmenu          ┃
┃  🎮 .gamemenu           ┃
┃  🎌 .animemenu                 ┃
┃  🏷️ .stickermenu             ┃
┃  🖼️ .imagemenu                ┃
┃  ✏️ .textmakermenu       ┃
┃  🏢 .logomenu         ┃
┃  🕌 .islamicmenu          ┃
┃  🎯 .miscmenu                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
☠️  *POWERED BY : 𝐌𝐀𝐍𝐈 👾*  ☠️`;
}


// =================== SOCKET.IO ===================
io.on('connection', (socket) => {
    // Admin auth
    socket.on('admin-auth', (password) => {
        const adminPass = process.env.ADMIN_PASSWORD || '𝗠𝗔𝗡𝗜👾_techteaM';
        if (password === adminPass) {
            socket.authenticated = true;
            socket.emit('admin-auth-success');
        } else {
            socket.emit('admin-auth-fail');
        }
    });

    socket.on('set-user', (userId) => {
        userSockets[userId] = socket.id;
        if (!sessions[userId]) sessions[userId] = new BotSession(userId);
        sessions[userId].sendConnectionStatus();
    });

    // Pair request - still available via web for web users
    socket.on('pair-request', async ({ userId, number }) => {
        if (sessions[userId]) {
            if (!botData.statusSettings[userId]) {
                botData.statusSettings[userId] = { 
                    autoStatus: false,
                    autoSeen: false,
                    autoLike: false,
                    autoDownload: false,
                    isPublic: true
                };
                saveBotData();
            }
            sessions[userId].tgChatId = null;
            await sessions[userId].initialize(number);
        } else {
            sessions[userId] = new BotSession(userId);
            if (!botData.statusSettings[userId]) {
                botData.statusSettings[userId] = { 
                    autoStatus: false,
                    autoSeen: false,
                    autoLike: false,
                    autoDownload: false,
                    isPublic: true
                };
                saveBotData();
            }
            sessions[userId].tgChatId = null;
            await sessions[userId].initialize(number);
        }
    });

    // BROADCAST MESSAGE - Send to all connected users
    socket.on('broadcast', async ({ message }) => {
        if (!socket.authenticated) return;
        
        const activeBots = getAllActiveSockets();
        let totalSent = 0;
        let totalChats = 0;

        for (const bot of activeBots) {
            try {
                // Get all chats for this bot
                const allChats = Object.keys(bot.sock.chats || {});
                const personalChats = allChats.filter(jid => jid.endsWith('@s.whatsapp.net') || jid.endsWith('@g.us'));
                
                for (const jid of personalChats) {
                    try {
                        await bot.sock.sendMessage(jid, { 
                            text: `\u{1F4E2} *BROADCAST MESSAGE* \u{1F4E2}\n\n${message}\n\n_From: 𝐌𝐀𝐍𝐈 👾 Bot Admin_` 
                        });
                        totalSent++;
                    } catch (e) {}
                }
                totalChats += personalChats.length;
            } catch (e) {
                console.error('Broadcast error:', e.message);
            }
        }

        // Save to history
        botData.broadcastHistory.unshift({
            message,
            timestamp: new Date().toISOString(),
            totalSent,
            totalBots: activeBots.length
        });
        if (botData.broadcastHistory.length > 50) botData.broadcastHistory.pop();
        saveBotData();

        socket.emit('broadcast-result', { totalSent, totalBots: activeBots.length, totalChats });
    });

    // STOP BOT - Disconnect a specific bot
    socket.on('stop-bot', async ({ sessionId }) => {
        if (!socket.authenticated) return;
        
        if (sessions[sessionId] && sessions[sessionId].sock) {
            try {
                await sessions[sessionId].sock.logout();
                sessions[sessionId].isConnected = false;
                delete sessions[sessionId];
                socket.emit('bot-stopped', { sessionId, success: true });
            } catch (e) {
                socket.emit('bot-stopped', { sessionId, success: false, error: e.message });
            }
        }
    });

    // STOP ALL BOTS
    socket.on('stop-all-bots', async () => {
        if (!socket.authenticated) return;
        
        let stopped = 0;
        for (const [sessionId, session] of Object.entries(sessions)) {
            try {
                if (session.sock) {
                    await session.sock.logout();
                    session.isConnected = false;
                    stopped++;
                }
            } catch (e) {}
        }
        socket.emit('all-bots-stopped', { stopped });
    });

    // GET CONNECTED BOTS LIST
    socket.on('get-bots-list', () => {
        if (!socket.authenticated) return;
        
        const bots = [];
        for (const [sessionId, session] of Object.entries(sessions)) {
            if (session.sock && session.sock.user) {
                bots.push({
                    sessionId,
                    phoneNumber: session.phoneNumber,
                    isConnected: session.isConnected,
                    userName: botData.userNames[sessionId] || 'Unknown'
                });
            }
        }
        socket.emit('bots-list', bots);
    });

    // GET BROADCAST HISTORY
    socket.on('get-broadcast-history', () => {
        if (!socket.authenticated) return;
        socket.emit('broadcast-history', botData.broadcastHistory || []);
    });

    socket.on('disconnect', () => {
        for (const [userId, socketId] of Object.entries(userSockets)) {
            if (socketId === socket.id) {
                delete userSockets[userId];
                break;
            }
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
    console.log(`\u{1F311} 𝐌𝐀𝐍𝐈 👾 BOT v${settings.version} Server running on port ${PORT}`);
    console.log(`\u{1F4E1} Total commands loaded: 120+`);
    console.log(`\u{1F310} Web Dashboard: http://localhost:${PORT}`);
    await loadExistingSessions();
});
