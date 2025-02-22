import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Persona {
  id: number
  name: string
  description: string
  category: string
}

interface PersonaState {
  personas: Persona[]
}

const initialState: PersonaState = {
  personas: []
}

const personaSlice = createSlice({
  name: 'persona',
  initialState,
  reducers: {
    fetchPersonaSuccess: (state, action: PayloadAction<{ personas: Persona[] }>) => {
      state.personas = action.payload.personas
    }
  }
})

export const { fetchPersonaSuccess } = personaSlice.actions
export default personaSlice.reducer
