export default defineEventHandler(async (event) => {
  const kontesList = await prisma.kontes.findMany({
    where: {
      status: 'AKTIF',
    },
    include: {
      instansi: {
        select: {
          id: true,
          nama: true,
          slug: true,
          noWaAdmin: true,
        },
      },
      kandidat: {
        select: {
          id: true,
          nama: true,
          nomorUrut: true,
          fotoUrl: true,
          votes: {
            select: { voteCount: true },
          },
        },
      },
      tokenPackages: {
        select: {
          id: true,
          harga: true,
          jumlahSuara: true,
        },
        orderBy: {
          harga: 'asc',
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return kontesList.map((kontes) => {
    let totalSuaraMasuk = 0
    kontes.kandidat.forEach((k) => {
      const votes = k.votes.reduce((sum, v) => sum + v.voteCount, 0)
      totalSuaraMasuk += votes
    })

    const hargaMulai = kontes.tokenPackages.length > 0 ? kontes.tokenPackages[0].harga : 0
    const totalKandidat = kontes.kandidat.length

    return {
      id: kontes.id,
      nama: kontes.nama,
      deskripsi: kontes.deskripsi,
      tanggalMulai: kontes.tanggalMulai,
      tanggalSelesai: kontes.tanggalSelesai,
      status: kontes.status,
      instansi: kontes.instansi,
      totalSuaraMasuk,
      hargaMulai,
      totalKandidat,
    }
  })
})
