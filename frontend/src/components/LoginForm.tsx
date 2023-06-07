import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { APIURL, User } from '../utils/settings'
import { useNavigate, useParams } from 'react-router-dom'
import './loginForm.css'

export default function LoginForm() {
  const { username } = useParams()
  const [user, setUser] = useState<User>({ username: username, password: '' })

  const userContext = useContext(UserContext)
  const navigator = useNavigate()

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === 'username') {
      setUser({
        ...user,
        username: e.target.value,
      })
    } else if (e.target.name === 'password') {
      setUser({
        ...user,
        password: e.target.value,
      })
    }
  }

  function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    let loggedIn: { username: string; token: string; error?: string } | null =
      null

    if (user.username && user.password) {
      fetch(`${APIURL}/login`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          loggedIn = data
          if (loggedIn!.error) {
            console.log(loggedIn!.error)
          } else {
            userContext.setCurrentUser(loggedIn)
            navigator(`/${user.username}`)
          }
        })
        .catch((error) => console.log('error while login', error))
    }
  }
  return (
    <div>
      <form id='login-form'>
        <input
          id='username-input'
          type='text'
          name='username'
          placeholder='username'
          onChange={handleOnChange}
          value={user.username}
          disabled
          style={{ display: 'none' }}
        />
        <input
          id='password-input'
          type='password'
          name='password'
          placeholder='senha'
          onChange={handleOnChange}
          value={user.password}
        />
        <button onClick={(e) => handleLogin(e)}>Login</button>
      </form>
    </div>
  )
}
