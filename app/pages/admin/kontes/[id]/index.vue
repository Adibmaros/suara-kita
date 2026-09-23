<template>
  <div class="space-y-8">
    <div v-if="pending" class="text-slate-400 text-sm">Memuat detail kontes...</div>

    <template v-else-if="kontes">
      <!-- Header Kontes -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <NuxtLink to="/admin/kontes" class="text-xs text-indigo-400 hover:underline mb-1 block">
            ← Kembali ke List Kontes
          </NuxtLink>
          <div class="flex items-center space-x-3">
            <h1 class="text-2xl font-bold text-white font-heading">{{ kontes.nama }}</h1>
            <UiBadge :variant="kontes.status === 'AKTIF' ? 'success' : kontes.status === 'DRAFT' ? 'warning' : 'neutral'">
              {{ kontes.status }}
            </UiBadge>
          </div>
          <p v-if="kontes.deskripsi" class="text-xs text-slate-400 mt-1 max-w-2xl">{{ kontes.deskripsi }}</p>
        </div>

        <div class="flex items-center space-x-3">
          <button 
            @click="toggleStatus"
            class="px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors"
            :class="kontes.status === 'AKTIF' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'"
          >
            {{ kontes.status === 'AKTIF' ? 'Tutup / Draft Kontes' : 'Aktifkan Kontes' }}
          </button>
          <NuxtLink :to="`/admin/kontes/${kontes.id}/orders`">
            <UiButton variant="primary">Verifikasi Order Token</UiButton>
          </NuxtLink>
          <NuxtLink :to="`/admin/kontes/${kontes.id}/hasil`">
            <UiButton variant="secondary">Lihat Hasil</UiButton>
          </NuxtLink>
        </div>
      </div>

      <!-- Tab Kelola Kandidat -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white font-heading">Daftar Kandidat ({{ kontes.kandidat.length }})</h2>
          <UiButton variant="primary" size="sm" @click="showModalKandidat = true">
            + Tambah Kandidat
          </UiButton>
        </div>

        <div v-if="kontes.kandidat.length === 0" class="text-center py-8 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 text-sm">
          Belum ada kandidat. Klik "Tambah Kandidat" di atas.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <UiCard v-for="k in kontes.kandidat" :key="k.id" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <img v-if="k.fotoUrl" :src="k.fotoUrl" class="w-12 h-12 rounded-lg object-cover border border-slate-700" />
              <div v-else class="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500">
                👤
              </div>
              <div>
                <div class="text-xs font-bold text-indigo-400 font-heading">#{{ k.nomorUrut || '-' }}</div>
                <div class="font-bold text-white text-sm">{{ k.nama }}</div>
              </div>
            </div>

            <UiButton variant="danger" size="sm" @click="deleteKandidat(k.id)">Hapus</UiButton>
          </UiCard>
        </div>
      </div>

      <!-- Tab Kelola Paket Token -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white font-heading">Daftar Paket Token ({{ kontes.tokenPackages.length }})</h2>
          <UiButton variant="primary" size="sm" @click="showModalPaket = true">
            + Tambah Paket Token
          </UiButton>
        </div>

        <div v-if="kontes.tokenPackages.length === 0" class="text-center py-8 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 text-sm">
          Belum ada paket token. Klik "Tambah Paket Token" di atas.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <UiCard v-for="p in kontes.tokenPackages" :key="p.id" class="flex items-center justify-between">
            <div>
              <div class="font-bold text-white text-sm">{{ p.namaPaket }}</div>
              <div class="text-xs text-indigo-400 font-semibold">{{ p.jumlahSuara }} Suara • Rp {{ p.harga.toLocaleString('id-ID') }}</div>
            </div>

            <UiButton variant="danger" size="sm" @click="deletePaket(p.id)">Hapus</UiButton>
          </UiCard>
        </div>
      </div>

      <!-- Modal Tambah Kandidat -->
      <UiModal v-model="showModalKandidat" title="Tambah Kandidat Baru">
        <form @submit.prevent="submitKandidat" class="space-y-4">
          <UiInput v-model="formKandidat.nama" label="Nama Lengkap Kandidat" required />
          <UiInput v-model.number="formKandidat.nomorUrut" type="number" label="Nomor Urut" placeholder="1" />
          <UiFileUpload v-model="formKandidat.fotoUrl" label="Foto Kandidat" />
          <UiInput v-model="formKandidat.deskripsi" label="Visi Misi / Deskripsi Singkat" />
          
          <div class="flex justify-end space-x-2 pt-2">
            <UiButton variant="secondary" @click="showModalKandidat = false">Batal</UiButton>
            <UiButton type="submit" variant="primary" :loading="submitting">Simpan</UiButton>
          </div>
        </form>
      </UiModal>

      <!-- Modal Tambah Paket Token -->
      <UiModal v-model="showModalPaket" title="Tambah Paket Token">
        <form @submit.prevent="submitPaket" class="space-y-4">
          <UiInput v-model="formPaket.namaPaket" label="Nama Paket" placeholder="cth: Paket Hemat A" required />
          <UiInput v-model.number="formPaket.jumlahSuara" type="number" label="Jumlah Suara Diberikan" placeholder="10" required />
          <UiInput v-model.number="formPaket.harga" type="number" label="Harga Paket (Rp)" placeholder="50000" required />

          <div class="flex justify-end space-x-2 pt-2">
            <UiButton variant="secondary" @click="showModalPaket = false">Batal</UiButton>
            <UiButton type="submit" variant="primary" :loading="submitting">Simpan</UiButton>
          </div>
        </form>
      </UiModal>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const route = useRoute()
