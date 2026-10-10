import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const HOST = 'rupeebuddy.in';
const KEY = '3df7b7c935ef49b89c253a1bd8de3af2';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINTS = [
  { name: 'Bing Direct Gateway', url: 'https://www.bing.com/indexnow' },
  { name: 'IndexNow Central (Bing/Partners)', url: 'https://api.indexnow.org/indexnow' },
  { name: 'Yandex IndexNow Gateway', url: 'https://yandex.com/indexnow' }
];

/**
 * Extracts all URLs from public/sitemap.xml
 */
function extractUrlsFromSitemap() {
  const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.warn('⚠️  public/sitemap.xml not found! Fallback to base URL.');
    return [`https://${HOST}/`];
  }

  const content = fs.readFileSync(sitemapPath, 'utf8');
  const locRegex = /<loc>(https:\/\/rupeebuddy\.in[^<]*)<\/loc>/g;
  const urls = [];
  let match;

  while ((match = locRegex.exec(content)) !== null) {
    if (match[1]) {
      urls.push(match[1]);
    }
  }

  return [...new Set(urls)];
}

/**
 * Splits array into chunks of given size (IndexNow accepts up to 10,000 URLs per request)
 */
function chunkArray(array, size = 1000) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Submit batch to IndexNow API endpoint
 */
async function submitBatch(urlList, batchIdx, totalBatches) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  };

  console.log(`📤 Submitting batch ${batchIdx + 1}/${totalBatches} (${urlList.length} URLs)...`);

  let anyAccepted = false;

  for (const endpoint of ENDPOINTS) {
    try {
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      const status = response.status;
      const statusText = response.statusText;
      const responseText = await response.text();

      if (status === 200 || status === 202) {
        console.log(`  ✅ [${endpoint.name}] Accepted (${status} ${statusText || 'OK'}).`);
        anyAccepted = true;
      } else if (status === 403) {
        console.warn(`  ⚠️ [${endpoint.name}] 403 Forbidden.`);
        if (responseText) {
          try {
            const parsed = JSON.parse(responseText);
            console.warn(`     Message: ${parsed.message || responseText}`);
          } catch {
            console.warn(`     Message: ${responseText.slice(0, 120)}`);
          }
        }
      } else {
        console.warn(`  ⚠️ [${endpoint.name}] Returned HTTP ${status} ${statusText}: ${responseText.slice(0, 100)}`);
      }
    } catch (err) {
      console.warn(`  ❌ [${endpoint.name}] Network error: ${err.message}`);
    }
  }

  if (anyAccepted) {
    console.log(`  🎉 Batch ${batchIdx + 1} successfully broadcasted to the IndexNow search engine network!`);
    return true;
  } else {
    console.warn(`  ⚠️ Batch ${batchIdx + 1} could not be accepted by gateways yet. Cached verification will refresh shortly.`);
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('======================================================');
  console.log('🚀 IndexNow Real-Time Search Engine URL Submitter');
  console.log('======================================================');
  console.log(`Host:        ${HOST}`);
  console.log(`Key:         ${KEY}`);
  console.log(`KeyLocation: ${KEY_LOCATION}`);
  console.log('------------------------------------------------------');

  // Verify local key file exists
  const localKeyPath = path.join(rootDir, 'public', `${KEY}.txt`);
  if (!fs.existsSync(localKeyPath)) {
    console.error(`❌ Local verification key file missing at: ${localKeyPath}`);
    process.exit(1);
  }
  const keyContent = fs.readFileSync(localKeyPath, 'utf8').trim();
  if (keyContent !== KEY) {
    console.error(`❌ Key file content mismatch! Expected: ${KEY}, Found: ${keyContent}`);
    process.exit(1);
  }
  console.log(`✅ Local verification key file verified: public/${KEY}.txt`);

  // Determine URLs to submit
  let urlsToSubmit = [];
  const cliArgs = process.argv.slice(2).filter(arg => arg.startsWith('http'));

  if (cliArgs.length > 0) {
    urlsToSubmit = cliArgs;
    console.log(`📋 Received ${urlsToSubmit.length} custom URL(s) from CLI.`);
  } else {
    urlsToSubmit = extractUrlsFromSitemap();
    console.log(`📋 Extracted ${urlsToSubmit.length} URLs from public/sitemap.xml.`);
  }

  if (urlsToSubmit.length === 0) {
    console.warn('⚠️ No URLs to submit.');
    return;
  }

  const batches = chunkArray(urlsToSubmit, 1000);
  let successCount = 0;

  for (let i = 0; i < batches.length; i++) {
    const success = await submitBatch(batches[i], i, batches.length);
    if (success) successCount++;
  }

  console.log('------------------------------------------------------');
  console.log(`✨ IndexNow submission step finished (${successCount}/${batches.length} batches succeeded).`);
  console.log('======================================================\n');
}

main().catch(err => {
  console.error('Fatal error running IndexNow submitter:', err);
  process.exit(1);
});
