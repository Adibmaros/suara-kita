import { UserRole, InstansiStatus } from '@prisma/client'
import { z } from 'zod'

const updateInstansiSchema = z.object({
  status: z.nativeEnum(InstansiStatus).optional(),
  persenKomisi: z.number().min(0).max(100).optional(),
})

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.SUPER_ADMIN) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID instansi tidak valid.' })
  }

  const body = await readBody(event)
  const parseResult = updateInstansiSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: 'Data masukan tidak valid.' })
  }

  const dataToUpdate: Record<string, any> = {}
  if (parseResult.data.status !== undefined) {
    dataToUpdate.status = parseResult.data.status
  }
  if (parseResult.data.persenKomisi !== undefined) {
    dataToUpdate.persenKomisi = parseResult.data.persenKomisi
  }

  if (Object.keys(dataToUpdate).length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada data yang diperbarui.' })
  }

  const updatedInstansi = await prisma.instansi.update({
    where: { id },
    data: dataToUpdate,
  })

  // Catat audit log
  await prisma.logAudit.create({
    data: {
      instansiId: id,
      aktor: session.user.email,
      aksi: `Mengubah data instansi (${Object.keys(dataToUpdate).join(', ')})`,
    },
  })

  return updatedInstansi
})
