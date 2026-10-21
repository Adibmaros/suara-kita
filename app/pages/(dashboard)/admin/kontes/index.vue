<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Daftar Kontes</h1>
        <p class="text-xs text-slate-500 mt-1">Kelola seluruh kontes yang diselenggarakan oleh instansi Anda</p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Status Filter Dropdown -->
        <div v-if="listKontes.length > 0 || activeFilter !== 'SEMUA'" class="relative">
          <select
            v-model="activeFilter"
            class="h-9 pl-3.5 pr-8 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer appearance-none transition"
          >
            <option
              v-for="tab in filterTabs"
              :key="tab.value"
              :value="tab.value"
            >
              {{ tab.label }} ({{ tab.count }})
            </option>
          </select>
          <ChevronDown class="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button 
          @click="openCreateModal" 
          class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors shadow-xs shrink-0 cursor-pointer"
        >
          + Buat Kontes Baru
        </button>
      </div>
    </div>

    <div v-if="pending" class="text-slate-500 text-sm">Memuat kontes...</div>

    <div v-else-if="!listKontes || listKontes.length === 0" class="text-center py-16 bg-white border border-slate-200 rounded-xl space-y-4 shadow-2xs">
      <p class="text-slate-500 text-sm">Belum ada kontes yang dibuat.</p>
      <button 
        @click="openCreateModal" 
        class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors shadow-xs cursor-pointer"
      >
        Buat Kontes Pertama
      </button>
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
          @edit="openEditModal"
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

    <!-- Create / Edit Kontes Popup Modal -->
    <AdminModalKontes
      :show="modalKontes.show"
      :is-edit="modalKontes.isEdit"
      :submitting="modalKontes.submitting"
      :error-msg="modalKontes.errorMsg"
      :form="kontesForm"
      @close="closeKontesModal"
      @submit="submitKontes"
    />

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
import { ref, reactive, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
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

// State Modal Tambah / Edit Kontes
const kontesForm = reactive({
  nama: '',
  deskripsi: '',
  status: 'DRAFT',
  tanggalMulai: '',
  tanggalSelesai: '',
})

const modalKontes = reactive({
  show: false,
  isEdit: false,
  id: null as number | null,
  submitting: false,
  errorMsg: '',
})

function toDatetimeLocal(isoStr?: string | null) {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  if (isNaN(d.getTime())) return ''
  const pad = (n: number) => n.toString().padStart(2, '0')
  const yyyy = d.getFullYear()
  const mm = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  const hh = pad(d.getHours())
  const min = pad(d.getMinutes())
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`
}

const openCreateModal = () => {
  modalKontes.isEdit = false
  modalKontes.id = null
  modalKontes.errorMsg = ''
  kontesForm.nama = ''
  kontesForm.deskripsi = ''
  kontesForm.status = 'DRAFT'
  kontesForm.tanggalMulai = ''
  kontesForm.tanggalSelesai = ''
  modalKontes.show = true
}

const openEditModal = (kontes: any) => {
  closeDropdown()
  modalKontes.isEdit = true
  modalKontes.id = kontes.id
  modalKontes.errorMsg = ''
  kontesForm.nama = kontes.nama || kontes.judul || ''
  kontesForm.deskripsi = kontes.deskripsi || ''
  kontesForm.status = kontes.status || 'DRAFT'
  kontesForm.tanggalMulai = toDatetimeLocal(kontes.tanggalMulai)
  kontesForm.tanggalSelesai = toDatetimeLocal(kontes.tanggalSelesai)
  modalKontes.show = true
}

const closeKontesModal = () => {
  modalKontes.show = false
  modalKontes.errorMsg = ''
  modalKontes.id = null
}

const submitKontes = async () => {
  if (!kontesForm.nama.trim()) {
    modalKontes.errorMsg = 'Nama kontes wajib diisi.'
    return
  }

  modalKontes.submitting = true
  modalKontes.errorMsg = ''

  try {
    const payload = {
      nama: kontesForm.nama.trim(),
      deskripsi: kontesForm.deskripsi?.trim() || null,
      tanggalMulai: kontesForm.tanggalMulai ? new Date(kontesForm.tanggalMulai).toISOString() : null,
      tanggalSelesai: kontesForm.tanggalSelesai ? new Date(kontesForm.tanggalSelesai).toISOString() : null,
      status: kontesForm.status,
    }

    if (modalKontes.isEdit && modalKontes.id) {
      await $fetch(`/api/admin/kontes/${modalKontes.id}`, {
        method: 'PATCH',
        body: payload,
      })
    } else {
      await $fetch('/api/admin/kontes', {
        method: 'POST',
        body: payload,
      })
    }

    modalKontes.show = false
    await refresh()
  } catch (err: any) {
    modalKontes.errorMsg = err.data?.statusMessage || 'Gagal menyimpan data kontes.'
  } finally {
    modalKontes.submitting = false
  }
}

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


