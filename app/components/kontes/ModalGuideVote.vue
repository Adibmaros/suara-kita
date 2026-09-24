<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div class="relative z-50 w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
        <!-- Header Modal -->
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div class="flex items-center space-x-2">
            <span class="text-xl">📋</span>
            <h3 class="text-base font-bold text-slate-900">Petunjuk & Alur Voting</h3>
          </div>
          <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Steps List -->
        <div class="space-y-4">
          <!-- Step 1 -->
          <div class="flex items-start space-x-3">
            <div class="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 class="text-xs font-bold text-slate-900">Pilih Paket & Beli Token</h4>
              <p class="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                Pilih paket jumlah suara yang diinginkan pada bagian <strong>Beli Token Suara</strong> di bawah, lalu klik tombol <em>Beli Paket via WA</em>.
              </p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="flex items-start space-x-3">
            <div class="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 class="text-xs font-bold text-slate-900">Lakukan Pembayaran & Verifikasi</h4>
              <p class="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                Kirimkan bukti transfer kepada Admin via WhatsApp. Admin akan memverifikasi pembayaran dan memberikan <strong>Kode Token Suara</strong> Anda.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="flex items-start space-x-3">
            <div class="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 class="text-xs font-bold text-slate-900">Masukkan Token Suara</h4>
              <p class="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                Klik tombol <strong>Masukkan Token</strong> di bagian atas, input kode token dan cari kandidat favorit Anda.
              </p>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="flex items-start space-x-3">
            <div class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              4
            </div>
            <div>
              <h4 class="text-xs font-bold text-slate-900">Konfirmasi & Kirim Suara</h4>
              <p class="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                Periksa kembali kandidat pilihan Anda pada konfirmasi tahap ke-2, lalu klik <strong>Kirim Suara Sekarang</strong>.
              </p>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex justify-end">
          <button 
            @click="$emit('close')"
            class="w-full sm:w-auto px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>
