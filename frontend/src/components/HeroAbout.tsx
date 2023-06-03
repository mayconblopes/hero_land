import '../css/tooplate-style.css'
import '../assets/fontawesome/css/all.min.css'
import ReactMarkdown from 'react-markdown'
import { useContext } from 'react'
import { HeroContext } from '../context/HeroContext'

type HeroAboutProps = {
  about: string
}

export default function HeroAbout() {
  const {currentHero, setCurrentHero} = useContext(HeroContext)

  return (
    <section className='tm-about tm-mb-80 tm-p-50 tm-bgcolor-2 tm-border-rounded'>
      <div className='tm-about-header tm-flex-center'>
        <i className='fas fa-user fa-2x'></i>
        <h2>Sobre</h2>
      </div>
      <div className='tm-about-text'>
        <ReactMarkdown children={currentHero?.bio || 'Nada a exibir por enquanto :)'}/>
      </div>
    </section>
  )
}
