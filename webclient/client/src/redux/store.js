import { configureStore } from '@reduxjs/toolkit'
import userLoginReducer from './userSlice'

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'userLogin',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, userLoginReducer)

export const store = configureStore({
  reducer: {
    userLogin: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      }),
})