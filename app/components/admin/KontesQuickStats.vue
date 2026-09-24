<script setup lang="ts">
import { Plus, MessageSquare } from 'lucide-vue-next'

const props = defineProps<{
  kontes: any
  paketTokenCount: number
}>()

const emit = defineEmits<{
  (e: 'open-kandidat-modal'): void
  (e: 'open-paket-modal'): void
  (e: 'open-wa-modal'): void
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex items-center justify-between">
      <div>
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Kandidat</p>
        <p class="text-2xl font-bold text-slate-900 mt-1">{{ kontes.kandidat?.length || 0 }} Orang</p>
      </div>
      <button @click="emit('open-kandidat-modal')" class="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition cursor-pointer">
        <Plus class="w-5 h-5" />
      </button>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex items-center justify-between">
      <div>
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Paket Token Active</p>
        <p class="text-2xl font-bold text-slate-900 mt-1">{{ paketTokenCount }} Paket</p>
      </div>
      <button @click="emit('open-paket-modal')" class="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg transition cursor-pointer">
        <Plus class="w-5 h-5" />
      </button>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex items-center justify-between">
      <div>
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Metode Pembayaran / WA</p>
        <p class="text-xs text-slate-700 font-medium mt-1 truncate max-w-[160px]">{{ kontes.infoRekening || 'Belum diatur' }}</p>
      </div>
      <button @click="emit('open-wa-modal')" class="flex items-center gap-1.5 px-3 h-8 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition cursor-pointer">
        <MessageSquare class="w-3.5 h-3.5 text-slate-600" />
        <span>Atur WA</span>
      </button>
    </div>
  </div>
</template>
