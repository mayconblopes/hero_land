import { createContext, useContext, useEffect, useState } from 'react'
import { IThemeContext, THEMES, Theme } from '../utils/settings'
import { HeroContext } from './HeroContext'

interface Props {
  children: React.ReactNode
}

const defaultTheme: Theme = {
  cover_bgcolor: '',
  about_bgcolor: '',
  contact_bgcolor: '',
  page_bgcolor: '',
  font_color: '',
}

export const ThemeContext = createContext<IThemeContext>({
  currentTheme: defaultTheme,
  setCurrentTheme: () => {},
})

export function ThemeProvider({ children }: Props) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme)
  const context = { currentTheme, setCurrentTheme }
  const { currentHero } = useContext(HeroContext)

  useEffect(() => {
    fetch(`${THEMES}`)
      .then((promisse) => promisse.json())
      .then((themes) => {
        const theme = themes.filter(
          (theme: { id: string }) => theme.id === currentHero?.theme
        )[0]
        if (theme) {
          setCurrentTheme({
            id: theme.id,
            cover_bgcolor: theme.cover_bgcolor,
            about_bgcolor: theme.about_bgcolor,
            contact_bgcolor: theme.contact_bgcolor,
            page_bgcolor: theme.page_bgcolor,
            font_color: theme.font_color
          })
        }
      })
      .catch((error) => console.log(error))
  }, [currentHero?.theme])

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  )
}
