<template>
  <div class="max-w-5xl space-y-6 pb-12">
    <div>
      <NuxtLink to="/admin/kontes" class="text-xs text-[#707070] hover:text-[#141414] inline-flex items-center gap-1 font-semibold transition-colors mb-2">
        ← Kembali ke Daftar Kontes
      </NuxtLink>
      <h1 class="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">Buat Kontes Baru.</h1>
      <p class="text-xs sm:text-sm text-[#707070] mt-1 font-light">Isi rincian kontes atau polling yang akan diselenggarakan di ormawa Anda</p>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMsg" class="p-4 bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] text-xs sm:text-sm rounded-2xl flex items-center gap-2.5">
      <AlertCircle class="w-4 h-4 text-[#141414] shrink-0" />
      <span>{{ errorMsg }}</span>
    </div>

    <form @submit.prevent="handleCreate" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
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

        <!-- Card 2: Status Awal -->
        <div class="bg-white border border-[#e0e0e0] rounded-3xl overflow-hidden">
          <div class="px-6 py-4 bg-[#f3f3f3] border-b border-[#e0e0e0] flex items-center gap-2">
            <Zap class="w-4 h-4 text-[#141414] shrink-0" />
            <h2 class="text-sm font-bold text-[#141414]">Status Awal Kontes</h2>
          </div>
          <div class="p-6 space-y-3">
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">Pilih Status</label>
              <select
                v-model="form.status"
                class="w-full h-11 px-4 bg-[#f0f0f0] rounded-2xl text-sm text-[#141414] focus:outline-none focus:ring-2 focus:ring-[#141414] transition-all cursor-pointer"
              >
                <option value="DRAFT">DRAFT (Belum Dipublikasi)</option>
                <option value="AKTIF">AKTIF (Mulai Menerima Vote)</option>
              </select>
            </div>
            <p class="text-[11px] text-[#707070] leading-relaxed">
              <span class="font-semibold text-[#141414]">DRAFT:</span> Kontes tersimpan tanpa dipublikasikan. Voter belum dapat melihat atau melakukan voting.<br/>
              <span class="font-semibold text-[#141414]">AKTIF:</span> Halaman kontes langsung dapat diakses publik.
            </p>
          </div>
        </div>

        <!-- Submit Buttons (Desktop) -->
        <div class="hidden lg:flex items-center justify-end gap-3 pt-2">
          <NuxtLink to="/admin/kontes" class="btn-outline h-10 px-5 text-xs">
            Batal
          </NuxtLink>
          <button
            type="submit"
            :disabled="creating"
            class="btn-primary h-10 px-6 text-xs disabled:opacity-50 disabled:pointer-events-none"
          >
            <Loader2 v-if="creating" class="w-3.5 h-3.5 mr-2 animate-spin" />
            <span>Simpan & Lanjutkan</span>
          </button>
        </div>
      </div>

      <!-- Right Column: Jadwal & Guide Card -->
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
              Jika dikosongkan, kontes akan langsung berjalan saat status diubah menjadi AKTIF dan tidak membatasi waktu penutupan otomatis.
            </p>
          </div>
        </div>

        <!-- Card 4: Langkah Selanjutnya (Ink Surface 24px) -->
        <div class="bg-[#141414] text-white rounded-3xl p-6 sm:p-7 space-y-4">
          <div class="flex items-center gap-2 border-b border-[#262626] pb-3">
            <CheckCircle2 class="w-4 h-4 text-white shrink-0" />
            <h3 class="text-sm font-bold text-white">Alur Pembuatan Kontes</h3>
          </div>
          <p class="text-xs text-[#adadad] leading-relaxed font-light">
            Setelah menekan <strong class="text-white font-semibold">Simpan & Lanjutkan</strong>, Anda akan diarahkan ke halaman detail kontes untuk melengkapi hal berikut:
          </p>
          <div class="space-y-3 pt-1">
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-[30%] bg-white/10 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
              <div>
                <p class="text-xs font-semibold text-white">Tambah Kandidat / Paslon</p>
                <p class="text-[11px] text-[#adadad] font-light">Unggah daftar kandidat beserta foto dan profil singkat.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-[30%] bg-white/10 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
              <div>
                <p class="text-xs font-semibold text-white">Atur Paket Token Suara</p>
                <p class="text-[11px] text-[#adadad] font-light">Tentukan paket jumlah suara dan nominal harga per token.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-[30%] bg-white/10 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
              <div>
                <p class="text-xs font-semibold text-white">Publikasi & Sebar Link</p>
                <p class="text-[11px] text-[#adadad] font-light">Ubah status ke AKTIF dan bagikan tautan kontes ke seluruh mahasiswa.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Buttons (Mobile) -->
        <div class="flex lg:hidden items-center justify-end gap-3 pt-2">
          <NuxtLink to="/admin/kontes" class="btn-outline h-10 px-5 text-xs">
            Batal
          </NuxtLink>
          <button
            type="submit"
            :disabled="creating"
            class="btn-primary h-10 px-6 text-xs disabled:opacity-50 disabled:pointer-events-none"
          >
            <Loader2 v-if="creating" class="w-3.5 h-3.5 mr-2 animate-spin" />
            <span>Simpan & Lanjutkan</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Trophy, Calendar, Zap, CheckCircle2, Loader2, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
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
    const payload = {
      nama: form.nama,
      deskripsi: form.deskripsi || null,
      tanggalMulai: form.tanggalMulai ? new Date(form.tanggalMulai).toISOString() : null,
      tanggalSelesai: form.tanggalSelesai ? new Date(form.tanggalSelesai).toISOString() : null,
      status: form.status,
    }

    const res: any = await $fetch('/api/admin/kontes', {
      method: 'POST',
      body: payload,
    })

    await navigateTo(`/admin/kontes/${res.data.id}`)
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || 'Gagal membuat kontes. Pastikan data terisi dengan benar.'
  } finally {
    creating.value = false
  }
}
</script>
