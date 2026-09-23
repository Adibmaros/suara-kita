<template>
  <div class="min-h-[80vh] flex items-center justify-center p-4">
    <UiCard class="w-full max-w-md space-y-6">
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-bold text-white font-heading">Masuk ke SuaraKita</h2>
        <p class="text-xs text-slate-400">Masuk sebagai Admin Instansi atau Super Admin</p>
      </div>

      <UiAlert v-if="errorMsg" type="error" :message="errorMsg" />

      <form @submit.prevent="handleLogin" class="space-y-4">
        <UiInput
          v-model="form.email"
          label="Email Admin"
          type="email"
          placeholder="admin@instansi.com"
          required
        />

        <UiInput
          v-model="form.password"
          label="Password"
          type="password"
          placeholder="••••••••"
          required
        />

        <UiButton
          type="submit"
          variant="primary"
          class="w-full mt-2"
          :loading="loading"
        >
          Masuk
        </UiButton>
      </form>

      <div class="text-center text-xs text-slate-400">
        Belum punya akun instansi? 
        <NuxtLink to="/register" class="text-indigo-400 font-semibold hover:underline">
          Daftar Sekarang
        </NuxtLink>
      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
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
