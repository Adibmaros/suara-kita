<template>
  <div class="w-full max-w-[540px] mx-auto space-y-6 sm:space-y-7">
    <!-- Segmented Control Toggle (Mobbin Signature) -->
    <div class="bg-[#f3f3f3] p-1 rounded-full flex items-center border border-[#e0e0e0]">
      <NuxtLink 
        to="/login" 
        class="flex-1 py-1.5 text-center text-xs font-semibold rounded-full text-[#707070] hover:text-[#141414] transition-colors"
      >
        Masuk
      </NuxtLink>
      <div class="flex-1 py-1.5 text-center text-xs font-semibold rounded-full bg-white text-[#141414] shadow-xs cursor-default">
        Daftar Instansi
      </div>
    </div>

    <!-- Header Lockup -->
    <div class="space-y-2 text-center sm:text-left">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3f3f3] text-[#707070] text-xs font-medium">
        <span class="w-1.5 h-1.5 rounded-full bg-[#141414]"></span>
        <span>Pendaftaran Organisasi & Ormawa</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight leading-[1.12]">
        Daftarkan instansi baru.
      </h1>
      <p class="text-xs sm:text-sm text-[#707070] leading-relaxed font-light">
        Buat akun pengurus ormawa atau komunitas kampus untuk mulai menyelenggarakan pemilihan digital transparan.
      </p>
    </div>

    <!-- Success Confirmation (Monochrome Soft Card) -->
    <div 
      v-if="successMsg" 
      class="bg-white border border-[#e0e0e0] rounded-3xl p-6 sm:p-8 space-y-4"
    >
      <div class="w-12 h-12 rounded-[30%] bg-[#f3f3f3] border border-[#e0e0e0] flex items-center justify-center text-[#141414]">
        <CheckCircle2 class="w-6 h-6" :stroke-width="1.75" />
      </div>

      <div class="space-y-1">
        <h3 class="text-lg font-bold text-[#141414] tracking-tight">
          Pendaftaran berhasil dikirim.
        </h3>
        <p class="text-xs sm:text-sm text-[#707070] leading-relaxed font-light">
          {{ successMsg }}
        </p>
      </div>

      <div class="pt-2">
        <NuxtLink 
          to="/login" 
          class="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#141414] hover:bg-[#262626] text-white text-xs font-semibold transition-all active:scale-[0.99]"
        >
          <span>Menuju Halaman Masuk →</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Error Alert (Monochrome Soft Pill) -->
    <div 
      v-if="errorMsg && !successMsg" 
      class="p-3.5 bg-[#f3f3f3] border border-[#e0e0e0] rounded-2xl text-xs text-[#141414] flex items-start gap-2.5"
    >
      <AlertCircle class="w-4 h-4 text-[#141414] shrink-0 mt-0.5" :stroke-width="1.75" />
      <span class="leading-relaxed">{{ errorMsg }}</span>
    </div>

    <!-- Register Form Surface (ex-auth-form-card) -->
    <div v-if="!successMsg" class="bg-white border border-[#e0e0e0] rounded-3xl p-6 sm:p-8 space-y-6">
      <form @submit.prevent="handleRegister" class="space-y-5">
        <!-- Section 1: Informasi Instansi -->
        <div class="space-y-3.5">
          <div class="text-xs font-bold text-[#141414]">
            1. Informasi Instansi
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-[#141414]">
              Nama instansi / ormawa <span class="text-[#adadad]">*</span>
            </label>
            <input
              v-model="form.namaInstansi"
              type="text"
              placeholder="cth: BEM Fakultas Teknik"
              required
              class="w-full h-11 px-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] focus:bg-white transition-all"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-[#141414]">
                Slug URL <span class="text-[#adadad]">*</span>
              </label>
              <input
                v-model="form.slugInstansi"
                type="text"
                placeholder="bem-teknik"
                required
                class="w-full h-11 px-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] focus:bg-white transition-all font-mono text-xs"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-[#141414]">
                No. WhatsApp panitia <span class="text-[#adadad]">*</span>
              </label>
              <input
                v-model="form.noWaAdmin"
                type="tel"
                placeholder="081234567890"
                required
                class="w-full h-11 px-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] focus:bg-white transition-all"
              />
            </div>
          </div>

          <!-- Slug Preview -->
          <div class="flex items-center gap-2 text-[11px] text-[#707070] pt-0.5">
            <span>Alamat publik:</span>
            <span class="font-mono text-[#141414] bg-[#f0f0f0] px-2.5 py-0.5 rounded-full text-[11px]">
              /instansi/{{ form.slugInstansi || 'slug' }}
            </span>
          </div>
        </div>

        <!-- Section 2: Akun Admin -->
        <div class="space-y-3.5 pt-4 border-t border-[#f0f0f0]">
          <div class="text-xs font-bold text-[#141414]">
            2. Akun Penanggung Jawab
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-[#141414]">
              Nama lengkap admin <span class="text-[#adadad]">*</span>
            </label>
            <input
              v-model="form.nama"
              type="text"
              placeholder="cth: Ahmad Subagja"
              required
              class="w-full h-11 px-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] focus:bg-white transition-all"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-[#141414]">
                Email admin <span class="text-[#adadad]">*</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                placeholder="admin@instansi.com"
                required
                autocomplete="email"
                class="w-full h-11 px-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] focus:bg-white transition-all"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-[#141414]">
                Kata sandi <span class="text-[#adadad]">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••••••"
                  required
                  autocomplete="new-password"
                  class="w-full h-11 pl-4 pr-11 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] focus:bg-white transition-all font-mono"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-0 top-0 bottom-0 pr-3.5 flex items-center text-[#707070] hover:text-[#141414] transition-colors cursor-pointer"
                  :title="showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
                >
                  <EyeOff v-if="showPassword" class="w-4 h-4" :stroke-width="1.75" />
                  <Eye v-else class="w-4 h-4" :stroke-width="1.75" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button (Mobbin button-primary stadium pill) -->
        <div class="pt-3">
          <button
            type="submit"
            :disabled="loading"
            class="w-full h-11 px-6 rounded-full bg-[#141414] hover:bg-[#262626] text-white text-xs sm:text-sm font-semibold transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" :stroke-width="2" />
            <span>Kirim Pendaftaran Instansi</span>
          </button>
        </div>
      </form>

      <!-- Card Switch Footer -->
      <div class="pt-4 border-t border-[#f0f0f0] text-center text-xs text-[#707070]">
        <span>Sudah memiliki akun instansi? </span>
        <NuxtLink
          to="/login"
          class="text-[#141414] font-semibold hover:underline inline-flex items-center gap-0.5 ml-1"
        >
          <span>Masuk di sini ↗</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-vue-next'

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

// Otomatis buat slug saat nama instansi diketik
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
    const res = await $fetch<any>('/api/auth/register', {
      method: 'POST',
      body: form,
    })

    successMsg.value = res?.message || 'Pendaftaran berhasil dikirim. Silakan tunggu persetujuan tim verifikasi.'
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || err.statusMessage || 'Pendaftaran gagal. Periksa kembali formulir Anda.'
  } finally {
    loading.value = false
  }
}
</script>

