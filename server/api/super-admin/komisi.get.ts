import { UserRole, OrderStatus } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.SUPER_ADMIN) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  // Rekap komisi per instansi
  const listInstansi = await prisma.instansi.findMany({
    include: {
      kontes: {
        include: {
          tokenPackages: {
            include: {
              orders: {
                where: { status: OrderStatus.TERVERIFIKASI },
                select: { platformFee: true, package: { select: { harga: true } } },
              },
            },
          },
        },
      },
    },
  })

  const rekap = listInstansi.map((instansi) => {
    let totalOmset = 0
    let totalKomisi = 0
    let totalOrdersVerified = 0
    const rate = (instansi.persenKomisi ?? 20) / 100

    instansi.kontes.forEach((k) => {
      k.tokenPackages.forEach((pkg) => {
        pkg.orders.forEach((ord) => {
          totalOmset += ord.package.harga
          totalKomisi += Math.round(ord.package.harga * rate)
          totalOrdersVerified += 1
        })
      })
    })

    return {
      instansiId: instansi.id,
      namaInstansi: instansi.nama,
      slug: instansi.slug,
      noWaAdmin: instansi.noWaAdmin,
      persenKomisi: instansi.persenKomisi ?? 20,
      totalOrdersVerified,
      totalOmset,
      totalKomisi,
    }
  })

  return rekap
})
