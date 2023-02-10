import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './components/blog/blog.slice'

export const store = configureStore({
  reducer: { blog: blogReducer }
})

// * Get the Root State and AppDispatch from store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
