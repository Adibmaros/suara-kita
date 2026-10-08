<template>
  <div class="space-y-6 sm:space-y-8 w-full">
    <!-- Form Header -->
    <div class="space-y-2">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs mb-1">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
        Portal Admin & Pengurus
      </div>
      <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
        Selamat Datang Kembali 👋
      </h2>
      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
        Masuk ke dashboard admin untuk kelola kontes, kandidat, dan pantau perolehan suara secara real-time.
      </p>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMsg" class="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm rounded-xl flex items-center gap-2.5">
      <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
      <span>{{ errorMsg }}</span>
    </div>

    <!-- Login Form -->
    <form @submit.prevent="handleLogin" class="space-y-5">
      <!-- Email Input -->
      <div class="space-y-2">
        <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Alamat Email Admin <span class="text-rose-500">*</span>
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
            class="w-full h-12 pl-10 pr-4 bg-white border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors shadow-2xs"
          />
        </div>
      </div>

      <!-- Password Input -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Password <span class="text-rose-500">*</span>
          </label>
        </div>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Lock class="w-4.5 h-4.5" />
          </div>
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••••••"
            required
            class="w-full h-12 pl-10 pr-10 bg-white border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors shadow-2xs"
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

      <!-- Security Guarantee -->
      <div class="flex items-center justify-between pt-1 text-xs">
        <span class="text-slate-500">Sistem terenkripsi aman</span>
        <span class="text-emerald-700 font-medium flex items-center gap-1">
          <ShieldCheck class="w-4 h-4 text-emerald-600" />
          SSL Enkripsi 256-bit
        </span>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full h-12 mt-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-md hover:shadow-lg active:scale-98"
      >
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        <span>Masuk ke Dashboard</span>
      </button>
    </form>

    <!-- Register Footer CTA -->
    <div class="pt-4 border-t border-slate-200/80 text-xs sm:text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
      <span>Belum memiliki akun instansi atau organisasi?</span>
      <NuxtLink
        to="/register"
        class="text-slate-900 font-bold hover:underline flex items-center gap-1"
      >
        <Building2 class="w-4 h-4 text-blue-600" />
        <span>Daftarkan Instansi Sekarang</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ShieldCheck, Building2 } from 'lucide-vue-next'

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
    errorMsg.value = err.data?.statusMessage || 'Gagal masuk. Periksa email dan password.'
  } finally {
    loading.value = false
  }
}
</script>
