import '../css/tooplate-style.css'
import '../assets/fontawesome/css/all.min.css'
import { useContext, useState } from 'react'
import { HeroContext } from '../context/HeroContext'

export default function HeroContact() {

  const {currentHero, setCurrentHero} = useContext(HeroContext)

  const social = [
    { name: 'instagram', url: currentHero?.instagram },
    { name: 'twitter', url: currentHero?.twitter },
    { name: 'linkedin', url: currentHero?.linkedin },
    { name: 'facebook', url: currentHero?.facebook },
  ]

  const [customerName, setCustomerName] = useState('')
  const [customerMessage, setCustomerMessage] = useState('')

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    window.open(currentHero?.whatsapp+`&text=Olá! Meu nome é ${customerName}. \n ${customerMessage}`)
  }

  return (
    <section className='tm-contact tm-mb-50 tm-bgcolor-3 tm-border-rounded'>
      <div className='tm-contact-header tm-flex-center'>
        <i className='fas fa-map-pin fa-3x'></i>
        <h2>Contato</h2>
      </div>
      <div className='tm-contact-info'>
        <address className='tm-mb-30'>{currentHero?.address}</address>
        <div className='tm-text-white tm-mb-40'>
          <a href={currentHero?.whatsapp} className='tm-link-white'>
            Tel: {currentHero?.phone}
          </a>
        </div>

        <div className='tm-flex'>
          {social
            .filter((link) => link.url !== null)
            .map((link) => (
              <a key={link.name} href={link.url} className='tm-social-link' target='_blank' rel="noreferrer">
                <i className={`fab fa-${link.name}`}></i>
              </a>
            ))}
        </div>
      </div>
      {currentHero?.whatsapp && (
        <div className='tm-contact-form-container'>
          <form
            id='contact-form'
            action=''
            method='POST'
            className='tm-contact-form'
          >
            <input
              type='text'
              name='name'
              placeholder='seu nome'
              required={false}
              onChange={e => setCustomerName(e.target.value)}
              value={customerName}
            />

            <textarea
              rows={5}
              name='message'
              className='tm-mb-30'
              placeholder='sua mensagem'
              required={false}
              onChange={e => setCustomerMessage(e.target.value)}
              value={customerMessage}
            ></textarea>
            <button
              onClick={(e) => handleSubmit(e)}
              type='submit'
              className='tm-right tm-btn-submit'
              disabled={customerName !== '' && customerMessage !== '' ? false : true}
              style={{display: customerName !== '' && customerMessage !== '' ? '' : 'none' }}
            >
              enviar
            </button>
          </form>
        </div>
      )}
    </section>
  )
}
