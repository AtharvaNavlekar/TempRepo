const fs = require('fs');
const path = require('path');

// Global regex to match emojis
const emojiRegex = /\p{Emoji_Presentation}/gu;

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            if (dirPath.endsWith('.ts') || dirPath.endsWith('.tsx')) {
                callback(dirPath);
            }
        }
    });
}

const filesWithEmojis = [];

walkDir(path.join(__dirname, 'src'), (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = Array.from(content.matchAll(emojiRegex));
    if (matches.length > 0) {
        filesWithEmojis.push({ file: filePath, emojis: [...new Set(matches.map(m => m[0]))] });
    }
});

console.log(JSON.stringify(filesWithEmojis, null, 2));
