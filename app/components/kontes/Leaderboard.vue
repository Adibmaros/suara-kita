<template>
  <div class="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
    <!-- Header Leaderboard & Live Pulse Status -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
      <div>
        <div class="flex items-center space-x-2">
          <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
          <h3 class="text-lg font-bold text-slate-900 tracking-tight">Perolehan Suara Real-Time</h3>
        </div>
        <p class="text-xs text-slate-500 mt-1">Peringkat perolehan suara kandidat ter-update secara otomatis</p>
      </div>

      <div class="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200/60 shrink-0">
        <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Suara Masuk:</span>
        <span class="text-sm font-extrabold text-slate-900 font-mono">
          {{ totalSuara.toLocaleString('id-ID') }}
        </span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="items.length === 0" class="text-center py-12 text-slate-400 text-xs sm:text-sm bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
      Belum ada suara yang masuk untuk kontes ini.
    </div>

    <!-- Modern Leaderboard Cards Stack -->
    <div v-else class="space-y-4">
      <div 
        v-for="(item, idx) in items" 
        :key="item.id"
        class="bg-slate-50/60 hover:bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-md space-y-3.5 relative overflow-hidden group"
        :class="{
          'border-amber-200/90 bg-gradient-to-r from-amber-50/30 via-white to-amber-50/10 shadow-xs': idx === 0,
          'border-slate-300/80': idx === 1,
          'border-amber-700/20': idx === 2
        }"
      >
        <!-- Rank Crown Badge for #1 -->
        <div 
          v-if="idx === 0" 
          class="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl shadow-xs flex items-center space-x-1"
        >
          <Trophy class="w-3 h-3" />
          <span>Memimpin</span>
        </div>

        <div class="flex items-center justify-between gap-4">
          <!-- Rank & Candidate Profile -->
          <div class="flex items-center space-x-3 sm:space-x-4 min-w-0">
            <div 
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-2xs"
              :class="{
                'bg-amber-500 text-white shadow-amber-500/20': idx === 0,
                'bg-slate-700 text-white': idx === 1,
                'bg-amber-800/80 text-white': idx === 2,
                'bg-slate-200 text-slate-600': idx > 2
              }"
            >
              #{{ idx + 1 }}
            </div>

            <!-- Avatar Foto -->
            <img 
              v-if="item.fotoUrl" 
              :src="item.fotoUrl" 
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs" 
            />
            <div v-else class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-200/80 text-slate-400 flex items-center justify-center text-lg shrink-0">
              👤
            </div>

            <div class="min-w-0">
              <h4 class="font-bold text-slate-900 text-xs sm:text-sm truncate group-hover:text-blue-600 transition-colors">
                {{ item.nama }}
              </h4>
              <p class="text-[11px] text-slate-400 font-mono mt-0.5">
                Kandidat #{{ item.nomorUrut || item.id }}
              </p>
            </div>
          </div>

          <!-- Total Vote Count & Percentage -->
          <div class="text-right shrink-0">
            <div class="text-base sm:text-lg font-black text-slate-900 font-mono">
              {{ item.totalSuara.toLocaleString('id-ID') }} <span class="text-xs font-normal text-slate-500">Suara</span>
            </div>
            <div class="text-xs font-extrabold text-blue-600 mt-0.5">
              {{ item.persentase }}%
            </div>
          </div>
        </div>

        <!-- Custom Styled Progress Bar -->
        <div class="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-1000 ease-out"
            :class="{
              'bg-gradient-to-r from-amber-500 to-amber-400': idx === 0,
              'bg-gradient-to-r from-blue-600 to-indigo-600': idx > 0
            }"
            :style="{ width: `${item.persentase}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trophy } from 'lucide-vue-next'

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
