<script setup lang="ts">
import { 
  Loader2, 
  AlertCircle 
} from 'lucide-vue-next'
import KontesHeader from '~/components/admin/KontesHeader.vue'
import KontesQuickStats from '~/components/admin/KontesQuickStats.vue'
import KandidatList from '~/components/admin/KandidatList.vue'
import PaketTokenList from '~/components/admin/PaketTokenList.vue'
import ModalKandidat from '~/components/admin/ModalKandidat.vue'
import ModalPaketToken from '~/components/admin/ModalPaketToken.vue'
import ModalConfirmDelete from '~/components/admin/ModalConfirmDelete.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin']
})

const route = useRoute()
const kontesId = computed(() => Number(route.params.id))

// State Data
const kontes = ref<any>(null)
const loading = ref(true)
const errorMessage = ref('')
const updatingStatus = ref(false)

// State Modal Kandidat
const showModalKandidat = ref(false)
const isEditingKandidat = ref(false)
const editingKandidatId = ref<number | null>(null)
const submittingKandidat = ref(false)
const uploadingImage = ref(false)
const kandidatForm = ref({
  nama: '',
  nomorUrut: null as number | null,
  deskripsi: '',
  visiMisi: '',
  fotoUrl: ''
})

function openCreateKandidatModal() {
  isEditingKandidat.value = false
  editingKandidatId.value = null
  kandidatForm.value = {
    nama: '',
    nomorUrut: null,
    deskripsi: '',
    visiMisi: '',
    fotoUrl: ''
  }
  showModalKandidat.value = true
}

function openEditKandidatModal(k: any) {
  isEditingKandidat.value = true
  editingKandidatId.value = k.id
  kandidatForm.value = {
    nama: k.nama || '',
    nomorUrut: k.nomorUrut !== undefined && k.nomorUrut !== null ? Number(k.nomorUrut) : null,
    deskripsi: k.deskripsi || k.visiMisi || '',
    visiMisi: k.deskripsi || k.visiMisi || '',
    fotoUrl: k.fotoUrl || ''
  }
  showModalKandidat.value = true
}

function closeModalKandidat() {
  showModalKandidat.value = false
  isEditingKandidat.value = false
  editingKandidatId.value = null
}

// State Modal Paket Token
const showModalPaket = ref(false)
const submittingPaket = ref(false)
const paketForm = ref({
  namaPaket: '',
  jumlahToken: 1,
  harga: 10000
})



// Delete confirmation state
const deleteModal = ref({
  show: false,
  type: '' as 'kandidat' | 'paket',
  id: null as number | null,
  title: ''
})

// Computed helper untuk paket token (dukung tokenPackages dari backend Prisma & paketToken)
const paketTokenList = computed(() => {
  if (!kontes.value) return []
  return kontes.value.tokenPackages || kontes.value.paketToken || []
})

// Fetch Kontes Detail
async function fetchKontes() {
  try {
    loading.value = true
    const data = await $fetch<any>(`/api/admin/kontes/${kontesId.value}`)
    kontes.value = data
  } catch (err: any) {
    errorMessage.value = err.data?.statusMessage || 'Gagal memuat detail kontes'
  } finally {
    loading.value = false
  }
}

// Toggle Status Kontes
async function updateStatus(newStatus: string) {
  try {
    updatingStatus.value = true
    const updated = await $fetch<any>(`/api/admin/kontes/${kontesId.value}`, {
      method: 'PATCH',
      body: { status: newStatus }
    })
    if (kontes.value && updated) {
      kontes.value.status = updated.status
    }
  } catch (err: any) {
    alert(err.data?.statusMessage || 'Gagal mengubah status kontes')
  } finally {
    updatingStatus.value = false
  }
}

// Upload Image Handler
async function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const file = target.files[0]
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)

  try {
    uploadingImage.value = true
    const res = await $fetch<{ url?: string; publicUrl?: string }>('/api/admin/upload', {
      method: 'POST',
      body: formData
    })
    kandidatForm.value.fotoUrl = res.url || res.publicUrl || ''
  } catch (err: any) {
    alert(err.data?.statusMessage || err.message || 'Gagal mengunggah foto')
  } finally {
    uploadingImage.value = false
  }
}

// Modal Kandidat Submit (Create or Edit)
async function submitKandidat() {
  if (!kandidatForm.value.nama) return

  try {
    submittingKandidat.value = true
    const payload = {
      nama: kandidatForm.value.nama,
      nomorUrut: kandidatForm.value.nomorUrut !== null && kandidatForm.value.nomorUrut !== undefined && kandidatForm.value.nomorUrut !== ('' as any)
        ? Number(kandidatForm.value.nomorUrut)
        : null,
      deskripsi: kandidatForm.value.deskripsi || kandidatForm.value.visiMisi || null,
      fotoUrl: kandidatForm.value.fotoUrl || null
    }

    if (isEditingKandidat.value && editingKandidatId.value) {
      await $fetch(`/api/admin/kontes/${kontesId.value}/kandidat/${editingKandidatId.value}`, {
        method: 'PATCH',
        body: payload
      })
    } else {
      await $fetch(`/api/admin/kontes/${kontesId.value}/kandidat`, {
        method: 'POST',
        body: payload
      })
    }

    closeModalKandidat()
    await fetchKontes()
  } catch (err: any) {
    alert(err.data?.statusMessage || (isEditingKandidat.value ? 'Gagal mengubah data kandidat' : 'Gagal menambah kandidat'))
  } finally {
    submittingKandidat.value = false
  }
}

