import { UserRole } from '@prisma/client'
import { z } from 'zod'

const paketSchema = z.object({
  namaPaket: z.string().trim().min(2, 'Nama paket minimal 2 karakter'),
  jumlahSuara: z.coerce.number().min(1, 'Jumlah suara minimal 1'),
  harga: z.coerce.number().min(0, 'Harga tidak boleh negatif'),
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
  
  // Dukung field name 'jumlahSuara' maupun 'jumlahToken' dari frontend
  const normalizedBody = {
    ...body,
    jumlahSuara: body.jumlahSuara ?? body.jumlahToken,
  }

  const parseResult = paketSchema.safeParse(normalizedBody)
  if (!parseResult.success) {
    const errorMsg = parseResult.error.issues?.[0]?.message || 'Data paket token tidak valid.'
    throw createError({ statusCode: 400, statusMessage: errorMsg })
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

