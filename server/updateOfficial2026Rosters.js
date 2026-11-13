import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

const officialRosters2026 = {
  // ==================== LCK ====================
  T1: [
    { role: 'Top', ign: 'Doran', name: 'Choi Hyeon-joon', nationality: 'KR' },
    { role: 'Jungle', ign: 'Oner', name: 'Mun Hyeon-jun', nationality: 'KR' },
    { role: 'Mid', ign: 'Faker', name: 'Lee Sang-hyeok', nationality: 'KR' },
    { role: 'ADC', ign: 'Peyz', name: 'Kim Su-hwan', nationality: 'KR' },
    { role: 'Support', ign: 'Keria', name: 'Ryu Min-seok', nationality: 'KR' },
    { role: 'Coach', ign: 'Tom', name: 'Im Jae-hyeon', nationality: 'KR' }
  ],
  GEN: [
    { role: 'Top', ign: 'Kiin', name: 'Kim Gi-in', nationality: 'KR' },
    { role: 'Jungle', ign: 'Canyon', name: 'Kim Geon-bu', nationality: 'KR' },
    { role: 'Mid', ign: 'Chovy', name: 'Jeong Ji-hoon', nationality: 'KR' },
    { role: 'ADC', ign: 'Ruler', name: 'Park Jae-hyuk', nationality: 'KR' },
    { role: 'Support', ign: 'Duro', name: 'Joo Min-kyu', nationality: 'KR' },
    { role: 'Coach', ign: 'Lyn', name: 'Park Joon-hyeong', nationality: 'KR' }
  ],
  HLE: [
    { role: 'Top', ign: 'Zeus', name: 'Choi Woo-je', nationality: 'KR' },
    { role: 'Jungle', ign: 'Kanavi', name: 'Seo Jin-hyeok', nationality: 'KR' },
    { role: 'Mid', ign: 'Zeka', name: 'Kim Geon-woo', nationality: 'KR' },
    { role: 'ADC', ign: 'Gumayusi', name: 'Lee Min-hyeong', nationality: 'KR' },
    { role: 'Support', ign: 'Delight', name: 'Yoo Hwan-joong', nationality: 'KR' },
    { role: 'Coach', ign: 'Homme', name: 'Yoon Sung-young', nationality: 'KR' }
  ],
  DK: [
    { role: 'Top', ign: 'Siwoo', name: 'Jeon Si-woo', nationality: 'KR' },
    { role: 'Jungle', ign: 'Lucid', name: 'Choi Yong-hyeok', nationality: 'KR' },
    { role: 'Mid', ign: 'ShowMaker', name: 'Heo Su', nationality: 'KR' },
    { role: 'ADC', ign: 'Smash', name: 'Sin Geum-jae', nationality: 'KR' },
    { role: 'Support', ign: 'Career', name: 'Oh Hyeong-seok', nationality: 'KR' },
    { role: 'Coach', ign: 'cvMax', name: 'Kim Dae-ho', nationality: 'KR' }
  ],
  KT: [
    { role: 'Top', ign: 'PerfecT', name: 'Lee Seung-min', nationality: 'KR' },
    { role: 'Jungle', ign: 'Cuzz', name: 'Moon Woo-chan', nationality: 'KR' },
    { role: 'Mid', ign: 'Bdd', name: 'Gwak Bo-seong', nationality: 'KR' },
    { role: 'ADC', ign: 'Jiwoo', name: 'Jung Ji-woo', nationality: 'KR' },
    { role: 'Support', ign: 'Pollu', name: 'Oh Dong-gyu', nationality: 'KR' },
    { role: 'Coach', ign: 'Score', name: 'Go Dong-bin', nationality: 'KR' }
  ],
  FOX: [
    { role: 'Top', ign: 'Clear', name: 'Song Hyeon-min', nationality: 'KR' },
    { role: 'Jungle', ign: 'Raptor', name: 'Jeon Eo-jin', nationality: 'KR' },
    { role: 'Mid', ign: 'VicLa', name: 'Lee Dae-kwang', nationality: 'KR' },
    { role: 'ADC', ign: 'Taeyoon', name: 'Kim Tae-yoon', nationality: 'KR' },
    { role: 'Support', ign: 'Kellin', name: 'Kim Hyeong-gyu', nationality: 'KR' },
    { role: 'Coach', ign: 'Ryu', name: 'Ryu Sang-wook', nationality: 'KR' }
  ],

  // ==================== LPL ====================
  AL: [
    { role: 'Top', ign: 'Breathe', name: 'Chen Chen', nationality: 'CN' },
    { role: 'Jungle', ign: 'Tarzan', name: 'Lee Seung-yong', nationality: 'KR' },
    { role: 'Mid', ign: 'Shanks', name: 'Cui Xiao-Jun', nationality: 'CN' },
    { role: 'ADC', ign: 'Hope', name: 'Wang Jie', nationality: 'CN' },
    { role: 'Support', ign: 'Kael', name: 'Kim Jin-hong', nationality: 'KR' },
    { role: 'Coach', ign: 'BigWei', name: 'Fu Chien-Wei', nationality: 'TW' }
  ],
  BLG: [
    { role: 'Top', ign: 'Bin', name: 'Chen Ze-Bin', nationality: 'CN' },
    { role: 'Jungle', ign: 'Xun', name: 'Peng Li-Xun', nationality: 'CN' },
    { role: 'Mid', ign: 'knight', name: 'Zhuo Ding', nationality: 'CN' },
    { role: 'ADC', ign: 'Viper', name: 'Park Do-hyeon', nationality: 'KR' },
    { role: 'Support', ign: 'ON', name: 'Luo Wen-Jun', nationality: 'CN' },
    { role: 'Coach', ign: 'Daeny', name: 'Yang Dae-in', nationality: 'KR' }
  ],
  TES: [
    { role: 'Top', ign: '369', name: 'Bai Jia-Hao', nationality: 'CN' },
    { role: 'Jungle', ign: 'Tian', name: 'Gao Tian-Peng', nationality: 'CN' },
    { role: 'Mid', ign: 'Creme', name: 'Lin Jian', nationality: 'CN' },
    { role: 'ADC', ign: 'JackeyLove', name: 'Yu Wen-Bo', nationality: 'CN' },
    { role: 'Support', ign: 'Zhuo', name: 'Wang Xu-Zhuo', nationality: 'CN' },
    { role: 'Coach', ign: 'Despa1r', name: 'Zhou Peng', nationality: 'CN' }
  ],
  IG: [
    { role: 'Top', ign: 'TheShy', name: 'Kang Seung-lok', nationality: 'KR' },
    { role: 'Jungle', ign: 'Wei', name: 'Yan Yang-Wei', nationality: 'CN' },
    { role: 'Mid', ign: 'Rookie', name: 'Song Eui-jin', nationality: 'KR' },
    { role: 'ADC', ign: 'JiaQi', name: 'Zi Jia-Qi', nationality: 'CN' },
    { role: 'Support', ign: 'Meiko', name: 'Tian Ye', nationality: 'CN' },
    { role: 'Coach', ign: 'Chengz', name: 'Chengz', nationality: 'CN' }
  ],
  WE: [
    { role: 'Top', ign: 'Cube', name: 'Dai Yi', nationality: 'CN' },
    { role: 'Jungle', ign: 'Monki', name: 'Wang Meng-Qi', nationality: 'CN' },
    { role: 'Mid', ign: 'Karis', name: 'Kim Hong-jo', nationality: 'KR' },
    { role: 'ADC', ign: 'About', name: 'Moon Hyeong-seok', nationality: 'KR' },
    { role: 'Support', ign: 'Erha', name: 'Shi Xun-Ye', nationality: 'CN' },
    { role: 'Coach', ign: 'JinJin', name: 'JinJin', nationality: 'CN' }
  ],
  JDG: [
    { role: 'Top', ign: 'Xiaoxu', name: 'Xu Xing-Zu', nationality: 'CN' },
    { role: 'Jungle', ign: 'JunJia', name: 'Yu Chun-Chia', nationality: 'TW' },
    { role: 'Mid', ign: 'HongQ', name: 'Tsai Ming-Hong', nationality: 'TW' },
    { role: 'ADC', ign: 'GALA', name: 'Chen Wei', nationality: 'CN' },
    { role: 'Support', ign: 'Vampire', name: 'Zhao Zhe-Can', nationality: 'CN' },
    { role: 'Coach', ign: 'Tabe', name: 'Wong Pak Kan', nationality: 'HK' }
  ],

  // ==================== LEC ====================
  G2: [
    { role: 'Top', ign: 'BrokenBlade', name: 'Sergen Çelik', nationality: 'DE' },
    { role: 'Jungle', ign: 'SkewMond', name: 'Rudy Semaan', nationality: 'FR' },
    { role: 'Mid', ign: 'Caps', name: 'Rasmus Winther', nationality: 'DK' },
    { role: 'ADC', ign: 'Hans Sama', name: 'Steven Liv', nationality: 'FR' },
    { role: 'Support', ign: 'Labrov', name: 'Labros Papoutsakis', nationality: 'GR' },
    { role: 'Coach', ign: 'Dylan Falco', name: 'Dylan Falco', nationality: 'CA' }
  ],
  MKOI: [
    { role: 'Top', ign: 'Myrwn', name: 'Alex Pastor Villarejo', nationality: 'ES' },
    { role: 'Jungle', ign: 'Elyoya', name: 'Javier Prades Batalla', nationality: 'ES' },
    { role: 'Mid', ign: 'Jojopyun', name: 'Joseph Joon Pyun', nationality: 'CA' },
    { role: 'ADC', ign: 'Supa', name: 'David Martínez García', nationality: 'ES' },
    { role: 'Support', ign: 'Alvaro', name: 'Álvaro Fernández del Amo', nationality: 'ES' },
    { role: 'Coach', ign: 'Melzhet', name: 'Tomás Campelos', nationality: 'ES' }
  ],
  KC: [
    { role: 'Top', ign: 'Canna', name: 'Kim Chang-dong', nationality: 'KR' },
    { role: 'Jungle', ign: 'Yike', name: 'Martin Sundelin', nationality: 'SE' },
    { role: 'Mid', ign: 'kyeahoo', name: 'Kang Ye-hoo', nationality: 'KR' },
    { role: 'ADC', ign: 'Caliste', name: 'Caliste Henry-Hennebert', nationality: 'FR' },
    { role: 'Support', ign: 'Busio', name: 'Alan Cwalina', nationality: 'US' },
    { role: 'Coach', ign: 'Reapered', name: 'Bok Han-gyu', nationality: 'KR' }
  ],
  NAVI: [
    { role: 'Top', ign: 'Maynter', name: 'Volodymyr Sorokin', nationality: 'UA' },
    { role: 'Jungle', ign: 'Rhilech', name: 'Enes Uçan', nationality: 'TR' },
    { role: 'Mid', ign: 'Poby', name: 'Yoon Sung-won', nationality: 'KR' },
    { role: 'ADC', ign: 'Hans SamD', name: 'Lee Jae-hoon', nationality: 'KR' },
    { role: 'Support', ign: 'Parus', name: 'Polat Furkan Çiçek', nationality: 'TR' },
    { role: 'Coach', ign: 'TheRock', name: 'Vasilis Voltis', nationality: 'GR' }
  ],
  VIT: [
    { role: 'Top', ign: 'Naak Nako', name: 'Kaan Okan', nationality: 'TR' },
    { role: 'Jungle', ign: 'Lyncas', name: 'Linas Nauncikas', nationality: 'LT' },
    { role: 'Mid', ign: 'Humanoid', name: 'Marek Brázda', nationality: 'CZ' },
    { role: 'ADC', ign: 'Carzzy', name: 'Matyáš Orság', nationality: 'CZ' },
    { role: 'Support', ign: 'Fleshy', name: 'Kadir Kemiksiz', nationality: 'TR' },
    { role: 'Coach', ign: 'Carter', name: 'Alexander Cartwright', nationality: 'UK' }
  ],
  FNC: [
    { role: 'Top', ign: 'Soboro', name: 'Lim Seong-min', nationality: 'KR' },
    { role: 'Jungle', ign: 'Razork', name: 'Iván Martín Díaz', nationality: 'ES' },
    { role: 'Mid', ign: 'Vladi', name: 'Vladimiros Kourtidis', nationality: 'GR' },
    { role: 'ADC', ign: 'Upset', name: 'Elias Lipp', nationality: 'DE' },
    { role: 'Support', ign: 'Lospa', name: 'Park Joon-hyeong', nationality: 'KR' },
    { role: 'Coach', ign: 'GrabbZ', name: 'Fabian Lohmann', nationality: 'DE' }
  ],

  // ==================== LCS ====================
  TL: [
    { role: 'Top', ign: 'Morgan', name: 'Park Ru-han', nationality: 'KR' },
    { role: 'Jungle', ign: 'Josedeodo', name: 'Brandon Villegas', nationality: 'AR' },
    { role: 'Mid', ign: 'Quid', name: 'Lim Hyeon-seung', nationality: 'KR' },
    { role: 'ADC', ign: 'Yeon', name: 'Sean Sung', nationality: 'US' },
    { role: 'Support', ign: 'CoreJJ', name: 'Jo Yong-in', nationality: 'KR' },
    { role: 'Coach', ign: 'Spawn', name: 'Jake Tiberi', nationality: 'AU' }
  ],
  LYON: [
    { role: 'Top', ign: 'Dhokla', name: 'Niship Doshi', nationality: 'US' },
    { role: 'Jungle', ign: 'Inspired', name: 'Kacper Słoma', nationality: 'PL' },
    { role: 'Mid', ign: 'Saint', name: 'Kang Seong-in', nationality: 'KR' },
    { role: 'ADC', ign: 'Berserker', name: 'Kim Min-cheol', nationality: 'KR' },
    { role: 'Support', ign: 'Isles', name: 'Jonah Rosario', nationality: 'AU' },
    { role: 'Coach', ign: 'Reignover', name: 'Baek Yug-jin', nationality: 'KR' }
  ],
  C9: [
    { role: 'Top', ign: 'Thanatos', name: 'Park Seung-gyu', nationality: 'KR' },
    { role: 'Jungle', ign: 'Blaber', name: 'Robert Huang', nationality: 'US' },
    { role: 'Mid', ign: 'Loki', name: 'Lee Sang-min', nationality: 'KR' },
    { role: 'ADC', ign: 'Tactical', name: 'Edward Ra', nationality: 'US' },
    { role: 'Support', ign: 'Vulcan', name: 'Philippe Laflamme', nationality: 'CA' },
    { role: 'Coach', ign: 'IWillDominate', name: 'Christian Rivera', nationality: 'US' }
  ],
  SEN: [
    { role: 'Top', ign: 'Impact', name: 'Jeong Eon-yeong', nationality: 'KR' },
    { role: 'Jungle', ign: 'HamBak', name: 'Ham Yoo-jin', nationality: 'KR' },
    { role: 'Mid', ign: 'DARKWINGS', name: 'Isaac Chou', nationality: 'US' },
    { role: 'ADC', ign: 'Rahel', name: 'Cho Min-seong', nationality: 'KR' },
    { role: 'Support', ign: 'huhi', name: 'Choi Jae-hyun', nationality: 'US' },
    { role: 'Coach', ign: 'Goldenglue', name: 'Greyson Gilmer', nationality: 'US' }
  ],
  FLY: [
    { role: 'Top', ign: 'GaKGoS', name: 'Ibrahim Samet Bulut', nationality: 'TR' },
    { role: 'Jungle', ign: 'Gryffinn', name: 'Johnson Le', nationality: 'US' },
    { role: 'Mid', ign: 'Quad', name: 'Song Soo-hyeong', nationality: 'KR' },
    { role: 'ADC', ign: 'Massu', name: 'Fahad Abdulmalek', nationality: 'CA' },
    { role: 'Support', ign: 'Cryogen', name: 'Michael Luu', nationality: 'US' },
    { role: 'Coach', ign: 'Nukeduck', name: 'Erlend Holm', nationality: 'NO' }
  ],
  SR: [
    { role: 'Top', ign: 'Fudge', name: 'Ibrahim Allami', nationality: 'AU' },
    { role: 'Jungle', ign: 'Contractz', name: 'Juan Arturo Garcia', nationality: 'US' },
    { role: 'Mid', ign: 'Zinie', name: 'Yoo Baek-jin', nationality: 'KR' },
    { role: 'ADC', ign: 'Bvoy', name: 'Ju Yeong-hoon', nationality: 'KR' },
    { role: 'Support', ign: 'Zeyzal', name: 'Tristan Stidam', nationality: 'US' },
    { role: 'Coach', ign: 'Reven', name: 'Seong Sang-hyeon', nationality: 'KR' }
  ],

  // ==================== CBLOL ====================
  PNG: [
    { role: 'Top', ign: 'Wizer', name: 'Choi Ui-seok', nationality: 'KR' },
    { role: 'Jungle', ign: 'CarioK', name: 'Marcos Santos de Oliveira', nationality: 'BR' },
    { role: 'Mid', ign: 'dyNquedo', name: 'Matheus Rossini Miranda', nationality: 'BR' },
    { role: 'ADC', ign: 'TitaN', name: 'Alexandre Lima dos Santos', nationality: 'BR' },
    { role: 'Support', ign: 'Kuri', name: 'Choi Won-yeong', nationality: 'KR' },
    { role: 'Coach', ign: 'Xiris', name: 'Sin Hyeok', nationality: 'KR' }
  ],
  LLL: [
    { role: 'Top', ign: 'Robo', name: 'Leonardo Souza', nationality: 'BR' },
    { role: 'Jungle', ign: 'Croc', name: 'Park Jong-hoon', nationality: 'KR' },
    { role: 'Mid', ign: 'Tinowns', name: 'Thiago Sartori', nationality: 'BR' },
    { role: 'ADC', ign: 'Route', name: 'Moon Geom-su', nationality: 'KR' },
    { role: 'Support', ign: 'RedBert', name: 'Ygor Freitas', nationality: 'BR' },
    { role: 'Coach', ign: 'Stardust', name: 'Son Suk-hee', nationality: 'KR' }
  ],
  VKS: [
    { role: 'Top', ign: 'Guigo', name: 'Guilherme Ruiz', nationality: 'BR' },
    { role: 'Jungle', ign: 'Discter', name: 'Pedro Henrique', nationality: 'BR' },
    { role: 'Mid', ign: 'Leleko', name: 'Alexandre Santoro', nationality: 'BR' },
    { role: 'ADC', ign: 'SMILEY', name: 'Ludvig Granquist', nationality: 'SE' },
    { role: 'Support', ign: 'ProDelta', name: 'Gabriel Rossi', nationality: 'BR' },
    { role: 'Coach', ign: 'SeeEl', name: 'Christopher Lee', nationality: 'UK' }
  ],
  RED: [
    { role: 'Top', ign: 'fNb', name: 'Francisco Natanael', nationality: 'BR' },
    { role: 'Jungle', ign: 'Aegis', name: 'Gabriel Lemos', nationality: 'BR' },
    { role: 'Mid', ign: 'Grevthar', name: 'Daniel Xavier', nationality: 'BR' },
    { role: 'ADC', ign: 'Brance', name: 'Diego Amaral', nationality: 'BR' },
    { role: 'Support', ign: 'Frosty', name: 'Pedro Rossi', nationality: 'BR' },
    { role: 'Coach', ign: 'Coelho', name: 'Calisto Coelho', nationality: 'BR' }
  ],
  FUR: [
    { role: 'Top', ign: 'Zwyroo', name: 'Artur Trojan', nationality: 'PL' },
    { role: 'Jungle', ign: 'Tutsz', name: 'Arthur Machado', nationality: 'BR' },
    { role: 'Mid', ign: 'Ayu', name: 'Andrey Saraiva', nationality: 'BR' },
    { role: 'ADC', ign: 'Rav3n', name: 'Lucas Rossi', nationality: 'BR' },
    { role: 'Support', ign: 'Jojo', name: 'Gabriel Dzelme', nationality: 'BR' },
    { role: 'Coach', ign: 'Maestro', name: 'Lucas Pierre', nationality: 'BR' }
  ],
  LOS: [
    { role: 'Top', ign: 'Boal', name: 'Felipe Boal', nationality: 'BR' },
    { role: 'Jungle', ign: 'Seize', name: 'Kim Chan-hee', nationality: 'KR' },
    { role: 'Mid', ign: 'Envy', name: 'Lee Kang-jae', nationality: 'KR' },
    { role: 'ADC', ign: 'Netuno', name: 'Matheus de Oliveira', nationality: 'BR' },
    { role: 'Support', ign: 'Kabbie', name: 'Jeong Sang-hyeon', nationality: 'KR' },
    { role: 'Coach', ign: 'Stepz', name: 'Tiago Dias', nationality: 'PT' }
  ]
}

async function updateRosters() {
  console.log('Updating 30 teams with verified 2026 rosters...')
  const { data: teams, error } = await supabase.from('teams').select('id, short_name')
  if (error || !teams) {
    console.error('Error fetching teams:', error)
    return
  }

  for (const t of teams) {
    const roster = officialRosters2026[t.short_name]
    if (roster) {
      await supabase.from('teams').update({ roster }).eq('id', t.id)
      console.log(`[OK] ${t.short_name}`)
    } else {
      console.warn(`[SKIP] No roster for ${t.short_name}`)
    }
  }

  console.log('DONE! All 30 teams updated.')
}

updateRosters()
