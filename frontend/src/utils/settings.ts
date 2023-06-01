import { PointerEventHandler } from "react"

export const APIURL = 'http://127.0.0.1:8000/'
export const HERO = `${APIURL}/hero/36bc4fa3-fc40-4a63-8bbb-adec53208381airi`

export type User = {
  username?: string
  token?: string
  password?: string
}

export interface IUserContext {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
}

export type Hero = {
    name: string
    skills: string
    bio: string
    public_id: string
    instagram?: string
    twitter?: string
    linkedin?: string
    facebook?: string
    phone?: string
    address?: string
    whatsapp?: string
  }