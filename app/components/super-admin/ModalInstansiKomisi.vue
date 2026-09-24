<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-200">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0 shadow-xs">
            <Percent class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-900">Edit Persen Komisi</h3>
            <p class="text-xs text-slate-500">{{ instansiNama }}</p>
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-semibold text-slate-700">Persentase Komisi Platform (%)</label>
          <div class="relative">
            <input
              :value="persenKomisi"
              @input="$emit('update:persenKomisi', Number(($event.target as HTMLInputElement).value))"
              type="number"
              min="0"
              max="100"
              class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900 pr-10"
              placeholder="20"
            />
            <span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">%</span>
          </div>
          <p v-if="errorMessage" class="text-xs text-rose-600 font-medium">
            {{ errorMessage }}
          </p>
          <p class="text-[11px] text-slate-400">
            Setiap transaksi order instansi ini akan dipotong sebesar {{ persenKomisi || 0 }}% untuk komisi platform.
          </p>
        </div>

        <div class="flex items-center justify-end space-x-2 pt-2">
          <button
            @click="$emit('close')"
            class="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            :disabled="isLoading"
          >
            Batal
          </button>
          <button
            @click="$emit('confirm')"
            class="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { Percent } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
  instansiNama: string
  persenKomisi: number
  isLoading: boolean
  errorMessage: string
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
  (e: 'update:persenKomisi', val: number): void
}>()
</script>
