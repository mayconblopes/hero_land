import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import './heroCover.css'
import { useParams } from 'react-router-dom'
import { HeroContext } from '../context/HeroContext'

export default function HeroCover() {
  const { username } = useParams()
  const userContext = useContext(UserContext)
  const { currentHero, setCurrentHero } = useContext(HeroContext)

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
      setCurrentHero({...currentHero, name: value})
  }

  return (
    <section className='tm-site-header hero-container tm-mb-50 tm-bgcolor-1 tm-border-rounded'>
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

      {userContext.currentUser?.username === username ? (
        <input
          id='name'
          value={currentHero?.name}
          onChange={(e) => handleOnChange(e)}
        />
      ) : (
        <h1 id='name'>{currentHero?.name}</h1>
      )}
    </section>
  )
}
