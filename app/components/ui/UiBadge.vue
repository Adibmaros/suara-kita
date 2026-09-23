<template>
  <span 
    :class="[
      'inline-flex items-center font-medium rounded-md text-xs px-2.5 py-1',
      variantClasses[variant]
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
  }>(),
  {
    variant: 'neutral',
  }
)

const variantClasses = {
  primary: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  neutral: 'bg-slate-800 text-slate-300 border border-slate-700',
}
</script>
