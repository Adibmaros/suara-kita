<template>
  <div class="space-y-6">
    <!-- Header & Filter Section -->
    <SuperAdminInstansiFilterHeader v-model="filterStatus" />

    <!-- Table Section -->
    <SuperAdminInstansiTable 
      :instansi-list="instansiList"
      :pending="pending"
      @edit-komisi="openKomisiModal"
      @update-status="openStatusModal"
    />

    <!-- Pagination -->
    <UIPagination
      v-if="instansiResponse?.meta"
      :current-page="currentPage"
      :total-pages="instansiResponse.meta.totalPages"
      :total-items="instansiResponse.meta.total"
      :per-page="instansiResponse.meta.perPage"
      @page-change="onPageChange"
    />

    <!-- Custom Modal: Confirm Status Change -->
    <SuperAdminModalInstansiStatus 
      :is-open="statusModal.isOpen"
      :instansi-nama="statusModal.instansiNama"
      :target-status="statusModal.targetStatus"
      :is-loading="statusModal.isLoading"
      @close="statusModal.isOpen = false"
      @confirm="confirmUpdateStatus"
    />

    <!-- Custom Modal: Edit Persen Komisi -->
    <SuperAdminModalInstansiKomisi 
      :is-open="komisiModal.isOpen"
      :instansi-nama="komisiModal.instansiNama"
      v-model:persen-komisi="komisiModal.persenKomisi"
      :is-loading="komisiModal.isLoading"
      :error-message="komisiModal.errorMessage"
      @close="komisiModal.isOpen = false"
      @confirm="confirmUpdateKomisi"
    />

    <!-- Custom Toast Notification -->
    <SuperAdminToastNotification 
      :show="toast.show"
      :message="toast.message"
      :type="toast.type"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import UIPagination from '~/components/ui/UIPagination.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'super-admin'],
})

const filterStatus = ref('ALL')
const currentPage = ref(1)

watch(filterStatus, () => {
  currentPage.value = 1
})

const { data: instansiResponse, pending, refresh } = await useFetch('/api/super-admin/instansi', {
  query: computed(() => ({
    page: currentPage.value,
    perPage: 15,
    status: filterStatus.value
  }))
})

const instansiList = computed(() => instansiResponse.value?.data || [])

const onPageChange = (page: number) => {
  currentPage.value = page
}

// Toast notification state
const toast = reactive({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error'
})

const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.message = message
  toast.type = type
  toast.show = true
  setTimeout(() => {
    toast.show = false
  }, 3000)
}

// Status modal state & handler
const statusModal = reactive({
  isOpen: false,
  instansiId: null as number | null,
  instansiNama: '',
  targetStatus: '',
  isLoading: false
})

const openStatusModal = (ins: any, status: string) => {
  statusModal.instansiId = ins.id
  statusModal.instansiNama = ins.nama
  statusModal.targetStatus = status
  statusModal.isLoading = false
  statusModal.isOpen = true
}

const confirmUpdateStatus = async () => {
  if (!statusModal.instansiId) return
  statusModal.isLoading = true
  try {
    await $fetch(`/api/super-admin/instansi/${statusModal.instansiId}`, {
      method: 'PATCH',
      body: { status: statusModal.targetStatus },
    })
    statusModal.isOpen = false
    await refresh()
    triggerToast(`Status instansi "${statusModal.instansiNama}" berhasil diubah menjadi ${statusModal.targetStatus}.`, 'success')
  } catch (err: any) {
    triggerToast(err.data?.statusMessage || 'Gagal mengubah status instansi.', 'error')
  } finally {
    statusModal.isLoading = false
  }
}

// Komisi modal state & handler
const komisiModal = reactive({
  isOpen: false,
  instansiId: null as number | null,
  instansiNama: '',
  persenKomisi: 20,
  isLoading: false,
  errorMessage: ''
})

const openKomisiModal = (ins: any) => {
  komisiModal.instansiId = ins.id
  komisiModal.instansiNama = ins.nama
  komisiModal.persenKomisi = ins.persenKomisi ?? 20
  komisiModal.errorMessage = ''
  komisiModal.isLoading = false
  komisiModal.isOpen = true
}

const confirmUpdateKomisi = async () => {
  if (!komisiModal.instansiId) return
  if (isNaN(komisiModal.persenKomisi) || komisiModal.persenKomisi < 0 || komisiModal.persenKomisi > 100) {
    komisiModal.errorMessage = 'Persentase harus berupa angka antara 0 - 100.'
    return
  }
  komisiModal.isLoading = true
  try {
    await $fetch(`/api/super-admin/instansi/${komisiModal.instansiId}`, {
      method: 'PATCH',
      body: { persenKomisi: komisiModal.persenKomisi },
    })
    komisiModal.isOpen = false
    await refresh()
    triggerToast(`Persen komisi "${komisiModal.instansiNama}" berhasil diubah menjadi ${komisiModal.persenKomisi}%.`, 'success')
  } catch (err: any) {
    komisiModal.errorMessage = err.data?.statusMessage || 'Gagal mengubah persen komisi.'
  } finally {
    komisiModal.isLoading = false
  }
}
</script>

