import { UserRole, KontesStatus } from '@prisma/client'
import { z } from 'zod'

const createKontesSchema = z.object({
  nama: z.string().min(3, 'Nama kontes minimal 3 karakter'),
  deskripsi: z.string().optional(),
  tanggalMulai: z.string().optional().nullable(),
  tanggalSelesai: z.string().optional().nullable(),
  status: z.nativeEnum(KontesStatus).default(KontesStatus.DRAFT),
})

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const body = await readBody(event)
  const parseResult = createKontesSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: parseResult.error.errors[0].message })
  }

  const { nama, deskripsi, tanggalMulai, tanggalSelesai, status } = parseResult.data

  const kontes = await prisma.kontes.create({
    data: {
      instansiId: session.user.instansiId,
      nama,
      deskripsi,
      tanggalMulai: tanggalMulai ? new Date(tanggalMulai) : null,
      tanggalSelesai: tanggalSelesai ? new Date(tanggalSelesai) : null,
      status,
    },
  })

  return kontes
})
