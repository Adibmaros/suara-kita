import { UserRole } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const perPage = Math.min(50, Math.max(1, Number(query.perPage) || 12))

  const whereCondition = { instansiId: session.user.instansiId }

  const [total, listKontes] = await Promise.all([
    prisma.kontes.count({ where: whereCondition }),
    prisma.kontes.findMany({
      where: whereCondition,
      include: {
        _count: {
          select: {
            kandidat: true,
            tokenPackages: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
  ])

  return {
    data: listKontes,
    meta: {
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage) || 1,
    },
  }
})
