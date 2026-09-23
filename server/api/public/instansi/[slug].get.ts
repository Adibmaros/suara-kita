import { InstansiStatus, KontesStatus } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug instansi tidak ditemukan.' })
  }

  const instansi = await prisma.instansi.findUnique({
    where: { slug, status: InstansiStatus.AKTIF },
    select: {
      id: true,
      nama: true,
      slug: true,
      noWaAdmin: true,
      createdAt: true,
      kontes: {
        where: { status: KontesStatus.AKTIF },
        select: {
          id: true,
          nama: true,
          deskripsi: true,
          tanggalMulai: true,
          tanggalSelesai: true,
          status: true,
          _count: {
            select: { kandidat: true, tokenPackages: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!instansi) {
    throw createError({ statusCode: 404, statusMessage: 'Instansi tidak ditemukan atau tidak aktif.' })
  }

  return instansi
})
