import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../services/userService'

interface UserState {
  users: User[]
}

const initialState: UserState = {
  users: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersSuccess: (state, action: PayloadAction<{ users: User[] }>) => {
      state.users = action.payload.users
    }
  }
})

export const { fetchUsersSuccess } = userSlice.actions
export default userSlice.reducer
