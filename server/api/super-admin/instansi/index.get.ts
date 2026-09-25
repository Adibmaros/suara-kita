import { UserRole } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.SUPER_ADMIN) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const query = getQuery(event)
  const status = query.status as string | undefined

  const page = Math.max(1, Number(query.page) || 1)
  const perPage = Math.min(50, Math.max(1, Number(query.perPage) || 15))

  const whereCondition = status && status !== 'ALL' ? { status: status as any } : {}

  const [total, listInstansi] = await Promise.all([
    prisma.instansi.count({ where: whereCondition }),
    prisma.instansi.findMany({
      where: whereCondition,
      include: {
        users: { select: { email: true, nama: true } },
        kontes: { select: { id: true, nama: true } },
        _count: { select: { kontes: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
  ])

  return {
    data: listInstansi,
    meta: {
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage) || 1,
    },
  }
})
