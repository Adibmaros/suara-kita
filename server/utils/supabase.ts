import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

export const getSupabaseClient = () => {
    if (supabaseInstance) return supabaseInstance

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            'SUPABASE_URL atau SUPABASE_ANON_KEY belum dikonfigurasi di file .env. Silakan lengkapi konfigurasi Supabase di .env.'
        )
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    return supabaseInstance
}

const DEFAULT_BUCKET = process.env.SUPABASE_BUCKET || 'files'

interface StorageOptions {
    path?: string
    bucketName?: string
    contentType?: string
}

export const uploadFile = async (
    fileData: Buffer | File | Uint8Array,
    originalFileName: string,
    { path = 'files', bucketName = DEFAULT_BUCKET, contentType }: StorageOptions = {}
): Promise<{ fileName: string; publicUrl: string }> => {
    const client = getSupabaseClient()
    const sanitized = originalFileName.replace(/[^a-zA-Z0-9._-]/g, '_')
    const uniqueFileName = `${Date.now()}_${sanitized}`
    const fullPath = `public/${path}/${uniqueFileName}`

    const { error } = await client.storage.from(bucketName).upload(fullPath, fileData, {
        cacheControl: '3600',
        upsert: true,
        contentType: contentType || 'application/octet-stream',
    })

    if (error) throw new Error(`Upload failed: ${error.message}`)

    const { data } = client.storage.from(bucketName).getPublicUrl(fullPath)

    return { fileName: uniqueFileName, publicUrl: data.publicUrl }
}

export const getFileUrl = (fullPath: string, { bucketName = DEFAULT_BUCKET }: StorageOptions = {}): string => {
    const client = getSupabaseClient()
    const { data } = client.storage.from(bucketName).getPublicUrl(fullPath)
    return data.publicUrl
}

export const deleteFile = async (fullPath: string, { bucketName = DEFAULT_BUCKET }: StorageOptions = {}): Promise<void> => {
    const client = getSupabaseClient()
    const { error } = await client.storage.from(bucketName).remove([fullPath])
    if (error) throw new Error(`Delete failed: ${error.message}`)
}