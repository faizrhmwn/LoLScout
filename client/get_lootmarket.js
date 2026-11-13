import fs from 'fs'
import path from 'path'

const lootmarketMap = {
  G2: 'g2-esports/g2-esports-logo.png',
  DK: 'dplus-kia/dplus-kia-logo.png',
  FUR: 'furia/furia-logo.png',
  VKS: 'keyd-stars/keyd-stars-logo.png',
  RED: 'red-canids/red-canids-logo.png',
  LLL: 'loud/loud-logo.png',
  PNG: 'pain-gaming/pain-gaming-logo.png'
}

const outDir = 'C:/Users/Lenovo/.gemini/antigravity/scratch/riftdraft-pwa/public/logos'

for (const [tag, p] of Object.entries(lootmarketMap)) {
  const url = `https://raw.githubusercontent.com/lootmarket/esport-team-logos/master/league-of-legends/${p}`
  try {
    const res = await fetch(url)
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(path.join(outDir, `${tag}.png`), buf)
      console.log(`[OK] lootmarket saved ${tag}.png`)
    } else {
      console.warn(`[FAIL] ${tag} HTTP ${res.status}`)
    }
  } catch (e) {
    console.error(`[ERR] ${tag}:`, e.message)
  }
}
