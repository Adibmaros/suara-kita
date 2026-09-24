<template>
  <div class="space-y-6">
    <!-- Header & Filter Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Kelola & Approval Instansi</h1>
        <p class="text-xs text-slate-500 mt-1">Daftar instansi terdaftar, status persetujuan, dan akses kontes publik</p>
      </div>

      <!-- Single Parent Dropdown Filter -->
      <div class="relative shrink-0" ref="dropdownRef">
        <button
          @click="isFilterOpen = !isFilterOpen"
          class="flex items-center space-x-2.5 px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all cursor-pointer"
        >
          <Filter class="w-4 h-4 text-slate-500" />
          <span>Filter Status:</span>
          <span 
            class="px-2 py-0.5 rounded-md text-[11px] font-bold"
            :class="{
              'bg-slate-100 text-slate-800': filterStatus === 'ALL',
              'bg-amber-100 text-amber-800': filterStatus === 'PENDING',
              'bg-emerald-100 text-emerald-800': filterStatus === 'AKTIF',
              'bg-rose-100 text-rose-800': filterStatus === 'NONAKTIF'
            }"
          >
            {{ statusLabels[filterStatus] || filterStatus }}
          </span>
          <ChevronDown class="w-4 h-4 text-slate-400 transition-transform duration-200" :class="{ 'rotate-180': isFilterOpen }" />
        </button>

        <!-- Dropdown Menu -->
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div
            v-if="isFilterOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200/80 shadow-lg py-1 z-30"
          >
            <button
              v-for="(label, key) in statusLabels"
              :key="key"
              @click="selectFilter(key)"
              class="w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
              :class="filterStatus === key ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-700'"
            >
              <span>{{ label }}</span>
              <span 
                v-if="filterStatus === key" 
                class="w-1.5 h-1.5 rounded-full bg-blue-600"
              ></span>
            </button>
          </div>
        </transition>
      </div>
    </div>

    <!-- Responsive Table Card Container -->
    <div class="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
      <div v-if="pending" class="p-12 text-center text-slate-500 text-sm">
        <div class="inline-block w-6 h-6 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-2"></div>
        <div>Memuat daftar instansi...</div>
      </div>

      <div v-else-if="filteredInstansi" class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-700 border-collapse">
          <thead class="bg-slate-50/80 text-[11px] text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
            <tr>
              <th class="py-3.5 px-4 font-semibold">ID</th>
              <th class="py-3.5 px-4 font-semibold">Nama Instansi</th>
              <th class="py-3.5 px-4 font-semibold">Public Link & Kontes</th>
              <th class="py-3.5 px-4 font-semibold">No. WA Admin</th>
              <th class="py-3.5 px-4 font-semibold">Admin Email</th>
              <th class="py-3.5 px-4 font-semibold text-center">Persen Komisi</th>
              <th class="py-3.5 px-4 font-semibold text-center">Status</th>
              <th class="py-3.5 px-4 font-semibold text-right">Aksi Approval</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="filteredInstansi.length === 0">
              <td colspan="8" class="p-12 text-center text-slate-400">
                Tidak ada data instansi yang sesuai filter.
              </td>
            </tr>
            <tr 
              v-for="ins in filteredInstansi" 
              :key="ins.id" 
              class="hover:bg-slate-50/60 transition-colors"
            >
              <!-- ID -->
              <td class="py-4 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                #{{ ins.id }}
              </td>

              <!-- Nama Instansi -->
              <td class="py-4 px-4 whitespace-nowrap">
                <div class="font-bold text-slate-900">{{ ins.nama }}</div>
                <div class="text-[11px] text-slate-400 font-mono">slug: {{ ins.slug }}</div>
              </td>

              <!-- Public Link & Kontes (Multi-Contest Aware) -->
              <td class="py-4 px-4">
                <div class="space-y-1.5 min-w-[220px]">
                  <!-- Main Instansi Link -->
                  <NuxtLink 
                    :to="`/instansi/${ins.slug}`"
                    target="_blank"
                    class="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline group"
                  >
                    <Building2 class="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span class="truncate">/instansi/{{ ins.slug }}</span>
                    <ExternalLink class="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </NuxtLink>

                  <!-- Kontes Links (If Any) -->
                  <div v-if="ins.kontes && ins.kontes.length > 0" class="space-y-1 pt-1 border-t border-slate-100">
                    <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {{ ins.kontes.length }} Kontes Terdaftar:
                    </div>
                    <div class="flex flex-wrap gap-1">
                      <NuxtLink
                        v-for="k in ins.kontes"
                        :key="k.id"
                        :to="`/instansi/${ins.slug}/kontes/${k.id}`"
                        target="_blank"
                        class="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-medium transition-colors border border-indigo-200/60 max-w-[200px]"
                        :title="k.nama"
                      >
                        <Trophy class="w-3 h-3 text-indigo-500 shrink-0" />
                        <span class="truncate">{{ k.nama }}</span>
                        <ExternalLink class="w-2.5 h-2.5 opacity-60 shrink-0" />
                      </NuxtLink>
                    </div>
                  </div>
                  <div v-else class="text-[11px] text-slate-400 italic">
                    Belum ada kontes dibuat
                  </div>
                </div>
              </td>

              <!-- No. WA Admin -->
              <td class="py-4 px-4 font-mono text-slate-600 whitespace-nowrap">
                {{ ins.noWaAdmin }}
              </td>

              <!-- Admin Email -->
              <td class="py-4 px-4 text-slate-700 whitespace-nowrap">
                {{ ins.users[0]?.email || '-' }}
              </td>

              <!-- Persen Komisi -->
              <td class="py-4 px-4 text-center whitespace-nowrap">
                <button
                  @click="openKomisiModal(ins)"
                  class="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200/80 transition-all cursor-pointer group shadow-xs active:scale-95"
                  title="Klik untuk merubah persentase komisi"
                >
                  <Percent class="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span>{{ ins.persenKomisi ?? 20 }}%</span>
                  <Edit2 class="w-3 h-3 text-blue-400 opacity-60 group-hover:opacity-100" />
                </button>
              </td>

              <!-- Status -->
              <td class="py-4 px-4 text-center whitespace-nowrap">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold shadow-xs"
                  :class="{
                    'bg-emerald-50 text-emerald-700 border border-emerald-200': ins.status === 'AKTIF',
                    'bg-amber-50 text-amber-700 border border-amber-200': ins.status === 'PENDING',
                    'bg-rose-50 text-rose-700 border border-rose-200': ins.status === 'NONAKTIF',
                  }"
                >
                  <span 
                    class="w-1.5 h-1.5 rounded-full mr-1.5"
                    :class="{
                      'bg-emerald-500': ins.status === 'AKTIF',
                      'bg-amber-500 animate-pulse': ins.status === 'PENDING',
                      'bg-rose-500': ins.status === 'NONAKTIF',
                    }"
                  ></span>
                  {{ ins.status }}
                </span>
              </td>

              <!-- Aksi Approval Buttons -->
              <td class="py-4 px-4 text-right whitespace-nowrap">
                <div class="flex items-center justify-end gap-2">
                  <button
                    v-if="ins.status !== 'AKTIF'"
                    @click="openStatusModal(ins, 'AKTIF')"
                    class="px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all flex items-center space-x-1 cursor-pointer active:scale-95 shrink-0"
                  >
                    <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600" />
                    <span>Approve</span>
                  </button>
                  <button
                    v-if="ins.status !== 'NONAKTIF'"
                    @click="openStatusModal(ins, 'NONAKTIF')"
                    class="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-all flex items-center space-x-1 cursor-pointer active:scale-95 shrink-0"
                  >
                    <XCircle class="w-3.5 h-3.5 text-rose-600" />
                    <span>Nonaktifkan</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Custom Modal: Confirm Status Change -->
    <Teleport to="body">
      <div v-if="statusModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-200">
          <div class="flex items-center space-x-3">
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
              :class="statusModal.targetStatus === 'AKTIF' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'"
            >
              <CheckCircle2 v-if="statusModal.targetStatus === 'AKTIF'" class="w-5 h-5" />
              <XCircle v-else class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">Ubah Status Instansi</h3>
              <p class="text-xs text-slate-500">Konfirmasi perubahan status persetujuan</p>
            </div>
          </div>

          <p class="text-xs text-slate-600 leading-relaxed">
            Apakah Anda yakin ingin merubah status persetujuan instansi <strong class="text-slate-900">{{ statusModal.instansiNama }}</strong> menjadi 
            <span 
              class="font-bold px-2 py-0.5 rounded-md text-[11px] ml-1 inline-block"
              :class="statusModal.targetStatus === 'AKTIF' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'"
            >
              {{ statusModal.targetStatus }}
            </span>?
          </p>

          <div class="flex items-center justify-end space-x-2 pt-2">
            <button
              @click="statusModal.isOpen = false"
              class="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              :disabled="statusModal.isLoading"
            >
              Batal
            </button>
            <button
              @click="confirmUpdateStatus"
              class="px-4 py-2 text-xs font-semibold text-white rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
              :class="statusModal.targetStatus === 'AKTIF' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'"
              :disabled="statusModal.isLoading"
            >
              <span v-if="statusModal.isLoading" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>Ubah Status</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Custom Modal: Edit Persen Komisi -->
    <Teleport to="body">
      <div v-if="komisiModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-200">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0 shadow-xs">
              <Percent class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">Edit Persen Komisi</h3>
              <p class="text-xs text-slate-500">{{ komisiModal.instansiNama }}</p>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-xs font-semibold text-slate-700">Persentase Komisi Platform (%)</label>
            <div class="relative">
              <input
                v-model.number="komisiModal.persenKomisi"
                type="number"
                min="0"
                max="100"
                class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900 pr-10"
                placeholder="20"
              />
              <span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">%</span>
            </div>
            <p v-if="komisiModal.errorMessage" class="text-xs text-rose-600 font-medium">
              {{ komisiModal.errorMessage }}
            </p>
            <p class="text-[11px] text-slate-400">
              Setiap transaksi order instansi ini akan dipotong sebesar {{ komisiModal.persenKomisi || 0 }}% untuk komisi platform.
            </p>
          </div>

          <div class="flex items-center justify-end space-x-2 pt-2">
            <button
              @click="komisiModal.isOpen = false"
              class="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              :disabled="komisiModal.isLoading"
            >
              Batal
            </button>
            <button
              @click="confirmUpdateKomisi"
              class="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
              :disabled="komisiModal.isLoading"
            >
              <span v-if="komisiModal.isLoading" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Custom Toast Notification -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-4 opacity-0"
      >
        <div 
          v-if="toast.show" 
          class="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold text-white"
          :class="toast.type === 'success' ? 'bg-slate-900 border-slate-800' : 'bg-rose-600 border-rose-500'"
        >
          <CheckCircle2 v-if="toast.type === 'success'" class="w-4 h-4 text-emerald-400 shrink-0" />
          <XCircle v-else class="w-4 h-4 text-rose-200 shrink-0" />
          <span>{{ toast.message }}</span>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { Filter, ChevronDown, ExternalLink, Building2, Trophy, CheckCircle2, XCircle, Percent, Edit2 } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'super-admin'],
})

const filterStatus = ref('ALL')
const isFilterOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const statusLabels: Record<string, string> = {
  ALL: 'Semua Status',
  PENDING: 'PENDING',
  AKTIF: 'AKTIF',
  NONAKTIF: 'NONAKTIF'
}

const selectFilter = (key: string) => {
  filterStatus.value = key
  isFilterOpen.value = false
}

// Click outside handler for dropdown
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isFilterOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const { data: listInstansi, pending, refresh } = await useFetch('/api/super-admin/instansi')

const filteredInstansi = computed(() => {
  if (!listInstansi.value) return []
  if (filterStatus.value === 'ALL') return listInstansi.value
  return listInstansi.value.filter((i: any) => i.status === filterStatus.value)
})

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
