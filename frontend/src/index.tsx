import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { UserProvider } from './context/UserContext'
import { HeroProvider } from './context/HeroContext'
import { ThemeProvider } from './context/ThemeContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <UserProvider>
    <HeroProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HeroProvider>
  </UserProvider>
)
