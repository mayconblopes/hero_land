import { useContext, useEffect, useState } from 'react'
import { HEROES, Hero } from '../utils/settings'
import Footer from './Footer'
import HeroAbout from './HeroAbout'
import HeroContact from './HeroContact'
import HeroCover from './HeroCover'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { HeroContext } from '../context/HeroContext'

export default function LandingPage({ heroes }: { heroes?: Array<Hero> }) {
  //   const [hero, setHero] = useState<Hero>()
  const { username } = useParams()

  const userContext = useContext(UserContext)
  const { currentHero, setCurrentHero } = useContext(HeroContext)

  useEffect(() => {
    fetch(HEROES)
      .then((promisse) => promisse.json())
      .then((heroes: Array<Hero>) =>
        setCurrentHero(heroes.filter((hero) => hero.username === username)[0])
      )
      .catch((error) => console.log(error))
  }, [])

  function handleSaveAll() {
    
    // cover is a file field on backend and we don't want to patch it in this function
    delete currentHero?.cover

    fetch(`${HEROES}/${currentHero?.id}/`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Token ${userContext.currentUser?.token}`,
      },
      body: JSON.stringify(currentHero),
    })
      .then((promisse) => promisse.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  }

  return (
    <>
      {currentHero && (
        <div className='tm-container-fluid'>
          <HeroCover />
          <HeroAbout />
          <HeroContact />
          {userContext.currentUser?.username === currentHero.username && (
            <button onClick={handleSaveAll}>Salvar tudo</button>
          )}
          <Footer />
        </div>
      )}
      <button
        onClick={(e) => {
          e.preventDefault()
          console.log(currentHero)
        }}
      >
        Hero
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          console.log(userContext.currentUser)
        }}
      >
        CurrentUser
      </button>
    </>
  )
}
