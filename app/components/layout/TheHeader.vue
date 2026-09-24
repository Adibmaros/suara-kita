<template>
  <header class="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-30">
    <div class="flex items-center space-x-2 text-xs font-medium text-slate-500">
      <span class="text-slate-400">Dashboard</span>
      <ChevronRight class="w-3.5 h-3.5 text-slate-300" />
      <span class="text-slate-900 font-semibold capitalize">{{ pageTitle }}</span>
    </div>

    <!-- Quick Status Badge -->
    <div class="flex items-center space-x-2 text-xs font-semibold text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/60">
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      <span>System Active</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

const route = useRoute()

const pageTitle = computed(() => {
  const path = route.path.replace(/^\/(admin|super-admin)\/?/, '')
  return path || 'Overview'
})
</script>
