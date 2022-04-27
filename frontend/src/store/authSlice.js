import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth: false,
  user: null,
  otp: {
    phone: '',
    hash: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload
      state.user = user
      if (user === null) {
        state.auth = false
      } else {
        state.auth = true
      }
    },
    setOtp: (state, action) => {
      const { phone, hash } = action.payload
      state.otp.phone = phone
      state.otp.hash = hash
    },
    setAuthLogout: (state, action) => {
      const { user } = action.payload
      state.user = user
      state.auth = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuth, setOtp, setAuthLogout } = authSlice.actions

export default authSlice.reducer
