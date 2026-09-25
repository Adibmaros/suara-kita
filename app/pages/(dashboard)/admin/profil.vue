<template>
  <div class="max-w-5xl space-y-6 pb-12">
    <!-- Page Title & Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Pengaturan Instansi</h1>
        <p class="text-xs text-slate-500 mt-1">Kelola informasi instansi, nomor WA admin, dan preferensi pembayaran token</p>
      </div>
      
      <div v-if="instansi" class="flex items-center space-x-2 text-xs font-semibold">
        <span class="text-slate-400">Status Setup:</span>
        <span 
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border"
          :class="form.infoRekening && form.noWaAdmin ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'"
        >
          <span class="w-2 h-2 rounded-full" :class="form.infoRekening && form.noWaAdmin ? 'bg-emerald-500' : 'bg-amber-500'"></span>
          {{ form.infoRekening && form.noWaAdmin ? 'Siap Menerima Order' : 'Lengkapi Rekening' }}
        </span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="bg-white border border-slate-200 rounded-xl p-8 shadow-2xs text-center text-slate-500 text-sm">
      <Loader2 class="w-6 h-6 animate-spin mx-auto text-slate-400 mb-2" />
      <span>Memuat data profil instansi...</span>
    </div>

    <template v-else>
      <!-- Notifications -->
      <div v-if="successMsg" class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-3 shadow-2xs animate-in fade-in duration-200">
        <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
        <span class="font-medium">{{ successMsg }}</span>
      </div>
      <div v-if="errorMsg" class="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-3 shadow-2xs animate-in fade-in duration-200">
        <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
        <span class="font-medium">{{ errorMsg }}</span>
      </div>

      <!-- Main Responsive Grid (2 Columns on Laptop/Desktop) -->
      <form @submit.prevent="handleSave" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Left Column: Informasi Dasar & Preview (lg:col-span-5) -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Card: Informasi Dasar -->
          <div class="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
            <div class="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5 bg-slate-50/50">
              <Building2 class="w-4 h-4 text-slate-600" />
              <h2 class="text-xs font-bold text-slate-800 uppercase tracking-wider">Informasi Dasar</h2>
            </div>

            <div class="p-5 space-y-4">
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700">
                  Nama Instansi / Organisasi <span class="text-rose-500">*</span>
                </label>
                <input
                  v-model="form.nama"
                  type="text"
                  required
                  placeholder="Contoh: BEM Universitas Nusantara"
                  class="w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors font-medium"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-700">
                  Nomor WhatsApp Admin <span class="text-rose-500">*</span>
                </label>
                <input
                  v-model="form.noWaAdmin"
                  type="text"
                  required
                  placeholder="Contoh: 08123456789"
                  class="w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 font-mono placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors"
                />
                <p class="text-[11px] text-slate-500 leading-relaxed">
                  Nomor tujuan konfirmasi order token voter via WhatsApp.
                </p>
              </div>
            </div>
          </div>

          <!-- Card: Quick Info / Preview Card -->
          <div class="bg-slate-900 text-white rounded-xl p-5 shadow-sm space-y-3">
            <div class="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <MessageSquare class="w-4 h-4 text-emerald-400" />
              <span>Alur Pembelian Voter</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Voter memilih paket token di halaman kontes &rarr; sistem menampilkan <strong>Info Rekening</strong> Anda &rarr; voter mengklik tombol untuk langsung chat WhatsApp ke nomor <strong>{{ form.noWaAdmin || 'Admin' }}</strong>.
            </p>
          </div>

          <!-- Submit Button Left Column (Mobile & Quick Action) -->
          <div class="hidden lg:block">
            <button
              type="submit"
              :disabled="saving"
              class="w-full inline-flex items-center justify-center px-4 h-10 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <Loader2 v-if="saving" class="w-4 h-4 mr-2 animate-spin" />
              <span>{{ saving ? 'Menyimpan...' : 'Simpan Semua Perubahan' }}</span>
            </button>
          </div>
        </div>

        <!-- Right Column: Rekening & Template WhatsApp (lg:col-span-7) -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Card: Rekening Pembayaran -->
          <div class="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
            <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
              <div class="flex items-center gap-2.5">
                <CreditCard class="w-4 h-4 text-slate-600" />
                <h2 class="text-xs font-bold text-slate-800 uppercase tracking-wider">Rekening Pembayaran Token</h2>
              </div>
              <span 
                class="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                :class="form.infoRekening ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
              >
                {{ form.infoRekening ? 'Sudah Diatur' : 'Belum Diatur' }}
              </span>
            </div>

            <div class="p-5 space-y-4">
              <div class="p-3 bg-blue-50/80 border border-blue-200/80 text-blue-800 text-xs rounded-xl flex items-start gap-2.5 leading-relaxed">
                <Info class="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Info rekening ini tampil otomatis di layar modal voter saat mereka akan checkout token.</span>
              </div>

              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Daftar Rekening Transfer <span class="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    @click="applySampleRekening"
                    class="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                  >
                    <Sparkles class="w-3 h-3" />
                    Gunakan Contoh
                  </button>
                </div>
                <textarea
                  v-model="form.infoRekening"
                  rows="4"
                  placeholder="BCA: 1234-5678-9012 a.n. Panitia BEM&#10;Mandiri: 1234567890 a.n. Panitia BEM&#10;DANA/OVO: 08123456789"
                  class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs font-mono leading-relaxed transition-colors"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Card: Template Pesan WhatsApp -->
          <div class="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
            <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
              <div class="flex items-center gap-2.5">
                <MessageSquare class="w-4 h-4 text-slate-600" />
                <h2 class="text-xs font-bold text-slate-800 uppercase tracking-wider">Template Pesan WhatsApp</h2>
              </div>
              <button
                type="button"
                @click="applySampleTemplateWa"
                class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
              >
                <Sparkles class="w-3 h-3" />
                Reset Default
              </button>
            </div>

            <div class="p-5 space-y-4">
              <p class="text-[11px] text-slate-500">Pesan otomatis yang langsung terisi di aplikasi WhatsApp voter saat hendak memesan token.</p>
              
              <textarea
                v-model="form.templatePesanWa"
                rows="6"
                placeholder="Biarkan kosong untuk menggunakan template pesan default..."
                class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs font-mono leading-relaxed transition-colors"
              ></textarea>

              <!-- Cheatsheet Variable Badges -->
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-2">
                <p class="font-bold text-slate-700 flex items-center gap-1.5 text-xs">
                  <span>⚡</span> Variabel Otomatis:
                </p>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[10px]">
                  <div class="bg-white border border-slate-200 px-2 py-1 rounded text-slate-700"><span class="font-bold text-blue-600">{nama_kontes}</span></div>
                  <div class="bg-white border border-slate-200 px-2 py-1 rounded text-slate-700"><span class="font-bold text-blue-600">{nama_paket}</span></div>
                  <div class="bg-white border border-slate-200 px-2 py-1 rounded text-slate-700"><span class="font-bold text-blue-600">{jumlah_suara}</span></div>
                  <div class="bg-white border border-slate-200 px-2 py-1 rounded text-slate-700"><span class="font-bold text-blue-600">{total_harga}</span></div>
                  <div class="bg-white border border-slate-200 px-2 py-1 rounded text-slate-700"><span class="font-bold text-blue-600">{nama_instansi}</span></div>
                  <div class="bg-white border border-slate-200 px-2 py-1 rounded text-slate-700"><span class="font-bold text-blue-600">{nomor_order}</span></div>
                </div>
                <div class="bg-white border border-slate-200 px-2.5 py-1 rounded text-[10px] font-mono text-slate-700">
                  <span class="font-bold text-emerald-600">{rekening_admin}</span> &rarr; Mengambil data otomatis dari daftar rekening di atas
                </div>
              </div>
            </div>
          </div>

          <!-- Primary Submit Button -->
          <div class="pt-2 flex justify-end">
            <button
              type="submit"
              :disabled="saving"
              class="w-full sm:w-auto inline-flex items-center justify-center px-6 h-10 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <Loader2 v-if="saving" class="w-4 h-4 mr-2 animate-spin" />
              <span>{{ saving ? 'Menyimpan Pengaturan...' : 'Simpan Semua Pengaturan' }}</span>
            </button>
          </div>
        </div>

      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Loader2, CheckCircle2, AlertCircle, Building2, CreditCard, Info, Sparkles, MessageSquare } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const { data: instansi, pending } = await useFetch<any>('/api/admin/profil')

