import { UserRole } from '@prisma/client'
import { uploadFile } from '~~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== UserRole.ADMIN_INSTANSI && session.user.role !== UserRole.SUPER_ADMIN) {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak.' })
  }

  const formData = await readMultipartFormData(event)
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada file yang diunggah.' })
  }

  const file = formData.find((f) => f.name === 'file')
  if (!file || !file.data) {
    throw createError({ statusCode: 400, statusMessage: 'File tidak ditemukan.' })
  }

  try {
    const result = await uploadFile(file.data, file.filename || 'kandidat.jpg', {
      path: 'kandidat',
      contentType: file.type || 'image/jpeg',
    })

    return {
      url: result.publicUrl,
      publicUrl: result.publicUrl,
    }
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Gagal mengunggah file ke Supabase storage.',
    })
  }
})
