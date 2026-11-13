import fs from 'fs'
import path from 'path'

const official2026SquareLogos = {
  // LCK
  GEN: 'File:Gen.Glogo_square.png',
  HLE: 'File:Hanwha_Life_Esportslogo_square.png',
  T1: 'File:T1logo_square.png',
  DK: 'File:Dplus_Kialogo_square.png',
  KT: 'File:KT_Rolsterlogo_square.png',
  FOX: 'File:FearXlogo_square.png',

  // LPL
  AL: 'File:Anyone%27s_Legendlogo_square.png',
  BLG: 'File:Bilibili_Gaminglogo_square.png',
  TES: 'File:Top_Esportslogo_square.png',
  IG: 'File:Invictus_Gaminglogo_square.png',
  WE: 'File:Team_WElogo_square.png',
  JDG: 'File:JD_Gaminglogo_square.png',

  // LEC
  G2: 'File:G2_Esportslogo_square.png',
  MKOI: 'File:Movistar_KOIlogo_square.png',
  KC: 'File:Karmine_Corplogo_square.png',
  NAVI: 'File:Natus_Vincerelogo_square.png',
  VIT: 'File:Team_Vitalitylogo_square.png',
  FNC: 'File:Fnaticlogo_square.png',

  // LCS
  TL: 'File:Team_Liquidlogo_square.png',
  LYON: 'File:LYONlogo_square.png',
  C9: 'File:Cloud9logo_square.png',
  SEN: 'File:Sentinelslogo_square.png',
  FLY: 'File:FlyQuestlogo_square.png',
  SR: 'File:Shopify_Rebellionlogo_square.png',

  // CBLOL
  PNG: 'File:PaiN_Gaminglogo_square.png',
  LLL: 'File:LOUDlogo_square.png',
  VKS: 'File:Vivo_Keyd_Starslogo_square.png',
  RED: 'File:RED_Canidslogo_square.png',
  FUR: 'File:FURIA_Esportslogo_square.png',
  LOS: 'File:LOSlogo_square.png'
}

const outDir = 'C:/Users/Lenovo/.gemini/antigravity/scratch/riftdraft-pwa/public/logos'

async function update2026Logos() {
  const titles = Object.values(official2026SquareLogos).join('|')
  const apiUrl = `https://lol.fandom.com/api.php?action=query&titles=${titles}&prop=imageinfo&iiprop=url&format=json`
  
  const res = await fetch(apiUrl)
  const data = await res.json()
  const pages = data.query?.pages || {}
  
  const urlMap = {}
  for (const p of Object.values(pages)) {
    if (p.imageinfo?.[0]?.url) {
      const normalizedTitle = p.title.replace(/ /g, '_')
      urlMap[normalizedTitle] = p.imageinfo[0].url
    }
  }

  for (const [tag, fileTitle] of Object.entries(official2026SquareLogos)) {
    const rawTitle = decodeURIComponent(fileTitle).replace(/ /g, '_')
    let imgUrl = urlMap[rawTitle] || urlMap[fileTitle]
    
    // Fallback search if not direct match
    if (!imgUrl) {
      const found = Object.entries(urlMap).find(([k]) => k.toLowerCase().includes(tag.toLowerCase()))
      if (found) imgUrl = found[1]
    }

    if (imgUrl) {
      try {
        const imgRes = await fetch(imgUrl)
        if (imgRes.ok) {
          const buf = Buffer.from(await imgRes.arrayBuffer())
          fs.writeFileSync(path.join(outDir, `${tag}.png`), buf)
          console.log(`[SUCCESS 2026] Updated ${tag} (${buf.length} bytes)`)
        }
      } catch (e) {
        console.error(`[ERR] ${tag}:`, e.message)
      }
    } else {
      console.warn(`[NOT FOUND VIA BATCH] ${tag}: ${fileTitle}`)
    }
  }
}

update2026Logos()
