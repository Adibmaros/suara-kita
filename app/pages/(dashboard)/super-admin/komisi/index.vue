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
      <!-- KPI Summary Cards -->
      <SuperAdminKomisiStats 
        :total-omset="totalPlatformOmset"
        :total-komisi="totalPlatformKomisi"
        :total-orders="totalOrdersVerifiedCount"
        :top-instansi="topInstansi"
      />

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
      <SuperAdminKomisiTable :items="filteredRekap" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Download, Search } from 'lucide-vue-next'

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

