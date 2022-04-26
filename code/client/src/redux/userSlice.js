import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  infoUser: {}
}

export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    saveUserLogin: (state, action) => {
      // console.log('action', action.payload)
      state.infoUser = action.payload
    },
    deleteUserLogin: (state, action) => {
      state.infoUser = {}
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveUserLogin, deleteUserLogin } = userLoginSlice.actions

export default userLoginSlice.reducer