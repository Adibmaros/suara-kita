<template>
  <div class="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-bold text-slate-900 font-heading flex items-center space-x-2">
        <span>Leaderboard Perolehan Suara</span>
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
      </h3>
      <span class="text-xs text-slate-500 font-medium">
        Total: {{ totalSuara.toLocaleString('id-ID') }} Suara
      </span>
    </div>

    <div v-if="items.length === 0" class="text-center py-8 text-slate-500 text-sm">
      Belum ada suara masuk.
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="(item, idx) in items" 
        :key="item.id"
        class="space-y-1.5"
      >
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center space-x-3">
            <span class="w-6 text-center font-bold text-slate-500 font-heading">#{{ idx + 1 }}</span>
            <span class="font-semibold text-slate-900">{{ item.nama }}</span>
          </div>
          <div class="text-right">
            <span class="font-bold text-blue-600 font-heading">{{ item.totalSuara.toLocaleString('id-ID') }} Suara</span>
            <span class="text-xs text-slate-500 ml-2">({{ item.persentase }}%)</span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
          <div 
            class="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-1000"
            :style="{ width: `${item.persentase}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{
    id: number
    nama: string
    totalSuara: number
    persentase: string
  }>
  totalSuara: number
}>()
</script>
