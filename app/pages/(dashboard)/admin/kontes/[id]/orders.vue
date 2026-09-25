<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <NuxtLink :to="`/admin/kontes/${kontesId}`" class="text-xs text-slate-500 hover:text-slate-900 mb-1 inline-flex items-center gap-1 font-medium transition-colors">
          ← Kembali ke Detail Kontes
        </NuxtLink>
        <h1 class="text-2xl font-bold text-slate-900">Verifikasi Order Token</h1>
        <p class="text-xs text-slate-500 mt-1">Daftar pesanan token dari pendukung. Verifikasi untuk generate kode token.</p>
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
              'bg-amber-100 text-amber-800': filterStatus === 'MENUNGGU_VERIFIKASI',
              'bg-emerald-100 text-emerald-800': filterStatus === 'TERVERIFIKASI',
              'bg-rose-100 text-rose-800': filterStatus === 'DITOLAK'
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
            class="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-slate-200/80 shadow-lg py-1 z-30"
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
        Menampilkan <span class="font-bold text-slate-900">{{ filteredOrders.length }}</span> dari <span class="font-bold text-slate-900">{{ ordersResponse?.meta?.total || 0 }}</span> order
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
        @verify="openVerifyModal"
        @reject="openRejectModal"
      />
    </div>

    <!-- Pagination -->
    <UIPagination
      v-if="ordersResponse?.meta"
      :current-page="currentPage"
      :total-pages="ordersResponse.meta.totalPages"
      :total-items="ordersResponse.meta.total"
      :per-page="ordersResponse.meta.perPage"
      @page-change="onPageChange"
    />

    <!-- Modal Success Verification & Token Generator Result -->
    <Teleport to="body">
      <div v-if="verifySuccessModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-200">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
              <CheckCircle2 class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">Order Terverifikasi!</h3>
              <p class="text-xs text-slate-500">Token berhasil di-generate</p>
            </div>
          </div>

          <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2">
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Kode Token Voter:</div>
            <div class="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3 py-2">
              <span class="font-mono text-base font-extrabold text-blue-600 select-all tracking-wider">{{ verifySuccessModal.tokenCode }}</span>
              <button 
                @click="copyToken(verifySuccessModal.tokenCode)"
                class="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors cursor-pointer"
              >
                {{ copiedToken ? '✓ Tersalin' : 'Salin' }}
              </button>
            </div>
            <p v-if="verifySuccessModal.kontakWa" class="text-xs text-slate-600">
              Kirimkan kode token di atas kepada voter WhatsApp: <strong class="text-slate-900 font-mono">{{ verifySuccessModal.kontakWa }}</strong>.
            </p>

            <!-- Quick Send WA Message Button -->
            <div v-if="verifySuccessModal.kontakWa" class="pt-2">
              <button 
                @click="sendWaTokenResponse(verifySuccessModal.kontakWa, verifySuccessModal.tokenCode)"
                class="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>💬 Kirim Kode Token via WhatsApp</span>
              </button>
            </div>
          </div>

          <div class="flex justify-end pt-2">
            <button
              @click="verifySuccessModal.isOpen = false"
              class="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modal Reject Order Confirmation -->
    <Teleport to="body">
      <div v-if="rejectModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-200">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0">
              <XCircle class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">Tolak Order Token</h3>
              <p class="text-xs text-slate-500">Konfirmasi penolakan pesanan</p>
            </div>
          </div>

          <p class="text-xs text-slate-600 leading-relaxed">
            Apakah Anda yakin ingin menolak pesanan token <strong class="text-slate-900">Order #{{ rejectModal.orderId }}</strong>? Status order akan diubah menjadi DITOLAK.
          </p>

          <div class="flex items-center justify-end space-x-2 pt-2">
            <button
              @click="rejectModal.isOpen = false"
              class="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              :disabled="rejectModal.isLoading"
            >
              Batal
            </button>
            <button
              @click="confirmRejectOrder"
              class="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
              :disabled="rejectModal.isLoading"
            >
              <span v-if="rejectModal.isLoading" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>Ya, Tolak Order</span>
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
import { Search, CheckCircle2, XCircle, Filter, ChevronDown } from 'lucide-vue-next'
import UIPagination from '~/components/ui/UIPagination.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const route = useRoute()
const kontesId = route.params.id as string

