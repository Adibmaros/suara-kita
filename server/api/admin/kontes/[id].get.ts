import { UserRole } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID kontes tidak valid.' })
  }

  const kontes = await prisma.kontes.findFirst({
    where: { id, instansiId: session.user.instansiId },
    include: {
      kandidat: { orderBy: { nomorUrut: 'asc' } },
      tokenPackages: { orderBy: { harga: 'asc' } },
    },
  })

  if (!kontes) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  return kontes
})
