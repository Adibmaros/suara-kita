import { UserRole, OrderStatus } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.SUPER_ADMIN) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const [totalInstansi, pendingInstansi, totalKontes, verifiedOrders] = await Promise.all([
    prisma.instansi.count(),
    prisma.instansi.count({ where: { status: 'PENDING' } }),
    prisma.kontes.count(),
    prisma.order.findMany({
      where: { status: OrderStatus.TERVERIFIKASI },
      select: { platformFee: true, package: { select: { harga: true } } },
    }),
  ])

  const totalRevenue = verifiedOrders.reduce((sum, order) => sum + order.package.harga, 0)
  const totalPlatformFee = verifiedOrders.reduce((sum, order) => sum + (order.platformFee || 0), 0)

  return {
    totalInstansi,
    pendingInstansi,
    totalKontes,
    totalRevenue,
    totalPlatformFee,
  }
})
