import '../css/tooplate-style.css'
import '../assets/fontawesome/css/all.min.css'
import ReactMarkdown from 'react-markdown'
import { Fragment, useContext } from 'react'
import { HeroContext } from '../context/HeroContext'
import { UserContext } from '../context/UserContext'
import { ThemeContext } from '../context/ThemeContext'
import ColorPicker from './ColorPicker'

export default function HeroAbout() {
  const { currentHero, setCurrentHero } = useContext(HeroContext)
  const { currentUser } = useContext(UserContext)
  const { currentTheme } = useContext(ThemeContext)

  return (
    <section
      className='tm-about tm-mb-50 tm-p-50 tm-border-rounded'
      style={{ backgroundColor: currentTheme.about_bgcolor }}
    >
      <div className='tm-about-header tm-flex-center'>
        <i className='fas fa-user fa-2x'></i>
        <h2>Sobre</h2>
      </div>
      <div className='tm-about-text'>
        {
          // conditional render: current user is the hero owner? (edit enabled)
        }
        {currentUser?.username === currentHero?.username ? (
          <Fragment>
            <div>
              <ColorPicker elementToChange='about_bgcolor' />
            </div>
            <textarea
              onChange={(e) =>
                setCurrentHero({ ...currentHero, bio: e.target.value })
              }
              value={currentHero?.bio}
              style={{ height: '300px' }}
            />
          </Fragment>
        ) : (
          <Fragment>
            {
              // conditional render: current user is not the hero owner? (edit disabled)
            }
            <ReactMarkdown
              children={currentHero?.bio || 'Nada a exibir por enquanto :)'}
            />
          </Fragment>
        )}
      </div>
    </section>
  )
}
