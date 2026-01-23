import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_URL = 'https://np-heritage-timeline.webflow.io/';
const OUTPUT_DIR = path.resolve(__dirname, '../public');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'timeline_mirror.html');

console.log(`Fetching ${TARGET_URL}...`);

https.get(TARGET_URL, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('Successfully fetched content.');

            // Inject <base> tag to fix relative links/assets
            const baseTag = `<base href="${TARGET_URL}">`;
            let modifiedData = data.replace('<head>', `<head>\n${baseTag}`);

            // Optional: Remove X-Frame/CSP meta tags if present in HTML (usually they are headers, but good to be safe)
            modifiedData = modifiedData.replace(/<meta[^>]*http-equiv=["']X-Frame-Options["'][^>]*>/gi, '');
            modifiedData = modifiedData.replace(/<meta[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/gi, '');

            // Ensure public directory exists
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR, { recursive: true });
            }

            fs.writeFileSync(OUTPUT_FILE, modifiedData, 'utf-8');
            console.log(`Saved mirrored HTML to ${OUTPUT_FILE}`);
        } else {
            console.error(`Failed to fetch. Status code: ${res.statusCode}`);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching URL:', err.message);
});
