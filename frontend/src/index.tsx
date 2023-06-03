import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { UserProvider } from './context/UserContext'
import { HeroProvider } from './context/HeroContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <UserProvider>
    <HeroProvider>
      <App />
    </HeroProvider>
  </UserProvider>
)
