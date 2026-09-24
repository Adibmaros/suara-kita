<script setup lang="ts">
import { X, Loader2 } from 'lucide-vue-next'

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
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-slate-900">Pengaturan Rekening & Template WA</h3>
        <button @click="emit('close')" class="text-slate-400 hover:text-slate-600 cursor-pointer">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="emit('submit')" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Informasi Nomor Rekening & Pembayaran</label>
          <textarea 
            v-model="form.infoRekening" 
            rows="3"
            placeholder="Contoh: BCA 12345678 a.n Instansi | DANA 08123456789"
            class="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
          ></textarea>
          <p class="text-[11px] text-slate-500 mt-1">Petunjuk transfer ini akan dikirimkan/ditampilkan kepada pembeli token.</p>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Template Pesan WhatsApp Pembeli</label>
          <textarea 
            v-model="form.templatePesanWa" 
            rows="4"
            placeholder="Halo Admin, saya ingin konfirmasi pembayaran..."
            class="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
          ></textarea>
          <p class="text-[11px] text-slate-500 mt-1">Gunakan tag seperti {NAMA}, {PAKET}, {JUMLAH}, {NOMINAL}, {KONTES} jika ingin mengganti variabel otomatis.</p>
        </div>

        <div class="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button 
            type="button" 
            @click="emit('close')"
            class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Batal
          </button>
          <button 
            type="submit" 
            :disabled="submitting"
            class="flex items-center gap-2 px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition disabled:opacity-50 shadow-xs cursor-pointer"
          >
            <Loader2 v-if="submitting" class="w-3.5 h-3.5 animate-spin" />
            <span>Simpan Pengaturan</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
