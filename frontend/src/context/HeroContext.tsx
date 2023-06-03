import { createContext, useState } from 'react'
import { Hero, IHeroContext } from '../utils/settings'

interface Props {
  children: React.ReactNode
}

export const HeroContext = createContext<IHeroContext>({
  currentHero: null,
  setCurrentHero: () => {},
})

export function HeroProvider({ children }: Props) {
  const [currentHero, setCurrentHero] = useState<Hero | null>(null)
  const context = { currentHero, setCurrentHero }

  return <HeroContext.Provider value={context}>{children}</HeroContext.Provider>
}
