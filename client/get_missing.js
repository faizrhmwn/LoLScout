import fs from 'fs'
import path from 'path'

const missingTitles = {
  DK: 'Dplus KIA/Tournament Results', // or search images
  G2: 'G2 Esports',
  LYON: 'Movistar R7',
  VKS: 'Vivo Keyd Stars',
  RED: 'RED Canids',
  FUR: 'FURIA',
  LOS: 'Los Grandes'
}

const outDir = 'C:/Users/Lenovo/.gemini/antigravity/scratch/riftdraft-pwa/public/logos'

async function getWikiImage(title) {
  // Query images on page
  const url = `https://lol.fandom.com/api.php?action=query&titles=${encodeURIComponent(title)}&generator=images&gimlimit=10&prop=imageinfo&iiprop=url&format=json`
  const res = await fetch(url)
  const data = await res.json()
  const pages = data.query?.pages || {}
  for (const p of Object.values(pages)) {
    const imgUrl = p.imageinfo?.[0]?.url
    if (imgUrl && (imgUrl.toLowerCase().includes('logo') || imgUrl.toLowerCase().includes('square'))) {
      return imgUrl
    }
  }
  return null
}

async function run() {
  for (const [tag, title] of Object.entries(missingTitles)) {
    try {
      let imgUrl = await getWikiImage(title)
      if (!imgUrl && title.includes(' ')) {
        imgUrl = await getWikiImage(title.split(' ')[0])
      }
      if (imgUrl) {
        const res = await fetch(imgUrl)
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer())
          fs.writeFileSync(path.join(outDir, `${tag}.png`), buf)
          console.log(`[OK] Retrieved ${tag} logo from ${imgUrl}`)
          continue
        }
      }
      console.warn(`[STILL MISSING] ${tag}`)
    } catch (e) {
      console.error(`[ERR] ${tag}:`, e.message)
    }
  }
}

run()
