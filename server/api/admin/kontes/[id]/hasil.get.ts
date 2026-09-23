import { UserRole } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI || !session.user.instansiId) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const kontesId = Number(getRouterParam(event, 'id'))

  const kontes = await prisma.kontes.findFirst({
    where: { id: kontesId, instansiId: session.user.instansiId },
    include: {
      kandidat: {
        include: {
          votes: true,
        },
      },
    },
  })

  if (!kontes) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  let totalSuaraMasuk = 0

  const rekapKandidat = kontes.kandidat.map((k) => {
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

  // Hitung persentase
  const rekapWithPercentage = rekapKandidat
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
    leaderboard: rekapWithPercentage,
  }
})
