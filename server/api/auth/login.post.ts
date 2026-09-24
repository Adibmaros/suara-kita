import { z } from 'zod'
import { UserRole, InstansiStatus } from '@prisma/client'
import { scryptSync } from 'crypto'
import prisma from "../../utils/prisma"


const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password tidak boleh kosong'),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parseResult = loginSchema.safeParse(body)

  if (!parseResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parseResult.error.issues[0].message,
    })
  }

  const { email, password } = parseResult.data

  const user = await prisma.user.findUnique({
    where: { email },
    include: { instansi: true },
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Email atau password salah.',
    })
  }

  // Verify password using scryptSync
  const [salt, storedHash] = user.password.split(':')
  let isValidPassword = false
  if (salt && storedHash) {
    const computedHash = scryptSync(password, salt, 64).toString('hex')
    isValidPassword = computedHash === storedHash
  }

  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Email atau password salah.',
    })
  }

  // Jika admin instansi, cek status instansi
  if (user.role === UserRole.ADMIN_INSTANSI) {
    if (!user.instansi) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Instansi tidak ditemukan.',
      })
    }

    if (user.instansi.status === InstansiStatus.PENDING) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Akun instansi Anda masih menunggu persetujuan dari Super Admin.',
      })
    }

    if (user.instansi.status === InstansiStatus.NONAKTIF) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Akun instansi Anda telah dinonaktifkan. Silakan hubungi Super Admin.',
      })
    }
  }

  // Set user session via nuxt-auth-utils
  await setUserSession(event, {
    user: {
      id: user.id,
      nama: user.nama,
      email: user.email,
      role: user.role,
      instansiId: user.instansiId,
    },
  })

  return {
    success: true,
    user: {
      id: user.id,
      nama: user.nama,
      email: user.email,
      role: user.role,
      instansiId: user.instansiId,
    },
  }
})
