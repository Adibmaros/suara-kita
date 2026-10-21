<template>
  <div class="space-y-6 sm:space-y-8 w-full">
    <!-- Form Header -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] font-semibold text-xs">
          <span class="w-1.5 h-1.5 rounded-full bg-[#141414]"></span>
          Pendaftaran Ormawa
        </div>
        <NuxtLink to="/login" class="text-xs font-semibold text-[#141414] hover:underline">
          ← Sudah ada akun?
        </NuxtLink>
      </div>
      <h2 class="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight">
        Daftarkan instansi baru.
      </h2>
      <p class="text-xs sm:text-sm text-[#707070] leading-relaxed max-w-md font-light">
        Daftar gratis untuk mulai mengelola kontes pemilihan digital, duta kampus, dan polling komunitas Anda.
      </p>
    </div>

    <!-- Success Alert -->
    <div v-if="successMsg" class="p-5 bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] text-xs sm:text-sm rounded-3xl flex items-start gap-3">
      <CheckCircle2 class="w-5 h-5 text-[#141414] shrink-0 mt-0.5" />
      <div>
        <p class="font-bold text-[#141414] mb-0.5">Registrasi Terkirim!</p>
        <p class="leading-relaxed text-[#707070]">{{ successMsg }}</p>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMsg" class="p-4 bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] text-xs sm:text-sm rounded-2xl flex items-center gap-2.5">
      <AlertCircle class="w-4 h-4 text-[#141414] shrink-0" />
      <span>{{ errorMsg }}</span>
    </div>

    <!-- Register Form -->
    <form v-if="!successMsg" @submit.prevent="handleRegister" class="space-y-5">
      <!-- Section 1: Data Instansi -->
      <div class="space-y-4">
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
            Nama Instansi / Komunitas <span class="text-[#adadad]">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#adadad]">
              <Building2 class="w-4 h-4" />
            </div>
            <input
              v-model="form.namaInstansi"
              type="text"
              placeholder="cth: BEM Fakultas Teknik / HIMA Manajemen"
              required
              class="w-full h-11 pl-10 pr-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] transition-all"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
              Slug URL <span class="text-[#adadad]">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#adadad]">
                <LinkIcon class="w-4 h-4" />
              </div>
              <input
                v-model="form.slugInstansi"
                type="text"
                placeholder="bem-teknik"
                required
                class="w-full h-11 pl-10 pr-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] transition-all"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
              No. WhatsApp Panitia <span class="text-[#adadad]">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#adadad]">
                <MessageSquare class="w-4 h-4" />
              </div>
              <input
                v-model="form.noWaAdmin"
                type="text"
                placeholder="081234567890"
                required
                class="w-full h-11 pl-10 pr-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] transition-all"
              />
            </div>
          </div>
        </div>

        <p class="text-[11px] text-[#707070]">
          Preview: <span class="font-mono text-[#141414] bg-[#f3f3f3] px-2.5 py-0.5 rounded-full border border-[#e0e0e0]">suarakita.vercel.app/instansi/{{ form.slugInstansi || 'slug' }}</span>
        </p>
      </div>

      <!-- Section 2: Data Akun Admin -->
      <div class="border-t border-[#f0f0f0] pt-5 space-y-4">
        <h3 class="text-xs font-semibold text-[#707070] uppercase tracking-wider">Detail Akun Penanggung Jawab</h3>

        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
            Nama Lengkap Admin <span class="text-[#adadad]">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#adadad]">
              <User class="w-4 h-4" />
            </div>
            <input
              v-model="form.nama"
              type="text"
              placeholder="cth: Ahmad Subagja"
              required
              class="w-full h-11 pl-10 pr-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] transition-all"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
              Email Admin <span class="text-[#adadad]">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#adadad]">
                <Mail class="w-4 h-4" />
              </div>
              <input
                v-model="form.email"
                type="email"
                placeholder="admin@instansi.com"
                required
                class="w-full h-11 pl-10 pr-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] transition-all"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
              Password <span class="text-[#adadad]">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#adadad]">
                <Lock class="w-4 h-4" />
              </div>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                required
                class="w-full h-11 pl-10 pr-10 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] transition-all"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#707070] hover:text-[#141414]"
              >
                <Eye v-if="!showPassword" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full btn-primary disabled:opacity-50 disabled:pointer-events-none"
      >
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        <span>Kirim Pendaftaran Instansi</span>
      </button>
    </form>

    <!-- Footer Link to Login -->
    <div class="pt-4 border-t border-[#f0f0f0] text-xs sm:text-sm text-[#707070] flex flex-col sm:flex-row items-center justify-between gap-2">
      <span>Sudah memiliki akun instansi?</span>
      <NuxtLink to="/login" class="text-[#141414] font-semibold hover:underline">
        Masuk di Sini ↗
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
    errorMsg.value = err.data?.statusMessage || 'Pendaftaran gagal. Periksa kembali formulir Anda.'
  } finally {
    loading.value = false
  }
}
</script>
