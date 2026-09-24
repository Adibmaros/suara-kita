<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Kelola & Approval Instansi</h1>
      <p class="text-xs text-slate-500 mt-1">Daftar instansi terdaftar, status persetujuan, dan akses kontes publik</p>
    </div>

    <!-- Single Parent Dropdown Filter -->
    <div class="relative shrink-0" ref="dropdownRef">
      <button
        @click="isFilterOpen = !isFilterOpen"
        class="flex items-center space-x-2.5 px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all cursor-pointer"
      >
        <Filter class="w-4 h-4 text-slate-500" />
        <span>Filter Status:</span>
        <span 
          class="px-2 py-0.5 rounded-md text-[11px] font-bold"
          :class="{
            'bg-slate-100 text-slate-800': modelValue === 'ALL',
            'bg-amber-100 text-amber-800': modelValue === 'PENDING',
            'bg-emerald-100 text-emerald-800': modelValue === 'AKTIF',
            'bg-rose-100 text-rose-800': modelValue === 'NONAKTIF'
          }"
        >
          {{ statusLabels[modelValue] || modelValue }}
        </span>
        <ChevronDown class="w-4 h-4 text-slate-400 transition-transform duration-200" :class="{ 'rotate-180': isFilterOpen }" />
      </button>

      <!-- Dropdown Menu -->
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="isFilterOpen"
          class="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200/80 shadow-lg py-1 z-30"
        >
          <button
            v-for="(label, key) in statusLabels"
            :key="key"
            @click="selectFilter(key)"
            class="w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
            :class="modelValue === key ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-700'"
          >
            <span>{{ label }}</span>
            <span 
              v-if="modelValue === key" 
              class="w-1.5 h-1.5 rounded-full bg-blue-600"
            ></span>
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Filter, ChevronDown } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isFilterOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const statusLabels: Record<string, string> = {
  ALL: 'Semua Status',
  PENDING: 'PENDING',
  AKTIF: 'AKTIF',
  NONAKTIF: 'NONAKTIF'
}

const selectFilter = (key: string) => {
  emit('update:modelValue', key)
  isFilterOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isFilterOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
