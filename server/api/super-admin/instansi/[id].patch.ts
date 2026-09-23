import { UserRole, InstansiStatus } from '@prisma/client'
import { z } from 'zod'

const updateStatusSchema = z.object({
  status: z.nativeEnum(InstansiStatus),
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
  const parseResult = updateStatusSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: 'Status tidak valid.' })
  }

  const updatedInstansi = await prisma.instansi.update({
    where: { id },
    data: { status: parseResult.data.status },
  })

  // Catat audit log
  await prisma.logAudit.create({
    data: {
      instansiId: id,
      aktor: session.user.email,
      aksi: `Mengubah status instansi menjadi ${parseResult.data.status}`,
    },
  })

  return updatedInstansi
})
