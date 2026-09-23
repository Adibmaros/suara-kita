<template>
  <div class="min-h-[85vh] flex items-center justify-center p-4">
    <UiCard class="w-full max-w-lg space-y-6">
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-bold text-white font-heading">Pendaftaran Instansi Baru</h2>
        <p class="text-xs text-slate-400">Daftar secara gratis untuk mulai membuat kontes polling</p>
      </div>

      <UiAlert v-if="successMsg" type="success" :message="successMsg" />
      <UiAlert v-if="errorMsg" type="error" :message="errorMsg" />

      <form v-if="!successMsg" @submit.prevent="handleRegister" class="space-y-4">
        <UiInput
          v-model="form.namaInstansi"
          label="Nama Instansi / Organisasi"
          placeholder="cth: BEM Fakultas Ilmu Komputer"
          required
        />

        <UiInput
          v-model="form.slugInstansi"
          label="URL Identifier (Slug Instansi)"
          placeholder="cth: bem-fikom-2026"
          hint="Digunakan untuk URL publik: suarakita.com/i/bem-fikom-2026"
          required
        />

        <UiInput
          v-model="form.noWaAdmin"
          label="Nomor WhatsApp Admin (untuk Verifikasi Bayar)"
          placeholder="cth: 08123456789"
          hint="Voter akan menghubungi nomor WA ini saat melakukan pembelian token"
          required
        />

        <div class="border-t border-slate-800 pt-4 space-y-4">
          <UiInput
            v-model="form.nama"
            label="Nama Lengkap Penanggung Jawab"
            placeholder="cth: Ahmad Subagja"
            required
          />

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
        </div>

        <UiButton
          type="submit"
          variant="primary"
          class="w-full mt-2"
          :loading="loading"
        >
          Daftarkan Instansi Sekarang
        </UiButton>
      </form>

      <div class="text-center text-xs text-slate-400">
        Sudah punya akun? 
        <NuxtLink to="/login" class="text-indigo-400 font-semibold hover:underline">
          Masuk di Sini
        </NuxtLink>
      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
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

    successMsg.value = res.message
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || 'Pendaftaran gagal. Periksa kembali form anda.'
  } finally {
    loading.value = false
  }
}
</script>
