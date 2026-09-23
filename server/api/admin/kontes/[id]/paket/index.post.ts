import { UserRole } from '@prisma/client'
import { z } from 'zod'

const paketSchema = z.object({
  namaPaket: z.string().min(2, 'Nama paket minimal 2 karakter'),
  jumlahSuara: z.number().min(1, 'Jumlah suara minimal 1'),
  harga: z.number().min(0, 'Harga tidak boleh negatif'),
})

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const kontesId = Number(getRouterParam(event, 'id'))
  const kontes = await prisma.kontes.findFirst({
    where: { id: kontesId, instansiId: session.user.instansiId },
  })
  if (!kontes) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  const body = await readBody(event)
  const parseResult = paketSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: parseResult.error.errors[0].message })
  }

  const paket = await prisma.tokenPackage.create({
    data: {
      kontesId,
      namaPaket: parseResult.data.namaPaket,
      jumlahSuara: parseResult.data.jumlahSuara,
      harga: parseResult.data.harga,
    },
  })

  return paket
})
