import { Fragment, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import './heroCover.css'
import { useParams } from 'react-router-dom'
import { HeroContext } from '../context/HeroContext'
import ColorPicker from './ColorPicker'
import { ThemeContext } from '../context/ThemeContext'

export default function HeroCover() {
  const { username } = useParams()
  const userContext = useContext(UserContext)
  const { currentHero, setCurrentHero } = useContext(HeroContext)
  const { currentTheme } = useContext(ThemeContext)

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setCurrentHero({ ...currentHero, name: value })
  }

  return (
    <section
      className='tm-site-header hero-container tm-mb-50 tm-border-rounded'
      style={{ backgroundColor: currentTheme.cover_bgcolor }}
    >
      <div
        className='hero-cover-image'
        style={{
          height: '100%',
          width: '315px',
          backgroundImage: `url(${currentHero?.cover_url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
        }}
      />
      {
        // conditional render: current user is the hero owner? (edit enabled)
      }

      {userContext.currentUser?.username === username ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <ColorPicker elementToChange='cover_bgcolor' />
          </div>
          
          <input
            id='name'
            value={currentHero?.name}
            onChange={(e) => handleOnChange(e)}
            style={{marginBottom: '15px'}}
          />
        </div>
      ) : (
        <Fragment>
          {
            // conditional render: current user is not the hero owner? (edit disabled)
          }
          <h1 id='name'>{currentHero?.name}</h1>
        </Fragment>
      )}
    </section>
  )
}
