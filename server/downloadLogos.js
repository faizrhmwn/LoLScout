import fs from 'fs'
import path from 'path'

const LOGOS_DIR = 'C:/Users/Lenovo/.gemini/antigravity/scratch/riftdraft-pwa/public/logos'

// Leaguepedia logo URLs - confirmed working pattern
// Format: https://lol.fandom.com/wiki/Special:FilePath/[TeamName]logo_square.png
// Or Liquipedia: https://liquipedia.net/commons/images/thumb/X/XX/[Team]_allmode.png/600px-[Team]_allmode.png

const logoSources = {
  // LCK
  T1:   'https://lol.fandom.com/wiki/Special:FilePath/T1logo_square.png',
  GEN:  'https://lol.fandom.com/wiki/Special:FilePath/Gen.Glogo_square.png',
  HLE:  'https://lol.fandom.com/wiki/Special:FilePath/Hanwha_Life_Esportslogo_square.png',
  DK:   'https://lol.fandom.com/wiki/Special:FilePath/Dplus_KIAlogo_square.png',
  KT:   'https://lol.fandom.com/wiki/Special:FilePath/KT_Rolsterlogo_square.png',
  FOX:  'https://lol.fandom.com/wiki/Special:FilePath/BNK_FearXlogo_square.png',
  // LPL
  AL:   'https://lol.fandom.com/wiki/Special:FilePath/Anyone%27s_Legendlogo_square.png',
  BLG:  'https://lol.fandom.com/wiki/Special:FilePath/Bilibili_Gaminglogo_square.png',
  TES:  'https://lol.fandom.com/wiki/Special:FilePath/Top_Esportslogo_square.png',
  IG:   'https://lol.fandom.com/wiki/Special:FilePath/Invictus_Gaminglogo_square.png',
  WE:   'https://lol.fandom.com/wiki/Special:FilePath/Team_WElogo_square.png',
  JDG:  'https://lol.fandom.com/wiki/Special:FilePath/JD_Gaminglogo_square.png',
  // LEC
  G2:   'https://lol.fandom.com/wiki/Special:FilePath/G2_Esportslogo_square.png',
  MKOI: 'https://lol.fandom.com/wiki/Special:FilePath/Movistar_KOIlogo_square.png',
  KC:   'https://lol.fandom.com/wiki/Special:FilePath/Karmine_Corplogo_square.png',
  NAVI: 'https://lol.fandom.com/wiki/Special:FilePath/Natus_Vincerelogo_square.png',
  VIT:  'https://lol.fandom.com/wiki/Special:FilePath/Team_Vitalitylogo_square.png',
  FNC:  'https://lol.fandom.com/wiki/Special:FilePath/Fnaticlogo_square.png',
  // LCS
  TL:   'https://lol.fandom.com/wiki/Special:FilePath/Team_Liquidlogo_square.png',
  LYON: 'https://liquipedia.net/commons/images/thumb/3/3a/LYON_2024_allmode.png/600px-LYON_2024_allmode.png',
  C9:   'https://lol.fandom.com/wiki/Special:FilePath/Cloud9logo_square.png',
  SEN:  'https://lol.fandom.com/wiki/Special:FilePath/Sentinelslogo_square.png',
  FLY:  'https://lol.fandom.com/wiki/Special:FilePath/FlyQuestlogo_square.png',
  SR:   'https://lol.fandom.com/wiki/Special:FilePath/Shopify_Rebellionlogo_square.png',
  // CBLOL
  PNG:  'https://lol.fandom.com/wiki/Special:FilePath/paiN_Gaminglogo_square.png',
  LLL:  'https://lol.fandom.com/wiki/Special:FilePath/Los_Leones_LatAmlogo_square.png',
  VKS:  'https://lol.fandom.com/wiki/Special:FilePath/Vivo_Keydlogo_square.png',
  RED:  'https://lol.fandom.com/wiki/Special:FilePath/RED_Canidslogo_square.png',
  FUR:  'https://lol.fandom.com/wiki/Special:FilePath/Furialogo_square.png',
  LOS:  'https://lol.fandom.com/wiki/Special:FilePath/Los_Ratones_Esportslogo_square.png',
}

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Accept': 'image/png,image/*,*/*',
  'Referer': 'https://lol.fandom.com/'
}

async function downloadLogo(tag, url) {
  try {
    const res = await fetch(url, { headers, redirect: 'follow' })
    if (!res.ok) {
      console.log(`[FAIL ${res.status}] ${tag}: ${url}`)
      return false
    }
    const ct = res.headers.get('content-type') || ''
    if (!ct.includes('image') && !ct.includes('octet')) {
      console.log(`[SKIP bad content-type: ${ct}] ${tag}`)
      return false
    }
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 2000) {
      console.log(`[TOO SMALL ${buf.length}b] ${tag}`)
      return false
    }
    fs.writeFileSync(path.join(LOGOS_DIR, `${tag}.png`), buf)
    console.log(`[OK ${buf.length}b] ${tag}`)
    return true
  } catch (e) {
    console.log(`[ERROR] ${tag}: ${e.message}`)
    return false
  }
}

async function main() {
  const existing = fs.readdirSync(LOGOS_DIR)
  console.log('Starting logo download/verification...\n')

  for (const [tag, url] of Object.entries(logoSources)) {
    const pngFile = path.join(LOGOS_DIR, `${tag}.png`)
    let needsDownload = false

    if (!fs.existsSync(pngFile)) {
      console.log(`[MISSING] ${tag}.png`)
      needsDownload = true
    } else {
      const size = fs.statSync(pngFile).size
      if (size < 2000) {
        console.log(`[BROKEN ${size}b] ${tag}.png - redownloading`)
        needsDownload = true
      } else {
        console.log(`[SKIP OK ${size}b] ${tag}.png`)
        continue
      }
    }

    if (needsDownload) {
      await downloadLogo(tag, url)
      await new Promise(r => setTimeout(r, 300)) // polite delay
    }
  }

  console.log('\nAll done!')

  // Print final status
  console.log('\n=== FINAL STATUS ===')
  for (const tag of Object.keys(logoSources)) {
    const f = path.join(LOGOS_DIR, `${tag}.png`)
    const size = fs.existsSync(f) ? fs.statSync(f).size : 0
    console.log(`${tag}: ${size}b ${size < 2000 ? '❌' : '✅'}`)
  }
}

main()
