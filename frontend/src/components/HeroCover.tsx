import {
  Fragment,
  useContext,
  useState,
} from 'react'
import { UserContext } from '../context/UserContext'
import './heroCover.css'
import { useParams } from 'react-router-dom'
import { HeroContext } from '../context/HeroContext'
import ColorPicker from './ColorPicker'
import { ThemeContext } from '../context/ThemeContext'

type HeroCoverProps = {
  file?: File
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

export default function HeroCover({ file, setFile }: HeroCoverProps) {
  const { username } = useParams()
  const userContext = useContext(UserContext)
  const { currentHero, setCurrentHero } = useContext(HeroContext)
  const { currentTheme } = useContext(ThemeContext)
  const [heroCover, setHeroCover] = useState(`url(${currentHero?.cover_url})`)

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = e.target.value
    const key = e.target.name
    setCurrentHero({ ...currentHero, [key]: value })
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0]
      const path = (window.URL || window.webkitURL).createObjectURL(file)
      setHeroCover(`url(${path})`)
      setFile(file)
    }
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
          backgroundImage: heroCover,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
        }}
      >
        {userContext.currentUser?.username === username && (
          <>
            <label className='file-button' htmlFor='file'>
              {file?.name || 'Trocar foto...'}
            </label>
            <input
              id='file'
              type='file'
              accept='.png, .jpg, .jpeg'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>
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
            name='name'
            value={currentHero?.name}
            onChange={(e) => handleOnChange(e)}
            style={{ marginBottom: '15px' }}
          />
           <textarea 
              name='skills'
              value={currentHero?.skills}
              onChange={(e) => handleOnChange(e)}
            />
        </div>
      ) : (
        <Fragment>
          {
            // conditional render: current user is not the hero owner? (edit disabled)
          }
          <section id='cover-container'>
            <h1 id='name'>{currentHero?.name}</h1>
            <div id='skills-container'>
              {currentHero?.skills?.split(',').map((skill) => (
                <div key={skill} className='skill'>
                  <p >{skill}</p>
                </div>
              ))}
              <div className='skill-empty'/>
            </div>
          </section>
        </Fragment>
      )}
    </section>
  )
}
