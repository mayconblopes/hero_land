import './css/magnific-popup.min.css'
import './css/tooplate-style.css'

import LandingPage from './components/LandingPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'

function App() {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/:username'} element={<LandingPage />} />
        <Route path={'/:username/login'} element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
