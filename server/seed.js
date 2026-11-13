import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

const teamsData = [
  // LCK (Korea)
  {
    name: 'Gen.G Esports',
    short_name: 'GEN',
    region: 'LCK',
    standing_summer: 1,
    logo_url: 'https://liquipedia.net/commons/images/thumb/7/7b/Gen.G_2020_full_allmode.png/300px-Gen.G_2020_full_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltd93b8252277d7045/6446a8bb13b1fc110901e975/GenG_Header.jpg',
    description: 'Gen.G is a premier Korean esports powerhouse and the reigning LCK 2026 Champion, known for unparalleled macro mastery and late-game execution.',
    roster: [
      { role: 'Top', ign: 'Kiin', name: 'Kim Gi-in', nationality: 'KR' },
      { role: 'Jungle', ign: 'Canyon', name: 'Kim Geon-bu', nationality: 'KR' },
      { role: 'Mid', ign: 'Chovy', name: 'Jeong Ji-hoon', nationality: 'KR' },
      { role: 'ADC', ign: 'Ruler', name: 'Park Jae-hyuk', nationality: 'KR' },
      { role: 'Support', ign: 'Duro', name: 'Joo Min-kyu', nationality: 'KR' },
      { role: 'Coach', ign: 'KIM', name: 'Kim Jeong-soo', nationality: 'KR' }
    ],
    achievements: ['LCK 2026 Summer Champions', 'MSI 2024 Champions', 'LCK 2024 Spring Champions']
  },
  {
    name: 'Hanwha Life Esports',
    short_name: 'HLE',
    region: 'LCK',
    standing_summer: 2,
    logo_url: 'https://liquipedia.net/commons/images/thumb/6/69/Hanwha_Life_Esports_allmode.png/300px-Hanwha_Life_Esports_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt49b5d38fffa0599a/6446a8b79b8e8411082c5f11/HLE_Header.jpg',
    description: 'Hanwha Life Esports boasts a superstar lineup featuring world champions, playing an aggressive and lane-dominant style.',
    roster: [
      { role: 'Top', ign: 'Zeus', name: 'Choi Woo-je', nationality: 'KR' },
      { role: 'Jungle', ign: 'Peanut', name: 'Han Wang-ho', nationality: 'KR' },
      { role: 'Mid', ign: 'Zeka', name: 'Kim Geon-woo', nationality: 'KR' },
      { role: 'ADC', ign: 'Viper', name: 'Park Do-hyeon', nationality: 'KR' },
      { role: 'Support', ign: 'Delight', name: 'Yoo Hwan-joong', nationality: 'KR' },
      { role: 'Coach', ign: 'DanDy', name: 'Choi In-kyu', nationality: 'KR' }
    ],
    achievements: ['LCK 2026 Summer Runners-up', 'LCK 2024 Summer Champions']
  },
  {
    name: 'T1',
    short_name: 'T1',
    region: 'LCK',
    standing_summer: 3,
    logo_url: 'https://liquipedia.net/commons/images/thumb/8/86/T1_2019_allmode.png/300px-T1_2019_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt0a8f760233ea5aa7/6446a8bf80bc4a1103f67ba0/T1_Header.jpg',
    description: 'The most storied organization in League of Legends history, led by the legendary Unkillable Demon King, Faker.',
    roster: [
      { role: 'Top', ign: 'Doran', name: 'Choi Hyeon-joon', nationality: 'KR' },
      { role: 'Jungle', ign: 'Oner', name: 'Mun Hyeon-jun', nationality: 'KR' },
      { role: 'Mid', ign: 'Faker', name: 'Lee Sang-hyeok', nationality: 'KR' },
      { role: 'ADC', ign: 'Gumayusi', name: 'Lee Min-hyeong', nationality: 'KR' },
      { role: 'Support', ign: 'Keria', name: 'Ryu Min-seok', nationality: 'KR' },
      { role: 'Coach', ign: 'kkOma', name: 'Kim Jeong-gyun', nationality: 'KR' }
    ],
    achievements: ['Worlds 2023 Champions', 'Worlds 2024 Champions', '5x World Champions']
  },
  {
    name: 'Dplus KIA',
    short_name: 'DK',
    region: 'LCK',
    standing_summer: 4,
    logo_url: 'https://liquipedia.net/commons/images/thumb/7/77/Dplus_KIA_allmode.png/300px-Dplus_KIA_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt8efbc554580fa9aa/6446a8b413b1fc110901e96f/DK_Header.jpg',
    description: 'Former World Champions known for dynamic mid-jungle synergy spearheaded by franchise superstar ShowMaker.',
    roster: [
      { role: 'Top', ign: 'Siwoo', name: 'Jeon Si-woo', nationality: 'KR' },
      { role: 'Jungle', ign: 'Lucid', name: 'Choi Yong-hyeok', nationality: 'KR' },
      { role: 'Mid', ign: 'ShowMaker', name: 'Heo Su', nationality: 'KR' },
      { role: 'ADC', ign: 'Aiming', name: 'Kim Ha-ram', nationality: 'KR' },
      { role: 'Support', ign: 'BeryL', name: 'Cho Geon-hee', nationality: 'KR' },
      { role: 'Coach', ign: 'Bengi', name: 'Bae Seong-woong', nationality: 'KR' }
    ],
    achievements: ['Worlds 2020 Champions', '3x LCK Champions']
  },
  {
    name: 'KT Rolster',
    short_name: 'KT',
    region: 'LCK',
    standing_summer: 5,
    logo_url: 'https://liquipedia.net/commons/images/thumb/4/4e/KT_Rolster_allmode.png/300px-KT_Rolster_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt56da3fae214d009d/6446a8bb48db2c110915f7ce/KT_Header.jpg',
    description: 'One of the founding telecoms of Korean esports, famous for thrilling "Rolstercoaster" performances.',
    roster: [
      { role: 'Top', ign: 'PerfecT', name: 'Lee Seung-min', nationality: 'KR' },
      { role: 'Jungle', ign: 'Cuzz', name: 'Moon Woo-chan', nationality: 'KR' },
      { role: 'Mid', ign: 'Bdd', name: 'Gwak Bo-seong', nationality: 'KR' },
      { role: 'ADC', ign: 'deokdam', name: 'Seo Dae-gil', nationality: 'KR' },
      { role: 'Support', ign: 'Peter', name: 'Jeong Yoon-su', nationality: 'KR' },
      { role: 'Coach', ign: 'Score', name: 'Go Dong-bin', nationality: 'KR' }
    ],
    achievements: ['LCK Summer 2018 Champions', 'Worlds 2023 Quarterfinalists']
  },
  {
    name: 'BNK FEARX',
    short_name: 'FOX',
    region: 'LCK',
    standing_summer: 6,
    logo_url: 'https://liquipedia.net/commons/images/thumb/3/30/BNK_FearX_allmode.png/300px-BNK_FearX_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt6d5a15998a442d87/6446a8b8981f42110c71e2ef/LSB_Header.jpg',
    description: 'A young and fearless Korean squad known for high tempo teamfights and upset potential against top dogs.',
    roster: [
      { role: 'Top', ign: 'Clear', name: 'Song Hyeon-min', nationality: 'KR' },
      { role: 'Jungle', ign: 'Raptor', name: 'Jeon Eo-jin', nationality: 'KR' },
      { role: 'Mid', ign: 'Clozer', name: 'Lee Ju-hyeon', nationality: 'KR' },
      { role: 'ADC', ign: 'Diable', name: 'Nam Dae-haeng', nationality: 'KR' },
      { role: 'Support', ign: 'Kellin', name: 'Kim Hyeong-gyu', nationality: 'KR' },
      { role: 'Coach', ign: 'Ryu', name: 'Ryu Sang-wook', nationality: 'KR' }
    ],
    achievements: ['LCK 2026 Summer Playoff Contenders', 'Regional Qualifier Finalists']
  },

  // LPL (China)
  {
    name: "Anyone's Legend",
    short_name: 'AL',
    region: 'LPL',
    standing_summer: 1,
    logo_url: 'https://liquipedia.net/commons/images/thumb/5/52/Anyone%27s_Legend_allmode.png/300px-Anyone%27s_Legend_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LPL_Default_Header.jpg',
    description: 'The miracle team of the 2026 season, rising from underdogs to capture the prestigious LPL 2026 Summer Championship.',
    roster: [
      { role: 'Top', ign: 'Ale', name: 'Hu Jia-Le', nationality: 'CN' },
      { role: 'Jungle', ign: 'Croco', name: 'Kim Dong-beom', nationality: 'KR' },
      { role: 'Mid', ign: 'Shanks', name: 'Cui Xiao-Jun', nationality: 'CN' },
      { role: 'ADC', ign: 'Hope', name: 'Wang Jie', nationality: 'CN' },
      { role: 'Support', ign: 'Kael', name: 'Kim Jin-hong', nationality: 'KR' },
      { role: 'Coach', ign: 'Tabe', name: 'Wong Pak Kan', nationality: 'HK' }
    ],
    achievements: ['LPL 2026 Split 3 Champions', 'Worlds 2026 #1 LPL Seed']
  },
  {
    name: 'Bilibili Gaming',
    short_name: 'BLG',
    region: 'LPL',
    standing_summer: 2,
    logo_url: 'https://liquipedia.net/commons/images/thumb/4/4b/Bilibili_Gaming_allmode.png/300px-Bilibili_Gaming_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt9c4ba3f07a4a9840/6446a8b348db2c110915f7c8/BLG_Header.jpg',
    description: 'A titan in the Chinese league featuring high-octane mechanical geniuses across all five roles.',
    roster: [
      { role: 'Top', ign: 'Bin', name: 'Chen Ze-Bin', nationality: 'CN' },
      { role: 'Jungle', ign: 'Wei', name: 'Yan Yang-Wei', nationality: 'CN' },
      { role: 'Mid', ign: 'knight', name: 'Zhuo Ding', nationality: 'CN' },
      { role: 'ADC', ign: 'Elk', name: 'Zhao Jia-Hao', nationality: 'CN' },
      { role: 'Support', ign: 'ON', name: 'Luo Wen-Jun', nationality: 'CN' },
      { role: 'Coach', ign: 'BigWei', name: 'Fu Chien-Wei', nationality: 'TW' }
    ],
    achievements: ['LPL 2024 Spring & Summer Champions', 'MSI 2024 Finalists', 'Worlds 2024 Finalists']
  },
  {
    name: 'Top Esports',
    short_name: 'TES',
    region: 'LPL',
    standing_summer: 3,
    logo_url: 'https://liquipedia.net/commons/images/thumb/7/77/Top_Esports_allmode.png/300px-Top_Esports_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt5bebb6937190e29b/6446a8bf2b39ba11019a7ee3/TES_Header.jpg',
    description: 'Powerhouse Chinese team featuring superstar carry JackeyLove and top-tier laners.',
    roster: [
      { role: 'Top', ign: '369', name: 'Bai Jia-Hao', nationality: 'CN' },
      { role: 'Jungle', ign: 'Tian', name: 'Gao Tian-Peng', nationality: 'CN' },
      { role: 'Mid', ign: 'Creme', name: 'Lin Jian', nationality: 'CN' },
      { role: 'ADC', ign: 'JackeyLove', name: 'Yu Wen-Bo', nationality: 'CN' },
      { role: 'Support', ign: 'Meiko', name: 'Tian Ye', nationality: 'CN' },
      { role: 'Coach', ign: 'Despa1r', name: 'Zhou Peng', nationality: 'CN' }
    ],
    achievements: ['MSC 2020 Champions', 'LPL 2020 Summer Champions', 'Worlds 2024 Quarterfinalists']
  },
  {
    name: 'Invictus Gaming',
    short_name: 'IG',
    region: 'LPL',
    standing_summer: 4,
    logo_url: 'https://liquipedia.net/commons/images/thumb/e/e4/Invictus_Gaming_allmode.png/300px-Invictus_Gaming_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt3f4ad691d51c099c/6446a8ba48db2c110915f7cc/IG_Header.jpg',
    description: "China's first-ever World Championship organization, experiencing a fierce resurgence in Season 2026.",
    roster: [
      { role: 'Top', ign: 'YSKM', name: 'Chau Shu-tak', nationality: 'HK' },
      { role: 'Jungle', ign: 'gluer', name: 'Gao Ling', nationality: 'CN' },
      { role: 'Mid', ign: 'Rookie', name: 'Song Eui-jin', nationality: 'KR' },
      { role: 'ADC', ign: 'Ahn', name: 'An Shan-ye', nationality: 'CN' },
      { role: 'Support', ign: 'Baolan', name: 'Wang Liu-Yi', nationality: 'CN' },
      { role: 'Coach', ign: 'Mafa', name: 'Won Sang-yeon', nationality: 'KR' }
    ],
    achievements: ['Worlds 2018 Champions', 'LPL Spring 2019 Champions']
  },
  {
    name: 'Team WE',
    short_name: 'WE',
    region: 'LPL',
    standing_summer: 5,
    logo_url: 'https://liquipedia.net/commons/images/thumb/8/87/Team_WE_allmode.png/300px-Team_WE_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt49e29548f070cb1b/6446a8bf80bc4a1103f67ba2/WE_Header.jpg',
    description: 'One of the historic grandfathers of Chinese esports with a storied legacy dating back to the dawn of League of Legends.',
    roster: [
      { role: 'Top', ign: 'Wayward', name: 'Huang Ren-Xing', nationality: 'CN' },
      { role: 'Jungle', ign: 'Heng', name: 'Yang Cui-Chen', nationality: 'CN' },
      { role: 'Mid', ign: 'FoFo', name: 'Chu Chun-Lan', nationality: 'TW' },
      { role: 'ADC', ign: 'Able', name: 'Dai Zhi-Chun', nationality: 'CN' },
      { role: 'Support', ign: 'Iwandy', name: 'Liao Ding-Yang', nationality: 'CN' },
      { role: 'Coach', ign: 'WarHorse', name: 'Chen Ju-Chih', nationality: 'TW' }
    ],
    achievements: ['IPL 5 Champions', 'LPL 2017 Spring Champions']
  },
  {
    name: 'JD Gaming',
    short_name: 'JDG',
    region: 'LPL',
    standing_summer: 6,
    logo_url: 'https://liquipedia.net/commons/images/thumb/a/a5/JD_Gaming_allmode.png/300px-JD_Gaming_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt56da3fae214d009d/6446a8bb48db2c110915f7ce/JDG_Header.jpg',
    description: 'A modern powerhouse renowned for elite teamfight coordination and strategic depth.',
    roster: [
      { role: 'Top', ign: 'Flandre', name: 'Li Xuan-Jun', nationality: 'CN' },
      { role: 'Jungle', ign: 'Kanavi', name: 'Seo Jin-hyeok', nationality: 'KR' },
      { role: 'Mid', ign: 'Yagao', name: 'Zeng Qi', nationality: 'CN' },
      { role: 'ADC', ign: 'Scout', name: 'Lee Ye-chan', nationality: 'KR' },
      { role: 'Support', ign: 'MISSING', name: 'Lou Yun-Feng', nationality: 'CN' },
      { role: 'Coach', ign: 'Homme', name: 'Yoon Sung-young', nationality: 'KR' }
    ],
    achievements: ['MSI 2023 Champions', '4x LPL Champions']
  },

  // LEC (Europe)
  {
    name: 'G2 Esports',
    short_name: 'G2',
    region: 'LEC',
    standing_summer: 1,
    logo_url: 'https://liquipedia.net/commons/images/thumb/7/77/G2_Esports_allmode.png/300px-G2_Esports_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blta5a4855fe1b1f8fa/6446a8b69b8e8411082c5f0f/G2_Header.jpg',
    description: 'The undisputed kings of European League of Legends, celebrated worldwide for their creative drafts and swagger.',
    roster: [
      { role: 'Top', ign: 'BrokenBlade', name: 'Sergen Çelik', nationality: 'DE' },
      { role: 'Jungle', ign: 'SkewMond', name: 'Rudy Semaan', nationality: 'FR' },
      { role: 'Mid', ign: 'Caps', name: 'Rasmus Winther', nationality: 'DK' },
      { role: 'ADC', ign: 'Hans Sama', name: 'Steven Liv', nationality: 'FR' },
      { role: 'Support', ign: 'Labrov', name: 'Labros Papoutsakis', nationality: 'GR' },
      { role: 'Coach', ign: 'Dylan Falco', name: 'Dylan Falco', nationality: 'CA' }
    ],
    achievements: ['15x LEC Champions', 'MSI 2019 Champions', 'LEC 2026 Summer Champions']
  },
  {
    name: 'Movistar KOI',
    short_name: 'MKOI',
    region: 'LEC',
    standing_summer: 2,
    logo_url: 'https://liquipedia.net/commons/images/thumb/b/b3/Movistar_KOI_allmode.png/300px-Movistar_KOI_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt29aa639992383cbb/6446a8bb13b1fc110901e977/KOI_Header.jpg',
    description: 'A passionate Spanish-led organization backed by Ibai Llanos, combining high energy with tactical discipline.',
    roster: [
      { role: 'Top', ign: 'Myrwn', name: 'Alex Pastor Villarejo', nationality: 'ES' },
      { role: 'Jungle', ign: 'Elyoya', name: 'Javier Prades Batalla', nationality: 'ES' },
      { role: 'Mid', ign: 'Jojopyun', name: 'Joseph Joon Pyun', nationality: 'CA' },
      { role: 'ADC', ign: 'Supa', name: 'David Martínez García', nationality: 'ES' },
      { role: 'Support', ign: 'Alvaro', name: 'Álvaro Fernández del Amo', nationality: 'ES' },
      { role: 'Coach', ign: 'Melzhet', name: 'Tomás Campelos Fernández', nationality: 'ES' }
    ],
    achievements: ['LEC 2026 Summer Finalists', 'LEC 2024 Season Finalists']
  },
  {
    name: 'Karmine Corp',
    short_name: 'KC',
    region: 'LEC',
    standing_summer: 3,
    logo_url: 'https://liquipedia.net/commons/images/thumb/7/7b/Karmine_Corp_allmode.png/300px-Karmine_Corp_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt0c8df6343516aa8d/6446a8ba48db2c110915f7ca/KC_Header.jpg',
    description: 'France’s ultra-popular powerhouse with the passionate "Blue Wall" fanbase, driven by rising superstar Caliste.',
    roster: [
      { role: 'Top', ign: 'Canna', name: 'Kim Chang-dong', nationality: 'KR' },
      { role: 'Jungle', ign: 'Closer', name: 'Can Çelik', nationality: 'TR' },
      { role: 'Mid', ign: 'Vetheo', name: 'Vincent Berrié', nationality: 'FR' },
      { role: 'ADC', ign: 'Caliste', name: 'Caliste Henry-Hennebert', nationality: 'FR' },
      { role: 'Support', ign: 'Targamas', name: 'Raphaël Crabbé', nationality: 'BE' },
      { role: 'Coach', ign: 'Reeker', name: 'Steven Chen', nationality: 'DE' }
    ],
    achievements: ['4x EMEA Masters Champions', 'LEC 2026 Summer 3rd Place']
  },
  {
    name: 'Natus Vincere',
    short_name: 'NAVI',
    region: 'LEC',
    standing_summer: 4,
    logo_url: 'https://liquipedia.net/commons/images/thumb/8/87/Natus_Vincere_2021_allmode.png/300px-Natus_Vincere_2021_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blta5a4855fe1b1f8fa/6446a8b69b8e8411082c5f0f/NAVI_Header.jpg',
    description: 'Legendary global esports brand that joined the LEC in Season 2026, quickly establishing an aggressive presence.',
    roster: [
      { role: 'Top', ign: 'Wunder', name: 'Martin Hansen', nationality: 'DK' },
      { role: 'Jungle', ign: 'Malrang', name: 'Kim Geun-seong', nationality: 'KR' },
      { role: 'Mid', ign: 'Larssen', name: 'Emil Larsson', nationality: 'SE' },
      { role: 'ADC', ign: 'Comp', name: 'Markos Stamkopoulos', nationality: 'GR' },
      { role: 'Support', ign: 'Trymbi', name: 'Adrian Trybus', nationality: 'PL' },
      { role: 'Coach', ign: 'YamatoCannon', name: 'Jakob Mebdi', nationality: 'SE' }
    ],
    achievements: ['LEC 2026 Top 4 Finisher', 'Global Tier-1 Organization']
  },
  {
    name: 'Team Vitality',
    short_name: 'VIT',
    region: 'LEC',
    standing_summer: 5,
    logo_url: 'https://liquipedia.net/commons/images/thumb/7/77/Team_Vitality_allmode.png/300px-Team_Vitality_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltf8db692b1574da9e/6446a8bf80bc4a1103f67ba4/VIT_Header.jpg',
    description: 'French organization famed for explosive mechanics and proactive playmaking in early games.',
    roster: [
      { role: 'Top', ign: 'Photon', name: 'Kyeong Gyu-tae', nationality: 'KR' },
      { role: 'Jungle', ign: 'Lyncas', name: 'Linas Nauncikas', nationality: 'LT' },
      { role: 'Mid', ign: 'Czajek', name: 'Mateusz Czajka', nationality: 'PL' },
      { role: 'ADC', ign: 'Carzzy', name: 'Matyáš Orság', nationality: 'CZ' },
      { role: 'Support', ign: 'Hylissang', name: 'Zdravets Galabov', nationality: 'BG' },
      { role: 'Coach', ign: 'Carter', name: 'Alexander Cartwright', nationality: 'UK' }
    ],
    achievements: ['LEC 2026 Summer Playoff Team', 'Multiple Worlds Appearances']
  },
  {
    name: 'Fnatic',
    short_name: 'FNC',
    region: 'LEC',
    standing_summer: 6,
    logo_url: 'https://liquipedia.net/commons/images/thumb/2/25/Fnatic_2020_allmode.png/300px-Fnatic_2020_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltbb4b553c5f4fa6e8/6446a8b548db2c110915f7c6/FNC_Header.jpg',
    description: 'The inaugural Season 1 World Champions and perennial European contender with an orange-and-black army.',
    roster: [
      { role: 'Top', ign: 'Oscarinin', name: 'Óscar Muñoz Jiménez', nationality: 'ES' },
      { role: 'Jungle', ign: 'Razork', name: 'Iván Martín Díaz', nationality: 'ES' },
      { role: 'Mid', ign: 'Humanoid', name: 'Marek Brázda', nationality: 'CZ' },
      { role: 'ADC', ign: 'Noah', name: 'Oh Hyeon-taek', nationality: 'KR' },
      { role: 'Support', ign: 'Jun', name: 'Yoon Se-jun', nationality: 'KR' },
      { role: 'Coach', ign: 'Nightshare', name: 'Tomáš Kněžínek', nationality: 'CZ' }
    ],
    achievements: ['Worlds Season 1 Champions', '7x LEC Champions']
  },

  // LCS (North America)
  {
    name: 'Team Liquid',
    short_name: 'TL',
    region: 'LCS',
    standing_summer: 1,
    logo_url: 'https://liquipedia.net/commons/images/thumb/8/87/Team_Liquid_2023_allmode.png/300px-Team_Liquid_2023_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt49e29548f070cb1b/6446a8bf80bc4a1103f67ba2/TL_Header.jpg',
    description: 'The undisputed giants of North American League of Legends, clinching the LCS 2026 Summer Championship.',
    roster: [
      { role: 'Top', ign: 'Impact', name: 'Jeong Eon-young', nationality: 'KR' },
      { role: 'Jungle', ign: 'UmTi', name: 'Eom Seong-hyeon', nationality: 'KR' },
      { role: 'Mid', ign: 'APA', name: 'Eain Stearns', nationality: 'US' },
      { role: 'ADC', ign: 'Yeon', name: 'Sean Sung', nationality: 'US' },
      { role: 'Support', ign: 'CoreJJ', name: 'Jo Yong-in', nationality: 'KR' },
      { role: 'Coach', ign: 'Spawn', name: 'Jake Tiberi', nationality: 'AU' }
    ],
    achievements: ['LCS 2026 Summer Champions', 'LCS 2024 Spring Champions', '5x LCS Champions']
  },
  {
    name: 'LYON',
    short_name: 'LYON',
    region: 'LCS',
    standing_summer: 2,
    logo_url: 'https://liquipedia.net/commons/images/thumb/7/74/LYON_allmode.png/300px-LYON_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LCS_Default_Header.jpg',
    description: 'The powerhouse Latin American union team, stunning North America by taking 2nd place in the LCS 2026 Summer Split.',
    roster: [
      { role: 'Top', ign: 'Summit', name: 'Park Woo-tae', nationality: 'KR' },
      { role: 'Jungle', ign: 'Oddie', name: 'Sebastián Niño', nationality: 'PE' },
      { role: 'Mid', ign: 'Keine', name: 'Kim Joon-cheol', nationality: 'KR' },
      { role: 'ADC', ign: 'Ceo', name: 'Lorenzo Tévez', nationality: 'AR' },
      { role: 'Support', ign: 'Lyonz', name: 'Pedro Peralta', nationality: 'AR' },
      { role: 'Coach', ign: 'Khynm', name: 'Gonzalo Alonso', nationality: 'AR' }
    ],
    achievements: ['LCS 2026 Summer Finalists', 'Worlds 2026 Qualified']
  },
  {
    name: 'Cloud9',
    short_name: 'C9',
    region: 'LCS',
    standing_summer: 3,
    logo_url: 'https://liquipedia.net/commons/images/thumb/6/66/Cloud9_2023_allmode.png/300px-Cloud9_2023_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt49b5d38fffa0599a/6446a8b79b8e8411082c5f11/C9_Header.jpg',
    description: 'North America’s most historically successful international organization, defined by aggressive jungle pathing.',
    roster: [
      { role: 'Top', ign: 'Thanatos', name: 'Park Seung-gyu', nationality: 'KR' },
      { role: 'Jungle', ign: 'Blaber', name: 'Robert Huang', nationality: 'US' },
      { role: 'Mid', ign: 'Jensen', name: 'Nicolaj Jensen', nationality: 'DK' },
      { role: 'ADC', ign: 'Berserker', name: 'Kim Min-cheol', nationality: 'KR' },
      { role: 'Support', ign: 'Vulcan', name: 'Philippe Laflamme', nationality: 'CA' },
      { role: 'Coach', ign: 'Reapered', name: 'Han Gyu-ung', nationality: 'KR' }
    ],
    achievements: ['6x LCS Champions', 'Worlds 2018 Semifinalists']
  },
  {
    name: 'Sentinels',
    short_name: 'SEN',
    region: 'LCS',
    standing_summer: 4,
    logo_url: 'https://liquipedia.net/commons/images/thumb/4/41/Sentinels_allmode.png/300px-Sentinels_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt0a8f760233ea5aa7/6446a8bf80bc4a1103f67ba0/SEN_Header.jpg',
    description: 'Iconic North American lifestyle and esports brand, storming into the LCS in 2026 with a hungry roster.',
    roster: [
      { role: 'Top', ign: 'Sniper', name: 'Fahad Shirani', nationality: 'US' },
      { role: 'Jungle', ign: 'River', name: 'Kim Dong-woo', nationality: 'KR' },
      { role: 'Mid', ign: 'Quid', name: 'Lim Hyeon-seung', nationality: 'KR' },
      { role: 'ADC', ign: 'Danny', name: 'Kyle Sakamaki', nationality: 'US' },
      { role: 'Support', ign: 'Busio', name: 'Alan Cwalina', nationality: 'US' },
      { role: 'Coach', ign: 'Goldenglue', name: 'Greyson Gilmer', nationality: 'US' }
    ],
    achievements: ['LCS 2026 Top 4 Playoff Finish', 'Major NA Esports Brand']
  },
  {
    name: 'FlyQuest',
    short_name: 'FLY',
    region: 'LCS',
    standing_summer: 5,
    logo_url: 'https://liquipedia.net/commons/images/thumb/8/87/FlyQuest_2023_allmode.png/300px-FlyQuest_2023_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt8efbc554580fa9aa/6446a8b413b1fc110901e96f/FLY_Header.jpg',
    description: 'The green team that took Gen.G to game 5 at Worlds 2024, playing an innovative and team-first playstyle.',
    roster: [
      { role: 'Top', ign: 'Bwipo', name: 'Gabriël Rau', nationality: 'BE' },
      { role: 'Jungle', ign: 'Inspired', name: 'Kacper Słoma', nationality: 'PL' },
      { role: 'Mid', ign: 'Quad', name: 'Song Su-hyeong', nationality: 'KR' },
      { role: 'ADC', ign: 'Massu', name: 'Fahamin Abdul', nationality: 'CA' },
      { role: 'Support', ign: 'Chime', name: 'Jonathan Pomponio', nationality: 'US' },
      { role: 'Coach', ign: 'Nukeduck', name: 'Erlend Våtevik Holm', nationality: 'NO' }
    ],
    achievements: ['LCS 2024 Summer Champions', 'Worlds 2024 Top 8']
  },
  {
    name: 'Shopify Rebellion',
    short_name: 'SR',
    region: 'LCS',
    standing_summer: 6,
    logo_url: 'https://liquipedia.net/commons/images/thumb/7/7b/Shopify_Rebellion_allmode.png/300px-Shopify_Rebellion_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt56da3fae214d009d/6446a8bb48db2c110915f7ce/SR_Header.jpg',
    description: 'Ambitious organization dedicated to cultivating top mechanical talent and competitive edge.',
    roster: [
      { role: 'Top', ign: 'FakeGod', name: 'Aaron Lee', nationality: 'US' },
      { role: 'Jungle', ign: 'Bugi', name: 'Lee Seong-yeop', nationality: 'KR' },
      { role: 'Mid', ign: 'Insanity', name: 'David Challe', nationality: 'US' },
      { role: 'ADC', ign: 'Bvoy', name: 'Ju Yeong-hoon', nationality: 'KR' },
      { role: 'Support', ign: 'Zeyzal', name: 'Tristan Stidam', nationality: 'US' },
      { role: 'Coach', ign: 'Reven', name: 'Seong Sang-hyeon', nationality: 'KR' }
    ],
    achievements: ['LCS 2026 Playoff Contender']
  },

  // CBLOL (Brazil)
  {
    name: 'paiN Gaming',
    short_name: 'PNG',
    region: 'CBLOL',
    standing_summer: 1,
    logo_url: 'https://liquipedia.net/commons/images/thumb/8/86/PaiN_Gaming_2021_allmode.png/300px-PaiN_Gaming_2021_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt6d5a15998a442d87/6446a8b8981f42110c71e2ef/PNG_Header.jpg',
    description: 'The undisputed kings of Brazilian League of Legends, celebrated for immense fan loyalty and high aggression.',
    roster: [
      { role: 'Top', ign: 'Wizer', name: 'Choi Ui-seok', nationality: 'KR' },
      { role: 'Jungle', ign: 'CarioK', name: 'Marcos Santos de Oliveira', nationality: 'BR' },
      { role: 'Mid', ign: 'dyNquedo', name: 'Matheus Rossini Miranda', nationality: 'BR' },
      { role: 'ADC', ign: 'TitaN', name: 'Alexandre Lima dos Santos', nationality: 'BR' },
      { role: 'Support', ign: 'Kuri', name: 'Choi Won-yeong', nationality: 'KR' },
      { role: 'Coach', ign: 'Xiris', name: 'Sin Hyeok', nationality: 'KR' }
    ],
    achievements: ['CBLOL 2026 Split 2 Champions', '4x CBLOL Champions', 'Worlds 2024 Swiss Stage']
  },
  {
    name: 'LOUD',
    short_name: 'LLL',
    region: 'CBLOL',
    standing_summer: 2,
    logo_url: 'https://liquipedia.net/commons/images/thumb/e/e4/LOUD_allmode.png/300px-LOUD_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte811fc7b1652fbb6/6446a8b7389c921107c126d4/LOUD_Header.jpg',
    description: 'Brazil’s biggest cultural phenomenon and 4-time consecutive CBLOL champions.',
    roster: [
      { role: 'Top', ign: 'Robo', name: 'Leonardo Souza', nationality: 'BR' },
      { role: 'Jungle', ign: 'Croc', name: 'Park Jong-hoon', nationality: 'KR' },
      { role: 'Mid', ign: 'Tinowns', name: 'Thiago Sartori', nationality: 'BR' },
      { role: 'ADC', ign: 'Route', name: 'Moon Geom-su', nationality: 'KR' },
      { role: 'Support', ign: 'RedBert', name: 'Ygor Freitas', nationality: 'BR' },
      { role: 'Coach', ign: 'Stardust', name: 'Son Suk-hee', nationality: 'KR' }
    ],
    achievements: ['4x Consecutive CBLOL Champions (2022-2024)', 'CBLOL 2026 Split 2 Finalists']
  },
  {
    name: 'Keyd Stars',
    short_name: 'VKS',
    region: 'CBLOL',
    standing_summer: 3,
    logo_url: 'https://liquipedia.net/commons/images/thumb/7/7b/Vivo_Keyd_Stars_allmode.png/300px-Vivo_Keyd_Stars_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt9c4ba3f07a4a9840/6446a8b348db2c110915f7c8/VKS_Header.jpg',
    description: 'Historic Brazilian organization recognized for disciplined tactical structure and veteran experience.',
    roster: [
      { role: 'Top', ign: 'Guigo', name: 'Guilherme Ruiz', nationality: 'BR' },
      { role: 'Jungle', ign: 'Dis契ter', name: 'Pedro Henrique', nationality: 'BR' },
      { role: 'Mid', ign: 'Leleko', name: 'Alexandre Santoro', nationality: 'BR' },
      { role: 'ADC', ign: 'SMILEY', name: 'Ludvig Granquist', nationality: 'SE' },
      { role: 'Support', ign: 'ProDelta', name: 'Gabriel Rossi', nationality: 'BR' },
      { role: 'Coach', ign: 'SeeEl', name: 'Christopher Lee', nationality: 'UK' }
    ],
    achievements: ['CBLOL 2026 Split 2 3rd Place', 'CBLOL 2014 Champions']
  },
  {
    name: 'RED Canids',
    short_name: 'RED',
    region: 'CBLOL',
    standing_summer: 4,
    logo_url: 'https://liquipedia.net/commons/images/thumb/5/52/RED_Canids_allmode.png/300px-RED_Canids_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt5bebb6937190e29b/6446a8bf2b39ba11019a7ee3/RED_Header.jpg',
    description: 'The fierce Red Pack, known for explosive teamfighting and clutch playoff runs.',
    roster: [
      { role: 'Top', ign: 'fNb', name: 'Francisco Natanael', nationality: 'BR' },
      { role: 'Jungle', ign: 'Aegis', name: 'Gabriel Lemos', nationality: 'BR' },
      { role: 'Mid', ign: 'Grevthar', name: 'Daniel Xavier', nationality: 'BR' },
      { role: 'ADC', ign: 'Brance', name: 'Diego Amaral', nationality: 'BR' },
      { role: 'Support', ign: 'Frosty', name: 'Pedro Rossi', nationality: 'BR' },
      { role: 'Coach', ign: 'Coelho', name: 'Calisto Coelho', nationality: 'BR' }
    ],
    achievements: ['3x CBLOL Champions', 'MSI 2022 Competitor']
  },
  {
    name: 'FURIA',
    short_name: 'FUR',
    region: 'CBLOL',
    standing_summer: 5,
    logo_url: 'https://liquipedia.net/commons/images/thumb/6/69/FURIA_Esports_allmode.png/300px-FURIA_Esports_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt3f4ad691d51c099c/6446a8ba48db2c110915f7cc/FUR_Header.jpg',
    description: 'The black-and-white panther of Brazilian esports with high mechanical talent across all lines.',
    roster: [
      { role: 'Top', ign: 'Zwyroo', name: 'Artur Trojan', nationality: 'PL' },
      { role: 'Jungle', ign: 'Tutsz', name: 'Arthur Machado', nationality: 'BR' },
      { role: 'Mid', ign: 'Ayu', name: 'Andrey Saraiva', nationality: 'BR' },
      { role: 'ADC', ign: 'Rav3n', name: 'Lucas Rossi', nationality: 'BR' },
      { role: 'Support', ign: 'Jojo', name: 'Gabriel Dzelme', nationality: 'BR' },
      { role: 'Coach', ign: 'Maestro', name: 'Lucas Pierre', nationality: 'BR' }
    ],
    achievements: ['CBLOL 2026 Playoff Squad', 'Tier-1 Global Brand']
  },
  {
    name: 'LOS',
    short_name: 'LOS',
    region: 'CBLOL',
    standing_summer: 6,
    logo_url: 'https://liquipedia.net/commons/images/thumb/7/77/LOS_allmode.png/300px-LOS_allmode.png',
    banner_url: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt49e29548f070cb1b/6446a8bf80bc4a1103f67ba2/LOS_Header.jpg',
    description: 'Formerly Los Grandes, a dynamic organization committed to developing Latin American talent.',
    roster: [
      { role: 'Top', ign: 'Boal', name: 'Felipe Boal', nationality: 'BR' },
      { role: 'Jungle', ign: 'Seize', name: 'Kim Chan-hee', nationality: 'KR' },
      { role: 'Mid', ign: 'Envy', name: 'Lee Kang-jae', nationality: 'KR' },
      { role: 'ADC', ign: 'Netuno', name: 'Matheus de Oliveira', nationality: 'BR' },
      { role: 'Support', ign: 'Kabbie', name: 'Jeong Sang-hyeon', nationality: 'KR' },
      { role: 'Coach', ign: 'Stepz', name: 'Tiago Dias', nationality: 'PT' }
    ],
    achievements: ['CBLOL 2026 Top 6 Finish']
  }
]

