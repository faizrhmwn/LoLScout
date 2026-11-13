// Helper to map League champion names to valid DDragon asset keys
const NAME_MAP = {
  "K'Sante": "KSante",
  "Kai'Sa": "Kaisa",
  "LeBlanc": "Leblanc",
  "Wukong": "MonkeyKing",
  "Renata Glasc": "Renata",
  "Vel'Koz": "Velkoz",
  "Kha'Zix": "Khazix",
  "Cho'Gath": "Chogath",
  "Nunu & Willump": "Nunu"
}

// Data Dragon CDN version - using 16.22.1 for latest 2026 champions (Mel, Ambessa, Yunara, Zaahen, etc.)
export const DDRAGON_VERSION = '16.22.1'

export function getChampIconUrl(champName) {
  if (!champName) return ''
  const clean = NAME_MAP[champName] || champName.replace(/[^a-zA-Z0-9]/g, '')
  return `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${clean}.png`
}
