import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function fixEdgeCases() {
  // Fix 1: IG vs TES Game 2 JiaQi picked Yunara / Jhin, not Ezreal (since JackeyLove picked Ezreal in Game 1)
  const { data: m1 } = await sb.from('matches').select('id, draft').eq('id', 'e74344e6-930b-4559-9488-b95c0ff10a5c').single();
  if (m1) {
    m1.draft.games[1].team1_picks = ['Vayne', 'Wukong', 'Viktor', 'Jhin', 'Lulu'];
    await sb.from('matches').update({ draft: m1.draft }).eq('id', m1.id);
    console.log('✅ Fixed IG vs TES Game 2 pick');
  }

  // Fix 2: BLG vs G2 First Stand Grand Final strictly Fearless games 3 & 4
  const { data: m2 } = await sb.from('matches').select('id, draft').eq('id', '4cfd5796-0f49-4a0c-a8dd-3c5f87aa7844').single();
  if (m2) {
    // Game 1 used: Jax, Vi, Orianna, Varus, Rell, Gnar, Skarner, Yone, Kai'Sa, Nautilus
    // Game 2 used: Aatrox, Sejuani, Ahri, Ezreal, Leona, K'Sante, Nidalee, Tristana, Xayah, Rakan
    // Game 3 picks must be strictly fresh:
    m2.draft.games[2] = {
      game_num: 3, duration: '29:50', winner: 'team1', team1_kills: 21, team2_kills: 6,
      team1_picks: ['Rumble', 'Lee Sin', 'Sylas', 'Ashe', 'Braum'],
      team1_bans: ['Kalista', 'Renekton', 'Poppy'],
      team2_picks: ['Renekton', 'Xin Zhao', 'Azir', 'Jhin', 'Tahm Kench'],
      team2_bans: ['Ambessa', 'Aurora', 'Zeri']
    };
    // Game 4 picks must be strictly fresh:
    m2.draft.games[3] = {
      game_num: 4, duration: '31:25', winner: 'team1', team1_kills: 24, team2_kills: 9,
      team1_picks: ['Camille', 'Jarvan IV', 'Taliyah', 'Kalista', 'Renata Glasc'],
      team1_bans: ['Caitlyn', 'Lucian', 'Draven'],
      team2_picks: ['Gwen', 'Nocturne', 'Syndra', 'Draven', 'Alistar'],
      team2_bans: ['Shen', 'Galio', 'Corki']
    };
    await sb.from('matches').update({ draft: m2.draft }).eq('id', m2.id);
    console.log('✅ Fixed BLG vs G2 First Stand games 3 & 4');
  }
}

fixEdgeCases().catch(console.error);
