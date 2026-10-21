<template>
  <div class="bg-white border border-[#e0e0e0] rounded-3xl p-6 sm:p-8 space-y-6">
    <!-- Header Leaderboard & Live Status -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0f0f0] pb-5">
      <div>
        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 rounded-full bg-[#0066ff]"></div>
          <h3 class="text-lg font-bold text-[#141414] tracking-tight">Perolehan Suara Real-Time</h3>
        </div>
        <p class="text-xs text-[#707070] mt-1 font-light">Peringkat perolehan suara kandidat ter-update secara otomatis</p>
      </div>

      <div class="flex items-center space-x-3 bg-[#f3f3f3] px-4 py-2 rounded-full border border-[#e0e0e0] shrink-0">
        <span class="text-[11px] font-semibold text-[#707070] uppercase tracking-wider">Total Suara:</span>
        <span class="text-sm font-bold text-[#141414] font-mono">
          {{ totalSuara.toLocaleString('id-ID') }}
        </span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="items.length === 0" class="text-center py-12 text-[#707070] text-xs sm:text-sm bg-[#f3f3f3] rounded-2xl border border-dashed border-[#e0e0e0]">
      Belum ada suara yang masuk untuk kontes ini.
    </div>

    <!-- Leaderboard Cards Stack -->
    <div v-else class="space-y-3">
      <div 
        v-for="(item, idx) in items" 
        :key="item.id"
        class="bg-[#f3f3f3] hover:bg-[#eaeaea] rounded-2xl p-4 sm:p-5 transition-all space-y-3 relative overflow-hidden"
        :class="{
          'border border-[#e0e0e0]': idx === 0,
        }"
      >
        <!-- Rank Badge for #1 (Electric blue commercial accent) -->
        <div 
          v-if="idx === 0" 
          class="absolute top-0 right-0 bg-[#0066ff] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-bl-xl flex items-center space-x-1"
        >
          <Trophy class="w-3 h-3" />
          <span>Memimpin</span>
        </div>

        <div class="flex items-center justify-between gap-4">
          <!-- Rank & Candidate Profile -->
          <div class="flex items-center space-x-3 sm:space-x-4 min-w-0">
            <div 
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-[30%] font-mono font-bold text-xs sm:text-sm flex items-center justify-center shrink-0"
              :class="{
                'bg-[#141414] text-white': idx === 0,
                'bg-white text-[#141414] border border-[#e0e0e0]': idx > 0
              }"
            >
              #{{ idx + 1 }}
            </div>

            <!-- Avatar Foto (Squircle 30%) -->
            <img 
              v-if="item.fotoUrl && !imgErrors[item.id]" 
              :src="item.fotoUrl" 
              :alt="item.nama"
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-[30%] object-cover border border-[#e0e0e0] shrink-0" 
              @error="imgErrors[item.id] = true"
            />
            <div 
              v-else 
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-[30%] bg-white border border-[#e0e0e0] flex items-center justify-center text-[#707070] shrink-0"
            >
              <User class="w-5 h-5 sm:w-6 sm:h-6" :stroke-width="1.75" />
            </div>

            <div class="min-w-0">
              <h4 class="font-bold text-[#141414] text-xs sm:text-sm truncate">
                {{ item.nama }}
              </h4>
              <p class="text-[11px] text-[#707070] font-mono mt-0.5">
                Kandidat #{{ item.nomorUrut || item.id }}
              </p>
            </div>
          </div>

          <!-- Total Vote Count & Percentage -->
          <div class="text-right shrink-0">
            <div class="text-base sm:text-lg font-bold text-[#141414] font-mono">
              {{ item.totalSuara.toLocaleString('id-ID') }} <span class="text-xs font-normal text-[#707070]">Suara</span>
            </div>
            <div class="text-xs font-semibold text-[#141414] mt-0.5 font-mono">
              {{ item.persentase }}%
            </div>
          </div>
        </div>

        <!-- Custom Styled Progress Bar -->
        <div class="w-full bg-white h-2 rounded-full overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-700 ease-out"
            :class="idx === 0 ? 'bg-[#141414]' : 'bg-[#707070]'"
            :style="{ width: `${item.persentase}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Trophy, User } from 'lucide-vue-next'

const imgErrors = reactive<Record<number, boolean>>({})

defineProps<{
  items: Array<{
    id: number
    nama: string
    nomorUrut?: number
    fotoUrl?: string
    totalSuara: number
    persentase: string
  }>
  totalSuara: number
}>()
</script>
