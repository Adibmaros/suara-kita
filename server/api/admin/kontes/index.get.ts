import { UserRole } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const listKontes = await prisma.kontes.findMany({
    where: { instansiId: session.user.instansiId },
    include: {
      _count: {
        select: {
          kandidat: true,
          tokenPackages: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return listKontes
})