async function seed() {
  console.log('Seeding 30 teams to Supabase...')
  // Clear old teams
  await supabase.from('matches').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('favorites').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('teams').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  const { data: insertedTeams, error: teamErr } = await supabase
    .from('teams')
    .insert(teamsData)
    .select()

  if (teamErr) {
    console.error('Error inserting teams:', teamErr)
    return
  }
  console.log(`Inserted ${insertedTeams.length} teams successfully!`)

  // Create Sample Match Schedule & Drafts between top teams
  const findTeam = (sName) => insertedTeams.find(t => t.short_name === sName)?.id

  const sampleMatches = [
    // LCK Finals
    {
      league: 'LCK',
      team1_id: findTeam('GEN'),
      team2_id: findTeam('HLE'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-09-13T08:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Chovy (Yone)',
      draft: {
        team1_bans: ['Ashe', 'Skarner', 'Aurora', 'Vi', 'Jax'],
        team1_picks: ['Yone', 'Sejuani', 'Varus', 'Braum', 'K\'Sante'],
        team2_bans: ['Kalista', 'Rumble', 'Renata Glasc', 'Poppy', 'Ahri'],
        team2_picks: ['Smolder', 'Maokai', 'Ezreal', 'Rell', 'Gnar']
      }
    },
    // LPL Finals
    {
      league: 'LPL',
      team1_id: findTeam('AL'),
      team2_id: findTeam('BLG'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-09-14T09:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Shanks (Syndra)',
      draft: {
        team1_bans: ['Jax', 'Kalista', 'Orianna', 'Nautilus', 'Leona'],
        team1_picks: ['Syndra', 'Xin Zhao', 'Kai\'Sa', 'Rell', 'Camille'],
        team2_bans: ['Aurora', 'Ashe', 'Renata Glasc', 'Sylas', 'Viego'],
        team2_picks: ['Ahri', 'Jarvan IV', 'Xayah', 'Rakan', 'Renekton']
      }
    },
    // LEC Finals
    {
      league: 'LEC',
      team1_id: findTeam('G2'),
      team2_id: findTeam('MKOI'),
      team1_score: 3,
      team2_score: 0,
      status: 'finished',
      match_date: '2026-09-20T16:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Caps (LeBlanc)',
      draft: {
        team1_bans: ['Poppy', 'Skarner', 'Ashe', 'Lucian', 'Nami'],
        team1_picks: ['LeBlanc', 'Nocturne', 'Jhin', 'Braum', 'Galio'],
        team2_bans: ['Kalista', 'Yone', 'Aurora', 'Alistar', 'Vi'],
        team2_picks: ['Taliyah', 'Sejuani', 'Varus', 'Rell', 'K\'Sante']
      }
    },
    // LCS Finals
    {
      league: 'LCS',
      team1_id: findTeam('TL'),
      team2_id: findTeam('LYON'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-10-04T20:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'APA (Ziggs)',
      draft: {
        team1_bans: ['Aurora', 'Skarner', 'Ashe', 'Jayce', 'Rumble'],
        team1_picks: ['Ziggs', 'Jarvan IV', 'Kalista', 'Renata Glasc', 'K\'Sante'],
        team2_bans: ['Yone', 'Varus', 'Poppy', 'Aurelion Sol', 'Jax'],
        team2_picks: ['Corki', 'Sejuani', 'Ezreal', 'Leona', 'Gnar']
      }
    },
    // CBLOL Finals
    {
      league: 'CBLOL',
      team1_id: findTeam('PNG'),
      team2_id: findTeam('LLL'),
      team1_score: 3,
      team2_score: 2,
      status: 'finished',
      match_date: '2026-09-07T16:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'TitaN (Draven)',
      draft: {
        team1_bans: ['Skarner', 'Yone', 'Aurora', 'Poppy', 'Vi'],
        team1_picks: ['Draven', 'Nautilus', 'Akali', 'Xin Zhao', 'Aatrox'],
        team2_bans: ['Kalista', 'Ashe', 'Renata Glasc', 'Sylas', 'Rell'],
        team2_picks: ['Kai\'Sa', 'Rell', 'Ahri', 'Sejuani', 'Renekton']
      }
    },
    // Worlds 2026 Blockbusters (Upcoming / Live)
    {
      league: 'Worlds',
      team1_id: findTeam('T1'),
      team2_id: findTeam('BLG'),
      team1_score: 1,
      team2_score: 1,
      status: 'live',
      match_date: new Date(Date.now() - 3600000).toISOString(),
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: null,
      draft: {
        team1_bans: ['Skarner', 'Jax', 'Kalista', 'Leona', 'Nautilus'],
        team1_picks: ['Orianna', 'Vi', 'Varus', 'Braum', 'Gnar'],
        team2_bans: ['Ashe', 'Yone', 'Aurora', 'Sylas', 'Ahri'],
        team2_picks: ['Galio', 'Xin Zhao', 'Kai\'Sa', 'Rakan', 'Rumble']
      }
    },
    {
      league: 'Worlds',
      team1_id: findTeam('GEN'),
      team2_id: findTeam('G2'),
      team1_score: 0,
      team2_score: 0,
      status: 'upcoming',
      match_date: new Date(Date.now() + 86400000).toISOString(),
      format: 'Bo5',
      vod_url: null,
      mvp: null,
      draft: {}
    },
    {
      league: 'Worlds',
      team1_id: findTeam('TL'),
      team2_id: findTeam('FNC'),
      team1_score: 0,
      team2_score: 0,
      status: 'upcoming',
      match_date: new Date(Date.now() + 172800000).toISOString(),
      format: 'Bo3',
      vod_url: null,
      mvp: null,
      draft: {}
    },
    {
      league: 'Worlds',
      team1_id: findTeam('AL'),
      team2_id: findTeam('TES'),
      team1_score: 0,
      team2_score: 0,
      status: 'upcoming',
      match_date: new Date(Date.now() + 259200000).toISOString(),
      format: 'Bo5',
      vod_url: null,
      mvp: null,
      draft: {}
    }
  ]

  const { data: insertedMatches, error: matchErr } = await supabase
    .from('matches')
    .insert(sampleMatches)
    .select()

  if (matchErr) {
    console.error('Error inserting matches:', matchErr)
    return
  }
  console.log(`Inserted ${insertedMatches.length} sample matches successfully!`)
}

seed()
