<template>
  <div class="max-w-5xl space-y-6 pb-12">
    <!-- Header & Navigation -->
    <div>
      <NuxtLink :to="`/admin/kontes/${kontesId}`" class="text-xs text-[#707070] hover:text-[#141414] inline-flex items-center gap-1 font-semibold transition-colors mb-2">
        ← Kembali ke Detail Kontes
      </NuxtLink>
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">Edit Kontes.</h1>
          <p class="text-xs sm:text-sm text-[#707070] mt-1 font-light">Perbarui rincian, status, atau jadwal kontes #{{ kontesId }}</p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white border border-[#e0e0e0] rounded-3xl">
      <Loader2 class="w-8 h-8 text-[#141414] animate-spin mb-3" />
      <p class="text-xs text-[#707070]">Memuat data kontes...</p>
    </div>

    <template v-else>
      <!-- Error Alert -->
      <div v-if="errorMsg" class="p-4 bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] text-xs sm:text-sm rounded-2xl flex items-center gap-2.5">
        <AlertCircle class="w-4 h-4 text-[#141414] shrink-0" />
        <span>{{ errorMsg }}</span>
      </div>

      <!-- Success Alert -->
      <div v-if="successMsg" class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-2xl flex items-center gap-2.5">
        <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{{ successMsg }}</span>
      </div>

      <form @submit.prevent="handleUpdate" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Left Column: Informasi Utama & Status -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Card 1: Informasi Kontes -->
          <div class="bg-white border border-[#e0e0e0] rounded-3xl overflow-hidden">
            <div class="px-6 py-4 bg-[#f3f3f3] border-b border-[#e0e0e0] flex items-center gap-2">
              <Trophy class="w-4 h-4 text-[#141414] shrink-0" />
              <h2 class="text-sm font-bold text-[#141414]">Informasi Kontes</h2>
            </div>
            <div class="p-6 space-y-4">
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
                  Nama Kontes <span class="text-[#adadad]">*</span>
                </label>
                <input
                  v-model="form.nama"
                  type="text"
                  placeholder="cth: Duta Fakultas Ilmu Komputer 2026"
                  required
                  class="w-full h-11 px-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] transition-all"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">Deskripsi Kontes</label>
                <textarea
                  v-model="form.deskripsi"
                  rows="4"
                  class="w-full p-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] transition-all"
                  placeholder="Jelaskan secara singkat mengenai kontes ini..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Card 2: Status Kontes -->
          <div class="bg-white border border-[#e0e0e0] rounded-3xl overflow-hidden">
            <div class="px-6 py-4 bg-[#f3f3f3] border-b border-[#e0e0e0] flex items-center gap-2">
              <Zap class="w-4 h-4 text-[#141414] shrink-0" />
              <h2 class="text-sm font-bold text-[#141414]">Status Kontes</h2>
            </div>
            <div class="p-6 space-y-3">
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">Pilih Status</label>
                <select
                  v-model="form.status"
                  class="w-full h-11 px-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] focus:outline-none focus:ring-2 focus:ring-[#141414] transition-all cursor-pointer font-medium"
                >
                  <option value="DRAFT">DRAFT (Belum Dipublikasi)</option>
                  <option value="AKTIF">AKTIF (Sedang Berjalan & Menerima Vote)</option>
                  <option value="DITUTUP">DITUTUP (Voting Selesai)</option>
                </select>
              </div>
              <p class="text-[11px] text-[#707070] leading-relaxed">
                <span class="font-semibold text-[#141414]">DRAFT:</span> Kontes tidak dapat divote oleh publik.<br/>
                <span class="font-semibold text-[#141414]">AKTIF:</span> Halaman voting publik terbuka untuk menerima vote.<br/>
                <span class="font-semibold text-[#141414]">DITUTUP:</span> Voting ditutup, pemilih tidak dapat lagi meredeem token.
              </p>
            </div>
          </div>

          <!-- Submit Buttons (Desktop) -->
          <div class="hidden lg:flex items-center justify-end gap-3 pt-2">
            <NuxtLink :to="`/admin/kontes/${kontesId}`" class="btn-outline h-10 px-5 text-xs">
              Batal
            </NuxtLink>
            <button
              type="submit"
              :disabled="saving"
              class="btn-primary h-10 px-6 text-xs disabled:opacity-50 disabled:pointer-events-none"
            >
              <Loader2 v-if="saving" class="w-3.5 h-3.5 mr-2 animate-spin" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>

        <!-- Right Column: Jadwal & Informasi -->
        <div class="lg:col-span-7 space-y-6">
          <!-- Card 3: Jadwal Kontes -->
          <div class="bg-white border border-[#e0e0e0] rounded-3xl overflow-hidden">
            <div class="px-6 py-4 bg-[#f3f3f3] border-b border-[#e0e0e0] flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Calendar class="w-4 h-4 text-[#141414] shrink-0" />
                <h2 class="text-sm font-bold text-[#141414]">Jadwal Kontes</h2>
              </div>
              <span class="text-[10px] uppercase tracking-wider font-semibold text-[#707070] bg-white border border-[#e0e0e0] px-2.5 py-0.5 rounded-full">Opsional</span>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">Tanggal Mulai</label>
                  <input
                    v-model="form.tanggalMulai"
                    type="datetime-local"
                    class="w-full h-11 px-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] focus:outline-none focus:ring-2 focus:ring-[#141414] transition-all"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">Tanggal Selesai</label>
                  <input
                    v-model="form.tanggalSelesai"
                    type="datetime-local"
                    class="w-full h-11 px-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] focus:outline-none focus:ring-2 focus:ring-[#141414] transition-all"
                  />
                </div>
              </div>
              <p class="text-[11px] text-[#707070] mt-3">
                Atur jadwal mulai dan penutupan voting otomatis jika kontes memiliki batas periode waktu tertentu.
              </p>
            </div>
          </div>

          <!-- Card 4: Quick Nav ke Kandidat & Paket -->
          <div class="bg-[#141414] text-white rounded-3xl p-6 sm:p-7 space-y-4">
            <div class="flex items-center gap-2 border-b border-[#262626] pb-3">
              <CheckCircle2 class="w-4 h-4 text-white shrink-0" />
              <h3 class="text-sm font-bold text-white">Kelola Komponen Kontes</h3>
            </div>
            <p class="text-xs text-[#adadad] leading-relaxed font-light">
              Setelah memperbarui data utama kontes, Anda dapat mengelola kandidat atau paket token langsung di halaman detail:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <NuxtLink 
                :to="`/admin/kontes/${kontesId}`"
                class="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition block"
              >
                <p class="text-xs font-semibold text-white">Kelola Kandidat ↗</p>
                <p class="text-[11px] text-[#adadad] mt-1 font-light">Tambah, ubah nomor urut, foto, dan biodata kandidat.</p>
              </NuxtLink>
              <NuxtLink 
                :to="`/admin/kontes/${kontesId}`"
                class="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition block"
              >
                <p class="text-xs font-semibold text-white">Kelola Paket Token ↗</p>
                <p class="text-[11px] text-[#adadad] mt-1 font-light">Atur harga dan jumlah suara token per paket.</p>
              </NuxtLink>
            </div>
          </div>

          <!-- Submit Buttons (Mobile) -->
          <div class="flex lg:hidden items-center justify-end gap-3 pt-2">
            <NuxtLink :to="`/admin/kontes/${kontesId}`" class="btn-outline h-10 px-5 text-xs">
              Batal
            </NuxtLink>
            <button
              type="submit"
              :disabled="saving"
              class="btn-primary h-10 px-6 text-xs disabled:opacity-50 disabled:pointer-events-none"
            >
              <Loader2 v-if="saving" class="w-3.5 h-3.5 mr-2 animate-spin" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { Trophy, Calendar, Zap, CheckCircle2, Loader2, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const route = useRoute()
const kontesId = computed(() => Number(route.params.id))

const form = reactive({
  nama: '',
  deskripsi: '',
  tanggalMulai: '',
  tanggalSelesai: '',
  status: 'DRAFT',
})

const loading = ref(true)
const saving = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

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

async function fetchKontesData() {
  try {
    loading.value = true
    errorMsg.value = ''
    const data = await $fetch<any>(`/api/admin/kontes/${kontesId.value}`)
    if (data) {
      form.nama = data.nama || data.judul || ''
      form.deskripsi = data.deskripsi || ''
      form.status = data.status || 'DRAFT'
      form.tanggalMulai = toDatetimeLocal(data.tanggalMulai)
      form.tanggalSelesai = toDatetimeLocal(data.tanggalSelesai)
    }
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || 'Gagal memuat data kontes.'
  } finally {
    loading.value = false
  }
}

const handleUpdate = async () => {
  saving.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {
    const payload = {
      nama: form.nama,
      deskripsi: form.deskripsi || null,
      tanggalMulai: form.tanggalMulai ? new Date(form.tanggalMulai).toISOString() : null,
      tanggalSelesai: form.tanggalSelesai ? new Date(form.tanggalSelesai).toISOString() : null,
      status: form.status,
    }

    await $fetch(`/api/admin/kontes/${kontesId.value}`, {
      method: 'PATCH',
      body: payload,
    })

    successMsg.value = 'Perubahan rincian kontes berhasil disimpan!'
    setTimeout(() => {
      navigateTo(`/admin/kontes/${kontesId.value}`)
    }, 1200)
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || 'Gagal menyimpan perubahan kontes. Pastikan data terisi dengan benar.'
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchKontesData()
})
</script>
