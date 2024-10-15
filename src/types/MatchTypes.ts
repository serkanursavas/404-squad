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

export interface AllMatch {
  id: number
  dateTime: string
  homeTeamScore: number
  awayTeamScore: number
  played: boolean
}

export interface Match {
  id: number
  location: string
  dateTime: string
  weather: string
  homeTeamScore: number
  awayTeamScore: number
  played: boolean
  voted: boolean
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
