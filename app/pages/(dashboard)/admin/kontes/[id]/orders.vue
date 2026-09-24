<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <NuxtLink :to="`/admin/kontes/${kontesId}`" class="text-xs text-slate-500 hover:text-slate-900 mb-1 inline-flex items-center gap-1 font-medium transition-colors">
          ← Kembali ke Detail Kontes
        </NuxtLink>
        <h1 class="text-2xl font-bold text-slate-900">Verifikasi Order Token</h1>
        <p class="text-xs text-slate-500 mt-1">Daftar pesanan token dari pendukung. Verifikasi untuk generate kode token.</p>
      </div>

      <!-- Filter Status -->
      <div class="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
        <button
          v-for="st in ['ALL', 'MENUNGGU_VERIFIKASI', 'TERVERIFIKASI', 'DITOLAK']"
          :key="st"
          @click="filterStatus = st"
          class="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors shrink-0"
          :class="filterStatus === st ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'"
        >
          {{ st === 'ALL' ? 'Semua Status' : st }}
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="w-full sm:w-96 relative">
        <Search class="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari ID Order, No. WA, atau Kode Token..."
          class="w-full h-9 pl-9 pr-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
        />
      </div>

      <div class="text-xs text-slate-500 font-medium">
        Menampilkan <span class="font-bold text-slate-900">{{ filteredOrders.length }}</span> order
      </div>
    </div>

    <!-- Order Table -->
    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
      <div v-if="pending" class="p-8 text-center text-slate-500 text-sm">
        Memuat daftar order...
      </div>

      <AdminOrderTable
        v-else
        :orders="filteredOrders"
        :loading-id="loadingId"
        @verify="handleVerify"
        @reject="handleReject"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const route = useRoute()
const kontesId = route.params.id as string

const filterStatus = ref('ALL')
const searchQuery = ref('')
const loadingId = ref<number | null>(null)

const { data: orders, pending, refresh } = await useFetch(`/api/admin/kontes/${kontesId}/order`)

const filteredOrders = computed(() => {
  if (!orders.value) return []
  
  let result = [...orders.value]

  // 1. Filter berdasarkan status
  if (filterStatus.value !== 'ALL') {
    result = result.filter((o: any) => o.status === filterStatus.value)
  }

  // 2. Filter berdasarkan kata kunci pencarian (ID, WA, Kode Token, Nama Paket)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter((o: any) => {
      const matchId = String(o.id).includes(q)
      const matchWa = o.kontakWa ? o.kontakWa.toLowerCase().includes(q) : false
      const matchToken = o.token?.code ? o.token.code.toLowerCase().includes(q) : false
      const matchPaket = o.package?.namaPaket ? o.package.namaPaket.toLowerCase().includes(q) : false

      return matchId || matchWa || matchToken || matchPaket
    })
  }

  return result
})

const handleVerify = async (order: any) => {
  loadingId.value = order.id
  try {
    const res = await $fetch<any>(`/api/admin/kontes/${kontesId}/order/${order.id}/verify`, {
      method: 'PATCH',
    })
    const tokenCode = res.tokenCode || res.token || ''
    alert(`Order #${order.id} berhasil diverifikasi!\nKode Token Generated: ${tokenCode}\n\nKirimkan kode token tersebut kepada voter via WA.`)
    await refresh()
  } catch (err: any) {
    alert(err.data?.statusMessage || 'Gagal memverifikasi order.')
  } finally {
    loadingId.value = null
  }
}

const handleReject = async (order: any) => {
  if (!confirm(`Tolak order #${order.id}?`)) return
  loadingId.value = order.id
  try {
    await $fetch(`/api/admin/kontes/${kontesId}/order/${order.id}/reject`, {
      method: 'PATCH',
    })
    await refresh()
  } catch (err: any) {
    alert(err.data?.statusMessage || 'Gagal menolak order.')
  } finally {
    loadingId.value = null
  }
}
</script>
