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
      <!-- Alert Banner Draft Kontes -->
      <div v-if="isDraft" class="flex items-start gap-3.5 bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-900 shadow-2xs">
        <AlertTriangle class="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        <div class="space-y-1">
          <h3 class="text-sm font-bold text-amber-900">Kontes Belum Dibuka untuk Voting</h3>
          <p class="text-xs text-amber-800 leading-relaxed">
            Kontes ini saat ini masih dalam status <strong>DRAFT</strong>. Pengiriman suara belum dibuka hingga admin mengaktifkan kontes ini. Anda tetap dapat mempelajari kandidat dan melihat paket token yang tersedia.
          </p>
        </div>
      </div>

      <!-- Alert Banner Kontes Ditutup -->
      <div v-else-if="isClosed" class="flex items-start gap-3.5 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-white shadow-md">
        <Lock class="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
        <div class="space-y-1">
          <h3 class="text-sm font-bold text-white">Kontes Telah Resmi Ditutup</h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            Sesi pemungutan suara untuk kontes ini telah berakhir. Pengiriman suara dan pembelian token sudah tidak tersedia. Perolehan suara di bawah ini merupakan hasil akhir.
          </p>
        </div>
      </div>

      <!-- Tombol Input Token & CTA Beli Token di Paling Atas -->
      <KontesVoteBannerAction 
        :is-draft="isDraft"
        :is-closed="isClosed"
        @open-guide="showGuideModal = true"
        @scroll-to-beli="scrollToBeliToken"
        @open-vote="openVoteModal"
      />

      <!-- Header Kontes -->
      <div class="bg-white border border-slate-200 shadow-2xs rounded-xl p-5 sm:p-8 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{{ kontes.instansi.nama }}</span>
            <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">{{ kontes.nama }}</h1>
          </div>
          <span 
            class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
            :class="{
              'bg-emerald-100 text-emerald-800': kontes.status === 'AKTIF',
              'bg-amber-100 text-amber-800': kontes.status === 'DRAFT',
              'bg-rose-100 text-rose-800': kontes.status === 'DITUTUP'
            }"
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

        <div v-if="isClosed" class="p-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 text-xs font-medium">
          Pembelian token suara telah ditutup karena sesi voting untuk kontes ini telah berakhir.
        </div>

        <div v-else-if="kontes.tokenPackages.length === 0" class="text-center py-8 text-slate-500 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm">
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
      <KontesModalGuideVote 
        :is-open="showGuideModal" 
        @close="showGuideModal = false" 
      />

      <!-- Modal Redeem Token Popup -->
      <KontesModalRedeemToken 
        :is-open="showTokenModal"
        :is-draft="isDraft"
        :is-closed="isClosed"
        :vote-step="voteStep"
        v-model:token-code="voteForm.tokenCode"
        v-model:kandidatId="voteForm.kandidatId"
        v-model:candidateSearch="modalCandidateSearch"
        :filtered-kandidat="filteredModalKandidat"
        :selected-kandidat="selectedKandidatObj"
        :voting="voting"
        :error-msg="voteErrorMsg"
        :success-msg="voteSuccessMsg"
        @close="showTokenModal = false"
        @proceed-step2="proceedToStep2"
        @back-step1="voteStep = 1"
        @submit-vote="handleVoteSubmit"
      />

      <!-- Modal Checkout Order WA -->
      <KontesModalOrderWa 
        :is-open="showModal"
        :selected-package="selectedPackage"
        :info-rekening="kontes?.instansi?.infoRekening || null"
        v-model:kontak-wa="kontakWa"
        :ordering="ordering"
        @close="showModal = false"
        @submit="submitOrder"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Search, AlertTriangle, Lock } from 'lucide-vue-next'

definePageMeta({
  layout: 'voter',
})

const route = useRoute()
const slug = route.params.slug as string
const kontesId = route.params.id as string

const { data: kontes, pending, error, refresh } = await useFetch<any>(`/api/public/kontes/${kontesId}`)

const isDraft = computed(() => kontes.value?.status === 'DRAFT')
const isClosed = computed(() => kontes.value?.status === 'DITUTUP')

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
  if (isDraft.value || isClosed.value) return
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
  return kontes.value.leaderboard.filter((k: any) => k.nama.toLowerCase().includes(q))
})

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
  if (isClosed.value) return
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