const kontesId = route.params.id as string

const { data: kontes, pending, refresh } = await useFetch(`/api/admin/kontes/${kontesId}`)

const showModalKandidat = ref(false)
const showModalPaket = ref(false)
const submitting = ref(false)

const formKandidat = reactive({
  nama: '',
  nomorUrut: 1,
  fotoUrl: '',
  deskripsi: '',
})

const formPaket = reactive({
  namaPaket: '',
  jumlahSuara: 5,
  harga: 10000,
})

const toggleStatus = async () => {
  if (!kontes.value) return
  const newStatus = kontes.value.status === 'AKTIF' ? 'DRAFT' : 'AKTIF'
  await $fetch(`/api/admin/kontes/${kontesId}`, {
    method: 'PATCH',
    body: { status: newStatus },
  })
  await refresh()
}

const submitKandidat = async () => {
  submitting.value = true
  try {
    await $fetch(`/api/admin/kontes/${kontesId}/kandidat`, {
      method: 'POST',
      body: formKandidat,
    })
    showModalKandidat.value = false
    formKandidat.nama = ''
    formKandidat.fotoUrl = ''
    formKandidat.deskripsi = ''
    await refresh()
  } catch (err: any) {
    alert(err.data?.statusMessage || 'Gagal membuat kandidat')
  } finally {
    submitting.value = false
  }
}

const deleteKandidat = async (id: number) => {
  if (!confirm('Hapus kandidat ini?')) return
  await $fetch(`/api/admin/kontes/${kontesId}/kandidat/${id}`, { method: 'DELETE' })
  await refresh()
}

const submitPaket = async () => {
  submitting.value = true
  try {
    await $fetch(`/api/admin/kontes/${kontesId}/paket`, {
      method: 'POST',
      body: formPaket,
    })
    showModalPaket.value = false
    formPaket.namaPaket = ''
    await refresh()
  } catch (err: any) {
    alert(err.data?.statusMessage || 'Gagal membuat paket token')
  } finally {
    submitting.value = false
  }
}

const deletePaket = async (id: number) => {
  if (!confirm('Hapus paket token ini?')) return
  await $fetch(`/api/admin/kontes/${kontesId}/paket/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>
