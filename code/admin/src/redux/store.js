import { configureStore } from '@reduxjs/toolkit'
import userLoginAdminReducer from './userSlice'

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
  key: 'userLoginAdmin',
  version: 1,
  storage,
}

const userLoginAdminPersistedReducer = persistReducer(persistConfig, userLoginAdminReducer)

export const store = configureStore({
  reducer: {
    userLoginAdmin: userLoginAdminPersistedReducer
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      }),
})