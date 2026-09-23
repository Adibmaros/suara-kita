export default defineEventHandler(async (event) => {
  const kontesId = Number(getRouterParam(event, 'id'))
  if (isNaN(kontesId)) {
    throw createError({ statusCode: 400, statusMessage: 'ID kontes tidak valid.' })
  }

  const kontes = await prisma.kontes.findUnique({
    where: { id: kontesId },
    select: {
      id: true,
      nama: true,
      status: true,
      kandidat: {
        select: {
          id: true,
          nama: true,
          nomorUrut: true,
          fotoUrl: true,
          votes: { select: { voteCount: true } },
        },
      },
    },
  })

  if (!kontes) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  let totalSuaraMasuk = 0
  const kandidatStats = kontes.kandidat.map((k) => {
    const totalSuara = k.votes.reduce((sum, v) => sum + v.voteCount, 0)
    totalSuaraMasuk += totalSuara
    return {
      id: k.id,
      nama: k.nama,
      nomorUrut: k.nomorUrut,
      fotoUrl: k.fotoUrl,
      totalSuara,
    }
  })

  const leaderboard = kandidatStats
    .map((k) => ({
      ...k,
      persentase: totalSuaraMasuk > 0 ? ((k.totalSuara / totalSuaraMasuk) * 100).toFixed(1) : '0.0',
    }))
    .sort((a, b) => b.totalSuara - a.totalSuara)

  return {
    kontesId: kontes.id,
    namaKontes: kontes.nama,
    status: kontes.status,
    totalSuaraMasuk,
    leaderboard,
  }
})
