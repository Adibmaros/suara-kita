<script setup lang="ts">
import { reactive } from 'vue'
import { Plus, Trash2, Pencil, User } from 'lucide-vue-next'

const imgErrors = reactive<Record<number, boolean>>({})

const props = defineProps<{
  kandidatList: any[]
}>()

const emit = defineEmits<{
  (e: 'open-kandidat-modal'): void
  (e: 'edit-kandidat', kandidat: any): void
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

    <div v-if="!kandidatList || kandidatList.length === 0" class="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center shadow-2xs">
      <p class="text-slate-500 text-xs">Belum ada kandidat untuk kontes ini.</p>
      <button @click="emit('open-kandidat-modal')" class="mt-2 text-xs text-slate-900 font-bold hover:underline cursor-pointer">
        + Tambah kandidat sekarang
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="k in kandidatList" 
        :key="k.id"
        class="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 shadow-2xs transition flex flex-col justify-between"
      >
        <div class="p-5 flex items-start gap-4">
          <div class="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
            <img 
              v-if="k.fotoUrl && !imgErrors[k.id]"
              :src="k.fotoUrl" 
              :alt="k.nama" 
              class="w-full h-full object-cover"
              @error="imgErrors[k.id] = true"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
              <User class="w-7 h-7" :stroke-width="1.75" />
            </div>
            <span 
              v-if="k.nomorUrut !== null && k.nomorUrut !== undefined" 
              class="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-xs leading-none"
            >
              #{{ k.nomorUrut }}
            </span>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-slate-900 text-sm truncate">{{ k.nama }}</h3>
            </div>
            <p class="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {{ k.deskripsi || k.visiMisi || 'Belum ada deskripsi / visi & misi' }}
            </p>
          </div>
        </div>

        <div class="bg-slate-50/80 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between">
          <span 
            v-if="k.nomorUrut !== null && k.nomorUrut !== undefined" 
            class="text-[11px] font-semibold text-slate-500 font-mono"
          >
            No. Urut: <strong class="text-slate-800">{{ k.nomorUrut }}</strong>
          </span>
          <span v-else class="text-[11px] text-slate-400 italic">No urut belum diatur</span>

          <div class="flex items-center gap-1.5">
            <button 
              @click="emit('edit-kandidat', k)"
              class="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 rounded-lg transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
              title="Edit Kandidat"
            >
              <Pencil class="w-3.5 h-3.5 text-slate-500" />
              <span>Edit</span>
            </button>
            <button 
              @click="emit('confirm-delete', 'kandidat', k.id, k.nama)"
              class="px-2.5 py-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
              title="Hapus Kandidat"
            >
              <Trash2 class="w-3.5 h-3.5" />
              <span>Hapus</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
