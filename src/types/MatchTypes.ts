export interface MatchInfo {
  id: number
  date: string
  team1: {
    name: string
    logo?: string
  }
  score1: number
  team2: {
    name: string
    logo?: string
  }
  score2: number
  isPlayed: boolean
  goals: string[]
}

export interface Player {
  id: number
  name: string
  rating: number
}

export interface Team {
  name: string
  logo: string
  score: number
  goals: Goal[]
  players: Player[]
}

export interface Match {
  id: number
  dateTime: string
  location: string
  weather: string
  homeTeamScore: number
  awayTeamScore: number

  isPlayed: boolean
  isVoted: boolean
}

export interface Match {
  id: number

  location: string

  dateTime: string

  weather: string

  homeTeamScore: number

  awayTeamScore: number

  isPlayed: boolean

  isVoted: boolean

  goals: Goal[]

  rosters: Roster[]
}

export interface Goal {
  playerId: number

  playerName: string

  teamColor: string
}

export interface Roster {
  id: number
  teamColor: string
  rating: number
  playerId: number
  playerName: string
}
