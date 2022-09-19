import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../features/taskSlice.js'

export const store = configureStore({
  reducer: {
       task: taskReducer,
  },
})