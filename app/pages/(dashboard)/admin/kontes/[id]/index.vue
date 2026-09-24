<template>
  <div class="space-y-8">
    <div v-if="pending" class="text-slate-500 text-sm">Memuat detail kontes...</div>

    <template v-else-if="kontes">
      <!-- Header Kontes -->
      <div class="bg-white border border-slate-200 shadow-2xs rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <NuxtLink to="/admin/kontes" class="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 font-medium transition-colors mb-1">
            ← Kembali ke List Kontes
          </NuxtLink>
          <div class="flex items-center space-x-3">
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight">{{ kontes.nama }}</h1>
            <span 
              class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
              :class="{
                'bg-emerald-100 text-emerald-800': kontes.status === 'AKTIF',
                'bg-amber-100 text-amber-800': kontes.status === 'DRAFT',
                'bg-slate-100 text-slate-700': kontes.status !== 'AKTIF' && kontes.status !== 'DRAFT',
              }"
            >
              {{ kontes.status }}
            </span>
          </div>
          <p v-if="kontes.deskripsi" class="text-xs text-slate-500 mt-1 max-w-2xl">{{ kontes.deskripsi }}</p>
        </div>

        <div class="flex items-center space-x-3">
          <button 
            @click="toggleStatus"
            class="px-3.5 py-2 text-xs font-semibold rounded-md border transition-colors cursor-pointer"
            :class="kontes.status === 'AKTIF' ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'"
          >
            {{ kontes.status === 'AKTIF' ? 'Tutup / Draft Kontes' : 'Aktifkan Kontes' }}
          </button>
          <NuxtLink :to="`/admin/kontes/${kontes.id}/orders`" class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md transition-colors shadow-xs">
            Verifikasi Order Token
          </NuxtLink>
          <NuxtLink :to="`/admin/kontes/${kontes.id}/hasil`" class="inline-flex items-center justify-center px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-xs rounded-md transition-colors">
            Lihat Hasil
          </NuxtLink>
        </div>
      </div>

      <!-- Link Publik Kontes -->
      <div class="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div class="space-y-1">
          <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
            <LinkIcon class="w-4 h-4 text-slate-600" />
            <span>Link Publik Kontes — Bagikan ke Voter</span>
          </div>
          <div class="text-xs text-slate-900 font-mono bg-slate-50 border border-slate-200 rounded-md px-3 py-2 select-all break-all">
            {{ publicUrl }}
          </div>
        </div>
        <div class="flex items-center space-x-2 shrink-0">
          <button
            @click="copyLink"
            class="px-3.5 py-2 text-xs font-semibold rounded-md border transition-colors bg-white text-slate-900 border-slate-200 hover:bg-slate-100 cursor-pointer"
          >
            {{ copied ? '✓ Tersalin!' : 'Salin Link' }}
          </button>
          <a
            :href="publicUrl"
            target="_blank"
            class="px-3.5 py-2 text-xs font-semibold rounded-md transition-colors bg-slate-900 text-white hover:bg-slate-800 inline-flex items-center gap-1"
          >
            Buka Halaman ↗
          </a>
        </div>
      </div>

      <!-- Tab Kelola Kandidat -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 tracking-tight">Daftar Kandidat ({{ kontes.kandidat.length }})</h2>
          <button 
            class="inline-flex items-center justify-center px-3 h-8 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md transition-colors shadow-xs cursor-pointer" 
            @click="showModalKandidat = true"
          >
            + Tambah Kandidat
          </button>
        </div>

        <div v-if="kontes.kandidat.length === 0" class="text-center py-8 bg-white border border-slate-200 rounded-xl text-slate-500 text-sm">
          Belum ada kandidat. Klik "Tambah Kandidat" di atas.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="k in kontes.kandidat" :key="k.id" class="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <img v-if="k.fotoUrl" :src="k.fotoUrl" class="w-12 h-12 rounded-lg object-cover border border-slate-200" />
              <div v-else class="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                👤
              </div>
              <div>
                <div class="text-xs font-mono font-bold text-slate-500">#{{ k.nomorUrut || '-' }}</div>
                <div class="font-bold text-slate-900 text-sm">{{ k.nama }}</div>
              </div>
            </div>

            <button 
              class="px-2.5 py-1 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors cursor-pointer" 
              @click="deleteKandidat(k.id)"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>

      <!-- Tab Kelola Paket Token -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 tracking-tight">Daftar Paket Token ({{ kontes.tokenPackages.length }})</h2>
          <button 
            class="inline-flex items-center justify-center px-3 h-8 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md transition-colors shadow-xs cursor-pointer" 
            @click="showModalPaket = true"
          >
            + Tambah Paket Token
          </button>
        </div>

        <div v-if="kontes.tokenPackages.length === 0" class="text-center py-8 bg-white border border-slate-200 rounded-xl text-slate-500 text-sm">
          Belum ada paket token. Klik "Tambah Paket Token" di atas.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="p in kontes.tokenPackages" :key="p.id" class="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <div class="font-bold text-slate-900 text-sm">{{ p.namaPaket }}</div>
              <div class="text-xs text-slate-500 font-semibold">{{ p.jumlahSuara }} Suara • Rp {{ p.harga.toLocaleString('id-ID') }}</div>
            </div>

            <button 
              class="px-2.5 py-1 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors cursor-pointer" 
              @click="deletePaket(p.id)"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Tambah Kandidat -->
      <Teleport to="body">
        <div v-if="showModalKandidat" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/70 backdrop-blur-xs" @click="showModalKandidat = false"></div>
          <div class="relative z-50 w-full max-w-lg bg-white border border-slate-200 rounded-xl p-6 shadow-lg space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="text-base font-semibold text-slate-900">Tambah Kandidat Baru</h3>
              <button @click="showModalKandidat = false" class="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer">
                <X class="w-4 h-4" />
              </button>
            </div>

            <form @submit.prevent="submitKandidat" class="space-y-4">
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Nama Lengkap Kandidat <span class="text-rose-500">*</span></label>
                <input
                  v-model="formKandidat.nama"
                  type="text"
                  required
                  class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Nomor Urut</label>
                <input
                  v-model.number="formKandidat.nomorUrut"
                  type="number"
                  placeholder="1"
                  class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Foto Kandidat</label>
                <input
                  type="text"
                  v-model="formKandidat.fotoUrl"
                  placeholder="https://... URL Foto"
                  class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Visi Misi / Deskripsi Singkat</label>
                <input
                  v-model="formKandidat.deskripsi"
                  type="text"
                  class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
                />
              </div>
              
              <div class="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button type="button" @click="showModalKandidat = false" class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-xs rounded-md transition-colors cursor-pointer">
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="submitting"
                  class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs"
                >
                  <Loader2 v-if="submitting" class="w-4 h-4 mr-2 animate-spin" />
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>

      <!-- Modal Tambah Paket Token -->
      <Teleport to="body">
        <div v-if="showModalPaket" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/70 backdrop-blur-xs" @click="showModalPaket = false"></div>
          <div class="relative z-50 w-full max-w-lg bg-white border border-slate-200 rounded-xl p-6 shadow-lg space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="text-base font-semibold text-slate-900">Tambah Paket Token</h3>
              <button @click="showModalPaket = false" class="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer">
                <X class="w-4 h-4" />
              </button>
            </div>

            <form @submit.prevent="submitPaket" class="space-y-4">
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Nama Paket <span class="text-rose-500">*</span></label>
                <input
                  v-model="formPaket.namaPaket"
                  type="text"
                  placeholder="cth: Paket Hemat A"
                  required
                  class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Jumlah Suara Diberikan <span class="text-rose-500">*</span></label>
                <input
                  v-model.number="formPaket.jumlahSuara"
                  type="number"
                  placeholder="10"
                  required
                  class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Harga Paket (Rp) <span class="text-rose-500">*</span></label>
                <input
                  v-model.number="formPaket.harga"
                  type="number"
                  placeholder="50000"
                  required
                  class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
                />
              </div>

              <div class="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button type="button" @click="showModalPaket = false" class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-xs rounded-md transition-colors cursor-pointer">
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="submitting"
                  class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs"
                >
                  <Loader2 v-if="submitting" class="w-4 h-4 mr-2 animate-spin" />
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Link as LinkIcon, Loader2, X } from 'lucide-vue-next'

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
const copied = ref(false)

const publicUrl = computed(() => {
  const slug = kontes.value?.instansi?.slug || ''
  const id = kontes.value?.id || ''
  const origin = import.meta.client ? window.location.origin : ''
  return `${origin}/instansi/${slug}/kontes/${id}`
})

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(publicUrl.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    prompt('Salin link ini:', publicUrl.value)
  }
}

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
