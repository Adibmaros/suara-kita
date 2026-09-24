import { UserRole } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.SUPER_ADMIN) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const query = getQuery(event)
  const status = query.status as string | undefined

  const whereCondition = status ? { status: status as any } : {}

  const listInstansi = await prisma.instansi.findMany({
    where: whereCondition,
    include: {
      users: { select: { email: true, nama: true } },
      kontes: { select: { id: true, nama: true } },
      _count: { select: { kontes: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return listInstansi
})
