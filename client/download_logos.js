import fs from 'fs'
import path from 'path'

const teamWikiTitles = {
  GEN: 'Gen.G',
  HLE: 'Hanwha Life Esports',
  T1: 'T1',
  DK: 'Dplus KIA',
  KT: 'KT Rolster',
  FOX: 'BNK FEARX',

  AL: "Anyone's Legend",
  BLG: 'Bilibili Gaming',
  TES: 'Top Esports',
  IG: 'Invictus Gaming',
  WE: 'Team WE',
  JDG: 'JD Gaming',

  G2: 'G2 Esports',
  MKOI: 'Movistar KOI',
  KC: 'Karmine Corp',
  NAVI: 'Natus Vincere',
  VIT: 'Team Vitality',
  FNC: 'Fnatic',

  TL: 'Team Liquid',
  LYON: 'LYON',
  C9: 'Cloud9',
  SEN: 'Sentinels',
  FLY: 'FlyQuest',
  SR: 'Shopify Rebellion',

  PNG: 'paiN Gaming',
  LLL: 'LOUD',
  VKS: 'Vivo Keyd Stars',
  RED: 'RED Canids',
  FUR: 'FURIA Esports',
  LOS: 'LOS'
}

const outDir = 'C:/Users/Lenovo/.gemini/antigravity/scratch/riftdraft-pwa/public/logos'

async function downloadLogos() {
  for (const [tag, title] of Object.entries(teamWikiTitles)) {
    try {
      const url = `https://lol.fandom.com/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=200`
      const res = await fetch(url)
      const data = await res.json()
      const pages = data.query?.pages || {}
      const page = Object.values(pages)[0]
      const thumb = page?.thumbnail?.source
      if (thumb) {
        const imgRes = await fetch(thumb)
        if (imgRes.ok) {
          const buf = Buffer.from(await imgRes.arrayBuffer())
          fs.writeFileSync(path.join(outDir, `${tag}.png`), buf)
          console.log(`[OK] Downloaded real logo for ${tag} (${title})`)
          continue
        }
      }
      console.warn(`[WARN] No thumbnail for ${tag} (${title})`)
    } catch (e) {
      console.error(`[ERR] ${tag}:`, e.message)
    }
  }
}

downloadLogos()
