<script setup lang="ts">
import { Plus, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  kandidatList: any[]
}>()

const emit = defineEmits<{
  (e: 'open-kandidat-modal'): void
  (e: 'confirm-delete', type: 'kandidat', id: number, nama: string): void
}>()
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-slate-900 tracking-tight">Daftar Kandidat</h2>
        <p class="text-xs text-slate-500 mt-0.5">Kelola kandidat yang berpartisipasi dalam kontes ini</p>
      </div>
      <button 
        @click="emit('open-kandidat-modal')"
        class="flex items-center gap-2 px-3.5 h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition shadow-xs cursor-pointer"
      >
        <Plus class="w-4 h-4" />
        <span>Tambah Kandidat</span>
      </button>
    </div>

    <div v-if="!kandidatList || kandidatList.length === 0" class="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center shadow-2xs">
      <p class="text-slate-500 text-xs">Belum ada kandidat untuk kontes ini.</p>
      <button @click="emit('open-kandidat-modal')" class="mt-2 text-xs text-slate-900 font-bold hover:underline cursor-pointer">
        + Tambah kandidat sekarang
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="k in kandidatList" 
        :key="k.id"
        class="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 shadow-2xs transition flex flex-col justify-between"
      >
        <div class="p-5 flex items-start gap-4">
          <img 
            :src="k.fotoUrl || 'https://via.placeholder.com/150'" 
            :alt="k.nama" 
            class="w-16 h-16 rounded-lg object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-slate-900 text-sm truncate">{{ k.nama }}</h3>
            <p class="text-xs text-slate-500 mt-1 line-clamp-2">{{ k.visiMisi || 'Belum ada visi & misi' }}</p>
          </div>
        </div>

        <div class="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
          <div class="text-xs text-slate-500">
            Total Suara: <span class="text-slate-900 font-bold">{{ k._count?.votes || 0 }}</span>
          </div>
          <button 
            @click="emit('confirm-delete', 'kandidat', k.id, k.nama)"
            class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
            title="Hapus Kandidat"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
