import { UserRole } from '@prisma/client'
import { z } from 'zod'

const updateProfilSchema = z.object({
  nama: z.string().min(3, 'Nama instansi minimal 3 karakter'),
  noWaAdmin: z.string().min(8, 'Nomor WA tidak valid'),
})

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const body = await readBody(event)
  const parseResult = updateProfilSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: parseResult.error.errors[0].message })
  }

  const updatedInstansi = await prisma.instansi.update({
    where: { id: session.user.instansiId },
    data: {
      nama: parseResult.data.nama,
      noWaAdmin: parseResult.data.noWaAdmin,
    },
  })

  return updatedInstansi
})
