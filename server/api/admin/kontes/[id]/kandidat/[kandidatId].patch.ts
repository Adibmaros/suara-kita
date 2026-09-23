import { UserRole } from '@prisma/client'
import { z } from 'zod'

const updateKandidatSchema = z.object({
  nama: z.string().min(2, 'Nama kandidat minimal 2 karakter').optional(),
  nomorUrut: z.number().optional().nullable(),
  fotoUrl: z.string().optional().nullable(),
  deskripsi: z.string().optional().nullable(),
})

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const kontesId = Number(getRouterParam(event, 'id'))
  const kandidatId = Number(getRouterParam(event, 'kandidatId'))

  const kontes = await prisma.kontes.findFirst({
    where: { id: kontesId, instansiId: session.user.instansiId },
  })
  if (!kontes) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  const body = await readBody(event)
  const parseResult = updateKandidatSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: parseResult.error.errors[0].message })
  }

  const updated = await prisma.kandidat.update({
    where: { id: kandidatId },
    data: parseResult.data,
  })

  return updated
})
