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

  const whereCondition: any = {
    package: { kontesId },
  }
  if (status && Object.values(OrderStatus).includes(status as any)) {
    whereCondition.status = status
  }

  const orders = await prisma.order.findMany({
    where: whereCondition,
    include: {
      package: true,
      token: true,
      verifiedBy: { select: { nama: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return orders
})
