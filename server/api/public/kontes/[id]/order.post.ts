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
    throw createError({ statusCode: 400, statusMessage: parseResult.error.issues?.[0]?.message || 'Input tidak valid.' })
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

  const defaultTemplate = `Halo Admin {nama_instansi}, saya mau beli token untuk kontes "{nama_kontes}".
📦 Paket: {nama_paket} ({jumlah_suara} Suara)
💰 Harga: Rp {total_harga}
📋 Order ID: #{nomor_order}

Mohon info rekening pembayaran. Terima kasih!`

  const templateToUse = kontes.instansi.templatePesanWa && kontes.instansi.templatePesanWa.trim() !== ''
    ? kontes.instansi.templatePesanWa
    : defaultTemplate

  let messageText = templateToUse
    .replace(/\{nama_instansi\}/g, kontes.instansi.nama)
    .replace(/\{nama_kontes\}/g, kontes.nama)
    .replace(/\{nama_paket\}/g, tokenPackage.namaPaket)
    .replace(/\{jumlah_suara\}/g, tokenPackage.jumlahSuara.toString())
    .replace(/\{total_harga\}/g, tokenPackage.harga.toLocaleString('id-ID'))
    .replace(/\{nomor_order\}/g, order.id.toString())
    .replace(/\{rekening_admin\}/g, kontes.instansi.infoRekening || '(Akan diberikan oleh admin)')

  const waLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(messageText)}`

  return {
    success: true,
    orderId: order.id,
    waLink,
    messageText,
  }
})
