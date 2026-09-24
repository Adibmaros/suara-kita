import { UserRole, OrderStatus } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const instansiId = session.user.instansiId

  const [totalKontes, listKontes] = await Promise.all([
    prisma.kontes.count({ where: { instansiId } }),
    prisma.kontes.findMany({
      where: { instansiId },
      include: {
        tokenPackages: {
          include: {
            orders: {
              select: { status: true, package: { select: { harga: true } } },
            },
          },
        },
      },
    }),
  ])

  let pendingOrdersCount = 0
  let totalPendapatan = 0
  let totalPlatformFee = 0

  listKontes.forEach((k) => {
    k.tokenPackages.forEach((pkg) => {
      pkg.orders.forEach((ord) => {
        if (ord.status === OrderStatus.MENUNGGU_VERIFIKASI) {
          pendingOrdersCount += 1
        } else if (ord.status === OrderStatus.TERVERIFIKASI) {
          totalPendapatan += ord.package.harga
          totalPlatformFee += Math.round(ord.package.harga * 0.2)
        }
      })
    })
  })

  return {
    totalKontes,
    pendingOrdersCount,
    totalPendapatan,
    totalPlatformFee,
    pendapatanBersih: totalPendapatan - totalPlatformFee,
  }
})