// Modal Paket Submit
async function submitPaket() {
  if (!paketForm.value.namaPaket || paketForm.value.jumlahToken < 1 || paketForm.value.harga < 0) return

  try {
    submittingPaket.value = true
    await $fetch(`/api/admin/kontes/${kontesId.value}/paket`, {
      method: 'POST',
      body: {
        namaPaket: paketForm.value.namaPaket,
        jumlahSuara: paketForm.value.jumlahToken,
        jumlahToken: paketForm.value.jumlahToken,
        harga: paketForm.value.harga
      }
    })

    showModalPaket.value = false
    paketForm.value = { namaPaket: '', jumlahToken: 1, harga: 10000 }
    await fetchKontes()
  } catch (err: any) {
    alert(err.data?.statusMessage || 'Gagal menambah paket token')
  } finally {
    submittingPaket.value = false
  }
}


// Confirm Delete Dialog
function confirmDelete(type: 'kandidat' | 'paket', id: number, title: string) {
  deleteModal.value = {
    show: true,
    type,
    id,
    title
  }
}

// Execute Delete
async function executeDelete() {
  if (!deleteModal.value.id) return

  try {
    if (deleteModal.value.type === 'kandidat') {
      await $fetch(`/api/admin/kontes/${kontesId.value}/kandidat/${deleteModal.value.id}`, {
        method: 'DELETE'
      })
    } else {
      await $fetch(`/api/admin/kontes/${kontesId.value}/paket/${deleteModal.value.id}`, {
        method: 'DELETE'
      })
    }
    deleteModal.value.show = false
    await fetchKontes()
  } catch (err: any) {
    alert(err.data?.statusMessage || 'Gagal menghapus data')
  }
}

onMounted(() => {
  fetchKontes()
})
</script>

<template>
  <div class="space-y-6 pb-12">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <Loader2 class="w-10 h-10 text-slate-800 animate-spin mb-4" />
      <p class="text-slate-500 font-medium text-xs">Memuat data kontes...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center text-rose-700 shadow-2xs">
      <AlertCircle class="w-10 h-10 mx-auto mb-2 text-rose-600" />
      <p class="font-semibold text-sm">{{ errorMessage }}</p>
      <NuxtLink to="/admin" class="mt-4 inline-block px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition">
        Kembali ke Dashboard
      </NuxtLink>
    </div>

    <template v-else-if="kontes">
      <!-- Breadcrumb Nav -->
      <div class="flex items-center justify-between">
        <NuxtLink to="/admin/kontes" class="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 font-semibold transition-colors">
          ← Kembali ke Kelola Kontes
        </NuxtLink>
      </div>

      <!-- Top Action Bar & Header Component -->
      <KontesHeader 
        :kontes="kontes" 
        :updating-status="updatingStatus" 
        @update-status="updateStatus" 
      />

      <!-- Quick Info / Stats Component -->
      <KontesQuickStats 
        :kontes="kontes" 
        :paket-token-count="paketTokenList.length" 
        @open-kandidat-modal="openCreateKandidatModal" 
        @open-paket-modal="showModalPaket = true" 
      />

      <!-- Section Kandidat Component -->
      <KandidatList 
        :kandidat-list="kontes.kandidat || []" 
        @open-kandidat-modal="openCreateKandidatModal" 
        @edit-kandidat="openEditKandidatModal"
        @confirm-delete="confirmDelete" 
      />

      <!-- Section Paket Token Component -->
      <PaketTokenList 
        :paket-list="paketTokenList" 
        @open-paket-modal="showModalPaket = true" 
        @confirm-delete="confirmDelete" 
      />
    </template>

    <!-- Modals -->
    <ModalKandidat 
      :show="showModalKandidat" 
      :is-edit="isEditingKandidat"
      :submitting="submittingKandidat" 
      :uploading-image="uploadingImage" 
      :form="kandidatForm" 
      @close="closeModalKandidat" 
      @submit="submitKandidat" 
      @upload-file="handleFileUpload" 
    />

    <ModalPaketToken 
      :show="showModalPaket" 
      :submitting="submittingPaket" 
      :form="paketForm" 
      @close="showModalPaket = false" 
      @submit="submitPaket" 
    />


    <ModalConfirmDelete 
      :show="deleteModal.show" 
      :title="deleteModal.title" 
      @close="deleteModal.show = false" 
      @confirm="executeDelete" 
    />
  </div>
</template>
