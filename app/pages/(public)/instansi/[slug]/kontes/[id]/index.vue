<template>
  <div class="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-8 sm:space-y-10">
    <div v-if="pending" class="text-center py-12 text-slate-500">
      Memuat data kontes...
    </div>

    <div v-else-if="error || !kontes" class="text-center py-12 space-y-4">
      <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Kontes Tidak Ditemukan</h2>
      <p class="text-slate-500">Kontes ini tidak tersedia atau sudah dihapus.</p>
    </div>

    <template v-else>
      <!-- Tombol Input Token di Paling Atas -->
      <div class="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
        <div class="flex items-center space-x-3">
          <span class="text-2xl">🗳️</span>
          <div>
            <h3 class="text-sm sm:text-base font-semibold text-slate-900">Sudah Punya Kode Token?</h3>
            <p class="text-xs text-slate-500">Gunakan token suara Anda untuk memilih kandidat</p>
          </div>
        </div>
        <button 
          class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md transition-colors shadow-xs shrink-0 cursor-pointer"
          @click="showTokenModal = true"
        >
          Masukan Token
        </button>
      </div>

      <!-- Header Kontes -->
      <div class="bg-white border border-slate-200 shadow-2xs rounded-xl p-5 sm:p-8 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{{ kontes.instansi.nama }}</span>
            <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">{{ kontes.nama }}</h1>
          </div>
          <span 
            class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
            :class="kontes.status === 'AKTIF' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'"
          >
            {{ kontes.status }}
          </span>
        </div>

        <p v-if="kontes.deskripsi" class="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          {{ kontes.deskripsi }}
        </p>
      </div>

      <!-- Section Search & Candidate Cards -->
      <div class="space-y-4 sm:space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Daftar Kandidat</h2>
          
          <!-- Fitur Search Kandidat -->
          <div class="w-full sm:w-72 relative">
            <Search class="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari kandidat..."
              class="w-full h-9 pl-9 pr-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
            />
          </div>
        </div>

        <div v-if="filteredKandidat.length === 0" class="text-center py-8 text-slate-500 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm">
          {{ searchQuery ? 'Kandidat tidak ditemukan.' : 'Belum ada kandidat yang terdaftar.' }}
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <KontesKandidatCard
            v-for="kandidat in filteredKandidat"
            :key="kandidat.id"
            :kandidat="kandidat"
          />
        </div>
      </div>

      <!-- Section Beli Token -->
      <div class="space-y-4 sm:space-y-6">
        <div class="border-b border-slate-200 pb-4">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Beli Token Suara</h2>
          <p class="text-xs text-slate-500 mt-1">
            Pilih paket token untuk memberikan suara. Pembayaran dilakukan via WhatsApp Admin Instansi.
          </p>
        </div>

        <div v-if="kontes.tokenPackages.length === 0" class="text-center py-8 text-slate-500 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm">
          Belum ada paket token tersedia.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <KontesPaketTokenCard
            v-for="pkg in kontes.tokenPackages"
            :key="pkg.id"
            :pkg="pkg"
            @buy="handleBuyToken"
          />
        </div>
      </div>

      <!-- Modal Redeem Token Popup -->
      <Teleport to="body">
        <div v-if="showTokenModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/70 backdrop-blur-xs" @click="showTokenModal = false"></div>
          <div class="relative z-50 w-full max-w-lg bg-white border border-slate-200 rounded-xl p-6 shadow-lg space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="text-base font-semibold text-slate-900">Redeem Token Suara</h3>
              <button @click="showTokenModal = false" class="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer">
                <X class="w-4 h-4" />
              </button>
            </div>

            <form @submit.prevent="handleVoteSubmit" class="space-y-4">
              <div v-if="voteErrorMsg" class="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
                <span>{{ voteErrorMsg }}</span>
              </div>
              <div v-if="voteSuccessMsg" class="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{{ voteSuccessMsg }}</span>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Kode Token <span class="text-rose-500">*</span></label>
                <input
                  v-model="voteForm.tokenCode"
                  type="text"
                  placeholder="cth: SK-X7Y9Z1A2"
                  required
                  class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors uppercase font-mono"
                />
                <p class="text-[11px] text-slate-500">Huruf kapital dan angka 8 karakter (termasuk SK-)</p>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Pilih Kandidat <span class="text-rose-500">*</span>
                </label>
                <select
                  v-model="voteForm.kandidatId"
                  class="w-full h-9 px-3 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 bg-white"
                  required
                >
                  <option :value="null" disabled>-- Pilih Kandidat --</option>
                  <option 
                    v-for="k in kontes.leaderboard" 
                    :key="k.id" 
                    :value="k.id"
                  >
                    {{ k.nomorUrut ? `#${k.nomorUrut} ` : '' }}{{ k.nama }}
                  </option>
                </select>
              </div>

              <div class="pt-2 flex justify-end space-x-2">
                <button 
                  type="button" 
                  @click="showTokenModal = false"
                  class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-xs rounded-md transition-colors cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  :disabled="voting || !voteForm.tokenCode || !voteForm.kandidatId"
                  class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs"
                >
                  <Loader2 v-if="voting" class="w-4 h-4 mr-2 animate-spin" />
                  Kirim Suara
                </button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>

      <!-- Modal Checkout Order WA -->
      <Teleport to="body">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/70 backdrop-blur-xs" @click="showModal = false"></div>
          <div class="relative z-50 w-full max-w-lg bg-white border border-slate-200 rounded-xl p-6 shadow-lg space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="text-base font-semibold text-slate-900">Konfirmasi Pembelian Token</h3>
              <button @click="showModal = false" class="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer">
                <X class="w-4 h-4" />
              </button>
            </div>

            <div v-if="selectedPackage" class="space-y-4">
              <div class="bg-slate-50 p-4 rounded-lg space-y-2 border border-slate-200 text-xs">
                <div class="flex justify-between">
                  <span class="text-slate-500">Paket:</span>
                  <span class="font-bold text-slate-900">{{ selectedPackage.namaPaket }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">Jumlah Suara:</span>
                  <span class="font-bold text-slate-900">{{ selectedPackage.jumlahSuara }} Suara</span>
                </div>
                <div class="flex justify-between border-t border-slate-200 pt-2 text-sm">
                  <span class="text-slate-500">Total Harga:</span>
                  <span class="font-bold text-slate-900">Rp {{ selectedPackage.harga.toLocaleString('id-ID') }}</span>
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Nomor WA Pendukung (Opsional)</label>
                <input
                  v-model="kontakWa"
                  type="text"
                  placeholder="08123456789"
                  class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
                />
                <p class="text-[11px] text-slate-500">Untuk memudahkan pencocokan transfer oleh admin instansi</p>
              </div>

              <div class="p-3 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg flex items-center gap-2">
                <Info class="w-4 h-4 text-slate-600 shrink-0" />
                <span>Setelah menekan tombol di bawah, Anda akan diarahkan ke Chat WhatsApp Admin Instansi untuk mendapatkan nomor rekening transfer.</span>
              </div>
            </div>

            <div class="pt-2 flex justify-end space-x-2 border-t border-slate-100">
              <button 
                type="button" 
                @click="showModal = false"
                class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-xs rounded-md transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                :disabled="ordering"
                @click="submitOrder"
                class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs"
              >
                <Loader2 v-if="ordering" class="w-4 h-4 mr-2 animate-spin" />
                Lanjut ke WhatsApp
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Search, Loader2, CheckCircle2, AlertCircle, Info, X } from 'lucide-vue-next'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const slug = route.params.slug as string
const kontesId = route.params.id as string

