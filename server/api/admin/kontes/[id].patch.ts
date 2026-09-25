import { UserRole, KontesStatus } from '@prisma/client'
import { z } from 'zod'

const updateKontesSchema = z.object({
  nama: z.string().min(3, 'Nama kontes minimal 3 karakter').optional(),
  deskripsi: z.string().optional().nullable(),
  tanggalMulai: z.string().optional().nullable(),
  tanggalSelesai: z.string().optional().nullable(),
  status: z.nativeEnum(KontesStatus).optional(),
  infoRekening: z.string().optional().nullable(),
  templatePesanWa: z.string().optional().nullable(),
})

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID kontes tidak valid.' })
  }

  const existing = await prisma.kontes.findFirst({
    where: { id, instansiId: session.user.instansiId },
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  const body = await readBody(event)
  const parseResult = updateKontesSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: parseResult.error.errors[0].message })
  }

  const dataToUpdate: any = {}
  if (parseResult.data.nama !== undefined) dataToUpdate.nama = parseResult.data.nama
  if (parseResult.data.deskripsi !== undefined) dataToUpdate.deskripsi = parseResult.data.deskripsi
  if (parseResult.data.status !== undefined) dataToUpdate.status = parseResult.data.status
  if (parseResult.data.tanggalMulai !== undefined) {
    dataToUpdate.tanggalMulai = parseResult.data.tanggalMulai ? new Date(parseResult.data.tanggalMulai) : null
  }
  if (parseResult.data.tanggalSelesai !== undefined) {
    dataToUpdate.tanggalSelesai = parseResult.data.tanggalSelesai ? new Date(parseResult.data.tanggalSelesai) : null
  }
  // Update instansi infoRekening & templatePesanWa jika dikirim
  if (parseResult.data.infoRekening !== undefined || parseResult.data.templatePesanWa !== undefined) {
    const instansiDataToUpdate: any = {}
    if (parseResult.data.infoRekening !== undefined) instansiDataToUpdate.infoRekening = parseResult.data.infoRekening
    if (parseResult.data.templatePesanWa !== undefined) instansiDataToUpdate.templatePesanWa = parseResult.data.templatePesanWa

    await prisma.instansi.update({
      where: { id: session.user.instansiId },
      data: instansiDataToUpdate,
    })
  }

  let updated = existing
  if (Object.keys(dataToUpdate).length > 0) {
    updated = await prisma.kontes.update({
      where: { id },
      data: dataToUpdate,
    })
  }

  return updated
})
