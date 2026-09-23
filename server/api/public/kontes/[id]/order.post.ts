import { z } from 'zod'
import { KontesStatus, OrderStatus } from '@prisma/client'

const createOrderSchema = z.object({
  packageId: z.number().int().positive('Package ID tidak valid'),
  kontakWa: z.string().optional().nullable(),
})

export default defineEventHandler(async (event) => {
  const kontesId = Number(getRouterParam(event, 'id'))
  if (isNaN(kontesId)) {
    throw createError({ statusCode: 400, statusMessage: 'ID kontes tidak valid.' })
  }

  const kontes = await prisma.kontes.findUnique({
    where: { id: kontesId },
    include: { instansi: true },
  })

  if (!kontes) {
    throw createError({ statusCode: 404, statusMessage: 'Kontes tidak ditemukan.' })
  }

  if (kontes.status !== KontesStatus.AKTIF) {
    throw createError({ statusCode: 400, statusMessage: 'Kontes ini sedang tidak aktif atau sudah ditutup.' })
  }

  const body = await readBody(event)
  const parseResult = createOrderSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: parseResult.error.errors[0].message })
  }

  const { packageId, kontakWa } = parseResult.data

  const tokenPackage = await prisma.tokenPackage.findFirst({
    where: { id: packageId, kontesId },
  })

  if (!tokenPackage) {
    throw createError({ statusCode: 404, statusMessage: 'Paket token tidak ditemukan.' })
  }

  // Buat order dengan status MENUNGGU_VERIFIKASI
  const order = await prisma.order.create({
    data: {
      packageId,
      kontakWa: kontakWa || null,
      status: OrderStatus.MENUNGGU_VERIFIKASI,
    },
  })

  // Format pesan WhatsApp
  const cleanPhone = kontes.instansi.noWaAdmin.replace(/[^0-9]/g, '')
  const formattedPhone = cleanPhone.startsWith('0') ? `62${cleanPhone.slice(1)}` : cleanPhone

  const messageText = `Halo Admin ${kontes.instansi.nama}, saya mau beli token untuk kontes "${kontes.nama}".
📦 Paket: ${tokenPackage.namaPaket} (${tokenPackage.jumlahSuara} Suara)
💰 Harga: Rp ${tokenPackage.harga.toLocaleString('id-ID')}
📋 Order ID: #${order.id}

Mohon info rekening pembayaran. Terima kasih!`

  const waLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(messageText)}`

  return {
    success: true,
    orderId: order.id,
    waLink,
    messageText,
  }
})
