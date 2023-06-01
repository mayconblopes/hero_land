import '../css/tooplate-style.css'

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
              <a
                key={link.name}
                href={link.url}
                className='tm-social-link'
              >
                <i className='fab fa-facebook'></i>
              </a>
            ))}
        </div>
        {/* <div className='tm-flex'>
          <a href='https://facebook.com' className='tm-social-link'>
            <i className='fab fa-facebook'></i>
          </a>
          <a href='https://twitter.com' className='tm-social-link'>
            <i className='fab fa-twitter'></i>
          </a>
          <a href='https://instagram.com' className='tm-social-link'>
            <i className='fab fa-instagram'></i>
          </a>
        </div> */}
      </div>
      <div className='tm-contact-form-container'>
        <form
          id='contact-form'
          action=''
          method='POST'
          className='tm-contact-form'
        >
          <input type='text' name='name' placeholder='name' required={false} />
          <input
            type='email'
            name='email'
            placeholder='email'
            required={false}
          />
          <textarea
            rows={5}
            name='message'
            className='tm-mb-30'
            placeholder='message'
            required={false}
          ></textarea>
          <button type='submit' className='tm-right tm-btn-submit'>
            send
          </button>
        </form>
      </div>
    </section>
  )
}
