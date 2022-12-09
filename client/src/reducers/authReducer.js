import { createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth'

const initialState = null

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    logout() {
      authService.logout()
      return null
    },
  }
})

export const { setUser, logout } = authSlice.actions

export default authSlice.reducer