export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID kontes tidak valid.' })
  }

  const kontes = await prisma.kontes.findUnique({
    where: { id },
    include: {
      instansi: {
        select: { id: true, nama: true, slug: true, noWaAdmin: true },
      },
      kandidat: {
        select: {
          id: true,
          nama: true,
          nomorUrut: true,
          fotoUrl: true,
          deskripsi: true,
          votes: { select: { voteCount: true } },
        },
        orderBy: { nomorUrut: 'asc' },
      },
      tokenPackages: {
        select: { id: true, namaPaket: true, jumlahSuara: true, harga: true },
        orderBy: { harga: 'asc' },
      },
    },
  })

  if (!kontes) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  // Aggregate votes for leaderboard
  let totalSuaraMasuk = 0
  const kandidatWithVotes = kontes.kandidat.map((k) => {
    const totalSuara = k.votes.reduce((sum, v) => sum + v.voteCount, 0)
    totalSuaraMasuk += totalSuara
    const { votes, ...kandidatInfo } = k
    return {
      ...kandidatInfo,
      totalSuara,
    }
  })

  const leaderboard = kandidatWithVotes
    .map((k) => ({
      ...k,
      persentase: totalSuaraMasuk > 0 ? ((k.totalSuara / totalSuaraMasuk) * 100).toFixed(1) : '0.0',
    }))
    .sort((a, b) => b.totalSuara - a.totalSuara)

  return {
    id: kontes.id,
    nama: kontes.nama,
    deskripsi: kontes.deskripsi,
    tanggalMulai: kontes.tanggalMulai,
    tanggalSelesai: kontes.tanggalSelesai,
    status: kontes.status,
    instansi: kontes.instansi,
    tokenPackages: kontes.tokenPackages,
    leaderboard,
    totalSuaraMasuk,
  }
})
