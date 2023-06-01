import { useContext, useState } from 'react'
import { APIURL, Hero } from '../utils/settings'
import { UserContext } from '../context/UserContext'

export default function NewHeroForm() {
  const [hero, setHero] = useState<Hero>({ name: '', skills: '', bio: '', public_id: '' })
  const userContext = useContext(UserContext)

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    switch (e.target.name) {
      case 'hero-name':
        setHero({ ...hero, name: e.target.value })
        break
      case 'skills':
        setHero({ ...hero, skills: e.target.value })
        break
      case 'bio':
        setHero({ ...hero, bio: e.target.value })
        break
    }
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const token = `Token ${userContext.currentUser?.token}`

    fetch(`${APIURL}/heroes/`, {
      method: 'POST',
      body: JSON.stringify(hero),
      headers: { 'Content-type': 'application/json; charset=UTF-8', 'Authorization': token },
    })
      .then((promisse) => promisse.json())
      .then((data) => console.log(data))
      .catch((error) => console.log('error while POSTING hero', error))
  }

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>New Hero Form</h1>
      <input
        name='hero-name'
        type='text'
        placeholder='hero name'
        value={hero?.name}
        onChange={(e) => handleOnChange(e)}
      />
      <input
        name='skills'
        type='text'
        placeholder='hero skills'
        value={hero?.skills}
        onChange={(e) => handleOnChange(e)}
      />
      <textarea
        name='bio'
        placeholder='bio'
        value={hero?.bio}
        onChange={(e) => handleOnChange(e)}
      />
      <button type='submit' onClick={(e) => handleSubmit(e)}>
        Salvar
      </button>
    </form>
  )
}
