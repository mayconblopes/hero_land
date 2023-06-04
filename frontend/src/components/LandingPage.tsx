import { useContext, useEffect, useState } from 'react'
import { HEROES, Hero, THEMES } from '../utils/settings'
import Footer from './Footer'
import HeroAbout from './HeroAbout'
import HeroContact from './HeroContact'
import HeroCover from './HeroCover'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { HeroContext } from '../context/HeroContext'
import { ThemeContext } from '../context/ThemeContext'
import ColorPicker from './ColorPicker'

export default function LandingPage() {
  const { username } = useParams()

  const userContext = useContext(UserContext)
  const { currentHero, setCurrentHero } = useContext(HeroContext)
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext)
  const [message, setMessage] = useState('')
  const [hasUnsavedEdits, setHasUnsavedEdits] = useState(true)

  let root = document.documentElement
  root.style.setProperty('--text-color', currentTheme.font_color)
  root.style.setProperty('--page-bgcolor', currentTheme.page_bgcolor)

  useEffect(() => {
    fetch(HEROES)
      .then((promisse) => promisse.json())
      .then((heroes: Array<Hero>) =>{
        setCurrentHero(heroes.filter((hero) => hero.username === username)[0])
      }
      )
      .catch((error) => console.log(error))
    }, [])

  useEffect(() => {
    setTimeout(() => {
      setMessage('')
    }, 2000)
  }, [message])

  useEffect(() => {
    setHasUnsavedEdits(false)
    console.log(currentHero)
  },[currentHero, currentTheme])

  function handleSaveAll() {
    // cover is a file field on backend and we don't want to patch it in this function
    delete currentHero?.cover

    fetch(`${HEROES}/${currentHero?.id}/`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Token ${userContext.currentUser?.token}`,
      },
      body: JSON.stringify(currentHero),
    })
      .then((promisse) => promisse.json())
      .then((data) => {
        console.log('data from backend after patch hero', data)
      })
      .catch((error) => {
        setMessage('ERRO ' + error)
        console.log(error)
      })

    fetch(`${THEMES}/${currentTheme.id}/`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Token ${userContext.currentUser?.token}`,
      },
      body: JSON.stringify(currentTheme),
    })
      .then((promisse) => promisse.json())
      .then((data) => console.log('data from backend after patch theme', data))
      .catch((error) => {
        setMessage('ERRO ' + error)
        console.log(error)
      })

    if (!message.includes('ERRO')) {
      setMessage('Salvo!')
      setHasUnsavedEdits(true)
    }
  }

  return (
    <div
    style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
    >
      {currentHero && (
        <div className='tm-container-fluid'>
          {message && <h3>{message}</h3>}
          {userContext.currentUser?.username === currentHero.username && (
            <nav className='admin-panel'>
              <h3>Edição...</h3>
              <ColorPicker elementToChange='page_bgcolor' />
              <button onClick={handleSaveAll}
              disabled={hasUnsavedEdits}
              >Salvar tudo</button>
            </nav>
          )}
          <HeroCover />
          <HeroAbout />
          <HeroContact />
          <Footer />
        </div>
      )}
      {/* <button
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
      </button> */}
    </div>
  )
}
