async function pingCommand(sock, from, msg) {
    const start = Date.now();
    const end = Date.now();
    const ping = end - start;
    const ui = require('../lib/ui');
    const os = require('os');
    const ram = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + ' GB';
    const uptime = Math.floor(process.uptime() / 3600) + 'h ' + Math.floor((process.uptime() % 3600) / 60) + 'm';
    await sock.sendMessage(from, { text: ui.status(ping, ram, uptime) }, { quoted: msg });
}

module.exports = pingCommand;
