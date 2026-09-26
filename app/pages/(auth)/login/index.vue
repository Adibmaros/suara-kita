<template>
  <div class="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-8 shadow-xs sm:shadow-sm space-y-5 sm:space-y-6">
    <div class="space-y-1">
      <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Masuk ke SuaraKita</h2>
      <p class="text-xs sm:text-sm text-slate-500">Masuk sebagai Admin Instansi atau Super Admin</p>
    </div>

    <div v-if="errorMsg" class="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm rounded-xl flex items-center gap-2.5">
      <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
      <span>{{ errorMsg }}</span>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div class="space-y-1.5">
        <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Email Admin</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="admin@instansi.com"
          required
          class="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
        />
      </div>

      <div class="space-y-1.5">
        <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
        <input
          v-model="form.password"
          type="password"
          placeholder="••••••••"
          required
          class="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full h-11 mt-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-md hover:shadow-lg active:scale-98"
      >
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        Masuk ke Dashboard
      </button>
    </form>

    <div class="text-center text-xs text-slate-500 pt-3 border-t border-slate-200/60">
      Belum punya akun instansi? 
      <NuxtLink to="/register" class="text-slate-900 font-bold hover:underline ml-0.5">
        Daftarkan Instansi Sekarang
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const { fetch: fetchSession } = useUserSession()

const form = reactive({
  email: '',
  password: '',
})

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
