import type { UserRole } from '@prisma/client'

declare module '#auth-utils' {
  interface User {
    id: number
    nama: string | null
    email: string
    role: UserRole
    instansiId: number | null
  }
}

export {}
