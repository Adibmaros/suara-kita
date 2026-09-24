<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-4 opacity-0"
    >
      <div 
        v-if="show" 
        class="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold text-white"
        :class="type === 'success' ? 'bg-slate-900 border-slate-800' : 'bg-rose-600 border-rose-500'"
      >
        <CheckCircle2 v-if="type === 'success'" class="w-4 h-4 text-emerald-400 shrink-0" />
        <XCircle v-else class="w-4 h-4 text-rose-200 shrink-0" />
        <span>{{ message }}</span>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { CheckCircle2, XCircle } from 'lucide-vue-next'

defineProps<{
  show: boolean
  message: string
  type: 'success' | 'error'
}>()
</script>
