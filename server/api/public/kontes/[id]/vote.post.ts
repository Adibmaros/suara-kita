import { z } from 'zod'
import { KontesStatus, OrderStatus } from '@prisma/client'

const voteSchema = z.object({
  tokenCode: z.string().trim().min(1, 'Kode token wajib diisi'),
  kandidatId: z.number().int().positive('Pilih kandidat yang valid'),
})

export default defineEventHandler(async (event) => {
  const kontesId = Number(getRouterParam(event, 'id'))
  if (isNaN(kontesId)) {
    throw createError({ statusCode: 400, statusMessage: 'ID kontes tidak valid.' })
  }

  const body = await readBody(event)
  const parseResult = voteSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: parseResult.error.errors[0].message })
  }

  const { tokenCode, kandidatId } = parseResult.data

  // 1. Cek kontes
  const kontes = await prisma.kontes.findUnique({
    where: { id: kontesId },
  })

  if (!kontes) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  if (kontes.status !== KontesStatus.AKTIF) {
    throw createError({ statusCode: 400, statusMessage: 'Voting ditolak. Kontes ini sedang tidak aktif atau sudah ditutup.' })
  }

  // 2. Cek token
  const token = await prisma.token.findUnique({
    where: { code: tokenCode.toUpperCase() },
    include: {
      order: {
        include: {
          package: true,
        },
      },
    },
  })

  if (!token) {
    throw createError({ statusCode: 400, statusMessage: 'Kode token tidak ditemukan. Pastikan Anda memasukkan kode dengan benar.' })
  }

  if (token.isUsed) {
    throw createError({ statusCode: 400, statusMessage: 'Kode token ini sudah pernah digunakan untuk memilih.' })
  }

  if (token.order.status !== OrderStatus.TERVERIFIKASI) {
    throw createError({ statusCode: 400, statusMessage: 'Kode token ini belum terverifikasi oleh admin.' })
  }

  if (token.order.package.kontesId !== kontesId) {
    throw createError({ statusCode: 400, statusMessage: 'Kode token ini bukan untuk kontes ini.' })
  }

  // 3. Cek kandidat
  const kandidat = await prisma.kandidat.findFirst({
    where: { id: kandidatId, kontesId },
  })

  if (!kandidat) {
    throw createError({ statusCode: 404, statusMessage: 'Kandidat pilihan tidak ditemukan di kontes ini.' })
  }

  const voteCount = token.order.package.jumlahSuara

  // 4. Catat Vote & tandai token isUsed dalam transaksi
  const result = await prisma.$transaction(async (tx) => {
    const vote = await tx.vote.create({
      data: {
        tokenId: token.id,
        kandidatId,
        voteCount,
      },
    })

    const updatedToken = await tx.token.update({
      where: { id: token.id },
      data: {
        isUsed: true,
        usedAt: new Date(),
      },
    })

    return { vote, updatedToken }
  })

  return {
    success: true,
    message: `Berhasil menggunakan token! ${voteCount} suara telah ditambahkan untuk ${kandidat.nama}.`,
    kandidatNama: kandidat.nama,
    voteCount,
  }
})
