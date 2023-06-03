import { createContext, useState } from 'react'
import { IThemeContext, IUserContext, Theme, User } from '../utils/settings'

interface Props {
  children: React.ReactNode
}

const defaultTheme: Theme = {
  coverBGColor: '#F96699',
  aboutBGColor: '#38CCCC',
  contactBGColor: '#99CCCC',
}

export const ThemeContext = createContext<IThemeContext>({
  currentTheme: defaultTheme,
  setCurrentTheme: () => {},
})

export function ThemeProvider({ children }: Props) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme)
  const context = { currentTheme, setCurrentTheme }

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  )
}
