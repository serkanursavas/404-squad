import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import userReducer from './userSlice'
import playerReducer from './playerSlice'
import matchReducer from './matchSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    players: playerReducer,
    matches: matchReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
