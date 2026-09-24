<script setup lang="ts">
import { Plus, Settings, AlertTriangle } from 'lucide-vue-next'

const props = defineProps<{
  kontes: any
  paketTokenCount: number
}>()

const emit = defineEmits<{
  (e: 'open-kandidat-modal'): void
  (e: 'open-paket-modal'): void
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Total Kandidat -->
    <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex items-center justify-between">
      <div>
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Kandidat</p>
        <p class="text-2xl font-bold text-slate-900 mt-1">{{ kontes.kandidat?.length || 0 }} Orang</p>
      </div>
      <button @click="emit('open-kandidat-modal')" class="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition cursor-pointer">
        <Plus class="w-5 h-5" />
      </button>
    </div>

    <!-- Paket Token -->
    <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex items-center justify-between">
      <div>
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Paket Token Aktif</p>
        <p class="text-2xl font-bold text-slate-900 mt-1">{{ paketTokenCount }} Paket</p>
      </div>
      <button @click="emit('open-paket-modal')" class="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg transition cursor-pointer">
        <Plus class="w-5 h-5" />
      </button>
    </div>

    <!-- Rekening Pembayaran - Link ke Pengaturan Instansi -->
    <div 
      class="bg-white border rounded-xl p-5 shadow-2xs flex items-center justify-between"
      :class="kontes.instansi?.infoRekening ? 'border-slate-200' : 'border-amber-200 bg-amber-50/40'"
    >
      <div class="flex-1 min-w-0 mr-3">
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rekening Pembayaran</p>
        <p 
          class="text-xs font-medium mt-1 truncate max-w-[160px]"
          :class="kontes.instansi?.infoRekening ? 'text-slate-700' : 'text-amber-700'"
        >
          {{ kontes.instansi?.infoRekening || 'Belum diatur!' }}
        </p>
      </div>
      <NuxtLink 
        to="/admin/profil" 
        class="flex items-center gap-1.5 px-3 h-8 text-xs font-semibold rounded-lg border transition cursor-pointer shrink-0"
        :class="kontes.instansi?.infoRekening 
          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200' 
          : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300'"
        title="Atur rekening pembayaran di halaman Pengaturan Instansi"
      >
        <AlertTriangle v-if="!kontes.instansi?.infoRekening" class="w-3.5 h-3.5" />
        <Settings v-else class="w-3.5 h-3.5" />
        <span>{{ kontes.instansi?.infoRekening ? 'Ubah' : 'Atur Sekarang' }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
