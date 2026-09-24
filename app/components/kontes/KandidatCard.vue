<template>
  <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-all flex flex-col group shadow-sm hover:shadow-md h-full">
    <!-- Image -->
    <div class="relative aspect-4/3 sm:aspect-16/9 md:aspect-4/3 bg-slate-50 overflow-hidden shrink-0">
      <img 
        v-if="kandidat.fotoUrl" 
        :src="kandidat.fotoUrl" 
        :alt="kandidat.nama" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
        <svg class="w-12 h-12 sm:w-14 sm:h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>


    </div>

    <!-- Content -->
    <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
      <div>
        <h4 class="text-base sm:text-lg font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors line-clamp-1">
          {{ kandidat.nama }}
        </h4>
        <p v-if="kandidat.deskripsi" class="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          {{ kandidat.deskripsi }}
        </p>
      </div>

      <!-- Progress Bar & Persentase Suara -->
      <div class="pt-3 border-t border-slate-100 space-y-1.5 mt-auto">
        <div class="flex items-center justify-between text-xs font-semibold">
          <span class="text-slate-500">Perolehan Suara</span>
          <span class="text-blue-600 font-bold font-heading text-sm">{{ kandidat.persentase || '0.0' }}%</span>
        </div>

        <div class="h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
          <div 
            class="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-700"
            :style="{ width: `${kandidat.persentase || 0}%` }"
          ></div>
        </div>
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
    persentase?: string
  }
}>()
</script>
