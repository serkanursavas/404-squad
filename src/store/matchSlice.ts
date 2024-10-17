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
    },
    fetchMatchDetailsSuccess: (state, action: PayloadAction<Match>) => {
      const matchIndex = state.allMatches.findIndex(match => match.id === action.payload.id)
      if (matchIndex !== -1) {
        state.allMatches[matchIndex] = action.payload
      } else {
        state.allMatches.push(action.payload)
      }
    }
  }
})

export const { fetchNextMatchSuccess, fetchAllMatchesSuccess, fetchMatchDetailsSuccess } = matchSlice.actions
export default matchSlice.reducer
