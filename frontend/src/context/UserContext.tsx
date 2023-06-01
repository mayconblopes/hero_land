import { createContext, useEffect, useState } from 'react'
import { IUserContext, User } from '../utils/settings'

interface Props {
  children: React.ReactNode
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  setCurrentUser: () => {},
})

export function UserProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const context = { currentUser, setCurrentUser }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}
