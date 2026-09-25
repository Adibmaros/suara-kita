<template>
  <div class="max-w-5xl space-y-6 pb-12">
    <div>
      <NuxtLink to="/admin/kontes" class="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 font-medium transition-colors mb-2">
        ← Kembali ke Daftar Kontes
      </NuxtLink>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Buat Kontes Baru</h1>
      <p class="text-xs text-slate-500 mt-1">Isi rincian kontes atau polling yang akan diselenggarakan di instansi Anda</p>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMsg" class="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
      <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
      <span>{{ errorMsg }}</span>
    </div>

    <form @submit.prevent="handleCreate" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Left Column: Informasi Utama & Status -->
      <div class="lg:col-span-5 space-y-6">
        <!-- Card 1: Informasi Kontes -->
        <div class="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div class="px-5 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2">
            <Trophy class="w-4 h-4 text-slate-700 shrink-0" />
            <h2 class="text-sm font-semibold text-slate-900">Informasi Kontes</h2>
          </div>
          <div class="p-5 space-y-4">
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Nama Kontes <span class="text-rose-500">*</span>
              </label>
              <input
                v-model="form.nama"
                type="text"
                placeholder="cth: Duta Fakultas Ilmu Komputer 2026"
                required
                class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Deskripsi Kontes</label>
              <textarea
                v-model="form.deskripsi"
                rows="4"
                class="w-full p-3 bg-white border border-slate-200 rounded-md text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
                placeholder="Jelaskan secara singkat mengenai kontes ini..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Card 2: Status Awal -->
        <div class="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div class="px-5 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2">
            <Zap class="w-4 h-4 text-amber-500 shrink-0" />
            <h2 class="text-sm font-semibold text-slate-900">Status Awal Kontes</h2>
          </div>
          <div class="p-5 space-y-3">
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Pilih Status</label>
              <select
                v-model="form.status"
                class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
              >
                <option value="DRAFT">DRAFT (Belum Dipublikasi)</option>
                <option value="AKTIF">AKTIF (Mulai Menerima Vote)</option>
              </select>
            </div>
            <p class="text-[11px] text-slate-500 leading-relaxed">
              <span class="font-medium text-slate-700">DRAFT:</span> Kontes tersimpan tanpa dipublikasikan. Voter tidak dapat melihat atau melakukan voting.<br/>
              <span class="font-medium text-slate-700">AKTIF:</span> Halaman kontes dapat diakses publik dan menerima voting.
            </p>
          </div>
        </div>

        <!-- Submit Buttons (Desktop) -->
        <div class="hidden lg:flex items-center justify-end gap-3 pt-2">
          <NuxtLink to="/admin/kontes" class="inline-flex items-center justify-center px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-md transition-colors">
            Batal
          </NuxtLink>
          <button
            type="submit"
            :disabled="creating"
            class="inline-flex items-center justify-center px-5 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs"
          >
            <Loader2 v-if="creating" class="w-3.5 h-3.5 mr-2 animate-spin" />
            Simpan & Lanjutkan
          </button>
        </div>
      </div>

      <!-- Right Column: Jadwal & Guide Card -->
      <div class="lg:col-span-7 space-y-6">
        <!-- Card 3: Jadwal Kontes -->
        <div class="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div class="px-5 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Calendar class="w-4 h-4 text-slate-700 shrink-0" />
              <h2 class="text-sm font-semibold text-slate-900">Jadwal Kontes</h2>
            </div>
            <span class="text-[10px] uppercase tracking-wider font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Opsional</span>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Tanggal Mulai</label>
                <input
                  v-model="form.tanggalMulai"
                  type="datetime-local"
                  class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Tanggal Selesai</label>
                <input
                  v-model="form.tanggalSelesai"
                  type="datetime-local"
                  class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
                />
              </div>
            </div>
            <p class="text-[11px] text-slate-500 mt-3">
              Jika dikosongkan, kontes akan langsung berjalan saat status diubah menjadi AKTIF dan tidak membatasi waktu penutupan otomatis.
            </p>
          </div>
        </div>

        <!-- Card 4: Langkah Selanjutnya (Dark Banner) -->
        <div class="bg-slate-900 text-white rounded-xl p-5 shadow-sm space-y-4">
          <div class="flex items-center gap-2 border-b border-slate-800 pb-3">
            <CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" />
            <h3 class="text-sm font-semibold text-slate-100">Alur Pembuatan Kontes</h3>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed">
            Setelah menekan <strong class="text-slate-200">Simpan & Lanjutkan</strong>, Anda akan diarahkan ke halaman detail kontes untuk melengkapi hal berikut:
          </p>
          <div class="space-y-2.5 pt-1">
            <div class="flex items-start gap-3">
              <span class="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">1</span>
              <div>
                <p class="text-xs font-medium text-slate-200">Tambah Kandidat / Peserta</p>
                <p class="text-[11px] text-slate-400">Masukkan daftar kandidat beserta foto dan deskripsi.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">2</span>
              <div>
                <p class="text-xs font-medium text-slate-200">Atur Paket Token Voting</p>
                <p class="text-[11px] text-slate-400">Tentukan paket jumlah suara dan harga per token.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">3</span>
              <div>
                <p class="text-xs font-medium text-slate-200">Publikasi & Bagikan Link</p>
                <p class="text-[11px] text-slate-400">Ubah status ke AKTIF dan bagikan link halaman kontes ke voter.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Buttons (Mobile) -->
        <div class="flex lg:hidden items-center justify-end gap-3 pt-2">
          <NuxtLink to="/admin/kontes" class="inline-flex items-center justify-center px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-md transition-colors">
            Batal
          </NuxtLink>
          <button
            type="submit"
            :disabled="creating"
            class="inline-flex items-center justify-center px-5 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs"
          >
            <Loader2 v-if="creating" class="w-3.5 h-3.5 mr-2 animate-spin" />
            Simpan & Lanjutkan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Loader2, AlertCircle, Trophy, Calendar, Zap, CheckCircle2 } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const form = reactive({
  nama: '',
  deskripsi: '',
  tanggalMulai: '',
  tanggalSelesai: '',
  status: 'DRAFT',
})

const creating = ref(false)
const errorMsg = ref('')

const handleCreate = async () => {
  creating.value = true
  errorMsg.value = ''

  try {
    const kontes = await $fetch('/api/admin/kontes', {
      method: 'POST',
      body: form,
    })

    await navigateTo(`/admin/kontes/${kontes.id}`)
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || 'Gagal membuat kontes.'
  } finally {
    creating.value = false
  }
}
</script>

