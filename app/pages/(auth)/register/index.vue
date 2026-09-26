<template>
  <div class="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-8 shadow-xs sm:shadow-sm space-y-5 sm:space-y-6">
    <div class="space-y-1">
      <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Pendaftaran Instansi Baru</h2>
      <p class="text-xs sm:text-sm text-slate-500">Daftar secara gratis untuk mulai membuat kontes polling</p>
    </div>

    <div v-if="successMsg" class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-2xl flex items-start gap-3">
      <CheckCircle2 class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
      <div>
        <p class="font-bold text-emerald-900 mb-0.5">Registrasi Terkirim!</p>
        <p>{{ successMsg }}</p>
      </div>
    </div>

    <div v-if="errorMsg" class="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm rounded-xl flex items-center gap-2.5">
      <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
      <span>{{ errorMsg }}</span>
    </div>

    <form v-if="!successMsg" @submit.prevent="handleRegister" class="space-y-4">
      <!-- Section 1: Data Instansi -->
      <div class="space-y-3 sm:space-y-4">
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Nama Instansi / Organisasi <span class="text-rose-500">*</span></label>
          <input
            v-model="form.namaInstansi"
            type="text"
            placeholder="cth: BEM Fakultas Ilmu Komputer"
            required
            class="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">URL Identifier (Slug) <span class="text-rose-500">*</span></label>
            <input
              v-model="form.slugInstansi"
              type="text"
              placeholder="bem-fikom-2026"
              required
              class="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Nomor WhatsApp Admin <span class="text-rose-500">*</span></label>
            <input
              v-model="form.noWaAdmin"
              type="text"
              placeholder="cth: 08123456789"
              required
              class="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
            />
          </div>
        </div>
        
        <p class="text-[11px] text-slate-500 leading-tight">
          URL publik: <span class="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">suarakita.com/instansi/{{ form.slugInstansi || 'slug' }}</span>
        </p>
      </div>

      <!-- Section 2: Data Akun Admin -->
      <div class="border-t border-slate-200/80 pt-4 space-y-3.5">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Detail Akun Admin</h3>
        
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Nama Penanggung Jawab <span class="text-rose-500">*</span></label>
          <input
            v-model="form.nama"
            type="text"
            placeholder="cth: Ahmad Subagja"
            required
            class="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Email Admin <span class="text-rose-500">*</span></label>
            <input
              v-model="form.email"
              type="email"
              placeholder="admin@instansi.com"
              required
              class="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password <span class="text-rose-500">*</span></label>
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full h-11 mt-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-md hover:shadow-lg active:scale-98"
      >
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        Daftarkan Instansi Sekarang
      </button>
    </form>

    <div class="text-center text-xs text-slate-500 pt-3 border-t border-slate-200/60">
      Sudah punya akun? 
      <NuxtLink to="/login" class="text-slate-900 font-bold hover:underline ml-0.5">
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
