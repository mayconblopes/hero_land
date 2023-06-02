import React, { useContext, useEffect, useState } from 'react'
import { APIURL, HERO, Hero } from './utils/settings'
import { UserContext } from './context/UserContext'
import './css/magnific-popup.min.css'
import './css/tooplate-style.css'

import HeroAbout from './components/HeroAbout'
import HeroContact from './components/HeroContact'
import Footer from './components/Footer'
import HeroCover from './components/HeroCover'

function App() {
  const [hero, setHero] = useState<Hero>()

  useEffect(() => {
    fetch(HERO)
      .then((promisse) => promisse.json())
      .then((hero) => setHero(hero))
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      {hero && (
        <div className='tm-container-fluid'>
          <HeroCover name={hero.name} cover={hero.cover_url || `$https://ui-avatars.com/api/?name=${hero.name}`}/>
          <HeroAbout about={hero.bio} />
          <HeroContact
            instagram={hero.instagram}
            twitter={hero.twitter}
            linkedin={hero.linkedin}
            facebook={hero.facebook}
            phone={hero.phone}
            address={hero.address}
            whatsapp={hero.whatsapp}
          />
          <Footer />
        </div>
      )}
      <button
        onClick={(e) => {
          e.preventDefault()
          console.log(hero)
        }}
      >
        Hero
      </button>
    </>
  )
}

export default App
