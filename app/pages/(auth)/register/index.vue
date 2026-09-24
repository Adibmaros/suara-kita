<template>
  <div class="space-y-6">
    <div class="space-y-1.5">
      <h2 class="text-2xl font-black text-slate-900 tracking-tight">Pendaftaran Instansi Baru</h2>
      <p class="text-xs text-slate-500">Daftar secara gratis untuk mulai membuat kontes polling</p>
    </div>

    <div v-if="successMsg" class="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2.5">
      <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
      <span>{{ successMsg }}</span>
    </div>

    <div v-if="errorMsg" class="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2.5">
      <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
      <span>{{ errorMsg }}</span>
    </div>

    <form v-if="!successMsg" @submit.prevent="handleRegister" class="space-y-4">
      <div class="space-y-1.5">
        <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Nama Instansi / Organisasi <span class="text-rose-500">*</span></label>
        <input
          v-model="form.namaInstansi"
          type="text"
          placeholder="cth: BEM Fakultas Ilmu Komputer"
          required
          class="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
        />
      </div>

      <div class="space-y-1.5">
        <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">URL Identifier (Slug Instansi) <span class="text-rose-500">*</span></label>
        <input
          v-model="form.slugInstansi"
          type="text"
          placeholder="cth: bem-fikom-2026"
          required
          class="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
        />
        <p class="text-[11px] text-slate-500">URL publik: suarakita.com/instansi/{{ form.slugInstansi || 'slug' }}</p>
      </div>

      <div class="space-y-1.5">
        <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Nomor WhatsApp Admin <span class="text-rose-500">*</span></label>
        <input
          v-model="form.noWaAdmin"
          type="text"
          placeholder="cth: 08123456789"
          required
          class="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
        />
        <p class="text-[11px] text-slate-500">Voter akan menghubungi nomor WA ini saat melakukan pembelian token</p>
      </div>

      <div class="border-t border-slate-200/80 pt-4 space-y-4">
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Nama Penanggung Jawab <span class="text-rose-500">*</span></label>
          <input
            v-model="form.nama"
            type="text"
            placeholder="cth: Ahmad Subagja"
            required
            class="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Email Admin <span class="text-rose-500">*</span></label>
          <input
            v-model="form.email"
            type="email"
            placeholder="admin@instansi.com"
            required
            class="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Password <span class="text-rose-500">*</span></label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            required
            class="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full h-11 mt-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-md hover:shadow-lg active:scale-98"
      >
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        Daftarkan Instansi Sekarang
      </button>
    </form>

    <div class="text-center text-xs text-slate-500 pt-2 border-t border-slate-200/60">
      Sudah punya akun? 
      <NuxtLink to="/login" class="text-slate-900 font-bold hover:underline">
        Masuk di Sini
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const form = reactive({
  namaInstansi: '',
  slugInstansi: '',
  noWaAdmin: '',
  nama: '',
  email: '',
  password: '',
})

// Auto slug string formatting
watch(() => form.namaInstansi, (val) => {
  if (val && !form.slugInstansi) {
    form.slugInstansi = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }
})

const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const handleRegister = async () => {
  loading.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: form,
    })

    successMsg.value = res.message || 'Pendaftaran berhasil. Silakan tunggu persetujuan admin.'
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || 'Pendaftaran gagal. Periksa kembali form anda.'
  } finally {
    loading.value = false
  }
}
</script>
