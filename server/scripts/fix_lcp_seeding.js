import 'dotenv/config';
import { supabase } from '../src/config/supabaseClient.js';

async function fixLcpSeeding() {
  console.log('Updating LCP seeding to official 2026 Split 3 results...');

  // 1. Team Secret Whales: Seed #1 (Champion)
  const { error: tswErr } = await supabase.from('teams').update({
    standing_summer: 1,
    description: 'Team Secret Whales is the reigning champion of the League of Legends Championship Pacific (LCP), claiming dominant multi-split titles in 2026.',
    achievements: [
      'LCP 2026 Split 3 Champions',
      'LCP 2026 Split 2 Champions',
      'LCP 2026 Split 1 Champions',
      'First Stand 2026 Qualified',
      'MSI 2026 Contenders',
      'Worlds 2026 Qualified'
    ]
  }).eq('short_name', 'TSW');
  if (tswErr) console.error('TSW error:', tswErr);

  // 2. CTBC Flying Oyster: Seed #2 (Runner-up)
  const { error: cfoErr } = await supabase.from('teams').update({
    standing_summer: 2,
    description: 'CTBC Flying Oyster is a premier Taiwanese powerhouse competing in the LCP, finishing as 2026 Grand Finalists and qualifying for Worlds 2026.',
    achievements: [
      'LCP 2026 Split 3 Finalists (Seed #2)',
      'PCS 2024 Spring Champions',
      'Worlds 2026 Qualified',
      'Worlds 2024 & 2023 Qualified'
    ]
  }).eq('short_name', 'CFO');
  if (cfoErr) console.error('CFO error:', cfoErr);

  // 3. Deep Cross Gaming: Seed #3
  const { error: dcgErr } = await supabase.from('teams').update({
    standing_summer: 3,
    description: 'Deep Cross Gaming is a high-tempo Taiwanese organization in the LCP, reaching back-to-back Grand Finals in Splits 1 & 2.',
    achievements: [
      'LCP 2026 Split 1 & 2 Finalists',
      'MSI 2026 Qualified',
      'PCS 2024 Spring Playoffs'
    ]
  }).eq('short_name', 'DCG');
  if (dcgErr) console.error('DCG error:', dcgErr);

  console.log('LCP seeding updated successfully!');
}

fixLcpSeeding();
