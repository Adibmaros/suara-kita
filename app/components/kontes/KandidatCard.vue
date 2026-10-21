<template>
  <div class="bg-white border border-[#e0e0e0] hover:border-[#141414] rounded-3xl p-3 sm:p-4 transition-all flex flex-col group h-full">
    <!-- Image Container with 16px radius -->
    <div class="relative aspect-4/3 bg-[#f3f3f3] rounded-2xl overflow-hidden shrink-0 border border-[#f0f0f0] flex items-center justify-center">
      <img 
        v-if="kandidat.fotoUrl && kandidat.fotoUrl.trim() && !imgError"
        :src="kandidat.fotoUrl" 
        :alt="kandidat.nama" 
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        @error="imgError = true"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-[#f3f3f3] text-[#adadad] group-hover:text-[#707070] transition-colors">
        <User class="w-16 h-16 sm:w-20 sm:h-20" :stroke-width="1.5" />
      </div>

      <!-- Candidate Number Pill -->
      <div class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#141414] text-white text-[11px] font-bold font-mono">
        #{{ kandidat.nomorUrut || kandidat.id }}
      </div>
    </div>

    <!-- Content -->
    <div class="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
      <div>
        <h4 class="text-base sm:text-lg font-bold text-[#141414] tracking-tight line-clamp-1">
          {{ kandidat.nama }}
        </h4>
        <p v-if="kandidat.deskripsi" class="text-xs text-[#707070] mt-1 line-clamp-2 leading-relaxed font-light">
          {{ kandidat.deskripsi }}
        </p>
      </div>

      <!-- Progress Bar & Persentase Suara -->
      <div class="pt-3 border-t border-[#f0f0f0] space-y-1.5 mt-auto">
        <div class="flex items-center justify-between text-xs font-semibold">
          <span class="text-[#707070]">Perolehan Suara</span>
          <span class="text-[#141414] font-bold font-mono text-sm">{{ kandidat.persentase || '0.0' }}%</span>
        </div>

        <div class="h-2 bg-[#f3f3f3] rounded-full overflow-hidden">
          <div 
            class="h-full bg-[#141414] rounded-full transition-all duration-700"
            :style="{ width: `${kandidat.persentase || 0}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User } from 'lucide-vue-next'

const imgError = ref(false)

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