const filterStatus = ref('ALL')
const currentPage = ref(1)
const isFilterOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const statusLabels: Record<string, string> = {
  ALL: 'Semua Status',
  MENUNGGU_VERIFIKASI: 'MENUNGGU VERIFIKASI',
  TERVERIFIKASI: 'TERVERIFIKASI',
  DITOLAK: 'DITOLAK'
}

const selectFilter = (key: string) => {
  if (filterStatus.value !== key) {
    filterStatus.value = key
    currentPage.value = 1
  }
  isFilterOpen.value = false
}

const onPageChange = (page: number) => {
  currentPage.value = page
}

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

const searchQuery = ref('')
const loadingId = ref<number | null>(null)
const copiedToken = ref(false)

const { data: ordersResponse, pending, refresh } = await useFetch(`/api/admin/kontes/${kontesId}/order`, {
  query: computed(() => ({
    page: currentPage.value,
    perPage: 20,
    status: filterStatus.value
  }))
})

const filteredOrders = computed(() => {
  const rawList = ordersResponse.value?.data || []
  if (!searchQuery.value.trim()) return rawList

  const q = searchQuery.value.toLowerCase().trim()
  return rawList.filter((o: any) => {
    const matchId = String(o.id).includes(q)
    const matchWa = o.kontakWa ? o.kontakWa.toLowerCase().includes(q) : false
    const matchToken = o.token?.code ? o.token.code.toLowerCase().includes(q) : false
    const matchPaket = o.package?.namaPaket ? o.package.namaPaket.toLowerCase().includes(q) : false

    return matchId || matchWa || matchToken || matchPaket
  })
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

// Modal Success State
const verifySuccessModal = reactive({
  isOpen: false,
  tokenCode: '',
  kontakWa: '',
})

const copyToken = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code)
    copiedToken.value = true
    setTimeout(() => { copiedToken.value = false }, 2000)
  } catch {
    triggerToast('Gagal menyalin token ke clipboard', 'error')
  }
}

const sendWaTokenResponse = (phone: string, tokenCode: string) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '')
  const formattedPhone = cleanPhone.startsWith('0') ? `62${cleanPhone.slice(1)}` : cleanPhone
  const msg = `Halo! Pembayaran order token Anda telah DIVERIFIKASI 🎉\n\nKode Token Suara Anda: *${tokenCode}*\n\nSilakan masukkan kode token di atas pada halaman kontes untuk memberikan voting. Terima kasih!`
  window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`, '_blank')
}

const openVerifyModal = async (order: any) => {
  loadingId.value = order.id
  try {
    const res = await $fetch<any>(`/api/admin/kontes/${kontesId}/order/${order.id}/verify`, {
      method: 'PATCH',
    })
    verifySuccessModal.tokenCode = res.tokenCode || res.token || ''
    verifySuccessModal.kontakWa = order.kontakWa || ''
    verifySuccessModal.isOpen = true
    await refresh()
  } catch (err: any) {
    triggerToast(err.data?.statusMessage || 'Gagal memverifikasi order.', 'error')
  } finally {
    loadingId.value = null
  }
}

// Reject modal state
const rejectModal = reactive({
  isOpen: false,
  orderId: null as number | null,
  isLoading: false,
})

const openRejectModal = (order: any) => {
  rejectModal.orderId = order.id
  rejectModal.isLoading = false
  rejectModal.isOpen = true
}

const confirmRejectOrder = async () => {
  if (!rejectModal.orderId) return
  rejectModal.isLoading = true
  loadingId.value = rejectModal.orderId
  try {
    await $fetch(`/api/admin/kontes/${kontesId}/order/${rejectModal.orderId}/reject`, {
      method: 'PATCH',
    })
    rejectModal.isOpen = false
    await refresh()
    triggerToast(`Order #${rejectModal.orderId} telah ditolak.`, 'success')
  } catch (err: any) {
    triggerToast(err.data?.statusMessage || 'Gagal menolak order.', 'error')
  } finally {
    rejectModal.isLoading = false
    loadingId.value = null
  }
}
</script>
