import { MatchFormData } from '../types/FormTypes'

export const initialValues: MatchFormData = {
  id: null,
  location: '',
  matchDate: '',
  matchTime: '',
  teamSize: 6,
  whiteTeam: [] as string[],
  blackTeam: [] as string[],
  isPlayed: false
}
