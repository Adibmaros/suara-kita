import { UserRole } from '@prisma/client'
import { z } from 'zod'

const updateKandidatSchema = z.object({
  nama: z.string().min(2, 'Nama kandidat minimal 2 karakter').optional(),
  nomorUrut: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return null
    const num = Number(val)
    return isNaN(num) ? val : num
  }, z.number().nullable().optional()),
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

  if (isNaN(kontesId) || isNaN(kandidatId)) {
    throw createError({ statusCode: 400, statusMessage: 'Parameter ID tidak valid.' })
  }

  const kontes = await prisma.kontes.findFirst({
    where: { id: kontesId, instansiId: session.user.instansiId },
  })
  if (!kontes) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  const existingKandidat = await prisma.kandidat.findFirst({
    where: { id: kandidatId, kontesId },
  })
  if (!existingKandidat) {
    throw createError({ statusCode: 404, statusMessage: 'Kandidat tidak ditemukan dalam kontes ini.' })
  }

  const rawBody = await readBody(event)
  const body = {
    ...rawBody,
    deskripsi: rawBody.deskripsi !== undefined ? rawBody.deskripsi : rawBody.visiMisi,
  }
  const parseResult = updateKandidatSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: parseResult.error.errors[0].message })
  }

  const updated = await prisma.kandidat.update({
    where: { id: kandidatId },
    data: {
      ...(parseResult.data.nama !== undefined && { nama: parseResult.data.nama }),
      ...(parseResult.data.nomorUrut !== undefined && { nomorUrut: parseResult.data.nomorUrut }),
      ...(parseResult.data.fotoUrl !== undefined && { fotoUrl: parseResult.data.fotoUrl }),
      ...(parseResult.data.deskripsi !== undefined && { deskripsi: parseResult.data.deskripsi }),
    },
  })

  return updated
})
