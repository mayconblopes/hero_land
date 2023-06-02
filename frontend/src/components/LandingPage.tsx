import { Hero } from "../utils/settings"
import Footer from "./Footer"
import HeroAbout from "./HeroAbout"
import HeroContact from "./HeroContact"
import HeroCover from "./HeroCover"

export default function LandingPage({hero}: {hero?: Hero}) {
  return (
    <>
      {hero && (
        <div className='tm-container-fluid'>
          <HeroCover
            name={hero.name}
            cover={
              hero.cover_url || `$https://ui-avatars.com/api/?name=${hero.name}`
            }
          />
          <HeroAbout about={hero.bio} />
          <HeroContact
            instagram={hero.instagram}
            twitter={hero.twitter}
            linkedin={hero.linkedin}
            facebook={hero.facebook}
            phone={hero.phone}
            address={hero.address}
            whatsapp={hero.whatsapp}
          />
          <Footer />
        </div>
      )}
      <button
        onClick={(e) => {
          e.preventDefault()
          console.log(hero)
        }}
      >
        Hero
      </button>
    </>
  )
}
