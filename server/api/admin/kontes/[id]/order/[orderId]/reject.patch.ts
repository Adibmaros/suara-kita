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
  })

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Order tidak ditemukan.' })
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.DITOLAK,
      verifiedById: session.user.id,
      verifiedAt: new Date(),
    },
  })

  return {
    success: true,
    message: 'Order telah ditolak.',
    order: updatedOrder,
  }
})
