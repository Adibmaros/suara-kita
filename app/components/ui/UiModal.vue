<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        @click="$emit('update:modelValue', false)"
      ></div>

      <!-- Modal Content Wrapper -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div 
          class="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden z-10 transition-all transform scale-100"
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <h3 class="text-lg font-bold text-white font-heading">{{ title }}</h3>
            <button 
              @click="$emit('update:modelValue', false)"
              class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="space-y-4">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title?: string
}>()

defineEmits(['update:modelValue'])
</script>
