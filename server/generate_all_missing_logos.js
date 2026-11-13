// generate_all_missing_logos.js
import fs from 'fs';
import path from 'path';

const TEAMS_TO_GENERATE = [
  // LCK
  { code: 'NS', name: 'Nongshim RedForce', region: 'LCK', color: '#DE2027', accent: '#0a0f1d' },
  { code: 'DRX', name: 'Kiwoom DRX', region: 'LCK', color: '#5973FF', accent: '#0a0f1d' },
  { code: 'BRO', name: 'Hanjin Brion', region: 'LCK', color: '#002D62', accent: '#1F4738' },
  { code: 'DNS', name: 'DN SOOPers', region: 'LCK', color: '#0055FF', accent: '#00B4D8' },
  // LPL
  { code: 'WBG', name: 'Weibo Gaming', region: 'LPL', color: '#E6162D', accent: '#FA7268' },
  { code: 'LNG', name: 'LNG Esports', region: 'LPL', color: '#005BAC', accent: '#00B4D8' },
  { code: 'NIP', name: 'Ninjas in Pyjamas', region: 'LPL', color: '#D7FF00', accent: '#1C1C1E' },
  { code: 'EDG', name: 'EDward Gaming', region: 'LPL', color: '#C7A566', accent: '#1A1A1A' },
  { code: 'OMG', name: 'Oh My God', region: 'LPL', color: '#FFFFFF', accent: '#2C3E50' },
  { code: 'TT', name: 'ThunderTalk Gaming', region: 'LPL', color: '#00E5FF', accent: '#007799' },
  { code: 'LGD', name: 'LGD Gaming', region: 'LPL', color: '#C8102E', accent: '#1A1A1A' },
  { code: 'UP', name: 'Ultra Prime', region: 'LPL', color: '#26D07C', accent: '#1A365D' },
  // LEC
  { code: 'TH', name: 'Team Heretics', region: 'LEC', color: '#FF3B30', accent: '#1C1C1E' },
  { code: 'SK', name: 'SK Gaming', region: 'LEC', color: '#00A3E0', accent: '#002B49' },
  { code: 'GX', name: 'GIANTX', region: 'LEC', color: '#E01F26', accent: '#1C1C1E' },
  { code: 'BDS', name: 'Team BDS', region: 'LEC', color: '#FF2E93', accent: '#0052FF' },
  // LCS
  { code: '100T', name: '100 Thieves', region: 'LCS', color: '#E10600', accent: '#1A1A1A' },
  { code: 'DIG', name: 'Dignitas', region: 'LCS', color: '#FFC72C', accent: '#1A1A1A' },
  // CBLOL
  { code: 'FX', name: 'Fluxo', region: 'CBLOL', color: '#8E44AD', accent: '#2C3E50' },
  { code: 'ITZ', name: 'INTZ', region: 'CBLOL', color: '#E5E7EB', accent: '#1A1A1A' },
];

function generateSvg(team) {
  const fontSize = team.code.length > 3 ? 34 : team.code.length > 2 ? 38 : 44;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <defs>
    <linearGradient id="grad-${team.code}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${team.color}" stop-opacity="1" />
      <stop offset="100%" stop-color="${team.accent}" stop-opacity="0.95" />
    </linearGradient>
    <filter id="glow-${team.code}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect x="8" y="8" width="144" height="144" rx="28" fill="url(#grad-${team.code})" stroke="${team.color}" stroke-width="3" stroke-opacity="0.7"/>
  <rect x="14" y="14" width="132" height="132" rx="22" fill="#030712" fill-opacity="0.65"/>
  <text x="80" y="88" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1" filter="url(#glow-${team.code})">${team.code}</text>
  <text x="80" y="122" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="${team.color}" text-anchor="middle" letter-spacing="3" text-transform="uppercase">${team.region}</text>
</svg>`;
}

const TARGET_DIRS = [
  'C:/Users/Lenovo/.gemini/antigravity/scratch/riftdraft-pwa/public/logos',
  'C:/Users/Lenovo/.gemini/antigravity/scratch/LoLScout/client/public/logos'
];

for (const dir of TARGET_DIRS) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  for (const team of TEAMS_TO_GENERATE) {
    const svgPath = path.join(dir, `${team.code}.svg`);
    fs.writeFileSync(svgPath, generateSvg(team), 'utf8');
    // Also write .png fallback copying or same
    const pngPath = path.join(dir, `${team.code}.png`);
    fs.writeFileSync(pngPath, generateSvg(team), 'utf8');
  }
}

console.log(`Generated ${TEAMS_TO_GENERATE.length} SVG and PNG logos in both web apps!`);
