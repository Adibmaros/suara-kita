import { UserRole, OrderStatus } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const kontesId = Number(getRouterParam(event, 'id'))
  const orderId = Number(getRouterParam(event, 'orderId'))

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      package: { kontesId, kontes: { instansiId: session.user.instansiId } },
    },
    include: { 
      package: {
        include: {
          kontes: {
            include: {
              instansi: { select: { persenKomisi: true } }
            }
          }
        }
      }, 
      token: true 
    },
  })

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Order tidak ditemukan.' })
  }

  if (order.status === OrderStatus.TERVERIFIKASI && order.token) {
    return {
      success: true,
      message: 'Order sudah pernah diverifikasi.',
      token: order.token.code,
    }
  }

  // Hitung platform fee sesuai persenKomisi instansi (default 20%)
  const persenKomisi = order.package.kontes.instansi.persenKomisi ?? 20
  const platformFee = Math.round(order.package.harga * (persenKomisi / 100))

  // Generate token unik
  const tokenCode = await generateUniqueTokenCode()

  // Update order & create token dalam transaksi
  const result = await prisma.$transaction(async (tx) => {
    const updatedOrder = await tx.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.TERVERIFIKASI,
        platformFee,
        verifiedById: session.user.id,
        verifiedAt: new Date(),
      },
    })

    const token = await tx.token.create({
      data: {
        orderId,
        code: tokenCode,
      },
    })

    return { updatedOrder, token }
  })

  return {
    success: true,
    message: 'Order berhasil diverifikasi! Token telah di-generate.',
    tokenCode: result.token.code,
    order: result.updatedOrder,
  }
})
