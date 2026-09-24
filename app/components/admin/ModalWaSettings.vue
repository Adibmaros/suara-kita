<script setup lang="ts">
import { X, Loader2, Sparkles, CheckCircle2 } from 'lucide-vue-next'

const props = defineProps<{
  show: boolean
  submitting: boolean
  form: {
    infoRekening: string
    templatePesanWa: string
  }
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()

// Preset sampel default untuk admin non-tech
const SAMPLE_REKENING = `BCA: 123-456-7890 a.n. Panitia Pemilihan
Mandiri: 098-765-4321 a.n. BEM Instansi
E-Wallet DANA/OVO: 0812-3456-7890`

const SAMPLE_TEMPLATE_WA = `Halo Admin {nama_instansi}, saya ingin membeli token voting untuk kontes "{nama_kontes}".

Detail Pembelian:
• Paket: {nama_paket} ({jumlah_suara} Suara)
• Total Harga: Rp {total_harga}
• Order ID: #{nomor_order}

Mohon info rekening pembayaran. Terima kasih!`

const applySampleRekening = () => {
  props.form.infoRekening = SAMPLE_REKENING
}

const applySampleTemplateWa = () => {
  props.form.templatePesanWa = SAMPLE_TEMPLATE_WA
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-xl max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 class="text-base font-bold text-slate-900">Pengaturan Rekening & Pesan WhatsApp</h3>
          <p class="text-xs text-slate-500">Atur instruksi transfer & pesan yang dikirim pembeli token</p>
        </div>
        <button @click="emit('close')" class="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="emit('submit')" class="space-y-5">
        <!-- 1. Info Rekening -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Informasi Rekening Pembayaran <span class="text-rose-500">*</span>
            </label>
            <button
              type="button"
              @click="applySampleRekening"
              class="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            >
              <Sparkles class="w-3 h-3 text-blue-500" />
              <span>Gunakan Contoh Rekening</span>
            </button>
          </div>

          <textarea 
            v-model="form.infoRekening" 
            rows="3"
            placeholder="Contoh: BCA 1234567890 a.n Panitia BEM | DANA 08123456789"
            class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs leading-relaxed"
          ></textarea>
          <p class="text-[11px] text-slate-500">Teks ini akan muncul saat pendukung hendak membayar paket token.</p>
        </div>

        <!-- 2. Template WA -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Template Format Pesan WhatsApp
            </label>
            <button
              type="button"
              @click="applySampleTemplateWa"
              class="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            >
              <Sparkles class="w-3 h-3 text-emerald-600" />
              <span>Gunakan Contoh Format WA</span>
            </button>
          </div>

          <textarea 
            v-model="form.templatePesanWa" 
            rows="5"
            placeholder="Ketik format pesan WhatsApp..."
            class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-mono leading-relaxed"
          ></textarea>

          <!-- Cheat Sheet Variabel Otomatis (Friendly Helper) -->
          <div class="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5 text-[11px] text-slate-600">
            <div class="font-bold text-slate-800 flex items-center space-x-1">
              <CheckCircle2 class="w-3.5 h-3.5 text-blue-600" />
              <span>Kode Otomatis yang Bisa Dipakai (Otomatis Terisi):</span>
            </div>
            <div class="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
              <div><span class="font-bold text-blue-600">{nama_kontes}</span> : Nama Kontes</div>
              <div><span class="font-bold text-blue-600">{nama_paket}</span> : Nama Paket</div>
              <div><span class="font-bold text-blue-600">{jumlah_suara}</span> : Jumlah Suara</div>
              <div><span class="font-bold text-blue-600">{total_harga}</span> : Total Harga</div>
              <div><span class="font-bold text-blue-600">{nama_instansi}</span> : Instansi</div>
              <div><span class="font-bold text-blue-600">{nomor_order}</span> : ID Order</div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button 
            type="button" 
            @click="emit('close')"
            class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Batal
          </button>
          <button 
            type="submit" 
            :disabled="submitting"
            class="flex items-center gap-2 px-5 h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition disabled:opacity-50 shadow-xs cursor-pointer active:scale-95"
          >
            <Loader2 v-if="submitting" class="w-3.5 h-3.5 animate-spin" />
            <span>Simpan Pengaturan</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

