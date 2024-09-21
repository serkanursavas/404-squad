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
