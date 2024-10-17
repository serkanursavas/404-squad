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
    },
    fetchAllMatchesSuccess: (state, action: PayloadAction<Match[]>) => {
      state.allMatches = [...state.allMatches, ...action.payload]
    }
  }
})

export const { fetchNextMatchSuccess, fetchAllMatchesSuccess } = matchSlice.actions
export default matchSlice.reducer
