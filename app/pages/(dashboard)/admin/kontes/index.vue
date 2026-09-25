<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Daftar Kontes</h1>
        <p class="text-xs text-slate-500 mt-1">Kelola seluruh kontes yang diselenggarakan oleh instansi Anda</p>
      </div>

      <NuxtLink to="/admin/kontes/buat" class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors shadow-xs shrink-0">
        + Buat Kontes Baru
      </NuxtLink>
    </div>

    <!-- Status Filter Tabs -->
    <div v-if="listKontes.length > 0 || activeFilter !== 'SEMUA'" class="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
      <button
        v-for="tab in filterTabs"
        :key="tab.value"
        @click="activeFilter = tab.value"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap"
        :class="activeFilter === tab.value 
          ? 'bg-slate-900 text-white shadow-2xs font-semibold' 
          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'"
      >
        <span>{{ tab.label }}</span>
        <span 
          class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
          :class="activeFilter === tab.value ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>

    <div v-if="pending" class="text-slate-500 text-sm">Memuat kontes...</div>

    <div v-else-if="!listKontes || listKontes.length === 0" class="text-center py-16 bg-white border border-slate-200 rounded-xl space-y-4 shadow-2xs">
      <p class="text-slate-500 text-sm">Belum ada kontes yang dibuat.</p>
      <NuxtLink to="/admin/kontes/buat" class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors shadow-xs">
        Buat Kontes Pertama
      </NuxtLink>
    </div>

    <div v-else-if="filteredKontes.length === 0" class="text-center py-12 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
      <p class="text-slate-600 text-sm font-medium">Tidak ada kontes dengan status "{{ activeFilter }}".</p>
      <button @click="activeFilter = 'SEMUA'" class="text-xs text-blue-600 hover:underline">
        Tampilkan semua kontes
      </button>
    </div>

    <div v-else class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminKontesCard
          v-for="kontes in filteredKontes" 
          :key="kontes.id"
          :kontes="kontes"
          :is-open="openDropdownId === kontes.id"
          @toggle-dropdown="toggleDropdown"
          @close-dropdown="closeDropdown"
          @delete="openDeleteModal"
        />
      </div>

      <!-- Pagination -->
      <UIPagination
        v-if="listKontesResponse?.meta"
        :current-page="currentPage"
        :total-pages="listKontesResponse.meta.totalPages"
        :total-items="listKontesResponse.meta.total"
        :per-page="listKontesResponse.meta.perPage"
        @page-change="onPageChange"
      />
    </div>

    <!-- Confirm Delete Modal -->
    <AdminModalDeleteKontes
      :kontes="kontesToDelete"
      :is-deleting="isDeleting"
      :error="deleteError"
      @close="kontesToDelete = null"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import UIPagination from '~/components/ui/UIPagination.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const currentPage = ref(1)
const activeFilter = ref<'SEMUA' | 'DRAFT' | 'AKTIF' | 'DITUTUP'>('SEMUA')
const openDropdownId = ref<number | null>(null)
const kontesToDelete = ref<{ id: number; nama: string } | null>(null)
const isDeleting = ref(false)
const deleteError = ref('')

const { data: listKontesResponse, pending, refresh } = await useFetch('/api/admin/kontes', {
  query: computed(() => ({
    page: currentPage.value,
    perPage: 12
  }))
})

const listKontes = computed(() => listKontesResponse.value?.data || [])

const filteredKontes = computed(() => {
  if (activeFilter.value === 'SEMUA') return listKontes.value
  return listKontes.value.filter((k: any) => k.status === activeFilter.value)
})

const filterTabs = computed(() => {
  const all = listKontes.value.length
  const draft = listKontes.value.filter((k: any) => k.status === 'DRAFT').length
  const aktif = listKontes.value.filter((k: any) => k.status === 'AKTIF').length
  const ditutup = listKontes.value.filter((k: any) => k.status === 'DITUTUP').length

  return [
    { label: 'Semua', value: 'SEMUA', count: all },
    { label: 'Aktif', value: 'AKTIF', count: aktif },
    { label: 'Draft', value: 'DRAFT', count: draft },
    { label: 'Ditutup', value: 'DITUTUP', count: ditutup },
  ]
})

const toggleDropdown = (id: number) => {
  openDropdownId.value = openDropdownId.value === id ? null : id
}

const closeDropdown = () => {
  openDropdownId.value = null
}

const openDeleteModal = (kontes: any) => {
  closeDropdown()
  deleteError.value = ''
  kontesToDelete.value = { id: kontes.id, nama: kontes.nama }
}

const confirmDelete = async () => {
  if (!kontesToDelete.value) return
  isDeleting.value = true
  deleteError.value = ''

  try {
    await $fetch(`/api/admin/kontes/${kontesToDelete.value.id}`, {
      method: 'DELETE',
    })
    kontesToDelete.value = null
    await refresh()
  } catch (err: any) {
    deleteError.value = err.data?.statusMessage || 'Gagal menghapus kontes.'
  } finally {
    isDeleting.value = false
  }
}

const onPageChange = (page: number) => {
  currentPage.value = page
}
</script>


