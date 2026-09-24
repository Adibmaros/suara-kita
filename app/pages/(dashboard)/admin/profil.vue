<template>
  <div class="max-w-2xl space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Profil Instansi</h1>
      <p class="text-xs text-slate-500 mt-1">Perbarui informasi instansi & WhatsApp admin</p>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
      <div v-if="pending" class="text-slate-500 text-sm">Memuat data profil...</div>

      <form v-else @submit.prevent="handleSave" class="space-y-4">
        <div v-if="successMsg" class="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{{ successMsg }}</span>
        </div>

        <div v-if="errorMsg" class="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
          <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
          <span>{{ errorMsg }}</span>
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Nama Instansi <span class="text-rose-500">*</span></label>
          <input
            v-model="form.nama"
            type="text"
            required
            class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Nomor WA Admin Instansi <span class="text-rose-500">*</span></label>
          <input
            v-model="form.noWaAdmin"
            type="text"
            required
            class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
          />
          <p class="text-[11px] text-slate-500">Digunakan voter untuk konfirmasi pembayaran token</p>
        </div>

        <div class="pt-2">
          <button
            type="submit"
            :disabled="saving"
            class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs"
          >
            <Loader2 v-if="saving" class="w-4 h-4 mr-2 animate-spin" />
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const { data: instansi, pending } = await useFetch('/api/admin/profil')

const form = reactive({
  nama: '',
  noWaAdmin: '',
})

watch(instansi, (val) => {
  if (val) {
    form.nama = val.nama
    form.noWaAdmin = val.noWaAdmin
  }
}, { immediate: true })

const saving = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const handleSave = async () => {
  saving.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {
    await $fetch('/api/admin/profil', {
      method: 'PATCH',
      body: form,
    })
    successMsg.value = 'Profil instansi berhasil diperbarui.'
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || 'Gagal menyimpan profil.'
  } finally {
    saving.value = false
  }
}
</script>
