export interface FormTrend {
  playerId: number
  name: string
  surname: string
  avgRatingChange: number
  rating: number
}

export interface LegendaryDuos {
  player1Id: number
  player1Name: string
  player2Id: number
  player2Name: string
  gamesTogether: number
}

export interface RivalDuos {
  player1Id: number
  player1Name: string
  player2Id: number
  player2Name: string
  gamesAgainst: number
}
