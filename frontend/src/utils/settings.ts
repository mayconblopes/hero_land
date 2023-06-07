export const APIURL = 'http://127.0.0.1:8000'
// export const HERO = `${APIURL}/hero/36bc4fa3-fc40-4a63-8bbb-adec53208381airi`
// export const HERO = `${APIURL}/hero/36bc4fa3-fc40-4aMike3-8bbb-adec53208381`
export const HEROES = `${APIURL}/heroes`
export const THEMES = `${APIURL}/themes`

export type User = {
  username?: string
  token?: string
  password?: string
}

export interface IUserContext {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
}

export interface IHeroContext {
  currentHero: Hero | null
  setCurrentHero: (hero: Hero | null) => void
}

export type ElementToChangeInThemeContext =
  | 'cover_bgcolor'
  | 'about_bgcolor'
  | 'contact_bgcolor'
  | 'page_bgcolor'
  | 'font_color'

export type Theme = {
  id?: string
  cover_bgcolor: string
  about_bgcolor: string
  contact_bgcolor: string
  page_bgcolor: string
  font_color: string
}

export interface IThemeContext {
  currentTheme: Theme
  setCurrentTheme: (theme: Theme) => void
}

export type Hero = {
  [key: string]: any
  id?: string
  name?: string
  username?: string
  skills?: string
  bio?: string
  public_id?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  facebook?: string
  phone?: string
  address?: string
  whatsapp?: string
  cover_url?: string
  cover?: File
  theme?: string
}
