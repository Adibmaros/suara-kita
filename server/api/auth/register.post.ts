import { z } from 'zod'
import { UserRole, InstansiStatus, Prisma } from '@prisma/client'
import { scryptSync, randomBytes } from 'crypto'
import prisma from "../../utils/prisma"



const registerSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  namaInstansi: z.string().min(3, 'Nama instansi minimal 3 karakter'),
  slugInstansi: z.string().min(3, 'Slug instansi minimal 3 karakter').regex(/^[a-z0-9-]+$/, 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung'),
  noWaAdmin: z.string().min(8, 'Nomor WA tidak valid'),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parseResult = registerSchema.safeParse(body)

  if (!parseResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parseResult.error.issues?.[0]?.message || 'Input tidak valid',
    })
  }

  const { email, password, nama, namaInstansi, slugInstansi, noWaAdmin } = parseResult.data

  // Cek apakah email sudah terdaftar
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email sudah terdaftar.',
    })
  }

  // Cek apakah slug instansi sudah terdaftar
  const existingInstansi = await prisma.instansi.findUnique({
    where: { slug: slugInstansi },
  })

  if (existingInstansi) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug instansi sudah digunakan. Pilih slug lain.',
    })
  }

  // Hash password using crypto scryptSync
  const salt = randomBytes(16).toString('hex')
  const hashedPassword = scryptSync(password, salt, 64).toString('hex')
  const passwordHash = `${salt}:${hashedPassword}`

  // Buat instansi & user dalam transaksi
  const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {

    const instansi = await tx.instansi.create({
      data: {
        nama: namaInstansi,
        slug: slugInstansi,
        noWaAdmin,
        status: InstansiStatus.PENDING,
      },
    })

    const user = await tx.user.create({
      data: {
        email,
        password: passwordHash,
        nama,
        role: UserRole.ADMIN_INSTANSI,
        instansiId: instansi.id,
      },
    })

    return { instansi, user }
  })

  return {
    success: true,
    message: 'Pendaftaran instansi berhasil! Akun Anda sedang menunggu persetujuan dari Super Admin.',
    instansiId: result.instansi.id,
  }
})
