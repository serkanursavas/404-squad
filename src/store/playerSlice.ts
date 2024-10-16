import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Player } from '../services/playerService'

interface PlayerState {
  players: Player[]
}

const initialState: PlayerState = {
  players: []
}

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    fetchPlayersSuccess: (state, action: PayloadAction<{ players: Player[] }>) => {
      state.players = action.payload.players
    }
  }
})

export const { fetchPlayersSuccess } = playerSlice.actions
export default playerSlice.reducer
