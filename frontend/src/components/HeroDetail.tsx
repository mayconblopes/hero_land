import { useContext } from 'react'
import { APIURL } from '../utils/settings'
import { UserContext } from '../context/UserContext'

export default function HeroDetail() {

    const userContext = useContext(UserContext)
    
    return (
        <button onClick={() => {
        fetch(`${APIURL}/users`)
          .then((promisse) => promisse.json())
          .then((users) => console.log(users))
          .catch((error) => console.log(error))

    }} >Users</button>
  )
}
