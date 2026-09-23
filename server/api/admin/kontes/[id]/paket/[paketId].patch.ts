import { UserRole } from '@prisma/client'
import { z } from 'zod'

const updatePaketSchema = z.object({
  namaPaket: z.string().min(2, 'Nama paket minimal 2 karakter').optional(),
  jumlahSuara: z.number().min(1, 'Jumlah suara minimal 1').optional(),
  harga: z.number().min(0, 'Harga tidak boleh negatif').optional(),
})

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const kontesId = Number(getRouterParam(event, 'id'))
  const paketId = Number(getRouterParam(event, 'paketId'))

  const kontes = await prisma.kontes.findFirst({
    where: { id: kontesId, instansiId: session.user.instansiId },
  })
  if (!kontes) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  const body = await readBody(event)
  const parseResult = updatePaketSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: parseResult.error.errors[0].message })
  }

  const updated = await prisma.tokenPackage.update({
    where: { id: paketId },
    data: parseResult.data,
  })

  return updated
})
