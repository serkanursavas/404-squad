export interface SignupFormValues {
  username: string
  password: string
  name: string
  surname: string
  position: string
  foot: string
}

export interface SelectOption {
  value: string
  label: string
}

export interface MatchFormData {
  id: number | null
  location: string
  matchDate: string
  matchTime: string
  teamSize: number
  whiteTeam: String[]
  blackTeam: String[]
  isPlayed: boolean
}
