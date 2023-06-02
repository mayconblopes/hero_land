import { Fragment, useEffect, useState } from 'react'
import { HERO, Hero } from './utils/settings'
import './css/magnific-popup.min.css'
import './css/tooplate-style.css'

import LandingPage from './components/LandingPage'

function App() {
  const [hero, setHero] = useState<Hero>()

  useEffect(() => {
    fetch(HERO)
      .then((promisse) => promisse.json())
      .then((hero) => setHero(hero))
      .catch((error) => console.log(error))
  }, [])

  return (
    <Fragment>
      <LandingPage hero={hero} />
    </Fragment> 
  )
}

export default App
