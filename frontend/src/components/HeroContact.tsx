import '../css/tooplate-style.css'
import '../assets/fontawesome/css/all.min.css'

type HeroContactProps = {
  instagram?: string
  twitter?: string
  linkedin?: string
  facebook?: string
  phone?: string
  address?: string
  whatsapp?: string
}
export default function HeroContact({
  instagram,
  twitter,
  linkedin,
  facebook,
  phone,
  address,
  whatsapp,
}: HeroContactProps) {
  const social = [
    { name: 'instagram', url: instagram },
    { name: 'twitter', url: twitter },
    { name: 'linkedin', url: linkedin },
    { name: 'facebook', url: facebook },
  ]

  console.log('SOCIAL', social)

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    window.open(whatsapp)
  }

  return (
    <section className='tm-contact tm-mb-50 tm-bgcolor-3 tm-border-rounded'>
      <div className='tm-contact-header tm-flex-center'>
        <i className='fas fa-map-pin fa-3x'></i>
        <h2>Contato</h2>
      </div>
      <div className='tm-contact-info'>
        <address className='tm-mb-30'>{address}</address>
        <div className='tm-text-white tm-mb-40'>
          <a href={whatsapp} className='tm-link-white'>
            Tel: {phone}
          </a>
        </div>

        <div className='tm-flex'>
          {social
            .filter((link) => link.url !== null)
            .map((link) => (
              <a key={link.name} href={link.url} className='tm-social-link'>
                <i className={`fab fa-${link.name}`}></i>
              </a>
            ))}
        </div>
      </div>
      {whatsapp && (
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
            />

            <textarea
              rows={5}
              name='message'
              className='tm-mb-30'
              placeholder='sua mensagem'
              required={false}
            ></textarea>
            <button
              onClick={(e) => handleSubmit(e)}
              type='submit'
              className='tm-right tm-btn-submit'
            >
              enviar
            </button>
          </form>
        </div>
      )}
    </section>
  )
}
