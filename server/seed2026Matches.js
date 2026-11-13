import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

async function seed2026SeasonMatches() {
  console.log('Fetching teams for 2026 season matches...')
  const { data: teams, error: tErr } = await supabase.from('teams').select('id, short_name, name')
  if (tErr || !teams) {
    console.error('Error fetching teams:', tErr)
    return
  }

  const findId = (tag) => teams.find(item => item.short_name === tag)?.id

  // 100% MATCHES FROM SEASON 2026 (September - November 2026)
  const matches2026 = [
    // === LCK 2026 SEASON PLAYOFFS ===
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
      league: 'LCK',
      team1_id: findId('HLE'),
      team2_id: findId('T1'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-09-12T08:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Zeka (Smolder)',
      draft: {
        team1_bans: ['Ashe', 'Caitlyn', 'Rumble', 'LeBlanc', 'Poppy'],
        team1_picks: ['Smolder', 'Sejuani', 'Ziggs', 'Braum', 'Renekton'],
        team2_bans: ['Kalista', 'Yone', 'Renata Glasc', 'Vi', 'Jax'],
        team2_picks: ['Corki', 'Maokai', 'Jhin', 'Rell', 'Gnar']
      }
    },
    {
      league: 'LCK',
      team1_id: findId('T1'),
      team2_id: findId('DK'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-09-06T08:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Faker (Orianna)',
      draft: {
        team1_bans: ['Aurora', 'Rumble', 'Skarner', 'Renata Glasc', 'Ashe'],
        team1_picks: ['Orianna', 'Vi', 'Caitlyn', 'Braum', 'Camille'],
        team2_bans: ['Kalista', 'Yone', 'Jax', 'Poppy', 'Alistar'],
        team2_picks: ['Sylas', 'Xin Zhao', 'Kai\'Sa', 'Rell', 'K\'Sante']
      }
    },
    {
      league: 'LCK',
      team1_id: findId('DK'),
      team2_id: findId('KT'),
      team1_score: 3,
      team2_score: 2,
      status: 'finished',
      match_date: '2026-09-01T08:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'ShowMaker (Syndra)',
      draft: {
        team1_bans: ['Ashe', 'Rumble', 'Yone', 'Smolder', 'Poppy'],
        team1_picks: ['Syndra', 'Vi', 'Ziggs', 'Leona', 'K\'Sante'],
        team2_bans: ['Kalista', 'Aurora', 'Skarner', 'Renata Glasc', 'Braum'],
        team2_picks: ['Corki', 'Sejuani', 'Jhin', 'Rell', 'Renekton']
      }
    },
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

    // === LPL 2026 SPLIT 3 / SUMMER PLAYOFFS ===
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
      league: 'LPL',
      team1_id: findId('BLG'),
      team2_id: findId('TES'),
      team1_score: 3,
      team2_score: 0,
      status: 'finished',
      match_date: '2026-09-10T09:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'knight (Jayce)',
      draft: {
        team1_bans: ['Aurora', 'Ashe', 'Renata Glasc', 'Ivern', 'Nautilus'],
        team1_picks: ['Jayce', 'Lillia', 'Camille', 'Jhin', 'Braum'],
        team2_bans: ['Kalista', 'Rumble', 'Skarner', 'Leona', 'Jax'],
        team2_picks: ['Renekton', 'Sejuani', 'Tristana', 'Kai\'Sa', 'Rell']
      }
    },
    {
      league: 'LPL',
      team1_id: findId('TES'),
      team2_id: findId('IG'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-09-05T09:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'JackeyLove (Draven)',
      draft: {
        team1_bans: ['Ashe', 'Skarner', 'Yone', 'Poppy', 'Vi'],
        team1_picks: ['Draven', 'Nautilus', 'Akali', 'Xin Zhao', 'Aatrox'],
        team2_bans: ['Kalista', 'Aurora', 'Renata Glasc', 'Sylas', 'Rell'],
        team2_picks: ['Kai\'Sa', 'Rell', 'Ahri', 'Sejuani', 'Renekton']
      }
    },
    {
      league: 'LPL',
      team1_id: findId('IG'),
      team2_id: findId('WE'),
      team1_score: 3,
      team2_score: 2,
      status: 'finished',
      match_date: '2026-08-30T09:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Rookie (Orianna)',
      draft: {
        team1_bans: ['Ashe', 'Rumble', 'Skarner', 'Vi', 'Jax'],
        team1_picks: ['Orianna', 'Xin Zhao', 'Varus', 'Rell', 'Gnar'],
        team2_bans: ['Yone', 'Kalista', 'Aurora', 'Poppy', 'Braum'],
        team2_picks: ['Azir', 'Maokai', 'Jhin', 'Leona', 'Renekton']
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

    // === LEC 2026 SUMMER FINALS ===
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
      league: 'LEC',
      team1_id: findId('MKOI'),
      team2_id: findId('KC'),
      team1_score: 3,
      team2_score: 2,
      status: 'finished',
      match_date: '2026-09-18T16:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Elyoya (Ivern)',
      draft: {
        team1_bans: ['Aurora', 'Ashe', 'Skarner', 'Poppy', 'Ziggs'],
        team1_picks: ['Tristana', 'Ivern', 'Kalista', 'Nautilus', 'Renekton'],
        team2_bans: ['Yone', 'Rumble', 'Renata Glasc', 'Braum', 'Jax'],
        team2_picks: ['Corki', 'Sejuani', 'Ezreal', 'Rell', 'Gnar']
      }
    },
    {
      league: 'LEC',
      team1_id: findId('KC'),
      team2_id: findId('NAVI'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-09-12T16:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Caliste (Jhin)',
      draft: {
        team1_bans: ['Skarner', 'Ashe', 'Yone', 'Renata Glasc', 'Vi'],
        team1_picks: ['Jhin', 'Braum', 'Viego', 'Syndra', 'Renekton'],
        team2_bans: ['Kalista', 'Rumble', 'Aurora', 'Poppy', 'Leona'],
        team2_picks: ['Varus', 'Sejuani', 'Ahri', 'Rell', 'K\'Sante']
      }
    },
    {
      league: 'LEC',
      team1_id: findId('NAVI'),
      team2_id: findId('VIT'),
      team1_score: 3,
      team2_score: 2,
      status: 'finished',
      match_date: '2026-09-06T16:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Larssen (Azir)',
      draft: {
        team1_bans: ['Aurora', 'Yone', 'Skarner', 'Ashe', 'Jax'],
        team1_picks: ['Azir', 'Maokai', 'Kalista', 'Nautilus', 'Gnar'],
        team2_bans: ['Renata Glasc', 'Rumble', 'Poppy', 'Braum', 'Vi'],
        team2_picks: ['Smolder', 'Sejuani', 'Kai\'Sa', 'Rell', 'Renekton']
      }
    },
    {
      league: 'LEC',
      team1_id: findId('VIT'),
      team2_id: findId('FNC'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-08-31T16:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Carzzy (Ezreal)',
      draft: {
        team1_bans: ['Ashe', 'Skarner', 'Aurora', 'Ivern', 'Ziggs'],
        team1_picks: ['Ezreal', 'Brand', 'Draven', 'Nautilus', 'Poppy'],
        team2_bans: ['Kalista', 'Rumble', 'Yone', 'Braum', 'Vi'],
        team2_picks: ['Syndra', 'Sejuani', 'Varus', 'Rell', 'Renekton']
      }
    },

    // === LCS 2026 SUMMER PLAYOFFS ===
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
      league: 'LCS',
      team1_id: findId('LYON'),
      team2_id: findId('C9'),
      team1_score: 3,
      team2_score: 2,
      status: 'finished',
      match_date: '2026-09-27T20:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Ceo (Varus)',
      draft: {
        team1_bans: ['Skarner', 'Ashe', 'Yone', 'Poppy', 'Vi'],
        team1_picks: ['Varus', 'Braum', 'Orianna', 'Xin Zhao', 'Renekton'],
        team2_bans: ['Kalista', 'Aurora', 'Rumble', 'Renata Glasc', 'Leona'],
        team2_picks: ['Jhin', 'Sejuani', 'Tristana', 'Rell', 'Gnar']
      }
    },
    {
      league: 'LCS',
      team1_id: findId('C9'),
      team2_id: findId('SEN'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-09-20T20:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Blaber (Nocturne)',
      draft: {
        team1_bans: ['Skarner', 'Ashe', 'Aurora', 'Vi', 'Rumble'],
        team1_picks: ['Nocturne', 'Neeko', 'Jhin', 'Braum', 'K\'Sante'],
        team2_bans: ['Kalista', 'Yone', 'Poppy', 'Renata Glasc', 'Leona'],
        team2_picks: ['Sejuani', 'Tristana', 'Kai\'Sa', 'Rell', 'Renekton']
      }
    },
    {
      league: 'LCS',
      team1_id: findId('SEN'),
      team2_id: findId('FLY'),
      team1_score: 3,
      team2_score: 2,
      status: 'finished',
      match_date: '2026-09-13T20:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Sniper (Camille)',
      draft: {
        team1_bans: ['Aurora', 'Ashe', 'Skarner', 'Ivern', 'Ziggs'],
        team1_picks: ['Camille', 'Vi', 'Kalista', 'Nautilus', 'Ahri'],
        team2_bans: ['Yone', 'Rumble', 'Poppy', 'Braum', 'Jax'],
        team2_picks: ['Gnar', 'Sejuani', 'Smolder', 'Rell', 'Ezreal']
      }
    },
    {
      league: 'LCS',
      team1_id: findId('FLY'),
      team2_id: findId('SR'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-09-06T20:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Bwipo (Olaf)',
      draft: {
        team1_bans: ['Skarner', 'Yone', 'Ashe', 'Renata Glasc', 'Leona'],
        team1_picks: ['Olaf', 'Brand', 'Varus', 'Braum', 'Corki'],
        team2_bans: ['Kalista', 'Rumble', 'Aurora', 'Poppy', 'Vi'],
        team2_picks: ['Renekton', 'Sejuani', 'Kai\'Sa', 'Rell', 'Azir']
      }
    },

    // === CBLOL 2026 SPLIT 2 PLAYOFFS ===
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
    {
      league: 'CBLOL',
      team1_id: findId('LLL'),
      team2_id: findId('VKS'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-09-01T16:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Robo (Jax)',
      draft: {
        team1_bans: ['Aurora', 'Ashe', 'Skarner', 'Poppy', 'Braum'],
        team1_picks: ['Jax', 'Sejuani', 'Tristana', 'Leona', 'Varus'],
        team2_bans: ['Kalista', 'Yone', 'Rumble', 'Renata Glasc', 'Vi'],
        team2_picks: ['Gnar', 'Maokai', 'Corki', 'Rell', 'Ezreal']
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
    {
      league: 'CBLOL',
      team1_id: findId('RED'),
      team2_id: findId('FUR'),
      team1_score: 3,
      team2_score: 0,
      status: 'finished',
      match_date: '2026-08-19T16:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'fNb (Renekton)',
      draft: {
        team1_bans: ['Aurora', 'Ashe', 'Skarner', 'Vi', 'Ziggs'],
        team1_picks: ['Renekton', 'Lillia', 'Kalista', 'Nautilus', 'Syndra'],
        team2_bans: ['Yone', 'Rumble', 'Renata Glasc', 'Braum', 'Poppy'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Jhin', 'Rell', 'Azir']
      }
    },
    {
      league: 'CBLOL',
      team1_id: findId('FUR'),
      team2_id: findId('LOS'),
      team1_score: 3,
      team2_score: 1,
      status: 'finished',
      match_date: '2026-08-12T16:00:00Z',
      format: 'Bo5',
      vod_url: 'https://youtube.com',
      mvp: 'Ayu (Smolder)',
      draft: {
        team1_bans: ['Skarner', 'Ashe', 'Yone', 'Poppy', 'Vi'],
        team1_picks: ['Smolder', 'Maokai', 'Varus', 'Braum', 'Gnar'],
        team2_bans: ['Kalista', 'Aurora', 'Rumble', 'Renata Glasc', 'Leona'],
        team2_picks: ['Tristana', 'Sejuani', 'Ezreal', 'Rell', 'Renekton']
      }
    },

    // === WORLDS 2026 (November 2026 - Current / Live / Upcoming) ===
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
    },
    {
      league: 'Worlds',
      team1_id: findId('BLG'),
      team2_id: findId('G2'),
      team1_score: 0,
      team2_score: 0,
      status: 'upcoming',
      match_date: new Date(Date.now() + 172800000).toISOString(),
      format: 'Bo5',
      vod_url: null,
      mvp: null,
      draft: {}
    },
    {
      league: 'Worlds',
      team1_id: findId('TL'),
      team2_id: findId('PNG'),
      team1_score: 0,
      team2_score: 0,
      status: 'upcoming',
      match_date: new Date(Date.now() + 259200000).toISOString(),
      format: 'Bo3',
      vod_url: null,
      mvp: null,
      draft: {}
    }
  ]

  // Clear all matches and insert strictly 2026 season matches
  await supabase.from('matches').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { data: inserted, error: mErr } = await supabase.from('matches').insert(matches2026).select()
  if (mErr) {
    console.error('Error inserting 2026 matches:', mErr)
    return
  }

  console.log(`SUCCESS: Inserted ${inserted.length} matches from SEASON 2026!`)
}

seed2026SeasonMatches()
