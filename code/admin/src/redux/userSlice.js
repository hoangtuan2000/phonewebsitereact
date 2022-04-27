import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  infoUserAdmin: {}
}

export const userLoginAdminSlice = createSlice({
  name: 'userLoginAdmin',
  initialState,
  reducers: {
    saveUserLoginAdmin: (state, action) => {
      // console.log('action', action.payload)
      state.infoUserAdmin = action.payload
    },
    deleteUserLoginAdmin: (state, action) => {
      state.infoUserAdmin = {}
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveUserLoginAdmin, deleteUserLoginAdmin } = userLoginAdminSlice.actions

export default userLoginAdminSlice.reducer