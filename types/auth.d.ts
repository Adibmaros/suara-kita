import type { UserRole } from '@prisma/client'

interface UserData {
  id: number | string
  nama?: string | null
  email: string
  role: UserRole | string
  instansiId?: number | null
}

declare module '#auth-utils' {
  interface User extends UserData {}
}

declare module 'nuxt-auth-utils' {
  interface User extends UserData {}
}

export {}
