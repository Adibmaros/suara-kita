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
      <!-- Tombol Input Token & CTA Beli Token di Paling Atas -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs gap-4">
        <div class="flex items-center space-x-3">
          <span class="text-2xl sm:text-3xl">🗳️</span>
          <div>
            <h3 class="text-sm sm:text-base font-bold text-slate-900">Siap Memberikan Suara?</h3>
            <p class="text-xs text-slate-500">Gunakan token suara Anda atau beli paket token langsung via WhatsApp.</p>
          </div>
        </div>

        <div class="flex items-center space-x-2 shrink-0">
          <button 
            class="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            @click="showGuideModal = true"
          >
            <HelpCircle class="w-4 h-4" />
            <span>Petunjuk Vote</span>
          </button>
          <button 
            class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs rounded-xl transition-all cursor-pointer"
            @click="scrollToBeliToken"
          >
            Belum Punya Token? Beli Token
          </button>
          <button 
            class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
            @click="openVoteModal"
          >
            Masukan Token
          </button>
        </div>
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
      <div id="beli-token" class="space-y-4 sm:space-y-6 scroll-mt-24">
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

      <!-- Modal Petunjuk Vote / Alur Voting -->
      <Teleport to="body">
        <div v-if="showGuideModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div class="relative z-50 w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <!-- Header Modal -->
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center space-x-2">
                <span class="text-xl">📋</span>
                <h3 class="text-base font-bold text-slate-900">Petunjuk & Alur Voting</h3>
              </div>
              <button @click="showGuideModal = false" class="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Steps List -->
            <div class="space-y-4">
              <!-- Step 1 -->
              <div class="flex items-start space-x-3">
                <div class="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-900">Pilih Paket & Beli Token</h4>
                  <p class="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    Pilih paket jumlah suara yang diinginkan pada bagian <strong>Beli Token Suara</strong> di bawah, lalu klik tombol <em>Beli Paket via WA</em>.
                  </p>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="flex items-start space-x-3">
                <div class="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-900">Lakukan Pembayaran & Verifikasi</h4>
                  <p class="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    Kirimkan bukti transfer kepada Admin via WhatsApp. Admin akan memverifikasi pembayaran dan memberikan <strong>Kode Token Suara</strong> Anda.
                  </p>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="flex items-start space-x-3">
                <div class="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-900">Masukkan Token Suara</h4>
                  <p class="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    Klik tombol <strong>Masukkan Token</strong> di bagian atas, input kode token dan cari kandidat favorit Anda.
                  </p>
                </div>
              </div>

              <!-- Step 4 -->
              <div class="flex items-start space-x-3">
                <div class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-900">Konfirmasi & Kirim Suara</h4>
                  <p class="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    Periksa kembali kandidat pilihan Anda pada konfirmasi tahap ke-2, lalu klik <strong>Kirim Suara Sekarang</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex justify-end">
              <button 
                @click="showGuideModal = false"
                class="w-full sm:w-auto px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Modal Redeem Token Popup (With Candidate Live Search & 2-Step Double Verification) -->
      <Teleport to="body">
        <div v-if="showTokenModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div class="relative z-50 w-full max-w-lg bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <!-- Header Modal -->
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 class="text-base font-bold text-slate-900">
                  {{ voteStep === 1 ? 'Redeem Token Suara' : 'Konfirmasi Pilihan Suara Anda' }}
                </h3>
                <p class="text-xs text-slate-500">Langkah {{ voteStep }} dari 2</p>
              </div>
              <button @click="showTokenModal = false" class="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Error / Success Messages -->
            <div v-if="voteErrorMsg" class="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
              <span>{{ voteErrorMsg }}</span>
            </div>
            <div v-if="voteSuccessMsg" class="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{{ voteSuccessMsg }}</span>
            </div>

            <!-- STEP 1: Input Token & Candidate Search Picker -->
            <form v-if="voteStep === 1" @submit.prevent="proceedToStep2" class="space-y-4">
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Kode Token Suara <span class="text-rose-500">*</span></label>
                <input
                  v-model="voteForm.tokenCode"
                  type="text"
                  placeholder="cth: SK-X7Y9Z1A2"
                  required
                  class="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors uppercase font-mono font-bold"
                />
                <p class="text-[11px] text-slate-400">Kode token yang Anda dapatkan setelah pembayaran diverifikasi admin</p>
              </div>

              <!-- Candidate Search Picker -->
              <div class="space-y-2">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Pilih Kandidat Dukungan <span class="text-rose-500">*</span>
                </label>

                <!-- Live Search Box -->
                <div class="relative">
                  <Search class="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    v-model="modalCandidateSearch"
                    type="text"
                    placeholder="Cari nama kandidat..."
                    class="w-full h-9 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Candidates Selection List -->
                <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
                  <div 
                    v-if="filteredModalKandidat.length === 0" 
                    class="p-4 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200"
                  >
                    Kandidat tidak ditemukan
                  </div>

                  <div 
                    v-for="k in filteredModalKandidat" 
                    :key="k.id"
                    @click="voteForm.kandidatId = k.id"
                    class="flex items-center space-x-3 p-3 rounded-xl border transition-all cursor-pointer"
                    :class="voteForm.kandidatId === k.id ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-600' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'"
                  >
                    <img 
                      v-if="k.fotoUrl" 
                      :src="k.fotoUrl" 
                      class="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0" 
                    />
                    <div v-else class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                      👤
                    </div>

                    <div class="flex-1 min-w-0">
                      <div class="font-bold text-slate-900 text-xs truncate">{{ k.nama }}</div>
                      <div v-if="k.deskripsi" class="text-[10px] text-slate-500 truncate">{{ k.deskripsi }}</div>
                    </div>

                    <div 
                      class="w-5 h-5 rounded-full border flex items-center justify-center shrink-0"
                      :class="voteForm.kandidatId === k.id ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'"
                    >
                      <CheckCircle2 v-if="voteForm.kandidatId === k.id" class="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-3 flex justify-end space-x-2 border-t border-slate-100">
                <button 
                  type="button" 
                  @click="showTokenModal = false"
                  class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  :disabled="!voteForm.tokenCode || !voteForm.kandidatId"
                  class="inline-flex items-center justify-center px-4 h-9 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs active:scale-95"
                >
                  <span>Lanjut Konfirmasi Suara →</span>
                </button>
              </div>
            </form>

            <!-- STEP 2: Second Verification (Konfirmasi Ulang Sebelum Kirim Suara) -->
            <div v-else-if="voteStep === 2" class="space-y-4">
              <div class="p-4 bg-amber-50 border border-amber-200/80 rounded-2xl text-amber-900 space-y-1">
                <div class="flex items-center space-x-2 text-xs font-bold">
                  <AlertCircle class="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Verifikasi Pilihan Suara Anda</span>
                </div>
                <p class="text-[11px] text-amber-800 leading-relaxed">
                  Harap pastikan kandidat yang Anda pilih sudah benar. Setiap kode token hanya dapat digunakan **1 (satu) kali** dan tidak dapat diubah setelah dikirim.
                </p>
              </div>

              <!-- Selected Candidate Summary Card -->
              <div v-if="selectedKandidatObj" class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kandidat Pilihan Anda:</div>
                <div class="flex items-center space-x-3 bg-white p-3 rounded-xl border border-slate-200">
                  <img 
                    v-if="selectedKandidatObj.fotoUrl" 
                    :src="selectedKandidatObj.fotoUrl" 
                    class="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" 
                  />
                  <div v-else class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                    👤
                  </div>
                  <div>
                    <h4 class="font-extrabold text-slate-900 text-sm">{{ selectedKandidatObj.nama }}</h4>
                    <span class="text-[11px] text-blue-600 font-semibold">Pilihan Sah Voter</span>
                  </div>
                </div>

                <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-200/80">
                  <span class="text-slate-500">Kode Token:</span>
                  <span class="font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">{{ voteForm.tokenCode }}</span>
                </div>
              </div>

              <div class="pt-2 flex justify-between items-center border-t border-slate-100">
                <button 
                  type="button" 
                  @click="voteStep = 1"
                  class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  :disabled="voting"
                >
                  ← Kembali & Ubah
                </button>

                <button
                  type="button"
                  @click="handleVoteSubmit"
                  :disabled="voting"
                  class="inline-flex items-center justify-center px-4 h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs active:scale-95"
                >
                  <Loader2 v-if="voting" class="w-4 h-4 mr-2 animate-spin" />
                  <span>{{ voting ? 'Mengirimkan Suara...' : 'Ya, Kirim Suara Sekarang!' }}</span>
                </button>
              </div>
            </div>
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
import { ref, reactive, computed } from 'vue'
import { Search, Loader2, CheckCircle2, AlertCircle, Info, X, HelpCircle } from 'lucide-vue-next'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const slug = route.params.slug as string
const kontesId = route.params.id as string

