<template>
  <div class="space-y-6">
    <!-- Header & Action Button -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Rekapitulasi Komisi Platform</h1>
        <p class="text-xs text-slate-500 mt-1">Laporan omset penjualan token dan pendapatan komisi platform per instansi</p>
      </div>

      <button
        v-if="rekap && rekap.length > 0"
        @click="exportCSV"
        class="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
      >
        <Download class="w-4 h-4" />
        <span>Ekspor Data (CSV)</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="p-12 text-center text-slate-500 text-sm bg-white rounded-2xl border border-slate-200/80 shadow-xs">
      <div class="inline-block w-6 h-6 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-2"></div>
      <div>Memuat rekapitulasi komisi...</div>
    </div>

    <template v-else-if="rekap">
      <!-- KPI Summary Cards (4 Cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Card 1: Total Omset Platform -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Omset Platform</p>
            <h4 class="text-xl font-extrabold text-slate-900 mt-1">Rp {{ totalPlatformOmset.toLocaleString('id-ID') }}</h4>
            <p class="text-[11px] text-slate-500 mt-1">Seluruh penjualan token</p>
          </div>
          <div class="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center shrink-0 shadow-xs">
            <TrendingUp class="w-5 h-5" />
          </div>
        </div>

        <!-- Card 2: Total Pendapatan Komisi Platform -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Komisi Platform</p>
            <h4 class="text-xl font-extrabold text-blue-600 mt-1">Rp {{ totalPlatformKomisi.toLocaleString('id-ID') }}</h4>
            <p class="text-[11px] text-slate-500 mt-1">Pendapatan bersih platform</p>
          </div>
          <div class="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shrink-0 shadow-xs">
            <Wallet class="w-5 h-5" />
          </div>
        </div>

        <!-- Card 3: Total Order Verified -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Order Diverifikasi</p>
            <h4 class="text-xl font-extrabold text-slate-900 mt-1">{{ totalOrdersVerifiedCount }} Order</h4>
            <p class="text-[11px] text-slate-500 mt-1">Transaksi token valid</p>
          </div>
          <div class="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/80 flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 class="w-5 h-5" />
          </div>
        </div>

        <!-- Card 4: Top Kontributor -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Kontributor</p>
            <h4 class="text-sm font-bold text-slate-900 mt-1 truncate max-w-[140px]" :title="topInstansi.nama">{{ topInstansi.nama }}</h4>
            <p class="text-[11px] text-amber-600 font-semibold mt-1">Komisi: Rp {{ topInstansi.komisi.toLocaleString('id-ID') }}</p>
          </div>
          <div class="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center shrink-0 shadow-xs">
            <Trophy class="w-5 h-5" />
          </div>
        </div>
      </div>

      <!-- Search Bar Control -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="w-full sm:w-80 relative">
          <Search class="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama instansi atau WhatsApp..."
            class="w-full h-9 pl-9 pr-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div class="text-xs text-slate-500 font-medium">
          Menampilkan <span class="font-bold text-slate-900">{{ filteredRekap.length }}</span> instansi terdaftar
        </div>
      </div>

      <!-- Data Table Card Container -->
      <div class="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-700 border-collapse">
            <thead class="bg-slate-50/80 text-[11px] text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
              <tr>
                <th class="py-3.5 px-4 font-semibold">ID</th>
                <th class="py-3.5 px-4 font-semibold">Nama Instansi</th>
                <th class="py-3.5 px-4 font-semibold">No. WA Admin</th>
                <th class="py-3.5 px-4 font-semibold text-center">Order Verified</th>
                <th class="py-3.5 px-4 font-semibold">Total Omset Penjualan</th>
                <th class="py-3.5 px-4 font-semibold text-center">Rate Komisi</th>
                <th class="py-3.5 px-4 font-semibold text-right">Total Komisi Platform</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-if="filteredRekap.length === 0">
                <td colspan="7" class="p-12 text-center text-slate-400">
                  Tidak ada data rekap komisi yang sesuai pencarian.
                </td>
              </tr>
              <tr 
                v-for="item in filteredRekap" 
                :key="item.instansiId" 
                class="hover:bg-slate-50/60 transition-colors"
              >
                <!-- ID -->
                <td class="py-4 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                  #{{ item.instansiId }}
                </td>

                <!-- Nama Instansi -->
                <td class="py-4 px-4 whitespace-nowrap">
                  <div class="font-bold text-slate-900">{{ item.namaInstansi }}</div>
                  <div class="text-[11px] text-slate-400 font-mono">slug: {{ item.slug }}</div>
                </td>

                <!-- No WA Admin -->
                <td class="py-4 px-4 font-mono text-slate-600 whitespace-nowrap">
                  {{ item.noWaAdmin }}
                </td>

                <!-- Order Verified -->
                <td class="py-4 px-4 text-center font-bold text-slate-900 whitespace-nowrap">
                  {{ item.totalOrdersVerified }}
                </td>

                <!-- Total Omset -->
                <td class="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
                  Rp {{ item.totalOmset.toLocaleString('id-ID') }}
                </td>

                <!-- Rate Komisi -->
                <td class="py-4 px-4 text-center whitespace-nowrap">
                  <span class="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80">
                    <Percent class="w-3 h-3 text-blue-500" />
                    <span>{{ item.persenKomisi }}%</span>
                  </span>
                </td>

                <!-- Total Komisi Platform -->
                <td class="py-4 px-4 font-extrabold text-blue-600 text-right whitespace-nowrap">
                  Rp {{ item.totalKomisi.toLocaleString('id-ID') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { TrendingUp, Wallet, CheckCircle2, Trophy, Search, Download, Percent } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'super-admin'],
})

