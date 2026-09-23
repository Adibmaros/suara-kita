import { UserRole } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const instansi = await prisma.instansi.findUnique({
    where: { id: session.user.instansiId },
    include: { users: { select: { email: true, nama: true } } },
  })

  if (!instansi) {
    throw createError({ statusCode: 404, statusMessage: 'Instansi tidak ditemukan.' })
  }

  return instansi
})
