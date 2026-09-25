<template>
  <div v-if="kontes" class="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white rounded-xl border border-slate-200 p-6 max-w-md w-full shadow-xl space-y-4">
      <div class="flex items-start gap-3">
        <div class="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
          <AlertTriangle class="w-5 h-5" />
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">Hapus Kontes DRAFT?</h3>
          <p class="text-xs text-slate-500 mt-1">
            Apakah Anda yakin ingin menghapus kontes <strong class="text-slate-900 font-semibold">"{{ kontes.nama }}"</strong>? Semua kandidat dan paket token di dalamnya akan ikut terhapus. Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>
      </div>

      <div v-if="error" class="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
        {{ error }}
      </div>

      <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
        <button 
          @click="$emit('close')"
          :disabled="isDeleting"
          class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-md transition-colors disabled:opacity-50"
        >
          Batal
        </button>
        <button 
          @click="$emit('confirm')"
          :disabled="isDeleting"
          class="inline-flex items-center justify-center px-4 h-9 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-md transition-colors shadow-xs disabled:opacity-50"
        >
          <span v-if="isDeleting">Menghapus...</span>
          <span v-else>Ya, Hapus Kontes</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next'

defineProps<{
  kontes: { id: number; nama: string } | null
  isDeleting: boolean
  error: string
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>
