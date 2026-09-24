<template>
  <div class="max-w-2xl space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Pengaturan Instansi</h1>
      <p class="text-xs text-slate-500 mt-1">Kelola informasi instansi, nomor WA, dan rekening pembayaran token</p>
    </div>

    <div v-if="pending" class="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs text-slate-500 text-sm">
      Memuat data...
    </div>

    <template v-else>
      <!-- Notifikasi -->
      <div v-if="successMsg" class="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
        <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{{ successMsg }}</span>
      </div>
      <div v-if="errorMsg" class="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
        <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
        <span>{{ errorMsg }}</span>
      </div>

      <!-- Section 1: Info Dasar -->
      <div class="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <Building2 class="w-4 h-4 text-slate-500" />
          <h2 class="text-sm font-bold text-slate-800">Informasi Dasar</h2>
        </div>
        <form @submit.prevent="handleSave" class="p-6 space-y-4">
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Nama Instansi <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.nama"
              type="text"
              required
              placeholder="Contoh: BEM Universitas Nusantara"
              class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Nomor WA Admin <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.noWaAdmin"
              type="text"
              required
              placeholder="08123456789"
              class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
            />
            <p class="text-[11px] text-slate-500">Voter akan diarahkan menghubungi nomor ini saat membeli token</p>
          </div>

          <div class="pt-1">
            <button
              type="submit"
              :disabled="saving"
              class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs"
            >
              <Loader2 v-if="saving" class="w-4 h-4 mr-2 animate-spin" />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>

      <!-- Section 2: Rekening Pembayaran -->
      <div class="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <CreditCard class="w-4 h-4 text-slate-500" />
          <div class="flex-1">
            <h2 class="text-sm font-bold text-slate-800">Rekening Pembayaran Token</h2>
          </div>
          <span 
            class="text-[10px] font-bold px-2 py-0.5 rounded-full"
            :class="form.infoRekening ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
          >
            {{ form.infoRekening ? 'Sudah Diatur' : 'Belum Diatur' }}
          </span>
        </div>
        <div class="p-6 space-y-4">
          <div class="p-3 bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded-lg flex items-start gap-2">
            <Info class="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>Info rekening ini akan <strong>ditampilkan langsung kepada voter</strong> saat mereka akan membeli token, sehingga voter langsung tahu harus transfer ke mana tanpa menunggu balasan WA Anda.</span>
          </div>

          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Info Rekening <span class="text-rose-500">*</span>
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
              class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-950 text-xs font-mono leading-relaxed transition-colors"
            ></textarea>
            <p class="text-[11px] text-slate-500">Tuliskan semua rekening yang tersedia. Muncul otomatis di halaman pembelian token.</p>
          </div>

          <!-- Section 3: Template WA -->
          <div class="space-y-1.5 pt-2 border-t border-slate-100">
            <div class="flex items-center justify-between">
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Template Pesan WhatsApp
              </label>
              <button
                type="button"
                @click="applySampleTemplateWa"
                class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
              >
                <Sparkles class="w-3 h-3" />
                Gunakan Default
              </button>
            </div>
            <p class="text-[11px] text-slate-500 mb-2">Pesan yang otomatis terisi ketika voter hendak menghubungi Anda via WA. Kosongkan untuk gunakan template default.</p>
            <textarea
              v-model="form.templatePesanWa"
              rows="7"
              placeholder="Biarkan kosong untuk menggunakan template default..."
              class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-950 text-xs font-mono leading-relaxed transition-colors"
            ></textarea>

            <!-- Cheat sheet variabel -->
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 space-y-2">
              <p class="font-bold text-slate-700 flex items-center gap-1.5">
                <span>⚡</span> Variabel Otomatis yang Tersedia:
              </p>
              <div class="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                <div><span class="font-bold text-blue-600">{nama_kontes}</span> → Nama Kontes</div>
                <div><span class="font-bold text-blue-600">{nama_paket}</span> → Nama Paket</div>
                <div><span class="font-bold text-blue-600">{jumlah_suara}</span> → Jumlah Suara</div>
                <div><span class="font-bold text-blue-600">{total_harga}</span> → Total Harga</div>
                <div><span class="font-bold text-blue-600">{nama_instansi}</span> → Nama Instansi</div>
                <div><span class="font-bold text-blue-600">{nomor_order}</span> → ID Order</div>
                <div class="col-span-2"><span class="font-bold text-emerald-600">{rekening_admin}</span> → Info Rekening (otomatis dari atas)</div>
              </div>
            </div>
          </div>

          <div class="pt-2">
            <button
              type="button"
              :disabled="saving"
              @click="handleSave"
              class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs"
            >
              <Loader2 v-if="saving" class="w-4 h-4 mr-2 animate-spin" />
              Simpan Pengaturan Pembayaran
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Loader2, CheckCircle2, AlertCircle, Building2, CreditCard, Info, Sparkles } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const { data: instansi, pending } = await useFetch('/api/admin/profil')

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
