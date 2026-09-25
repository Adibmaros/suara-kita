import { UserRole, KontesStatus } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID kontes tidak valid.' })
  }

  const existing = await prisma.kontes.findFirst({
    where: { id, instansiId: session.user.instansiId },
    include: {
      kandidat: { select: { id: true } },
      tokenPackages: { select: { id: true } },
    },
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  if (existing.status !== KontesStatus.DRAFT) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Hanya kontes berstatus DRAFT yang dapat dihapus. Silakan ubah status kontes ke DRAFT terlebih dahulu.',
    })
  }

  const kandidatIds = existing.kandidat.map((k) => k.id)
  const packageIds = existing.tokenPackages.map((p) => p.id)

  // Transaction for manual cascade delete
  await prisma.$transaction(async (tx) => {
    // 1. Delete Votes for kandidat of this contest
    if (kandidatIds.length > 0) {
      await tx.vote.deleteMany({
        where: { kandidatId: { in: kandidatIds } },
      })
    }

    // 2. Find orders for packages of this contest
    let orderIds: number[] = []
    if (packageIds.length > 0) {
      const orders = await tx.order.findMany({
        where: { packageId: { in: packageIds } },
        select: { id: true },
      })
      orderIds = orders.map((o) => o.id)
    }

    // 3. Find tokens for these orders and delete votes tied to tokens (if any)
    if (orderIds.length > 0) {
      const tokens = await tx.token.findMany({
        where: { orderId: { in: orderIds } },
        select: { id: true },
      })
      const tokenIds = tokens.map((t) => t.id)
      if (tokenIds.length > 0) {
        await tx.vote.deleteMany({
          where: { tokenId: { in: tokenIds } },
        })
      }

      // 4. Delete tokens
      await tx.token.deleteMany({
        where: { orderId: { in: orderIds } },
      })

      // 5. Delete orders
      await tx.order.deleteMany({
        where: { id: { in: orderIds } },
      })
    }

    // 6. Delete kandidat
    if (kandidatIds.length > 0) {
      await tx.kandidat.deleteMany({
        where: { id: { in: kandidatIds } },
      })
    }

    // 7. Delete token packages
    if (packageIds.length > 0) {
      await tx.tokenPackage.deleteMany({
        where: { id: { in: packageIds } },
      })
    }

    // 8. Finally delete the kontes
    await tx.kontes.delete({
      where: { id },
    })
  })

  return { message: 'Kontes berhasil dihapus.' }
})
