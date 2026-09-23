<template>
  <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
    <div>
      <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">{{ title }}</p>
      <h4 class="text-2xl font-extrabold text-white font-heading mt-1">{{ value }}</h4>
      <p v-if="subtext" class="text-xs text-slate-500 mt-1">{{ subtext }}</p>
    </div>
    <div 
      class="w-12 h-12 rounded-xl flex items-center justify-center text-white"
      :class="iconBgClasses[color]"
    >
      <slot name="icon">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    value: string | number
    subtext?: string
    color?: 'indigo' | 'emerald' | 'amber' | 'rose'
  }>(),
  {
    color: 'indigo',
  }
)

const iconBgClasses = {
  indigo: 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20',
  emerald: 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/20',
  amber: 'bg-amber-600/20 text-amber-400 border border-amber-500/20',
  rose: 'bg-rose-600/20 text-rose-400 border border-rose-500/20',
}
</script>