const searchQuery = ref('')
const { data: rekap, pending } = await useFetch<any[]>('/api/super-admin/komisi')

const filteredRekap = computed(() => {
  if (!rekap.value) return []
  if (!searchQuery.value.trim()) return rekap.value
  const q = searchQuery.value.toLowerCase().trim()
  return rekap.value.filter((item: any) => 
    item.namaInstansi.toLowerCase().includes(q) || 
    item.noWaAdmin.toLowerCase().includes(q) ||
    item.slug.toLowerCase().includes(q)
  )
})

// KPI Calculations
const totalPlatformOmset = computed(() => {
  if (!rekap.value) return 0
  return rekap.value.reduce((acc, curr) => acc + (curr.totalOmset || 0), 0)
})

const totalPlatformKomisi = computed(() => {
  if (!rekap.value) return 0
  return rekap.value.reduce((acc, curr) => acc + (curr.totalKomisi || 0), 0)
})

const totalOrdersVerifiedCount = computed(() => {
  if (!rekap.value) return 0
  return rekap.value.reduce((acc, curr) => acc + (curr.totalOrdersVerified || 0), 0)
})

const topInstansi = computed(() => {
  if (!rekap.value || rekap.value.length === 0) return { nama: '-', komisi: 0 }
  const sorted = [...rekap.value].sort((a, b) => b.totalKomisi - a.totalKomisi)
  return {
    nama: sorted[0]?.namaInstansi || '-',
    komisi: sorted[0]?.totalKomisi || 0
  }
})

// CSV Export functionality
const exportCSV = () => {
  if (!rekap.value || rekap.value.length === 0) return
  
  const headers = ['ID Instansi', 'Nama Instansi', 'Slug', 'No WA Admin', 'Order Diverifikasi', 'Total Omset (Rp)', 'Rate Komisi (%)', 'Komisi Platform (Rp)']
  const rows = rekap.value.map(item => [
    item.instansiId,
    `"${item.namaInstansi}"`,
    item.slug,
    `"${item.noWaAdmin}"`,
    item.totalOrdersVerified,
    item.totalOmset,
    `${item.persenKomisi}%`,
    item.totalKomisi
  ])

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `Rekap_Komisi_SuaraKita_${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>
