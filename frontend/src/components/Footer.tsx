import { useContext } from "react"
import { useParams } from "react-router-dom"

export default function Footer() {
  const {username} = useParams()
  return (
    <footer className='tm-footer'>
      <p>
        © HeroLand, by{' '}
        <a
          rel="sponsored noreferrer"
          href='https://maycon.barretolopes.com'
          target="_blank"
          className='tm-link-gray'
        >
          @mayconblopes
        </a> | <a id='login' href={`/${username}/login`}>login</a>
      </p>
    </footer>
  )
}
