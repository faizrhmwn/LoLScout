import fs from 'fs';
import path from 'path';

const TARGET_DIRS = [
  'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\riftdraft-pwa\\public\\logos',
  'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\LoLScout\\client\\public\\logos'
];

const NEW_TEAMS = [
  { code: 'TSW', color: '#0055b3', bg: '#0b1626' },
  { code: 'CFO', color: '#00b0ff', bg: '#0b1d33' },
  { code: 'DCG', color: '#e53935', bg: '#2b0b0e' },
];

function createSvg(code, color, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="20" fill="${bg}" stroke="${color}" stroke-width="4"/>
  <circle cx="50" cy="50" r="38" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.6"/>
  <text x="50" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="${code.length > 3 ? '22' : '26'}" fill="${color}" text-anchor="middle" letter-spacing="1">${code}</text>
</svg>`;
}

for (const dir of TARGET_DIRS) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  for (const t of NEW_TEAMS) {
    const svgPath = path.join(dir, `${t.code.toLowerCase()}.svg`);
    const pngPath = path.join(dir, `${t.code.toLowerCase()}.png`);
    fs.writeFileSync(svgPath, createSvg(t.code, t.color, t.bg), 'utf8');
    fs.writeFileSync(pngPath, createSvg(t.code, t.color, t.bg), 'utf8');
    console.log(`Generated ${t.code} logo in ${dir}`);
  }
}
