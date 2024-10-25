import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user?: {
    id: number
    username: string
    role: string
  } | null
  token?: string | null
  isAuthenticated: boolean
  hasVoted: boolean // Kullanıcının oy verip vermediği bilgisi
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  hasVoted: false // Varsayılan olarak false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: { id: number; username: string; role: string }; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    logoutSuccess: state => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    setVoteStatus: (state, action: PayloadAction<boolean>) => {
      state.hasVoted = action.payload // Oy durumunu güncelle
    }
  }
})

export const { loginSuccess, logoutSuccess, setVoteStatus } = authSlice.actions
export default authSlice.reducer
