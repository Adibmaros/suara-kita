<template>
  <div class="space-y-6 sm:space-y-8 w-full">
    <!-- Form Header -->
    <div class="space-y-2">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] font-semibold text-xs mb-1">
        <span class="w-1.5 h-1.5 rounded-full bg-[#141414]"></span>
        <span>Portal Pengurus Instansi</span>
      </div>
      <h2 class="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight">
        Selamat datang kembali.
      </h2>
      <p class="text-xs sm:text-sm text-[#707070] leading-relaxed max-w-md font-light">
        Masuk ke dashboard admin untuk mengelola kontes, kandidat, dan memantau perolehan suara secara real-time.
      </p>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMsg" class="p-4 bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] text-xs sm:text-sm rounded-2xl flex items-center gap-2.5">
      <AlertCircle class="w-4 h-4 text-[#141414] shrink-0" />
      <span>{{ errorMsg }}</span>
    </div>

    <!-- Login Form -->
    <form @submit.prevent="handleLogin" class="space-y-5">
      <!-- Email Input -->
      <div class="space-y-2">
        <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
          Email Admin
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

      <!-- Password Input -->
      <div class="space-y-2">
        <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
          Password
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#adadad]">
            <Lock class="w-4 h-4" />
          </div>
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••••••"
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

      <!-- Security Guarantee -->
      <div class="flex items-center justify-between pt-1 text-xs">
        <span class="text-[#707070]">Sistem terenkripsi</span>
        <span class="text-[#141414] font-semibold flex items-center gap-1">
          <ShieldCheck class="w-4 h-4 text-[#141414]" />
          SSL Enkripsi 256-bit
        </span>
      </div>

      <!-- Submit Button (Mobbin button-primary stadium pill) -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full btn-primary disabled:opacity-50 disabled:pointer-events-none"
      >
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        <span>Masuk ke Dashboard</span>
      </button>
    </form>

    <!-- Register Footer CTA -->
    <div class="pt-4 border-t border-[#f0f0f0] text-xs sm:text-sm text-[#707070] flex flex-col sm:flex-row items-center justify-between gap-2">
      <span>Belum memiliki akun instansi?</span>
      <NuxtLink
        to="/register"
        class="text-[#141414] font-semibold hover:underline flex items-center gap-1"
      >
        <span>Daftar Sekarang ↗</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ShieldCheck } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const { fetch: fetchSession } = useUserSession()

const form = reactive({
  email: '',
  password: '',
})

const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''

  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: form,
    })

    await fetchSession()

    if (res.user.role === 'SUPER_ADMIN') {
      await navigateTo('/super-admin')
    } else {
      await navigateTo('/admin')
    }
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || 'Gagal masuk. Periksa email dan password Anda.'
  } finally {
    loading.value = false
  }
}
</script>
