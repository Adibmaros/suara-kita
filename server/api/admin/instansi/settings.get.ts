export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user || !user.instansiId) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak memiliki akses.' })
  }

  const instansi = await prisma.instansi.findUnique({
    where: { id: user.instansiId },
    select: {
      id: true,
      nama: true,
      noWaAdmin: true,
      infoRekening: true,
      templatePesanWa: true,
    }
  })

  if (!instansi) {
    throw createError({ statusCode: 404, statusMessage: 'Instansi tidak ditemukan.' })
  }

  return {
    success: true,
    instansi,
  }
})
