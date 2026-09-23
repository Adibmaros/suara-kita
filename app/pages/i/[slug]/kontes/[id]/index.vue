<template>
  <div class="max-w-6xl mx-auto px-4 py-8 space-y-12">
    <div v-if="pending" class="text-center py-12 text-slate-400">
      Memuat data kontes...
    </div>

    <div v-else-if="error || !kontes" class="text-center py-12 space-y-4">
      <h2 class="text-2xl font-bold text-white font-heading">Kontes Tidak Ditemukan</h2>
      <p class="text-slate-400">Kontes ini tidak tersedia atau sudah dihapus.</p>
    </div>

    <template v-else>
      <!-- Kontes Header -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span class="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{{ kontes.instansi.nama }}</span>
            <h1 class="text-3xl font-extrabold text-white font-heading mt-1">{{ kontes.nama }}</h1>
          </div>
          <div class="flex items-center space-x-3">
            <UiBadge :variant="kontes.status === 'AKTIF' ? 'success' : 'neutral'">
              {{ kontes.status }}
            </UiBadge>
            <NuxtLink :to="`/i/${slug}/kontes/${kontes.id}/vote`">
              <UiButton variant="primary" class="animate-bounce shadow-lg shadow-indigo-600/40">
                🗳️ Punya Kode Token? Vote di Sini
              </UiButton>
            </NuxtLink>
          </div>
        </div>

        <p v-if="kontes.deskripsi" class="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {{ kontes.deskripsi }}
        </p>
      </div>

      <!-- Section Candidate Cards -->
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-white font-heading">Kandidat Kontes</h2>

        <div v-if="kontes.leaderboard.length === 0" class="text-center py-8 text-slate-500 bg-slate-900/50 rounded-xl border border-slate-800">
          Belum ada kandidat yang terdaftar.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <KontesKandidatCard
            v-for="kandidat in kontes.leaderboard"
            :key="kandidat.id"
            :kandidat="kandidat"
          />
        </div>
      </div>

      <!-- Section Beli Token -->
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 class="text-2xl font-bold text-white font-heading">Beli Token Suara</h2>
            <p class="text-xs text-slate-400 mt-1">
              Pilih paket token untuk memberikan suara. Pembayaran dilakukan via WhatsApp Admin Instansi.
            </p>
          </div>
        </div>

        <div v-if="kontes.tokenPackages.length === 0" class="text-center py-8 text-slate-500 bg-slate-900/50 rounded-xl border border-slate-800">
          Belum ada paket token tersedia.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <KontesPaketTokenCard
            v-for="pkg in kontes.tokenPackages"
            :key="pkg.id"
            :pkg="pkg"
            @buy="handleBuyToken"
          />
        </div>
      </div>

      <!-- Section Live Leaderboard -->
      <KontesLeaderboard
        :items="kontes.leaderboard"
        :total-suara="kontes.totalSuaraMasuk"
      />

      <!-- Modal Checkout Order WA -->
      <UiModal
        v-model="showModal"
        title="Konfirmasi Pembelian Token"
      >
        <div v-if="selectedPackage" class="space-y-4">
          <div class="bg-slate-800/80 p-4 rounded-xl space-y-2 border border-slate-700">
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Paket:</span>
              <span class="font-bold text-white">{{ selectedPackage.namaPaket }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Jumlah Suara:</span>
              <span class="font-bold text-indigo-400">{{ selectedPackage.jumlahSuara }} Suara</span>
            </div>
            <div class="flex justify-between text-sm border-t border-slate-700 pt-2">
              <span class="text-slate-400">Total Harga:</span>
              <span class="font-extrabold text-white">Rp {{ selectedPackage.harga.toLocaleString('id-ID') }}</span>
            </div>
          </div>

          <UiInput
            v-model="kontakWa"
            label="Nomor WA Pendukung (Opsional)"
            placeholder="08123456789"
            hint="Untuk memudahkan pencocokan transfer oleh admin instansi"
          />

          <UiAlert type="info" message="Setelah menekan tombol di bawah, Anda akan diarahkan ke Chat WhatsApp Admin Instansi untuk mendapatkan nomor rekening transfer." />
        </div>

        <template #footer>
          <UiButton variant="secondary" @click="showModal = false">
            Batal
          </UiButton>
          <UiButton variant="primary" :loading="ordering" @click="submitOrder">
            Lanjut ke WhatsApp
          </UiButton>
        </template>
      </UiModal>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const slug = route.params.slug as string
const kontesId = route.params.id as string

const { data: kontes, pending, error, refresh } = await useFetch(`/api/public/kontes/${kontesId}`)

const showModal = ref(false)
const selectedPackage = ref<any>(null)
const kontakWa = ref('')
const ordering = ref(false)

const handleBuyToken = (pkg: any) => {
  selectedPackage.value = pkg
  showModal.value = true
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
