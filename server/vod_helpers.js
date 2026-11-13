import { supabase } from './src/config/supabaseClient.js';

// Cache for query results
const cache = new Map();
const delay = ms => new Promise(res => setTimeout(res, ms));

async function getValidVOD(query) {
  if (cache.has(query)) return cache.get(query);
  try {
    await delay(600);
    const encoded = encodeURIComponent(query);
    const res = await fetch(`https://www.youtube.com/results?search_query=${encoded}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) return null;
    const html = await res.text();
    const rawMatches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
    const uniqueIds = [...new Set(rawMatches)];

    for (const vid of uniqueIds.slice(0, 5)) {
      try {
        const oembed = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${vid}&format=json`);
        if (oembed.ok) {
          const info = await oembed.json();
          const result = { id: vid, url: `https://www.youtube.com/watch?v=${vid}`, title: info.title };
          cache.set(query, result);
          return result;
        }
      } catch {}
    }
  } catch (err) {
    console.error(err.message);
  }
  return null;
}

// Pool of verified generic/fallback LoL esports highlight VODs per region if specific game isn't found
const REGIONAL_FALLBACK_VODS = {
  LCK: [
    'https://www.youtube.com/watch?v=DjZ_ddys6HA',
    'https://www.youtube.com/watch?v=3VuwRZlHyEQ',
    'https://www.youtube.com/watch?v=zO7paBm_d_U',
    'https://www.youtube.com/watch?v=lErcmYDUTco',
    'https://www.youtube.com/watch?v=c-c55VMfx0s',
    'https://www.youtube.com/watch?v=rOhoau76yjI',
    'https://www.youtube.com/watch?v=k3yumZI7MQA',
    'https://www.youtube.com/watch?v=7TFXGEJap58'
  ],
  LPL: [
    'https://www.youtube.com/watch?v=Zzw46j0aU9A',
    'https://www.youtube.com/watch?v=x42_ZP4DWw0',
    'https://www.youtube.com/watch?v=6DF2MRArTpk',
    'https://www.youtube.com/watch?v=k_b6gHL68jc',
    'https://www.youtube.com/watch?v=3x8KmA4qw2I',
    'https://www.youtube.com/watch?v=XEaFQbOhz9g',
    'https://www.youtube.com/watch?v=jheSckDJZ94',
    'https://www.youtube.com/watch?v=yX_Fpz2qeWw'
  ],
  LEC: [
    'https://www.youtube.com/watch?v=qHAn7zWJE_Q',
    'https://www.youtube.com/watch?v=_oZ43E96t8o',
    'https://www.youtube.com/watch?v=Tt3cSBNjWug',
    'https://www.youtube.com/watch?v=ugmFFNOwbUU',
    'https://www.youtube.com/watch?v=KioMP4oY10Y',
    'https://www.youtube.com/watch?v=w7BuKemdCSA',
    'https://www.youtube.com/watch?v=xbho33Gp_lU'
  ],
  LCS: [
    'https://www.youtube.com/watch?v=BtK-MKvPAbw',
    'https://www.youtube.com/watch?v=So83BLuFUQQ',
    'https://www.youtube.com/watch?v=ld_G4Lo3PyY',
    'https://www.youtube.com/watch?v=V2OOjXgGxNE',
    'https://www.youtube.com/watch?v=AgA7utS9rgY',
    'https://www.youtube.com/watch?v=2emzDKq5i2c'
  ],
  CBLOL: [
    'https://www.youtube.com/watch?v=5LaaBwTVBFg',
    'https://www.youtube.com/watch?v=ddhRjtmaFYw',
    'https://www.youtube.com/watch?v=vGTau2K2Tw4',
    'https://www.youtube.com/watch?v=x3fKdNoG5ls',
    'https://www.youtube.com/watch?v=Kr807FJsb9w',
    'https://www.youtube.com/watch?v=J8PfsmhsK3k'
  ]
};

export { getValidVOD, REGIONAL_FALLBACK_VODS };
