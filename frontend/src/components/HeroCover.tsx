import './heroCover.css'

type HeroCoverProps = {
  name: string
  cover: string
}

export default function HeroCover({ name, cover }: HeroCoverProps) {
  return (
    <section className='tm-site-header hero-container tm-mb-50 tm-bgcolor-1 tm-border-rounded'>
      <div className='hero-cover-image'
        style={{
          height: '100%',
          width: '315px',
          backgroundImage: `url(${cover})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
        }}
      />
      {/* <img className='hero-cover-image'
        src={cover}
        alt={`foto de ${name}`}
      /> */}
      <h1 id='name'>{name}</h1>
    </section>
  )
}
