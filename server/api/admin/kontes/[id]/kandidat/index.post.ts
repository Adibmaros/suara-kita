import { UserRole } from '@prisma/client'
import { z } from 'zod'

const kandidatSchema = z.object({
  nama: z.string().min(2, 'Nama kandidat minimal 2 karakter'),
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
  const kontes = await prisma.kontes.findFirst({
    where: { id: kontesId, instansiId: session.user.instansiId },
  })

  if (!kontes) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  const body = await readBody(event)
  const parseResult = kandidatSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: parseResult.error.errors[0].message })
  }

  const kandidat = await prisma.kandidat.create({
    data: {
      kontesId,
      nama: parseResult.data.nama,
      nomorUrut: parseResult.data.nomorUrut ?? null,
      fotoUrl: parseResult.data.fotoUrl ?? null,
      deskripsi: parseResult.data.deskripsi ?? null,
    },
  })

  return kandidat
})
