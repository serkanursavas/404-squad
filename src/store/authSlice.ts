import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: {
    username: string
    role: string
  } | null
  token: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token')
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: { username: string; role: string }; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    logoutSuccess: state => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    }
  }
})

export const { loginSuccess, logoutSuccess } = authSlice.actions
export default authSlice.reducer