const form = reactive({
  nama: '',
  noWaAdmin: '',
  infoRekening: '',
  templatePesanWa: '',
})

watch(instansi, (val: any) => {
  if (val) {
    form.nama = val.nama || ''
    form.noWaAdmin = val.noWaAdmin || ''
    form.infoRekening = val.infoRekening || ''
    form.templatePesanWa = val.templatePesanWa || ''
  }
}, { immediate: true })

const saving = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const SAMPLE_REKENING = `BCA: 1234-5678-9012 a.n. Panitia BEM\nMandiri: 1234567890 a.n. Panitia BEM\nDANA/OVO: 08123456789`

const SAMPLE_TEMPLATE_WA = `Halo Admin {nama_instansi}, saya ingin membeli token untuk kontes "{nama_kontes}".

📦 Paket: {nama_paket} ({jumlah_suara} Suara)
💰 Total Harga: Rp {total_harga}
📋 Order ID: #{nomor_order}

💳 Info Rekening Transfer:
{rekening_admin}

Saya sudah / akan segera melakukan transfer. Mohon diverifikasi setelah pembayaran masuk. Terima kasih!`

const applySampleRekening = () => {
  form.infoRekening = SAMPLE_REKENING
}

const applySampleTemplateWa = () => {
  form.templatePesanWa = SAMPLE_TEMPLATE_WA
}

const handleSave = async () => {
  saving.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {
    await $fetch('/api/admin/profil', {
      method: 'PATCH',
      body: form,
    })
    successMsg.value = 'Pengaturan instansi berhasil disimpan.'
    setTimeout(() => { successMsg.value = '' }, 4000)
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || 'Gagal menyimpan pengaturan.'
  } finally {
    saving.value = false
  }
}
</script>
