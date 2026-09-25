import { UserRole, OrderStatus } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const kontesId = Number(getRouterParam(event, 'id'))
  const query = getQuery(event)
  const status = query.status as string | undefined

  const kontes = await prisma.kontes.findFirst({
    where: { id: kontesId, instansiId: session.user.instansiId },
  })
  if (!kontes) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  const page = Math.max(1, Number(query.page) || 1)
  const perPage = Math.min(50, Math.max(1, Number(query.perPage) || 20))

  const whereCondition: any = {
    package: { kontesId },
  }
  if (status && status !== 'ALL' && Object.values(OrderStatus).includes(status as any)) {
    whereCondition.status = status
  }

  const [total, orders] = await Promise.all([
    prisma.order.count({ where: whereCondition }),
    prisma.order.findMany({
      where: whereCondition,
      include: {
        package: true,
        token: true,
        verifiedBy: { select: { nama: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
  ])

  return {
    data: orders,
    meta: {
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage) || 1,
    },
  }
})
