<template>
  <div class="space-y-6 sm:space-y-8 w-full">
    <!-- Form Header -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          Pendaftaran Instansi / Organisasi
        </div>
        <NuxtLink to="/login" class="text-xs font-semibold text-blue-600 hover:underline">
          ← Sudah ada akun? Masuk
        </NuxtLink>
      </div>
      <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
        Daftarkan Instansi Baru 🏛️
      </h2>
      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
        Daftar secara gratis untuk mulai mengelola kontes pemilihan digital dan polling untuk komunitas atau organisasi Anda.
      </p>
    </div>

    <!-- Success Alert -->
    <div v-if="successMsg" class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-2xl flex items-start gap-3 shadow-2xs">
      <CheckCircle2 class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
      <div>
        <p class="font-bold text-emerald-900 mb-0.5">Registrasi Terkirim!</p>
        <p class="leading-relaxed">{{ successMsg }}</p>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMsg" class="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm rounded-xl flex items-center gap-2.5">
      <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
      <span>{{ errorMsg }}</span>
    </div>

    <!-- Register Form -->
    <form v-if="!successMsg" @submit.prevent="handleRegister" class="space-y-5">
      <!-- Section 1: Data Instansi -->
      <div class="space-y-4">
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Nama Instansi / Organisasi <span class="text-rose-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Building2 class="w-4.5 h-4.5" />
            </div>
            <input
              v-model="form.namaInstansi"
              type="text"
              placeholder="cth: Komunitas Pemuda Mandiri / HIMA Manajemen"
              required
              class="w-full h-11.5 pl-10 pr-4 bg-white border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors shadow-2xs"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Slug URL Identifier <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <LinkIcon class="w-4.5 h-4.5" />
              </div>
              <input
                v-model="form.slugInstansi"
                type="text"
                placeholder="pemuda-mandiri"
                required
                class="w-full h-11.5 pl-10 pr-4 bg-white border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors shadow-2xs"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              No. WhatsApp Admin <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <MessageSquare class="w-4.5 h-4.5" />
              </div>
              <input
                v-model="form.noWaAdmin"
                type="text"
                placeholder="081234567890"
                required
                class="w-full h-11.5 pl-10 pr-4 bg-white border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors shadow-2xs"
              />
            </div>
          </div>
        </div>

        <p class="text-[11px] text-slate-500">
          Preview URL: <span class="font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60">suarakita.id/instansi/{{ form.slugInstansi || 'slug' }}</span>
        </p>
      </div>

      <!-- Section 2: Data Akun Admin -->
      <div class="border-t border-slate-200/80 pt-5 space-y-4">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Detail Akun Penanggung Jawab</h3>

        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Nama Lengkap Admin <span class="text-rose-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User class="w-4.5 h-4.5" />
            </div>
            <input
              v-model="form.nama"
              type="text"
              placeholder="cth: Ahmad Subagja"
              required
              class="w-full h-11.5 pl-10 pr-4 bg-white border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors shadow-2xs"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Email Admin <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail class="w-4.5 h-4.5" />
              </div>
              <input
                v-model="form.email"
                type="email"
                placeholder="admin@instansi.com"
                required
                class="w-full h-11.5 pl-10 pr-4 bg-white border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors shadow-2xs"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Password <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock class="w-4.5 h-4.5" />
              </div>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                required
                class="w-full h-11.5 pl-10 pr-10 bg-white border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors shadow-2xs"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <Eye v-if="!showPassword" class="w-4.5 h-4.5" />
                <EyeOff v-else class="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full h-12 mt-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-md hover:shadow-lg active:scale-98"
      >
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        <span>Kirim Pendaftaran Instansi</span>
      </button>
    </form>

    <!-- Footer Link to Login -->
    <div class="pt-4 border-t border-slate-200/80 text-xs sm:text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
      <span>Sudah memiliki akun instansi?</span>
      <NuxtLink to="/login" class="text-slate-900 font-bold hover:underline">
        Masuk di Sini
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { Building2, Link as LinkIcon, MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-vue-next'

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

const showPassword = ref(false)

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
