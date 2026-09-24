<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-black/70 backdrop-blur-xs" @click="$emit('close')"></div>
      <div class="relative z-50 w-full max-w-lg bg-white border border-slate-200 rounded-xl p-6 shadow-lg space-y-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="text-base font-semibold text-slate-900">Konfirmasi Pembelian Token</h3>
          <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer">
            <X class="w-4 h-4" />
          </button>
        </div>

        <div v-if="selectedPackage" class="space-y-4">
          <!-- Ringkasan Paket -->
          <div class="bg-slate-50 p-4 rounded-lg space-y-2 border border-slate-200 text-xs">
            <div class="flex justify-between">
              <span class="text-slate-500">Paket:</span>
              <span class="font-bold text-slate-900">{{ selectedPackage.namaPaket }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Jumlah Suara:</span>
              <span class="font-bold text-slate-900">{{ selectedPackage.jumlahSuara }} Suara</span>
            </div>
            <div class="flex justify-between border-t border-slate-200 pt-2 text-sm">
              <span class="text-slate-500">Total Harga:</span>
              <span class="font-bold text-slate-900">Rp {{ selectedPackage.harga.toLocaleString('id-ID') }}</span>
            </div>
          </div>

          <!-- Info Rekening Transfer (ditampilkan jika ada) -->
          <div v-if="infoRekening" class="rounded-xl border border-emerald-200 bg-emerald-50 overflow-hidden">
            <div class="flex items-center gap-2 px-4 py-2.5 bg-emerald-100 border-b border-emerald-200">
              <CreditCard class="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span class="text-xs font-bold text-emerald-800 uppercase tracking-wider">Info Rekening Transfer</span>
            </div>
            <div class="px-4 py-3">
              <pre class="text-xs text-emerald-900 whitespace-pre-wrap font-mono leading-relaxed">{{ infoRekening }}</pre>
            </div>
          </div>

          <!-- Peringatan jika belum ada info rekening -->
          <div v-else class="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg flex items-start gap-2">
            <AlertTriangle class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Info rekening belum diatur oleh admin. Silakan tanyakan melalui WhatsApp setelah order.</span>
          </div>

          <!-- Nomor WA -->
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Nomor WA Anda (Opsional)</label>
            <input
              :value="kontakWa"
              @input="$emit('update:kontakWa', ($event.target as HTMLInputElement).value)"
              type="text"
              placeholder="08123456789"
              class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors"
            />
            <p class="text-[11px] text-slate-500">Memudahkan admin mencocokkan data transfer Anda</p>
          </div>

          <!-- Panduan Alur -->
          <div class="p-3 bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-lg space-y-1.5">
            <p class="font-semibold text-slate-700">Alur Pembelian Token:</p>
            <ol class="list-decimal list-inside space-y-1 text-slate-600">
              <li>Transfer ke rekening di atas sesuai harga paket</li>
              <li>Klik tombol "Lanjut ke WhatsApp" untuk konfirmasi ke admin</li>
              <li>Admin verifikasi → kode token dikirim ke Anda</li>
              <li>Gunakan token untuk memberikan suara 🗳️</li>
            </ol>
          </div>
        </div>

        <div class="pt-2 flex justify-end space-x-2 border-t border-slate-100">
          <button 
            type="button" 
            @click="$emit('close')"
            class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-xs rounded-md transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            :disabled="ordering"
            @click="$emit('submit')"
            class="inline-flex items-center justify-center px-4 h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs gap-2"
          >
            <Loader2 v-if="ordering" class="w-4 h-4 animate-spin" />
            <MessageCircle v-else class="w-4 h-4" />
            Konfirmasi via WhatsApp
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X, CreditCard, AlertTriangle, Loader2, MessageCircle } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
  selectedPackage: any
  kontakWa: string
  ordering: boolean
  infoRekening?: string | null
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
  (e: 'update:kontakWa', val: string): void
}>()
</script>
