<template>
  <div class="max-w-2xl space-y-6">
    <div>
      <NuxtLink to="/admin/kontes" class="text-xs text-indigo-400 hover:underline mb-2 block">
        ← Kembali ke Daftar Kontes
      </NuxtLink>
      <h1 class="text-2xl font-bold text-white font-heading">Buat Kontes Baru</h1>
      <p class="text-xs text-slate-400 mt-1">Isi rincian kontes atau polling yang akan diselenggarakan</p>
    </div>

    <UiCard>
      <form @submit.prevent="handleCreate" class="space-y-4">
        <UiAlert v-if="errorMsg" type="error" :message="errorMsg" />

        <UiInput
          v-model="form.nama"
          label="Nama Kontes"
          placeholder="cth: Duta Fakultas Ilmu Komputer 2026"
          required
        />

        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-slate-300">Deskripsi Kontes</label>
          <textarea
            v-model="form.deskripsi"
            rows="3"
            class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Jelaskan secara singkat mengenai kontes ini..."
          ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UiInput
            v-model="form.tanggalMulai"
            type="datetime-local"
            label="Tanggal Mulai"
          />
          <UiInput
            v-model="form.tanggalSelesai"
            type="datetime-local"
            label="Tanggal Selesai"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-slate-300">Status Awal</label>
          <select
            v-model="form.status"
            class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="DRAFT">DRAFT (Belum Dipublikasi)</option>
            <option value="AKTIF">AKTIF (Mulai Menerima Vote)</option>
          </select>
        </div>

        <div class="pt-4 flex justify-end space-x-3">
          <NuxtLink to="/admin/kontes">
            <UiButton variant="secondary">Batal</UiButton>
          </NuxtLink>
          <UiButton type="submit" variant="primary" :loading="creating">
            Simpan & Lanjutkan
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

const form = reactive({
  nama: '',
  deskripsi: '',
  tanggalMulai: '',
  tanggalSelesai: '',
  status: 'DRAFT',
})

const creating = ref(false)
const errorMsg = ref('')

const handleCreate = async () => {
  creating.value = true
  errorMsg.value = ''

  try {
    const kontes = await $fetch('/api/admin/kontes', {
      method: 'POST',
      body: form,
    })

    await navigateTo(`/admin/kontes/${kontes.id}`)
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || 'Gagal membuat kontes.'
  } finally {
    creating.value = false
  }
}
</script>
