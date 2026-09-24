<script setup lang="ts">
import { X, Loader2 } from 'lucide-vue-next'

const props = defineProps<{
  show: boolean
  submitting: boolean
  form: {
    namaPaket: string
    jumlahToken: number
    harga: number
  }
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-slate-900">Tambah Paket Token</h3>
        <button @click="emit('close')" class="text-slate-400 hover:text-slate-600 cursor-pointer">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="emit('submit')" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Nama Paket *</label>
          <input 
            v-model="form.namaPaket" 
            type="text" 
            required
            placeholder="Contoh: Paket Hemat 10 Token"
            class="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 h-9 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 text-xs"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Jumlah Token *</label>
            <input 
              v-model.number="form.jumlahToken" 
              type="number" 
              min="1"
              required
              class="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 h-9 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 text-xs"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Harga (Rp) *</label>
            <input 
              v-model.number="form.harga" 
              type="number" 
              min="0"
              step="1000"
              required
              class="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 h-9 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 text-xs"
            />
          </div>
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
            class="flex items-center gap-2 px-4 h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition disabled:opacity-50 shadow-xs cursor-pointer"
          >
            <Loader2 v-if="submitting" class="w-3.5 h-3.5 animate-spin" />
            <span>Simpan Paket</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
