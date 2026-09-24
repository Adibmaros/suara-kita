<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-200">
        <div class="flex items-center space-x-3">
          <div 
            class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
            :class="targetStatus === 'AKTIF' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'"
          >
            <CheckCircle2 v-if="targetStatus === 'AKTIF'" class="w-5 h-5" />
            <XCircle v-else class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-900">Ubah Status Instansi</h3>
            <p class="text-xs text-slate-500">Konfirmasi perubahan status persetujuan</p>
          </div>
        </div>

        <p class="text-xs text-slate-600 leading-relaxed">
          Apakah Anda yakin ingin merubah status persetujuan instansi <strong class="text-slate-900">{{ instansiNama }}</strong> menjadi 
          <span 
            class="font-bold px-2 py-0.5 rounded-md text-[11px] ml-1 inline-block"
            :class="targetStatus === 'AKTIF' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'"
          >
            {{ targetStatus }}
          </span>?
        </p>

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
            class="px-4 py-2 text-xs font-semibold text-white rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
            :class="targetStatus === 'AKTIF' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span>Ubah Status</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { CheckCircle2, XCircle } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
  instansiNama: string
  targetStatus: string
  isLoading: boolean
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>
