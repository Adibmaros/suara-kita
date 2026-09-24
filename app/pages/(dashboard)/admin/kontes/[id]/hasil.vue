<template>
  <div class="space-y-6">
    <!-- Breadcrumb & Header Nav -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
      <div>
        <NuxtLink :to="`/admin/kontes/${kontesId}`" class="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 font-semibold transition-colors mb-1">
          ← Kembali ke Manajemen Kontes
        </NuxtLink>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Rekapitulasi Perolehan Suara</h1>
        <p class="text-xs text-slate-500 mt-0.5">Laporan statistik perolehan suara dan peringkat kandidat secara real-time</p>
      </div>

      <div class="flex items-center space-x-2 shrink-0">
        <NuxtLink 
          :to="`/admin/kontes/${kontesId}/orders`" 
          class="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs rounded-xl border border-emerald-200/80 transition cursor-pointer"
        >
          <CheckCircle2 class="w-4 h-4 text-emerald-600" />
          <span>Verifikasi Order</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="p-12 text-center text-slate-500 text-sm bg-white rounded-3xl border border-slate-200/80 shadow-xs">
      <div class="inline-block w-6 h-6 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-2"></div>
      <div>Memuat rekapitulasi hasil suara...</div>
    </div>

    <template v-else-if="hasil">
      <!-- Minimalist & Elegant KPI Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- KPI 1: Total Suara Masuk -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Suara Masuk</p>
            <h4 class="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-mono">
              {{ hasil.totalSuaraMasuk.toLocaleString('id-ID') }} <span class="text-xs font-semibold text-slate-500 font-sans">Suara</span>
            </h4>
            <p class="text-[11px] text-slate-500 mt-1">Total akumulasi vote sah</p>
          </div>
          <div class="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shrink-0 shadow-xs">
            <Vote class="w-5 h-5" />
          </div>
        </div>

        <!-- KPI 2: Kandidat Paling Unggul -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Kandidat Unggul</p>
            <h4 class="text-sm sm:text-base font-bold text-slate-900 mt-1 truncate max-w-[150px]" :title="topKandidat.nama">
              {{ topKandidat.nama }}
            </h4>
            <p class="text-[11px] text-amber-600 font-semibold mt-1">
              {{ topKandidat.suara.toLocaleString('id-ID') }} Suara ({{ topKandidat.persen }}%)
            </p>
          </div>
          <div class="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center shrink-0 shadow-xs">
            <Trophy class="w-5 h-5" />
          </div>
        </div>

        <!-- KPI 3: Status Kontes -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status Pemilihan</p>
            <h4 class="text-base font-extrabold mt-1" :class="hasil.status === 'AKTIF' ? 'text-emerald-600' : 'text-slate-700'">
              {{ hasil.status }}
            </h4>
            <p class="text-[11px] text-slate-500 mt-1">
              {{ hasil.status === 'AKTIF' ? 'Voting sedang berlangsung' : 'Selesai / Terkunci' }}
            </p>
          </div>
          <div 
            class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
            :class="hasil.status === 'AKTIF' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/80' : 'bg-slate-100 text-slate-600 border border-slate-200'"
          >
            <CheckCircle2 class="w-5 h-5" />
          </div>
        </div>
      </div>

      <!-- Modern Leaderboard Component -->
      <KontesLeaderboard
        :items="hasil.leaderboard"
        :total-suara="hasil.totalSuaraMasuk"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Vote, CheckCircle2, Trophy } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const route = useRoute()
const kontesId = route.params.id as string

const { data: hasil, pending } = await useFetch<any>(`/api/admin/kontes/${kontesId}/hasil`)

const topKandidat = computed(() => {
  if (!hasil.value?.leaderboard || hasil.value.leaderboard.length === 0) {
    return { nama: '-', suara: 0, persen: '0.0' }
  }
  const top = hasil.value.leaderboard[0]
  return {
    nama: top.nama,
    suara: top.totalSuara,
    persen: top.persentase
  }
})
</script>

