<template>
  <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group">
    <!-- Image -->
    <div class="relative aspect-4/3 bg-slate-800 overflow-hidden">
      <img 
        v-if="kandidat.fotoUrl" 
        :src="kandidat.fotoUrl" 
        :alt="kandidat.nama" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-slate-600 bg-slate-800">
        <svg class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <!-- Badge Nomor Urut -->
      <div v-if="kandidat.nomorUrut" class="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-indigo-400 font-extrabold text-sm px-3 py-1 rounded-lg border border-indigo-500/20 font-heading">
        #{{ kandidat.nomorUrut }}
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex-1 flex flex-col justify-between">
      <div>
        <h4 class="text-lg font-bold text-white font-heading group-hover:text-indigo-400 transition-colors">
          {{ kandidat.nama }}
        </h4>
        <p v-if="kandidat.deskripsi" class="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
          {{ kandidat.deskripsi }}
        </p>
      </div>

      <!-- Vote Count -->
      <div class="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span class="text-xs text-slate-400">Total Suara</span>
        <span class="text-base font-extrabold text-indigo-400 font-heading">
          {{ kandidat.totalSuara?.toLocaleString('id-ID') || 0 }} Suara
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  kandidat: {
    id: number
    nama: string
    nomorUrut?: number | null
    fotoUrl?: string | null
    deskripsi?: string | null
    totalSuara?: number
  }
}>()
</script>
