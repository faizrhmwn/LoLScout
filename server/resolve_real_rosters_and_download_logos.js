import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://wnnhqhbwbfdreumhomll.supabase.co',
  'sb_publishable_eqIIhJcjdFFZBdfG4vZVSw_cz_hU21E'
);

const LOGO_DIRS = [
  'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\riftdraft-pwa\\public\\logos',
  'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\LoLScout\\client\\public\\logos'
];

const CACHE_DIR = './cache_tournaments';

const delay = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  console.log('=== REAL ROSTERS & OFFICIAL LOGOS SYNC ===\n');

  // STEP 1: Find 1 GameId for each team from cache_tournaments
  const files = fs.readdirSync(CACHE_DIR).filter(f => f.endsWith('.json'));
  const teamGameMap = {};

  for (const f of files) {
    const games = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, f)));
    for (const g of games) {
      if (g.Team1 && !teamGameMap[g.Team1]) teamGameMap[g.Team1] = g.GameId;
      if (g.Team2 && !teamGameMap[g.Team2]) teamGameMap[g.Team2] = g.GameId;
    }
  }

  console.log(`Found ${Object.keys(teamGameMap).length} unique teams in cached games.`);

  // STEP 2: Query ScoreboardPlayers for each GameId to get real players
  const gameIds = Array.from(new Set(Object.values(teamGameMap)));
  console.log(`Querying players for ${gameIds.length} sample games...`);

  const teamRosters = {};

  // Batch query GameIds in chunks of 10
  for (let i = 0; i < gameIds.length; i += 10) {
    const chunk = gameIds.slice(i, i + 10);
    const whereCond = chunk.map(id => `GameId = '${id.replace(/'/g, "\\'")}'`).join(' OR ');

    try {
      const params = new URLSearchParams({
        action: 'cargoquery',
        tables: 'ScoreboardPlayers',
        fields: 'GameId,Team,Name,Role',
        where: whereCond,
        limit: '500',
        format: 'json'
      });

      const res = await fetch('https://lol.fandom.com/api.php?' + params.toString(), {
        headers: { 'User-Agent': 'LoLScoutAcademic/1.0 (contact: student@undip.ac.id; practical study)' }
      }).then(r => r.json());

      const records = res.cargoquery?.map(x => x.title) || [];
      for (const rec of records) {
        if (!teamRosters[rec.Team]) teamRosters[rec.Team] = {};
        let role = rec.Role;
        if (role === 'Bot') role = 'ADC';
        teamRosters[rec.Team][role] = rec.Name;
      }
      await delay(1000);
    } catch (err) {
      console.error(`Error querying chunk ${i}:`, err.message);
    }
  }

  console.log(`\nSuccessfully fetched real rosters for ${Object.keys(teamRosters).length} teams.`);
  fs.writeFileSync('extracted_real_team_rosters.json', JSON.stringify(teamRosters, null, 2), 'utf8');

  // STEP 3: Fetch Official Logos from Cargo Teams table
  console.log('\n[2] Fetching official team logo images from Leaguepedia...');
  const { data: dbTeams } = await supabase.from('teams').select('id, short_name, name, region');

  // Map from DB team to Cargo team name
  const DB_TO_CARGO = {
    // LCK
    GEN: 'Gen.G', HLE: 'Hanwha Life Esports', T1: 'T1', DK: 'Dplus KIA',
    KT: 'KT Rolster', FOX: 'BNK FEARX', NS: 'Nongshim RedForce', DRX: 'DRX',
    BRO: 'HANJIN BRION', DNS: 'DN SOOPers',
    // LPL
    AL: "Anyone's Legend", BLG: 'Bilibili Gaming', TES: 'Top Esports',
    JDG: 'JD Gaming', IG: 'Invictus Gaming', WE: 'Team WE', WBG: 'Weibo Gaming',
    LNG: 'LNG Esports', NIP: 'Ninjas in Pyjamas.CN', EDG: 'EDward Gaming',
    OMG: 'Oh My God', TT: 'ThunderTalk Gaming', LGD: 'LGD Gaming', UP: 'Ultra Prime',
    // LEC
    G2: 'G2 Esports', KC: 'Karmine Corp', MKOI: 'Movistar KOI', FNC: 'Fnatic',
    VIT: 'Team Vitality', NAVI: 'Natus Vincere', TH: 'Team Heretics',
    SK: 'SK Gaming', GX: 'GIANTX', BDS: 'Team BDS',
    // LCS
    TL: 'Team Liquid', LYON: 'LYON (2024 American Team)', C9: 'Cloud9',
    SEN: 'Sentinels', SR: 'Shopify Rebellion', FLY: 'FlyQuest',
    '100T': '100 Thieves', DIG: 'Dignitas',
    // CBLOL
    LLL: 'LOUD', VKS: 'Vivo Keyd Stars', RED: 'RED Canids', LOS: 'LØS',
    FUR: 'FURIA', PNG: 'paiN Gaming', FX: 'Fluxo W7M', ITZ: 'INTZ',
    // International
    TSW: 'Team Secret Whales', CFO: 'CTBC Flying Oyster', DCG: 'Deep Cross Gaming'
  };

  // Query Teams table for image names
  const allTeamNames = Object.values(DB_TO_CARGO);
  const teamImages = {};

  for (let i = 0; i < allTeamNames.length; i += 15) {
    const chunk = allTeamNames.slice(i, i + 15);
    const params = new URLSearchParams({
      action: 'cargoquery',
      tables: 'Teams',
      fields: 'Name,Short,Image',
      where: chunk.map(t => `Name = '${t.replace(/'/g, "\\'")}'`).join(' OR '),
      limit: '50',
      format: 'json'
    });

    const res = await fetch('https://lol.fandom.com/api.php?' + params.toString(), {
      headers: { 'User-Agent': 'LoLScoutAcademic/1.0 (contact: student@undip.ac.id; practical study)' }
    }).then(r => r.json());

    const items = res.cargoquery?.map(x => x.title) || [];
    for (const item of items) {
      if (item.Image) teamImages[item.Name] = item.Image;
    }
    await delay(1000);
  }

  // Also query alternate names if any missing
  const missingLogos = allTeamNames.filter(t => !teamImages[t]);
  console.log(`Found direct logo images for ${Object.keys(teamImages).length} teams. Missing: ${missingLogos.join(', ')}`);

  // Download each logo
  for (const [code, cargoName] of Object.entries(DB_TO_CARGO)) {
    const imageName = teamImages[cargoName];
    if (!imageName) continue;

    try {
      const p = new URLSearchParams({
        action: 'query',
        titles: `File:${imageName}`,
        prop: 'imageinfo',
        iiprop: 'url',
        format: 'json'
      });
      const res = await fetch('https://lol.fandom.com/api.php?' + p.toString(), {
        headers: { 'User-Agent': 'LoLScoutAcademic/1.0 (contact: student@undip.ac.id; practical study)' }
      }).then(r => r.json());

      const page = Object.values(res.query?.pages || {})[0];
      const directUrl = page?.imageinfo?.[0]?.url;
      if (!directUrl) {
        console.warn(`  No direct URL for ${code} (${imageName})`);
        continue;
      }

      console.log(`  Downloading official logo for ${code}: ${directUrl}`);
      const imgBuffer = await fetch(directUrl, {
        headers: { 'User-Agent': 'LoLScoutAcademic/1.0 (contact: student@undip.ac.id; practical study)' }
      }).then(r => r.arrayBuffer());

      for (const dir of LOGO_DIRS) {
        fs.writeFileSync(path.join(dir, `${code}.png`), Buffer.from(imgBuffer));
        fs.writeFileSync(path.join(dir, `${code.toLowerCase()}.png`), Buffer.from(imgBuffer));
        // Also save as svg extension so fallback works
        fs.writeFileSync(path.join(dir, `${code}.svg`), Buffer.from(imgBuffer));
        fs.writeFileSync(path.join(dir, `${code.toLowerCase()}.svg`), Buffer.from(imgBuffer));
      }
      await delay(800);
    } catch (err) {
      console.error(`  Failed to download logo for ${code}:`, err.message);
    }
  }

  // STEP 4: Update Supabase Teams with Real 2026 Rosters
  console.log('\n[3] Updating Supabase teams table with accurate real 2026 rosters...');
  for (const t of dbTeams) {
    const cargoName = DB_TO_CARGO[t.short_name];
    const rawRoster = teamRosters[cargoName] || teamRosters[t.name] || teamRosters[t.short_name] || {};

    const rolesOrder = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];
    const formattedRoster = rolesOrder.map(r => ({
      role: r,
      ign: rawRoster[r] || 'ProPlayer'
    }));

    // If we have at least 3 roles filled, update DB
    const filledCount = rolesOrder.filter(r => rawRoster[r]).length;
    if (filledCount >= 3) {
      console.log(`  Updating ${t.short_name} (${t.name}): ${formattedRoster.map(p => p.ign).join(', ')}`);
      await supabase.from('teams').update({
        roster: formattedRoster
      }).eq('id', t.id);
    } else {
      console.log(`  Skipping ${t.short_name} (only ${filledCount} roles detected)`);
    }
  }

  console.log('\n=== COMPLETED REAL ROSTERS & OFFICIAL LOGOS UPDATE ===');
}

main();
