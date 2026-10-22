<template>
  <div class="w-full max-w-[420px] mx-auto space-y-6 sm:space-y-7">
    <!-- Top Navigation to Root & Brand -->
    <div class="flex items-center justify-between pb-1">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#141414] text-xs font-semibold border border-[#e0e0e0] transition-all group cursor-pointer"
      >
        <ArrowLeft class="w-3.5 h-3.5 text-[#707070] group-hover:-translate-x-0.5 group-hover:text-[#141414] transition-all" />
        <span>Kembali ke Beranda</span>
      </NuxtLink>

      <NuxtLink to="/" class="inline-flex items-center space-x-2 group">
        <img 
          src="/logo%20aplikasi%20transparant.png" 
          alt="SuaraKita Logo" 
          class="w-7 h-7 object-contain transition-transform duration-200 group-hover:scale-105" 
        />
        <span class="text-base font-bold text-[#141414] tracking-tight">
          SuaraKita<span class="text-[#0066ff]">.</span>
        </span>
      </NuxtLink>
    </div>

    <!-- Segmented Control Toggle (Mobbin Signature) -->
    <div class="bg-[#f3f3f3] p-1 rounded-full flex items-center border border-[#e0e0e0]">
      <div class="flex-1 py-1.5 text-center text-xs font-semibold rounded-full bg-white text-[#141414] shadow-xs cursor-default">
        Masuk
      </div>
      <NuxtLink 
        to="/register" 
        class="flex-1 py-1.5 text-center text-xs font-semibold rounded-full text-[#707070] hover:text-[#141414] transition-colors"
      >
        Daftar Instansi
      </NuxtLink>
    </div>

    <!-- Header Lockup -->
    <div class="space-y-2 text-center sm:text-left">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3f3f3] text-[#707070] text-xs font-medium">
        <span class="w-1.5 h-1.5 rounded-full bg-[#141414]"></span>
        <span>Portal Pengurus Instansi</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight leading-[1.12]">
        Selamat datang kembali.
      </h1>
      <p class="text-xs sm:text-sm text-[#707070] leading-relaxed font-light">
        Masuk ke dashboard untuk mengelola kontes voting, data kandidat, dan memantau perolehan suara secara real-time.
      </p>
    </div>

    <!-- Error Alert (Monochrome Soft Pill) -->
    <div 
      v-if="errorMsg" 
      class="p-3.5 bg-[#f3f3f3] border border-[#e0e0e0] rounded-2xl text-xs text-[#141414] flex items-start gap-2.5"
    >
      <AlertCircle class="w-4 h-4 text-[#141414] shrink-0 mt-0.5" :stroke-width="1.75" />
      <span class="leading-relaxed">{{ errorMsg }}</span>
    </div>

    <!-- Auth Card Surface (ex-auth-form-card) -->
    <div class="bg-white border border-[#e0e0e0] rounded-3xl p-6 sm:p-8 space-y-5">
      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email Input -->
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-[#141414]">
            Email admin
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

        <!-- Password Input -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="block text-xs font-semibold text-[#141414]">
              Kata sandi
            </label>
          </div>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••••••"
              required
              autocomplete="current-password"
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

        <!-- Submit Button (Mobbin button-primary stadium pill) -->
        <div class="pt-2">
          <button
            type="submit"
            :disabled="loading"
            class="w-full h-11 px-6 rounded-full bg-[#141414] hover:bg-[#262626] text-white text-xs sm:text-sm font-semibold transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" :stroke-width="2" />
            <span>Masuk ke Dashboard</span>
          </button>
        </div>
      </form>

      <!-- Card Switch Footer -->
      <div class="pt-4 border-t border-[#f0f0f0] text-center text-xs text-[#707070]">
        <span>Belum memiliki akun instansi? </span>
        <NuxtLink
          to="/register"
          class="text-[#141414] font-semibold hover:underline inline-flex items-center gap-0.5 ml-1"
        >
          <span>Daftar sekarang ↗</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const { loggedIn, user, fetch: fetchSession } = useUserSession()

const redirectByRole = () => {
  if (loggedIn.value && user.value) {
    const role = (user.value as any).role
    if (role === 'SUPER_ADMIN') {
      return navigateTo('/super-admin')
    }
    return navigateTo('/admin')
  }
}

// Cek langsung jika sudah login
if (loggedIn.value) {
  redirectByRole()
}

onMounted(async () => {
  if (!loggedIn.value) {
    await fetchSession()
  }
  redirectByRole()
})

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
    const res = await $fetch<any>('/api/auth/login', {
      method: 'POST',
      body: form,
    })

    await fetchSession()

    if (res?.user?.role === 'SUPER_ADMIN') {
      await navigateTo('/super-admin')
    } else {
      await navigateTo('/admin')
    }
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || err.statusMessage || 'Gagal masuk. Periksa email dan password Anda.'
  } finally {
    loading.value = false
  }
}
</script>

