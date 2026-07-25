const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const crypto = require('crypto');

ffmpeg.setFfmpegPath(ffmpegStatic);

/**
 * Convert audio buffer to MP3
 * @param {Buffer} buffer 
 * @param {string} ext 
 * @returns {Promise<Buffer>}
 */
async function toAudio(buffer, ext) {
    const tmpDir = path.join(__dirname, '../temp');
    if (!fsSync.existsSync(tmpDir)) await fs.mkdir(tmpDir, { recursive: true });
    
    const id = crypto.randomBytes(8).toString('hex');
    const inputPath = path.join(tmpDir, `${id}_in.${ext}`);
    const outputPath = path.join(tmpDir, `${id}_out.mp3`);
    
    try {
        await fs.writeFile(inputPath, buffer);
        
        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .toFormat('mp3')
                .on('end', resolve)
                .on('error', reject)
                .save(outputPath);
        });
        
        const outputBuffer = await fs.readFile(outputPath);
        return outputBuffer;
    } finally {
        // Cleanup
        try {
            if (fsSync.existsSync(inputPath)) await fs.unlink(inputPath);
            if (fsSync.existsSync(outputPath)) await fs.unlink(outputPath);
        } catch (e) {
            console.error('Cleanup error:', e);
        }
    }
}

/**
 * Convert audio buffer to Ogg/Opus for WhatsApp PTT
 * @param {Buffer|string} input Buffer or File Path
 * @param {string} ext 
 * @returns {Promise<Buffer>}
 */
async function toOpus(input, ext = 'mp3') {
    const tmpDir = path.join(__dirname, '../temp');
    if (!fsSync.existsSync(tmpDir)) await fs.mkdir(tmpDir, { recursive: true });
    
    const id = crypto.randomBytes(8).toString('hex');
    const inputPath = typeof input === 'string' ? input : path.join(tmpDir, `${id}_in.${ext}`);
    const outputPath = path.join(tmpDir, `${id}_out.opus`);
    
    try {
        if (typeof input !== 'string') {
            await fs.writeFile(inputPath, input);
        }
        
        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .noVideo()
                .audioCodec('libopus')
                .audioChannels(1)
                .audioFrequency(48000)
                .toFormat('opus')
                .on('end', resolve)
                .on('error', reject)
                .save(outputPath);
        });
        
        const outputBuffer = await fs.readFile(outputPath);
        return outputBuffer;
    } finally {
        // Cleanup
        try {
            if (typeof input !== 'string' && fsSync.existsSync(inputPath)) await fs.unlink(inputPath);
            if (fsSync.existsSync(outputPath)) await fs.unlink(outputPath);
        } catch (e) {
            console.error('Cleanup error:', e);
        }
    }
}

module.exports = {
    toAudio,
    toOpus
};
