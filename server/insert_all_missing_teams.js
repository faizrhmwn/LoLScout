// insert_all_missing_teams.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://wnnhqhbwbfdreumhomll.supabase.co',
  'sb_publishable_eqIIhJcjdFFZBdfG4vZVSw_cz_hU21E'
);

const NEW_TEAMS = [
  // LPL (8 teams)
  {
    name: 'Weibo Gaming', short_name: 'WBG', region: 'LPL',
    logo_url: '/logos/WBG.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LPL_Default_Header.jpg',
    standing_summer: 5,
    description: 'Weibo Gaming is one of the premier esports organizations in the LPL.',
    roster: [
      { ign: 'Breathe', name: 'Chen Chen', role: 'Top', nationality: 'CN' },
      { ign: 'Tarzan', name: 'Lee Seung-yong', role: 'Jungle', nationality: 'KR' },
      { ign: 'Xiaohu', name: 'Li Yuan-Hao', role: 'Mid', nationality: 'CN' },
      { ign: 'Light', name: 'Wang Guang-Yu', role: 'ADC', nationality: 'CN' },
      { ign: 'Crisp', name: 'Liu Qing-Song', role: 'Support', nationality: 'CN' },
    ],
    achievements: ['Worlds 2023 Finalist', 'LPL Contender']
  },
  {
    name: 'LNG Esports', short_name: 'LNG', region: 'LPL',
    logo_url: '/logos/LNG.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LPL_Default_Header.jpg',
    standing_summer: 6,
    description: 'LNG Esports represents Suzhou in the LPL with powerful teamfighting and disciplined macro.',
    roster: [
      { ign: 'Zika', name: 'Tang Hua-Yu', role: 'Top', nationality: 'CN' },
      { ign: 'Weiwei', name: 'Wei Bo-Han', role: 'Jungle', nationality: 'CN' },
      { ign: 'Scout', name: 'Lee Ye-chan', role: 'Mid', nationality: 'KR' },
      { ign: 'GALA', name: 'Chen Wei', role: 'ADC', nationality: 'CN' },
      { ign: 'Hang', name: 'Fu Ming-Hang', role: 'Support', nationality: 'CN' },
    ],
    achievements: ['Worlds Quarterfinalist', 'LPL Top 4']
  },
  {
    name: 'Ninjas in Pyjamas', short_name: 'NIP', region: 'LPL',
    logo_url: '/logos/NIP.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LPL_Default_Header.jpg',
    standing_summer: 7,
    description: 'Ninjas in Pyjamas is a legendary global organization competing in the Chinese LPL.',
    roster: [
      { ign: 'shanji', name: 'Deng Zi-Jian', role: 'Top', nationality: 'CN' },
      { ign: 'Aki', name: 'Mao An', role: 'Jungle', nationality: 'CN' },
      { ign: 'Rookie', name: 'Song Eui-jin', role: 'Mid', nationality: 'KR' },
      { ign: 'Photic', name: 'Ying Qi-Shen', role: 'ADC', nationality: 'CN' },
      { ign: 'Zhuo', name: 'Wang Xu-Zhuo', role: 'Support', nationality: 'CN' },
    ],
    achievements: ['LPL Playoff Contender']
  },
  {
    name: 'EDward Gaming', short_name: 'EDG', region: 'LPL',
    logo_url: '/logos/EDG.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LPL_Default_Header.jpg',
    standing_summer: 8,
    description: 'EDward Gaming is one of the most storied organizations in LoL history and former World Champions.',
    roster: [
      { ign: 'Ale', name: 'Han Quan-Hao', role: 'Top', nationality: 'CN' },
      { ign: 'Jiejie', name: 'Zhao Li-Jie', role: 'Jungle', nationality: 'CN' },
      { ign: 'Fisher', name: 'Lee Jung-tae', role: 'Mid', nationality: 'KR' },
      { ign: 'Leave', name: 'Hu Hong-Chao', role: 'ADC', nationality: 'CN' },
      { ign: 'Meiko', name: 'Tian Ye', role: 'Support', nationality: 'CN' },
    ],
    achievements: ['Worlds 2021 Champions', '6x LPL Champions']
  },
  {
    name: 'Oh My God', short_name: 'OMG', region: 'LPL',
    logo_url: '/logos/OMG.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LPL_Default_Header.jpg',
    standing_summer: 9,
    description: 'OMG has a proud history dating back to Season 3 as the original dark horses of Chinese League.',
    roster: [
      { ign: 'Hery', name: 'Wang He-Yang', role: 'Top', nationality: 'CN' },
      { ign: 'Tianzhen', name: 'Guo Qi-Fan', role: 'Jungle', nationality: 'CN' },
      { ign: 'Angel', name: 'Xiang Tao', role: 'Mid', nationality: 'CN' },
      { ign: 'Able', name: 'Dai Zhi-Chun', role: 'ADC', nationality: 'CN' },
      { ign: 'ppgod', name: 'Guo Peng', role: 'Support', nationality: 'CN' },
    ],
    achievements: ['LPL Season 3/4 Finalist']
  },
  {
    name: 'ThunderTalk Gaming', short_name: 'TT', region: 'LPL',
    logo_url: '/logos/TT.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LPL_Default_Header.jpg',
    standing_summer: 10,
    description: 'ThunderTalk Gaming competes vigorously in the LPL circuit.',
    roster: [
      { ign: 'HOYA', name: 'Yoon Yong-ho', role: 'Top', nationality: 'KR' },
      { ign: 'Beichuan', name: 'Yang Ling', role: 'Jungle', nationality: 'CN' },
      { ign: 'ucal', name: 'Song Kyung-ho', role: 'Mid', nationality: 'KR' },
      { ign: '1x', name: 'Sun Chen-Hao', role: 'ADC', nationality: 'CN' },
      { ign: 'QiuQiu', name: 'Zhang Ming', role: 'Support', nationality: 'CN' },
    ],
    achievements: ['LPL Contender']
  },
  {
    name: 'LGD Gaming', short_name: 'LGD', region: 'LPL',
    logo_url: '/logos/LGD.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LPL_Default_Header.jpg',
    standing_summer: 11,
    description: 'LGD Gaming represents Hangzhou in the LPL with a passionate legacy.',
    roster: [
      { ign: 'Burdol', name: 'Noh Tae-yoon', role: 'Top', nationality: 'KR' },
      { ign: 'Meteor', name: 'Zeng Guo-Hao', role: 'Jungle', nationality: 'CN' },
      { ign: 'haichao', name: 'Zhang Hai-Chao', role: 'Mid', nationality: 'CN' },
      { ign: 'Shaoye', name: 'Pang Lei', role: 'ADC', nationality: 'CN' },
      { ign: 'JinJiao', name: 'Xie Jin-Shan', role: 'Support', nationality: 'CN' },
    ],
    achievements: ['LPL 2015 Summer Champions', 'Worlds 2020']
  },
  {
    name: 'Ultra Prime', short_name: 'UP', region: 'LPL',
    logo_url: '/logos/UP.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LPL_Default_Header.jpg',
    standing_summer: 12,
    description: 'Ultra Prime fields a gritty roster competing in the intense LPL regular season.',
    roster: [
      { ign: 'Decade', name: 'Zhang Hua-Xin', role: 'Top', nationality: 'CN' },
      { ign: 'H4cker', name: 'Yang Zhi-Hao', role: 'Jungle', nationality: 'CN' },
      { ign: 'Yuekai', name: 'Zhang Yue-Kai', role: 'Mid', nationality: 'CN' },
      { ign: 'Doggo', name: 'Chiu Tzu-Chuan', role: 'ADC', nationality: 'TW' },
      { ign: 'Niket', name: 'Li Hao', role: 'Support', nationality: 'CN' },
    ],
    achievements: ['LPL Contender']
  },

  // LEC (4 teams)
  {
    name: 'Team Heretics', short_name: 'TH', region: 'LEC',
    logo_url: '/logos/TH.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LEC_Default_Header.jpg',
    standing_summer: 5,
    description: 'Team Heretics is a Spanish esports juggernaut competing at the highest European level.',
    roster: [
      { ign: 'Wunder', name: 'Martin Hansen', role: 'Top', nationality: 'DK' },
      { ign: 'Jankos', name: 'Marcin Jankowski', role: 'Jungle', nationality: 'PL' },
      { ign: 'Zwyroo', name: 'Artur Trojan', role: 'Mid', nationality: 'PL' },
      { ign: 'Flakked', name: 'Victor Lirola', role: 'ADC', nationality: 'ES' },
      { ign: 'Trymbi', name: 'Adrian Trybus', role: 'Support', nationality: 'PL' },
    ],
    achievements: ['LEC Playoff Contender']
  },
  {
    name: 'SK Gaming', short_name: 'SK', region: 'LEC',
    logo_url: '/logos/SK.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LEC_Default_Header.jpg',
    standing_summer: 6,
    description: 'SK Gaming is a historic German organization founded in 1997.',
    roster: [
      { ign: 'JNX', name: 'Janik Bartels', role: 'Top', nationality: 'DE' },
      { ign: 'ISMA', name: 'Ismaïl Boualem', role: 'Jungle', nationality: 'FR' },
      { ign: 'Nisqy', name: 'Yasin Dinçer', role: 'Mid', nationality: 'BE' },
      { ign: 'Rahel', name: 'Cho Min-seong', role: 'ADC', nationality: 'KR' },
      { ign: 'Luon', name: 'Lee Hyun-seo', role: 'Support', nationality: 'KR' },
    ],
    achievements: ['Historic European Organization']
  },
  {
    name: 'GIANTX', short_name: 'GX', region: 'LEC',
    logo_url: '/logos/GX.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LEC_Default_Header.jpg',
    standing_summer: 7,
    description: 'GIANTX was formed from the merger of Giants Gaming and EXCEL ESPORTS.',
    roster: [
      { ign: 'Odoamne', name: 'Andrei Pascu', role: 'Top', nationality: 'RO' },
      { ign: 'Peach', name: 'Lee Min-gyu', role: 'Jungle', nationality: 'KR' },
      { ign: 'Jackies', name: 'Jan Minárik', role: 'Mid', nationality: 'CZ' },
      { ign: 'Patrik', name: 'Patrik Jírů', role: 'ADC', nationality: 'CZ' },
      { ign: 'IgNar', name: 'Lee Dong-geun', role: 'Support', nationality: 'KR' },
    ],
    achievements: ['LEC Contender']
  },
  {
    name: 'Team BDS', short_name: 'BDS', region: 'LEC',
    logo_url: '/logos/BDS.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LEC_Default_Header.jpg',
    standing_summer: 4,
    description: 'Team BDS is a Swiss esports powerhouse known for disciplined teamwork.',
    roster: [
      { ign: 'Adam', name: 'Adam Maanane', role: 'Top', nationality: 'FR' },
      { ign: 'Sheo', name: 'Théo Borile', role: 'Jungle', nationality: 'FR' },
      { ign: 'nuc', name: 'Ilias Bizriken', role: 'Mid', nationality: 'FR' },
      { ign: 'Ice', name: 'Yoon Sang-hoon', role: 'ADC', nationality: 'KR' },
      { ign: 'Labrov', name: 'Labros Papoutsakis', role: 'Support', nationality: 'GR' },
    ],
    achievements: ['Worlds 2023 Contender', 'LEC Top 3']
  },

  // LCS (2 teams)
  {
    name: '100 Thieves', short_name: '100T', region: 'LCS',
    logo_url: '/logos/100T.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LCS_Default_Header.jpg',
    standing_summer: 4,
    description: '100 Thieves is a lifestyle and gaming brand competing in the North American LCS.',
    roster: [
      { ign: 'Sniper', name: 'Rayhan Khorrami', role: 'Top', nationality: 'US' },
      { ign: 'River', name: 'Kim Dong-woo', role: 'Jungle', nationality: 'KR' },
      { ign: 'Quid', name: 'Lim Hyeon-seung', role: 'Mid', nationality: 'KR' },
      { ign: 'FBI', name: 'Ian Victor Huang', role: 'ADC', nationality: 'AU' },
      { ign: 'Eyla', name: 'Bill Nguyen', role: 'Support', nationality: 'AU' },
    ],
    achievements: ['LCS 2021 Championship Winners', 'Worlds Contender']
  },
  {
    name: 'Dignitas', short_name: 'DIG', region: 'LCS',
    logo_url: '/logos/DIG.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LCS_Default_Header.jpg',
    standing_summer: 5,
    description: 'Dignitas is one of North Americas foundational esports franchises.',
    roster: [
      { ign: 'Licorice', name: 'Eric Ritchie', role: 'Top', nationality: 'CA' },
      { ign: 'Spica', name: 'Mingyi Lu', role: 'Jungle', nationality: 'US' },
      { ign: 'Jensen', name: 'Nicolaj Jensen', role: 'Mid', nationality: 'DK' },
      { ign: 'Zven', name: 'Jesper Svenningsen', role: 'ADC', nationality: 'DK' },
      { ign: 'Isles', name: 'Jonah Rosario', role: 'Support', nationality: 'AU' },
    ],
    achievements: ['Historic NA Franchise']
  },

  // CBLOL (2 teams)
  {
    name: 'Fluxo', short_name: 'FX', region: 'CBLOL',
    logo_url: '/logos/FX.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/CBLOL_Default_Header.jpg',
    standing_summer: 5,
    description: 'Fluxo is a massive Brazilian esports movement competing in CBLOL.',
    roster: [
      { ign: 'Kiari', name: 'Thiago Luiz', role: 'Top', nationality: 'BR' },
      { ign: 'Shini', name: 'Diogo Rogê', role: 'Jungle', nationality: 'BR' },
      { ign: 'Fuger', name: 'Gabriel Fuger', role: 'Mid', nationality: 'BR' },
      { ign: 'Trigo', name: 'Matheus Trigo', role: 'ADC', nationality: 'BR' },
      { ign: 'Scuro', name: 'Vinicius Scuro', role: 'Support', nationality: 'BR' },
    ],
    achievements: ['CBLOL Playoff Contender']
  },
  {
    name: 'INTZ', short_name: 'ITZ', region: 'CBLOL',
    logo_url: '/logos/ITZ.svg',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/CBLOL_Default_Header.jpg',
    standing_summer: 6,
    description: 'INTZ is the most decorated team in CBLOL history with 5 championship titles.',
    roster: [
      { ign: 'Yampi', name: 'Yan Petermann', role: 'Top', nationality: 'BR' },
      { ign: 'Damage', name: 'Yan Sales', role: 'Jungle', nationality: 'BR' },
      { ign: 'Aevaca', name: 'Lucas Aevaca', role: 'Mid', nationality: 'BR' },
      { ign: 'NinjaKiwi', name: 'Pedro Rosa', role: 'ADC', nationality: 'BR' },
      { ign: 'Woodboy', name: 'Victor Wood', role: 'Support', nationality: 'BR' },
    ],
    achievements: ['5x CBLOL Champions']
  },
];

async function run() {
  console.log('Inserting 16 missing franchise teams to Supabase...\n');

  for (const team of NEW_TEAMS) {
    const { data: existing } = await supabase.from('teams').select('id').eq('short_name', team.short_name);
    if (existing && existing.length > 0) {
      console.log(`  ${team.short_name} (${team.name}) already exists.`);
    } else {
      const { data, error } = await supabase.from('teams').insert(team).select('id').single();
      if (error) {
        console.error(`  Error inserting ${team.short_name}:`, error.message);
      } else {
        console.log(`  Inserted ${team.short_name} (${team.name}) -> ${data.id}`);
      }
    }
  }

  const { data: allTeams } = await supabase.from('teams').select('id,short_name,region');
  console.log(`\nTotal teams in database now: ${allTeams.length}`);
}

run();
