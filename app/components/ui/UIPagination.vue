<template>
  <div v-if="totalPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-1 border-t border-slate-200/80 mt-4">
    <!-- Info count -->
    <div class="text-xs sm:text-sm text-slate-500 font-medium order-2 sm:order-1">
      Menampilkan <span class="font-semibold text-slate-900">{{ startItem }}</span> – <span class="font-semibold text-slate-900">{{ endItem }}</span> dari <span class="font-semibold text-slate-900">{{ totalItems }}</span> item
    </div>

    <!-- Pagination controls -->
    <div class="flex items-center gap-1.5 order-1 sm:order-2">
      <!-- Button Prev -->
      <button
        type="button"
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-all shadow-xs"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft class="w-4 h-4" />
        <span class="hidden sm:inline">Sebelumnya</span>
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center gap-1">
        <template v-for="(page, idx) in visiblePages" :key="idx">
          <span
            v-if="page === '...'"
            class="px-2 py-1 text-xs text-slate-400 font-medium select-none"
          >
            ...
          </span>
          <button
            v-else
            type="button"
            @click="goToPage(Number(page))"
            :class="[
              'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all',
              currentPage === page
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            ]"
          >
            {{ page }}
          </button>
        </template>
      </div>

      <!-- Button Next -->
      <button
        type="button"
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-all shadow-xs"
        aria-label="Halaman berikutnya"
      >
        <span class="hidden sm:inline">Berikutnya</span>
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  currentPage: number
  totalPages: number
  totalItems: number
  perPage: number
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const startItem = computed(() => {
  if (props.totalItems === 0) return 0
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.perPage, props.totalItems)
})

const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const pages: (number | string)[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) {
      pages.push('...')
    }
    
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (current < total - 2) {
      pages.push('...')
    }
    pages.push(total)
  }

  return pages
})

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>
