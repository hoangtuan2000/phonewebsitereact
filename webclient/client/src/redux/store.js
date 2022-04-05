import { configureStore } from '@reduxjs/toolkit'
import userLoginReducer from './userSlice'

export const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
  },
})