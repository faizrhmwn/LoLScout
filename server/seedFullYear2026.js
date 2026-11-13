import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

async function seedFullYearMatches() {
  console.log('Seeding matches across JANUARI - OKTOBER 2026...')
  const { data: teams, error: tErr } = await supabase.from('teams').select('id, short_name')
  if (tErr || !teams) {
    console.error('Error fetching teams:', tErr)
    return
  }

  const findId = (tag) => teams.find(item => item.short_name === tag)?.id

  const allMatches2026 = [
    // ==========================================
    // 📅 JANUARI 2026 (Season Kickoff / Split 1 Start)
    // ==========================================
    {
      league: 'LCK',
      team1_id: findId('T1'),
      team2_id: findId('GEN'),
      team1_score: 2,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-01-17T08:00:00Z',
      format: 'Bo3',
      vod_url: 'https://youtube.com',
      mvp: 'Faker (Azir)',
      draft: {
        team1_bans: ['Kalista', 'Ashe', 'Skarner', 'Poppy', 'Vi'],
        team1_picks: ['Azir', 'Xin Zhao', 'Varus', 'Braum', 'K\'Sante'],
        team2_bans: ['Yone', 'Rumble', 'Renata Glasc', 'Sylas', 'Jax'],
        team2_picks: ['Corki', 'Sejuani', 'Kai\'Sa', 'Rell', 'Renekton']
      }
    },
    {
      league: 'LEC',
      team1_id: findId('G2'),
      team2_id: findId('FNC'),
      team1_score: 1,
      team2_score: 0,
      status: 'finished',
      match_date: '2026-01-20T17:00:00Z',
      format: 'Bo1',
      vod_url: 'https://youtube.com',
      mvp: 'Caps (Neeko)',
      draft: {
        team1_bans: ['Skarner', 'Aurora', 'Ashe', 'Poppy', 'Ziggs'],
        team1_picks: ['Neeko', 'Brand', 'Draven', 'Nautilus', 'Camille'],
        team2_bans: ['Kalista', 'Yone', 'Renata Glasc', 'Vi', 'Jax'],
        team2_picks: ['Tristana', 'Maokai', 'Ezreal', 'Braum', 'Gnar']
      }
    },
    {
      league: 'LPL',
      team1_id: findId('BLG'),
      team2_id: findId('TES'),
      team1_score: 2,
      team2_score: 0,
      status: 'finished',
      match_date: '2026-01-24T09:00:00Z',
      format: 'Bo3',
      vod_url: 'https://youtube.com',
      mvp: 'knight (Ahri)',
      draft: {
        team1_bans: ['Aurora', 'Ashe', 'Renata Glasc', 'Ivern', 'Nautilus'],
        team1_picks: ['Ahri', 'Vi', 'Kai\'Sa', 'Rell', 'Jax'],
        team2_bans: ['Kalista', 'Rumble', 'Skarner', 'Leona', 'Poppy'],
        team2_picks: ['Syndra', 'Sejuani', 'Jhin', 'Braum', 'Renekton']
      }
    },
    {
      league: 'LCS',
      team1_id: findId('TL'),
      team2_id: findId('C9'),
      team1_score: 2,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-01-28T21:00:00Z',
      format: 'Bo3',
      vod_url: 'https://youtube.com',
      mvp: 'Impact (K\'Sante)',
      draft: {
        team1_bans: ['Aurora', 'Skarner', 'Ashe', 'Jayce', 'Rumble'],
        team1_picks: ['K\'Sante', 'Sejuani', 'Ziggs', 'Leona', 'Kalista'],
        team2_bans: ['Yone', 'Varus', 'Poppy', 'Renata Glasc', 'Jax'],
        team2_picks: ['Gnar', 'Jarvan IV', 'Tristana', 'Rell', 'Ezreal']
      }
    },

    // ==========================================
    // 📅 FEBRUARI 2026 (Spring Regular Season / Group Stage)
    // ==========================================
    {
      league: 'LCK',
      team1_id: findId('HLE'),
      team2_id: findId('DK'),
      team1_score: 2,
      team2_score: 0,
      status: 'finished',
      match_date: '2026-02-07T08:00:00Z',
      format: 'Bo3',
      vod_url: 'https://youtube.com',
      mvp: 'Viper (Lucian)',
      draft: {
        team1_bans: ['Ashe', 'Rumble', 'Skarner', 'Vi', 'Jax'],
        team1_picks: ['Lucian', 'Nami', 'Yone', 'Maokai', 'Gnar'],
        team2_bans: ['Kalista', 'Aurora', 'Poppy', 'Braum', 'Leona'],
        team2_picks: ['Smolder', 'Sejuani', 'Varus', 'Rell', 'Renekton']
      }
    },
    {
      league: 'LPL',
      team1_id: findId('IG'),
      team2_id: findId('WE'),
      team1_score: 2,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-02-14T09:00:00Z',
      format: 'Bo3',
      vod_url: 'https://youtube.com',
      mvp: 'Rookie (Syndra)',
      draft: {
        team1_bans: ['Ashe', 'Rumble', 'Skarner', 'Vi', 'Jax'],
        team1_picks: ['Syndra', 'Xin Zhao', 'Varus', 'Rell', 'Camille'],
        team2_bans: ['Yone', 'Kalista', 'Aurora', 'Poppy', 'Braum'],
        team2_picks: ['Azir', 'Maokai', 'Jhin', 'Leona', 'Renekton']
      }
    },
    {
      league: 'CBLOL',
      team1_id: findId('PNG'),
      team2_id: findId('LLL'),
      team1_score: 1,
      team2_score: 0,
      status: 'finished',
      match_date: '2026-02-21T16:00:00Z',
      format: 'Bo1',
      vod_url: 'https://youtube.com',
      mvp: 'dyNquedo (Taliyah)',
      draft: {
        team1_bans: ['Skarner', 'Yone', 'Aurora', 'Poppy', 'Vi'],
        team1_picks: ['Taliyah', 'Xin Zhao', 'Draven', 'Nautilus', 'Aatrox'],
        team2_bans: ['Kalista', 'Ashe', 'Renata Glasc', 'Sylas', 'Rell'],
        team2_picks: ['Ahri', 'Sejuani', 'Kai\'Sa', 'Braum', 'Renekton']
      }
    },
    {
      league: 'LEC',
      team1_id: findId('KC'),
      team2_id: findId('MKOI'),
      team1_score: 1,
      team2_score: 0,
      status: 'finished',
      match_date: '2026-02-28T18:00:00Z',
      format: 'Bo1',
      vod_url: 'https://youtube.com',
      mvp: 'Caliste (Kalista)',
      draft: {
        team1_bans: ['Aurora', 'Ashe', 'Skarner', 'Poppy', 'Ziggs'],
        team1_picks: ['Kalista', 'Renata Glasc', 'Viego', 'Tristana', 'Renekton'],
        team2_bans: ['Yone', 'Rumble', 'Braum', 'Vi', 'Jax'],
        team2_picks: ['Ezreal', 'Rell', 'Ivern', 'Corki', 'Gnar']
      }
    },

    // ==========================================
    // 📅 MARET 2026 (Spring Playoffs / First Stand Global)
    // ==========================================
    {
      league: 'LCK',
      team1_id: findId('GEN'),
      team2_id: findId('KT'),
      team1_score: 3,
      team2_score: 0,
      status: 'finished',
      match_date: '2026-03-08T08:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Chovy (Caitlyn Mid)',
      draft: {
        team1_bans: ['Kalista', 'Ashe', 'Aurora', 'Poppy', 'Vi'],
        team1_picks: ['Caitlyn', 'Lux', 'Sejuani', 'Yone', 'K\'Sante'],
        team2_bans: ['Rumble', 'Renata Glasc', 'Jax', 'Skarner', 'Leona'],
        team2_picks: ['Azir', 'Maokai', 'Varus', 'Braum', 'Renekton']
      }
    },
    {
      league: 'LPL',
      team1_id: findId('AL'),
      team2_id: findId('JDG'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-03-15T09:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Shanks (Tristana)',
      draft: {
        team1_bans: ['Skarner', 'Yone', 'Aurora', 'Renata Glasc', 'Braum'],
        team1_picks: ['Tristana', 'Brand', 'Ezreal', 'Leona', 'Renekton'],
        team2_bans: ['Kalista', 'Ashe', 'Rumble', 'Poppy', 'Vi'],
        team2_picks: ['Corki', 'Sejuani', 'Kai\'Sa', 'Rell', 'Gnar']
      }
    },
    {
      league: 'LCS',
      team1_id: findId('FLY'),
      team2_id: findId('SEN'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-03-22T20:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Bwipo (Singed)',
      draft: {
        team1_bans: ['Aurora', 'Ashe', 'Skarner', 'Ivern', 'Ziggs'],
        team1_picks: ['Singed', 'Vi', 'Varus', 'Braum', 'Ahri'],
        team2_bans: ['Yone', 'Rumble', 'Poppy', 'Renata Glasc', 'Jax'],
        team2_picks: ['Camille', 'Sejuani', 'Smolder', 'Rell', 'Ezreal']
      }
    },

    // ==========================================
    // 📅 APRIL 2026 (Spring Finals / Mid-Season Qualifier)
    // ==========================================
    {
      league: 'LCK',
      team1_id: findId('GEN'),
      team2_id: findId('T1'),
      team1_score: 3,
      team2_score: 2,
      status: 'finished',
      match_date: '2026-04-12T08:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Canyon (Nidalee)',
      draft: {
        team1_bans: ['Ashe', 'Caitlyn', 'Skarner', 'Poppy', 'Vi'],
        team1_picks: ['Nidalee', 'Renekton', 'Yone', 'Kalista', 'Renata Glasc'],
        team2_bans: ['Aurora', 'Rumble', 'Braum', 'Jax', 'Leona'],
        team2_picks: ['Sejuani', 'K\'Sante', 'Azir', 'Varus', 'Rell']
      }
    },
    {
      league: 'LEC',
      team1_id: findId('G2'),
      team2_id: findId('KC'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-04-19T16:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'BrokenBlade (Yasuo)',
      draft: {
        team1_bans: ['Poppy', 'Skarner', 'Ashe', 'Lucian', 'Nami'],
        team1_picks: ['Yasuo', 'Diana', 'Jhin', 'Braum', 'Galio'],
        team2_bans: ['Kalista', 'Yone', 'Aurora', 'Alistar', 'Vi'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Tristana', 'Rell', 'Ezreal']
      }
    },
    {
      league: 'CBLOL',
      team1_id: findId('LLL'),
      team2_id: findId('VKS'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-04-26T16:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Tinowns (Ahri)',
      draft: {
        team1_bans: ['Aurora', 'Ashe', 'Skarner', 'Poppy', 'Braum'],
        team1_picks: ['Ahri', 'Vi', 'Varus', 'Leona', 'Jax'],
        team2_bans: ['Kalista', 'Yone', 'Rumble', 'Renata Glasc', 'Alistar'],
        team2_picks: ['Corki', 'Sejuani', 'Ezreal', 'Rell', 'Gnar']
      }
    },

    // ==========================================
    // 📅 MEI 2026 (Mid-Season Invitational / MSI 2026)
    // ==========================================
    {
      league: 'Worlds',
      team1_id: findId('GEN'),
      team2_id: findId('BLG'),
      team1_score: 3,
      team2_score: 2,
      status: 'finished',
      match_date: '2026-05-18T11:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Chovy (Aurelion Sol)',
      draft: {
        team1_bans: ['Ashe', 'Skarner', 'Aurora', 'Vi', 'Jax'],
        team1_picks: ['Aurelion Sol', 'Sejuani', 'Varus', 'Braum', 'K\'Sante'],
        team2_bans: ['Kalista', 'Rumble', 'Renata Glasc', 'Poppy', 'Ahri'],
        team2_picks: ['Smolder', 'Maokai', 'Ezreal', 'Rell', 'Gnar']
      }
    },
    {
      league: 'Worlds',
      team1_id: findId('G2'),
      team2_id: findId('TL'),
      team1_score: 3,
      team2_score: 0,
      status: 'finished',
      match_date: '2026-05-14T11:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Hans Sama (Draven)',
      draft: {
        team1_bans: ['Ziggs', 'Ashe', 'Skarner', 'Ivern', 'K\'Sante'],
        team1_picks: ['Draven', 'Nautilus', 'LeBlanc', 'Brand', 'Camille'],
        team2_bans: ['Kalista', 'Yone', 'Aurora', 'Braum', 'Poppy'],
        team2_picks: ['Varus', 'Rell', 'Azir', 'Sejuani', 'Renekton']
      }
    },
    {
      league: 'Worlds',
      team1_id: findId('T1'),
      team2_id: findId('TES'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-05-10T11:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Gumayusi (Caitlyn)',
      draft: {
        team1_bans: ['Aurora', 'Rumble', 'Skarner', 'Renata Glasc', 'Ashe'],
        team1_picks: ['Caitlyn', 'Braum', 'Orianna', 'Vi', 'Gnar'],
        team2_bans: ['Kalista', 'Yone', 'Jax', 'Poppy', 'Alistar'],
        team2_picks: ['Kai\'Sa', 'Rell', 'Sylas', 'Xin Zhao', 'K\'Sante']
      }
    },

    // ==========================================
    // 📅 JUNI 2026 (Summer Split Kickoff)
    // ==========================================
    {
      league: 'LCK',
      team1_id: findId('DK'),
      team2_id: findId('FOX'),
      team1_score: 2,
      team2_score: 0,
      status: 'finished',
      match_date: '2026-06-12T08:00:00Z',
      format: 'Bo3',
      vod_url: 'https://youtube.com',
      mvp: 'Lucid (Lee Sin)',
      draft: {
        team1_bans: ['Ashe', 'Rumble', 'Yone', 'Smolder', 'Poppy'],
        team1_picks: ['Lee Sin', 'Syndra', 'Ziggs', 'Leona', 'K\'Sante'],
        team2_bans: ['Kalista', 'Aurora', 'Skarner', 'Renata Glasc', 'Braum'],
        team2_picks: ['Sejuani', 'Tristana', 'Jhin', 'Rell', 'Renekton']
      }
    },
    {
      league: 'LPL',
      team1_id: findId('BLG'),
      team2_id: findId('AL'),
      team1_score: 2,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-06-18T09:00:00Z',
      format: 'Bo3',
      vod_url: 'https://youtube.com',
      mvp: 'Bin (Jax)',
      draft: {
        team1_bans: ['Aurora', 'Ashe', 'Renata Glasc', 'Ivern', 'Nautilus'],
        team1_picks: ['Jax', 'Lillia', 'Jayce', 'Jhin', 'Braum'],
        team2_bans: ['Kalista', 'Rumble', 'Skarner', 'Leona', 'Poppy'],
        team2_picks: ['Renekton', 'Sejuani', 'Tristana', 'Kai\'Sa', 'Rell']
      }
    },
    {
      league: 'LCS',
      team1_id: findId('LYON'),
      team2_id: findId('SR'),
      team1_score: 2,
      team2_score: 0,
      status: 'finished',
      match_date: '2026-06-25T20:00:00Z',
      format: 'Bo3',
      vod_url: 'https://youtube.com',
      mvp: 'Ceo (Kai\'Sa)',
      draft: {
        team1_bans: ['Skarner', 'Ashe', 'Yone', 'Poppy', 'Vi'],
        team1_picks: ['Kai\'Sa', 'Nautilus', 'Orianna', 'Xin Zhao', 'Renekton'],
        team2_bans: ['Kalista', 'Aurora', 'Rumble', 'Renata Glasc', 'Leona'],
        team2_picks: ['Varus', 'Braum', 'Tristana', 'Sejuani', 'Gnar']
      }
    },

    // ==========================================
    // 📅 JULI 2026 (Summer Regular Season Derby)
    // ==========================================
    {
      league: 'LCK',
      team1_id: findId('HLE'),
      team2_id: findId('T1'),
      team1_score: 2,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-07-05T08:00:00Z',
      format: 'Bo3',
      vod_url: 'https://youtube.com',
      mvp: 'Peanut (Sejuani)',
      draft: {
        team1_bans: ['Ashe', 'Caitlyn', 'Rumble', 'LeBlanc', 'Poppy'],
        team1_picks: ['Sejuani', 'Smolder', 'Ziggs', 'Braum', 'Renekton'],
        team2_bans: ['Kalista', 'Yone', 'Renata Glasc', 'Vi', 'Jax'],
        team2_picks: ['Maokai', 'Corki', 'Jhin', 'Rell', 'Gnar']
      }
    },
    {
      league: 'LPL',
      team1_id: findId('TES'),
      team2_id: findId('JDG'),
      team1_score: 2,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-07-14T09:00:00Z',
      format: 'Bo3',
      vod_url: 'https://youtube.com',
      mvp: 'Creme (Akali)',
      draft: {
        team1_bans: ['Ashe', 'Skarner', 'Yone', 'Poppy', 'Vi'],
        team1_picks: ['Akali', 'Xin Zhao', 'Draven', 'Nautilus', 'Aatrox'],
        team2_bans: ['Kalista', 'Aurora', 'Renata Glasc', 'Sylas', 'Rell'],
        team2_picks: ['Ahri', 'Sejuani', 'Kai\'Sa', 'Braum', 'Renekton']
      }
    },
    {
      league: 'LEC',
      team1_id: findId('NAVI'),
      team2_id: findId('VIT'),
      team1_score: 2,
      team2_score: 0,
      status: 'finished',
      match_date: '2026-07-22T17:00:00Z',
      format: 'Bo3',
      vod_url: 'https://youtube.com',
      mvp: 'Malrang (Jarvan IV)',
      draft: {
        team1_bans: ['Aurora', 'Yone', 'Skarner', 'Ashe', 'Jax'],
        team1_picks: ['Jarvan IV', 'Azir', 'Kalista', 'Nautilus', 'Gnar'],
        team2_bans: ['Renata Glasc', 'Rumble', 'Poppy', 'Braum', 'Vi'],
        team2_picks: ['Sejuani', 'Smolder', 'Kai\'Sa', 'Rell', 'Renekton']
      }
    },

    // ==========================================
    // 📅 AGUSTUS 2026 (Playoffs Round 1 & 2)
    // ==========================================
    {
      league: 'LCK',
      team1_id: findId('KT'),
      team2_id: findId('FOX'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-08-25T08:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Bdd (Azir)',
      draft: {
        team1_bans: ['Skarner', 'Aurora', 'Ashe', 'Jax', 'Poppy'],
        team1_picks: ['Azir', 'Maokai', 'Kalista', 'Renata Glasc', 'Gnar'],
        team2_bans: ['Yone', 'Rumble', 'Braum', 'Vi', 'Leona'],
        team2_picks: ['Tristana', 'Sejuani', 'Ezreal', 'Rell', 'Renekton']
      }
    },
    {
      league: 'LPL',
      team1_id: findId('WE'),
      team2_id: findId('JDG'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-08-24T09:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'FoFo (Taliyah)',
      draft: {
        team1_bans: ['Skarner', 'Yone', 'Aurora', 'Renata Glasc', 'Braum'],
        team1_picks: ['Taliyah', 'Sejuani', 'Ezreal', 'Leona', 'K\'Sante'],
        team2_bans: ['Kalista', 'Ashe', 'Rumble', 'Poppy', 'Vi'],
        team2_picks: ['Tristana', 'Xin Zhao', 'Kai\'Sa', 'Rell', 'Gnar']
      }
    },
    {
      league: 'CBLOL',
      team1_id: findId('VKS'),
      team2_id: findId('RED'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-08-25T16:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'SMILEY (Ashe)',
      draft: {
        team1_bans: ['Skarner', 'Rumble', 'Yone', 'Poppy', 'Jax'],
        team1_picks: ['Ashe', 'Braum', 'Corki', 'Sejuani', 'Gnar'],
        team2_bans: ['Kalista', 'Aurora', 'Renata Glasc', 'Vi', 'Leona'],
        team2_picks: ['Tristana', 'Xin Zhao', 'Ezreal', 'Rell', 'Renekton']
      }
    },

    // ==========================================
    // 📅 SEPTEMBER 2026 (Summer Semifinals & Grand Finals)
    // ==========================================
    {
      league: 'LCK',
      team1_id: findId('GEN'),
      team2_id: findId('HLE'),
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
    {
      league: 'LPL',
      team1_id: findId('AL'),
      team2_id: findId('BLG'),
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
    {
      league: 'LEC',
      team1_id: findId('G2'),
      team2_id: findId('MKOI'),
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
    {
      league: 'CBLOL',
      team1_id: findId('PNG'),
      team2_id: findId('LLL'),
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

    // ==========================================
    // 📅 OKTOBER 2026 (LCS Finals & Worlds Swiss Stage)
    // ==========================================
    {
      league: 'LCS',
      team1_id: findId('TL'),
      team2_id: findId('LYON'),
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
    {
      league: 'Worlds',
      team1_id: findId('T1'),
      team2_id: findId('BLG'),
      team1_score: 3,
      team2_score: 2,
      status: 'finished',
      match_date: '2026-10-24T12:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Faker (Sylas)',
      draft: {
        team1_bans: ['Jax', 'Kalista', 'Skarner', 'Nocturne', 'Renata Glasc'],
        team1_picks: ['Sylas', 'Xin Zhao', 'Galio', 'Varus', 'Poppy'],
        team2_bans: ['Yone', 'Ashe', 'Aurora', 'K\'Sante', 'Neeko'],
        team2_picks: ['Rumble', 'Jarvan IV', 'Kai\'Sa', 'Rakan', 'Smolder']
      }
    },
    {
      league: 'Worlds',
      team1_id: findId('GEN'),
      team2_id: findId('G2'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-10-28T12:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Ruler (Ezreal)',
      draft: {
        team1_bans: ['Draven', 'LeBlanc', 'Poppy', 'Skarner', 'Vi'],
        team1_picks: ['Ezreal', 'Braum', 'Smolder', 'Sejuani', 'Renekton'],
        team2_bans: ['Kalista', 'Yone', 'Aurora', 'Renata Glasc', 'Jax'],
        team2_picks: ['Tristana', 'Maokai', 'Jhin', 'Rell', 'Gnar']
      }
    },

    // ==========================================
    // 📅 NOVEMBER 2026 (Live & Upcoming Climax)
    // ==========================================
    {
      league: 'Worlds',
      team1_id: findId('T1'),
      team2_id: findId('GEN'),
      team1_score: 1,
      team2_score: 1,
      status: 'live',
      match_date: new Date().toISOString(),
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: null,
      draft: {
        team1_bans: ['Skarner', 'Jax', 'Kalista', 'Leona', 'Nautilus'],
        team1_picks: ['Orianna', 'Vi', 'Varus', 'Braum', 'Gnar'],
        team2_bans: ['Ashe', 'Yone', 'Aurora', 'Sylas', 'Ahri'],
        team2_picks: ['Smolder', 'Sejuani', 'Kai\'Sa', 'Rakan', 'K\'Sante']
      }
    },
    {
      league: 'Worlds',
      team1_id: findId('AL'),
      team2_id: findId('HLE'),
      team1_score: 0,
      team2_score: 0,
      status: 'upcoming',
      match_date: new Date(Date.now() + 86400000).toISOString(),
      format: 'Bo5',
      vod_url: null,
      mvp: null,
      draft: {}
    }
  ]

  // Clear and insert
  await supabase.from('matches').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { data: inserted, error: mErr } = await supabase.from('matches').insert(allMatches2026).select()
  if (mErr) {
    console.error('Error seeding full year matches:', mErr)
    return
  }

  console.log(`SUCCESS: Seeded ${inserted.length} matches spanning JANUARI s/d OKTOBER 2026!`)
}

seedFullYearMatches()