const { data: kontes, pending, error, refresh } = await useFetch(`/api/public/kontes/${kontesId}`)

const searchQuery = ref('')
const showModal = ref(false)
const showTokenModal = ref(false)
const selectedPackage = ref<any>(null)
const kontakWa = ref('')
const ordering = ref(false)

const voting = ref(false)
const voteErrorMsg = ref('')
const voteSuccessMsg = ref('')
const voteForm = reactive({
  tokenCode: '',
  kandidatId: null as number | null,
})

// Filter & urutkan kandidat otomatis berdasarkan persentase tertinggi ke terendah
const filteredKandidat = computed(() => {
  if (!kontes.value?.leaderboard) return []
  
  // Clone & sort by totalSuara / persentase descending
  const sorted = [...kontes.value.leaderboard].sort((a, b) => b.totalSuara - a.totalSuara)

  if (!searchQuery.value.trim()) {
    return sorted
  }

  const query = searchQuery.value.toLowerCase().trim()
  return sorted.filter((k: any) => k.nama.toLowerCase().includes(query))
})

const handleBuyToken = (pkg: any) => {
  selectedPackage.value = pkg
  showModal.value = true
}

const handleVoteSubmit = async () => {
  if (!voteForm.tokenCode || !voteForm.kandidatId) return
  voting.value = true
  voteErrorMsg.value = ''
  voteSuccessMsg.value = ''

  try {
    const res = await $fetch(`/api/public/kontes/${kontesId}/vote`, {
      method: 'POST',
      body: {
        tokenCode: voteForm.tokenCode.trim(),
        kandidatId: voteForm.kandidatId,
      },
    })

    voteSuccessMsg.value = res.message
    voteForm.tokenCode = ''
    voteForm.kandidatId = null
    await refresh()
  } catch (err: any) {
    voteErrorMsg.value = err.data?.statusMessage || err.statusMessage || err.message || 'Kode token tidak valid.'
  } finally {
    voting.value = false
  }
}

const submitOrder = async () => {
  if (!selectedPackage.value) return
  ordering.value = true

  try {
    const res = await $fetch(`/api/public/kontes/${kontesId}/order`, {
      method: 'POST',
      body: {
        packageId: selectedPackage.value.id,
        kontakWa: kontakWa.value,
      },
    })

    showModal.value = false
    window.open(res.waLink, '_blank')
  } catch (err: any) {
    alert(err.data?.statusMessage || 'Gagal memproses order token.')
  } finally {
    ordering.value = false
  }
}
</script>
