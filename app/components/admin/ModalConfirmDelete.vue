<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  show: boolean
  title: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl">
      <div class="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
        <Trash2 class="w-6 h-6" />
      </div>

      <div>
        <h3 class="text-base font-bold text-slate-900">Konfirmasi Hapus</h3>
        <p class="text-xs text-slate-500 mt-1">Apakah Anda yakin ingin menghapus <span class="text-slate-900 font-semibold font-mono">"{{ title }}"</span>?</p>
      </div>

      <div class="flex items-center justify-center gap-3 pt-2">
        <button 
          @click="emit('close')" 
          class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
        >
          Batal
        </button>
        <button 
          @click="emit('confirm')" 
          class="px-4 h-9 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition shadow-xs cursor-pointer"
        >
          Hapus Data
        </button>
      </div>
    </div>
  </div>
</template>