const { data: kontes, pending, error, refresh } = await useFetch<any>(`/api/public/kontes/${kontesId}`)

const searchQuery = ref('')
const showModal = ref(false)
const showTokenModal = ref(false)
const showGuideModal = ref(false)
const selectedPackage = ref<any>(null)
const kontakWa = ref('')
const ordering = ref(false)

const voteStep = ref<number>(1)
const modalCandidateSearch = ref('')

const openVoteModal = () => {
  voteStep.value = 1
  voteErrorMsg.value = ''
  voteSuccessMsg.value = ''
  modalCandidateSearch.value = ''
  showTokenModal.value = true
}

const scrollToBeliToken = () => {
  const el = document.getElementById('beli-token')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const voting = ref(false)
const voteErrorMsg = ref('')
const voteSuccessMsg = ref('')
const voteForm = reactive({
  tokenCode: '',
  kandidatId: null as number | null,
})

const filteredModalKandidat = computed(() => {
  if (!kontes.value?.leaderboard) return []
  if (!modalCandidateSearch.value.trim()) return kontes.value.leaderboard
  const q = modalCandidateSearch.value.toLowerCase().trim()
  return kontes.value.leaderboard.filter((k: any) => k.nama.toLowerCase().includes(query(q)))
})

function query(q: string) { return q }

const selectedKandidatObj = computed(() => {
  if (!kontes.value?.leaderboard || !voteForm.kandidatId) return null
  return kontes.value.leaderboard.find((k: any) => k.id === voteForm.kandidatId)
})

const proceedToStep2 = () => {
  if (!voteForm.tokenCode || !voteForm.kandidatId) return
  voteErrorMsg.value = ''
  voteStep.value = 2
}

// Filter & urutkan kandidat otomatis berdasarkan persentase tertinggi ke terendah
const filteredKandidat = computed(() => {
  if (!kontes.value?.leaderboard) return []
  
  const sorted = [...kontes.value.leaderboard].sort((a, b) => b.totalSuara - a.totalSuara)

  if (!searchQuery.value.trim()) {
    return sorted
  }

  const q = searchQuery.value.toLowerCase().trim()
  return sorted.filter((k: any) => k.nama.toLowerCase().includes(q))
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
    const res = await $fetch<any>(`/api/public/kontes/${kontesId}/vote`, {
      method: 'POST',
      body: {
        tokenCode: voteForm.tokenCode.trim(),
        kandidatId: voteForm.kandidatId,
      },
    })

    voteSuccessMsg.value = res.message
    voteForm.tokenCode = ''
    voteForm.kandidatId = null
    voteStep.value = 1
    await refresh()
  } catch (err: any) {
    voteErrorMsg.value = err.data?.statusMessage || err.statusMessage || err.message || 'Kode token tidak valid.'
    voteStep.value = 1
  } finally {
    voting.value = false
  }
}

const submitOrder = async () => {
  if (!selectedPackage.value) return
  ordering.value = true

  try {
    const res = await $fetch<any>(`/api/public/kontes/${kontesId}/order`, {
      method: 'POST',
      body: {
        packageId: selectedPackage.value.id,
        kontakWa: kontakWa.value,
      },
    })

    showModal.value = false
    window.open(res.waLink, '_blank')
  } catch (err: any) {
    voteErrorMsg.value = err.data?.statusMessage || 'Gagal memproses order token.'
  } finally {
    ordering.value = false
  }
}
</script>
