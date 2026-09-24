import { z } from 'zod'

const updateSettingsSchema = z.object({
  infoRekening: z.string().optional().nullable(),
  templatePesanWa: z.string().optional().nullable(),
})

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user || !user.instansiId) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak memiliki akses.' })
  }

  const body = await readBody(event)
  const parseResult = updateSettingsSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: parseResult.error.issues?.[0]?.message || 'Input tidak valid.' })
  }

  const updated = await prisma.instansi.update({
    where: { id: user.instansiId },
    data: {
      infoRekening: parseResult.data.infoRekening ?? null,
      templatePesanWa: parseResult.data.templatePesanWa ?? null,
    },
    select: {
      id: true,
      nama: true,
      noWaAdmin: true,
      infoRekening: true,
      templatePesanWa: true,
    }
  })

  return {
    success: true,
    message: 'Pengaturan WhatsApp & Rekening berhasil diperbarui.',
    instansi: updated,
  }
})
