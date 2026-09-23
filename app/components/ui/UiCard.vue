<template>
  <div 
    class="bg-slate-900 border border-slate-800 rounded-xl p-6 transition-all"
    :class="{ 'hover:border-slate-700 hover:shadow-xl hover:shadow-indigo-500/5': hover }"
  >
    <div v-if="$slots.header || title" class="mb-4 flex items-center justify-between border-b border-slate-800/80 pb-4">
      <div>
        <h3 v-if="title" class="text-lg font-bold text-white font-heading">{{ title }}</h3>
        <p v-if="subtitle" class="text-xs text-slate-400 mt-0.5">{{ subtitle }}</p>
      </div>
      <slot name="header" />
    </div>

    <slot />

    <div v-if="$slots.footer" class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-end space-x-3">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  hover?: boolean
}>()
</script>
