import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Match } from '../services/matchService'

interface MatchState {
  nextMatch: Match | null
  allMatches: Match[]
}

const initialState: MatchState = {
  nextMatch: null,
  allMatches: []
}

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    fetchNextMatchSuccess: (state, action: PayloadAction<Match>) => {
      state.nextMatch = action.payload
    }
  }
})

export const { fetchNextMatchSuccess } = matchSlice.actions
export default matchSlice.reducer
