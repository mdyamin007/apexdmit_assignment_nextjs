"use client";
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../lib/store'
import { initAuth } from '@/lib/features/auth/authSlice'

export default function StoreProvider({ children }) {
  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()

    const user = localStorage.getItem("user");
    const access_token = localStorage.getItem("access_token");

    if (user && access_token) {
      storeRef.current.dispatch(initAuth({ user: JSON.parse(user), access_token: access_token }));
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}