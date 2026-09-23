<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <NuxtLink :to="`/admin/kontes/${kontesId}`" class="text-xs text-indigo-400 hover:underline mb-1 block">
          ← Kembali ke Detail Kontes
        </NuxtLink>
        <h1 class="text-2xl font-bold text-white font-heading">Verifikasi Order Token</h1>
        <p class="text-xs text-slate-400 mt-1">Daftar pesanan token dari pendukung. Verifikasi untuk generate kode token.</p>
      </div>

      <div class="flex items-center space-x-2">
        <button
          v-for="st in ['ALL', 'MENUNGGU_VERIFIKASI', 'TERVERIFIKASI', 'DITOLAK']"
          :key="st"
          @click="filterStatus = st"
          class="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors"
          :class="filterStatus === st ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'"
        >
          {{ st === 'ALL' ? 'Semua Status' : st }}
        </button>
      </div>
    </div>

    <UiCard class="p-0 overflow-hidden">
      <div v-if="pending" class="p-8 text-center text-slate-400 text-sm">
        Memuat daftar order...
      </div>

      <AdminOrderTable
        v-else-if="filteredOrders"
        :orders="filteredOrders"
        :loading-id="loadingId"
        @verify="handleVerify"
        @reject="handleReject"
      />
    </UiCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const route = useRoute()
const kontesId = route.params.id as string

const filterStatus = ref('ALL')
const loadingId = ref<number | null>(null)

const { data: orders, pending, refresh } = await useFetch(`/api/admin/kontes/${kontesId}/order`)

const filteredOrders = computed(() => {
  if (!orders.value) return []
  if (filterStatus.value === 'ALL') return orders.value
  return orders.value.filter((o: any) => o.status === filterStatus.value)
})

const handleVerify = async (order: any) => {
  loadingId.value = order.id
  try {
    const res = await $fetch(`/api/admin/kontes/${kontesId}/order/${order.id}/verify`, {
      method: 'PATCH',
    })
    alert(`Order #${order.id} berhasil diverifikasi!\nKode Token Generated: ${res.tokenCode}\n\nKirimkan kode token tersebut kepada voter via WA.`)
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
