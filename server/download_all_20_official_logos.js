import fs from 'fs';
import path from 'path';

const LOGO_DIRS = [
  'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\riftdraft-pwa\\public\\logos',
  'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\LoLScout\\client\\public\\logos'
];

const LOGO_MAP = {
  '100T': '100 Thieveslogo profile.png',
  'DIG': 'Dignitaslogo profile.png',
  'EDG': 'EDward Gaminglogo square.png',
  'FX': 'Fluxologo square.png',
  'GX': 'GIANTXlogo profile.png',
  'ITZ': 'INTZlogo profile.png',
  'LGD': 'LGD_logo.png',
  'LNG': 'LNG Esportslogo square.png',
  'NIP': 'Ninjas in Pyjamaslogo profile.png',
  'OMG': 'Oh My Godlogo square.png',
  'SK': 'SK Gaminglogo profile.png',
  'BDS': 'Team BDSlogo profile.png',
  'TH': 'Team Hereticslogo square.png',
  'TT': 'ThunderTalk Gaminglogo profile.png',
  'UP': 'Ultra Primelogo profile.png',
  'WBG': 'Weibo Gaminglogo profile.png',
  'DRX': 'DRXlogo profile.png',
  'TSW': 'Team Secret Whaleslogo profile.png',
  'CFO': 'CTBC Flying Oysterlogo square.png',
  'DCG': 'Deep Cross Gaminglogo profile.png',
};

async function downloadAll() {
  console.log('Querying direct image URLs for all 20 official logos...');
  const titles = Object.values(LOGO_MAP).map(f => `File:${f}`).join('|');
  const params = new URLSearchParams({
    action: 'query',
    titles: titles,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json'
  });

  const res = await fetch('https://lol.fandom.com/api.php?' + params.toString(), {
    headers: { 'User-Agent': 'LoLScoutAcademic/1.0 (contact: student@undip.ac.id; practical study)' }
  }).then(r => r.json());

  const pages = res.query?.pages || {};
  const fileToUrl = {};
  for (const page of Object.values(pages)) {
    const title = page.title?.replace(/^File:/, '');
    const url = page.imageinfo?.[0]?.url;
    if (title && url) fileToUrl[title] = url;
  }

  console.log(`Resolved ${Object.keys(fileToUrl).length} / 20 URLs.`);

  for (const [code, fileName] of Object.entries(LOGO_MAP)) {
    const url = fileToUrl[fileName] || fileToUrl[fileName.replace(/_/g, ' ')];
    if (!url) {
      console.error(`  Missing URL for ${code} (${fileName})`);
      continue;
    }

    console.log(`Downloading ${code} from ${url}...`);
    const imgRes = await fetch(url, {
      headers: { 'User-Agent': 'LoLScoutAcademic/1.0 (contact: student@undip.ac.id; practical study)' }
    });
    const buffer = Buffer.from(await imgRes.arrayBuffer());

    for (const dir of LOGO_DIRS) {
      fs.writeFileSync(path.join(dir, `${code}.png`), buffer);
      fs.writeFileSync(path.join(dir, `${code.toLowerCase()}.png`), buffer);
      fs.writeFileSync(path.join(dir, `${code}.svg`), buffer);
      fs.writeFileSync(path.join(dir, `${code.toLowerCase()}.svg`), buffer);
    }
    console.log(`  ✓ Successfully saved ${code} (${buffer.length} bytes) to both clients`);
  }

  console.log('\n=== ALL 20 OFFICIAL LOGOS DOWNLOADED & APPLIED ===');
}

downloadAll();
