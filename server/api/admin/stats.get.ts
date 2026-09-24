import { UserRole, OrderStatus } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const instansiId = session.user.instansiId

  const instansi = await prisma.instansi.findUnique({
    where: { id: instansiId },
    select: { persenKomisi: true },
  })

  const persenKomisi = instansi?.persenKomisi ?? 20

  const [totalKontes, listKontes] = await Promise.all([
    prisma.kontes.count({ where: { instansiId } }),
    prisma.kontes.findMany({
      where: { instansiId },
      include: {
        tokenPackages: {
          include: {
            orders: {
              select: { status: true, platformFee: true, package: { select: { harga: true } } },
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
          totalPlatformFee += Math.round(ord.package.harga * (persenKomisi / 100))
        }
      })
    })
  })

  return {
    totalKontes,
    pendingOrdersCount,
    totalPendapatan,
    totalPlatformFee,
    persenKomisi,
    pendapatanBersih: totalPendapatan - totalPlatformFee,
  }
})
