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
      <KontesVoteBannerAction 
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
      <KontesModalGuideVote 
        :is-open="showGuideModal" 
        @close="showGuideModal = false" 
      />

      <!-- Modal Redeem Token Popup -->
      <KontesModalRedeemToken 
        :is-open="showTokenModal"
        :vote-step="voteStep"
        v-model:token-code="voteForm.tokenCode"
        v-model:kandidat-id="voteForm.kandidatId"
        v-model:candidate-search="modalCandidateSearch"
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
import { Search } from 'lucide-vue-next'

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

