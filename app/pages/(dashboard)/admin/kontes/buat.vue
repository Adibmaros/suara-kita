<template>
  <div class="max-w-2xl space-y-6">
    <div>
      <NuxtLink to="/admin/kontes" class="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 font-medium transition-colors mb-2">
        ← Kembali ke Daftar Kontes
      </NuxtLink>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Buat Kontes Baru</h1>
      <p class="text-xs text-slate-500 mt-1">Isi rincian kontes atau polling yang akan diselenggarakan</p>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
      <form @submit.prevent="handleCreate" class="space-y-4">
        <div v-if="errorMsg" class="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
          <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
          <span>{{ errorMsg }}</span>
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Nama Kontes <span class="text-rose-500">*</span></label>
          <input
            v-model="form.nama"
            type="text"
            placeholder="cth: Duta Fakultas Ilmu Komputer 2026"
            required
            class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Deskripsi Kontes</label>
          <textarea
            v-model="form.deskripsi"
            rows="3"
            class="w-full p-3 bg-white border border-slate-200 rounded-md text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
            placeholder="Jelaskan secara singkat mengenai kontes ini..."
          ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Tanggal Mulai</label>
            <input
              v-model="form.tanggalMulai"
              type="datetime-local"
              class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Tanggal Selesai</label>
            <input
              v-model="form.tanggalSelesai"
              type="datetime-local"
              class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Status Awal</label>
          <select
            v-model="form.status"
            class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
          >
            <option value="DRAFT">DRAFT (Belum Dipublikasi)</option>
            <option value="AKTIF">AKTIF (Mulai Menerima Vote)</option>
          </select>
        </div>

        <div class="pt-4 flex justify-end space-x-3 border-t border-slate-100">
          <NuxtLink to="/admin/kontes" class="inline-flex items-center justify-center px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-xs rounded-md transition-colors">
            Batal
          </NuxtLink>
          <button
            type="submit"
            :disabled="creating"
            class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs"
          >
            <Loader2 v-if="creating" class="w-4 h-4 mr-2 animate-spin" />
            Simpan & Lanjutkan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const form = reactive({
  nama: '',
  deskripsi: '',
  tanggalMulai: '',
  tanggalSelesai: '',
  status: 'DRAFT',
})

const creating = ref(false)
const errorMsg = ref('')

const handleCreate = async () => {
  creating.value = true
  errorMsg.value = ''

  try {
    const kontes = await $fetch('/api/admin/kontes', {
      method: 'POST',
      body: form,
    })

    await navigateTo(`/admin/kontes/${kontes.id}`)
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || 'Gagal membuat kontes.'
  } finally {
    creating.value = false
  }
}
</script>
