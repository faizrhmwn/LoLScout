import fs from 'fs'
import path from 'path'

const teams = [
  // LCK
  { tag: 'GEN', name: 'Gen.G', bg: '#AA8A00', fg: '#000000', sub: 'LCK' },
  { tag: 'HLE', name: 'Hanwha Life', bg: '#FF6B00', fg: '#FFFFFF', sub: 'LCK' },
  { tag: 'T1', name: 'T1', bg: '#E4002B', fg: '#FFFFFF', sub: 'LCK' },
  { tag: 'DK', name: 'Dplus KIA', bg: '#00D1FF', fg: '#000000', sub: 'LCK' },
  { tag: 'KT', name: 'KT Rolster', bg: '#E80000', fg: '#FFFFFF', sub: 'LCK' },
  { tag: 'FOX', name: 'BNK FearX', bg: '#FEE100', fg: '#000000', sub: 'LCK' },

  // LPL
  { tag: 'AL', name: "Anyone's Legend", bg: '#E60012', fg: '#FFFFFF', sub: 'LPL' },
  { tag: 'BLG', name: 'Bilibili Gaming', bg: '#00A1D6', fg: '#FFFFFF', sub: 'LPL' },
  { tag: 'TES', name: 'Top Esports', bg: '#FF2A00', fg: '#FFFFFF', sub: 'LPL' },
  { tag: 'IG', name: 'Invictus Gaming', bg: '#FFFFFF', fg: '#000000', sub: 'LPL' },
  { tag: 'WE', name: 'Team WE', bg: '#E60012', fg: '#FFFFFF', sub: 'LPL' },
  { tag: 'JDG', name: 'JD Gaming', bg: '#B30006', fg: '#FFFFFF', sub: 'LPL' },

  // LEC
  { tag: 'G2', name: 'G2 Esports', bg: '#EE3D24', fg: '#FFFFFF', sub: 'LEC' },
  { tag: 'MKOI', name: 'Movistar KOI', bg: '#8A2BE2', fg: '#FFFFFF', sub: 'LEC' },
  { tag: 'KC', name: 'Karmine Corp', bg: '#0055FF', fg: '#FFFFFF', sub: 'LEC' },
  { tag: 'NAVI', name: 'Natus Vincere', bg: '#FFF200', fg: '#000000', sub: 'LEC' },
  { tag: 'VIT', name: 'Team Vitality', bg: '#FFF000', fg: '#000000', sub: 'LEC' },
  { tag: 'FNC', name: 'Fnatic', bg: '#FF5900', fg: '#000000', sub: 'LEC' },

  // LCS
  { tag: 'TL', name: 'Team Liquid', bg: '#0A1C2A', fg: '#FFFFFF', sub: 'LCS' },
  { tag: 'LYON', name: 'LYON', bg: '#00E5FF', fg: '#000000', sub: 'LCS' },
  { tag: 'C9', name: 'Cloud9', bg: '#009BFF', fg: '#FFFFFF', sub: 'LCS' },
  { tag: 'SEN', name: 'Sentinels', bg: '#CE0037', fg: '#FFFFFF', sub: 'LCS' },
  { tag: 'FLY', name: 'FlyQuest', bg: '#0A3B32', fg: '#E3B34C', sub: 'LCS' },
  { tag: 'SR', name: 'Shopify Rebellion', bg: '#7AB55C', fg: '#FFFFFF', sub: 'LCS' },

  // CBLOL
  { tag: 'PNG', name: 'paiN Gaming', bg: '#CC0000', fg: '#FFFFFF', sub: 'CBLOL' },
  { tag: 'LLL', name: 'LOUD', bg: '#00FF66', fg: '#000000', sub: 'CBLOL' },
  { tag: 'VKS', name: 'Keyd Stars', bg: '#D4AF37', fg: '#000000', sub: 'CBLOL' },
  { tag: 'RED', name: 'RED Canids', bg: '#FF0000', fg: '#FFFFFF', sub: 'CBLOL' },
  { tag: 'FUR', name: 'FURIA', bg: '#FFFFFF', fg: '#000000', sub: 'CBLOL' },
  { tag: 'LOS', name: 'LOS', bg: '#FF4500', fg: '#FFFFFF', sub: 'CBLOL' },
]

const outDir = 'C:/Users/Lenovo/.gemini/antigravity/scratch/riftdraft-pwa/public/logos'

for (const t of teams) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <defs>
    <linearGradient id="grad-${t.tag}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.bg}" stop-opacity="1" />
      <stop offset="100%" stop-color="#0a0f1d" stop-opacity="0.95" />
    </linearGradient>
    <filter id="glow-${t.tag}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect x="8" y="8" width="144" height="144" rx="28" fill="url(#grad-${t.tag})" stroke="${t.bg}" stroke-width="3" stroke-opacity="0.7"/>
  <rect x="14" y="14" width="132" height="132" rx="22" fill="#030712" fill-opacity="0.6"/>
  <text x="80" y="88" font-family="system-ui, -apple-system, sans-serif" font-size="${t.tag.length > 3 ? '34' : '44'}" font-weight="900" fill="${t.fg}" text-anchor="middle" letter-spacing="1.5" filter="url(#glow-${t.tag})">${t.tag}</text>
  <text x="80" y="122" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="${t.bg}" text-anchor="middle" letter-spacing="3" text-transform="uppercase">${t.sub}</text>
</svg>`

  fs.writeFileSync(path.join(outDir, `${t.tag}.svg`), svg)
}

console.log('Successfully generated 30 SVG team badges in public/logos!')
