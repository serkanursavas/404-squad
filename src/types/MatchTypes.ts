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
}

export interface Goal {
  id: number
  playerName: string
}

export interface Player {
  id: number
  name: string
  form: number
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
  date: string
  location: string
  team1: Team
  team2: Team
}
