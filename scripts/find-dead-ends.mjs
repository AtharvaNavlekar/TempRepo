import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '../src');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const results = [];

walkDir(srcDir, (filePath) => {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.jsx')) return;

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    let inLink = false;
    let linkDest = "";

    lines.forEach((line, index) => {
        // Track unhandled Links
        if (line.match(/<Link /)) {
            const hrefMatch = line.match(/href=["'](.*?)["']/);
            if (hrefMatch && (hrefMatch[1] === '#' || hrefMatch[1] === '')) {
                results.push({ file: filePath, line: index + 1, type: 'Link', content: line.trim(), reason: 'Empty or # href' });
            }
        }

        // Find ForgeButton and standard buttons
        const buttonMatches = line.matchAll(/<(ForgeButton|button)([^>]*)>/g);
        for (const match of buttonMatches) {
            const props = match[2];

            // If it has onClick, it's fine
            if (props.includes('onClick=')) continue;
            // If it's a submit button, it's fine (relies on form)
            if (props.includes('type="submit"')) continue;
            // If it has href (e.g. polymorphic), it's fine
            if (props.includes('href=')) continue;

            // Check if wrapped in a Link in the previous few lines or same line
            // Simple heuristic: if the line contains <Link, it's probably wrapped
            if (line.includes('<Link ')) continue;

            // Check if there's a Link in the previous line
            if (index > 0 && lines[index - 1].includes('<Link ')) continue;
            if (index > 1 && lines[index - 2].includes('<Link ')) continue;

            results.push({
                file: filePath,
                line: index + 1,
                type: match[1],
                content: line.trim(),
                reason: 'Missing onClick, href, or type="submit"'
            });
        }
    });
});

console.log(JSON.stringify(results, null, 2));
