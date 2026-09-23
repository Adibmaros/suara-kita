<template>
  <div class="max-w-2xl space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-white font-heading">Profil Instansi</h1>
      <p class="text-xs text-slate-400 mt-1">Perbarui informasi instansi & WhatsApp admin</p>
    </div>

    <UiCard>
      <div v-if="pending" class="text-slate-400 text-sm">Memuat data profil...</div>

      <form v-else @submit.prevent="handleSave" class="space-y-4">
        <UiAlert v-if="successMsg" type="success" :message="successMsg" />
        <UiAlert v-if="errorMsg" type="error" :message="errorMsg" />

        <UiInput
          v-model="form.nama"
          label="Nama Instansi"
          required
        />

        <UiInput
          v-model="form.noWaAdmin"
          label="Nomor WA Admin Instansi"
          hint="Digunakan voter untuk konfirmasi pembayaran token"
          required
        />

        <div class="pt-2">
          <UiButton type="submit" variant="primary" :loading="saving">
            Simpan Perubahan
          </UiButton>
        </div>
      </form>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const { data: instansi, pending } = await useFetch('/api/admin/profil')

const form = reactive({
  nama: '',
  noWaAdmin: '',
})

watch(instansi, (val) => {
  if (val) {
    form.nama = val.nama
    form.noWaAdmin = val.noWaAdmin
  }
}, { immediate: true })

const saving = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const handleSave = async () => {
  saving.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {
    await $fetch('/api/admin/profil', {
      method: 'PATCH',
      body: form,
    })
    successMsg.value = 'Profil instansi berhasil diperbarui.'
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || 'Gagal menyimpan profil.'
  } finally {
    saving.value = false
  }
}
</script>
