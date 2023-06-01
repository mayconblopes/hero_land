import '../css/tooplate-style.css'
import '../assets/fontawesome/css/all.min.css'
import ReactMarkdown from 'react-markdown'

type HeroAboutProps = {
  about: string
}

export default function HeroAbout({ about }: HeroAboutProps) {
  return (
    <section className='tm-about tm-mb-80 tm-p-50 tm-bgcolor-2 tm-border-rounded'>
      <div className='tm-about-header tm-flex-center'>
        <i className='fas fa-user fa-2x'></i>
        <h2>Sobre</h2>
      </div>
      <div className='tm-about-text'>
        <ReactMarkdown children={about}/>
      </div>
    </section>
  )
}
