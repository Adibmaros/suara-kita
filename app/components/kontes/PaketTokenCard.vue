<template>
  <div 
    class="rounded-3xl p-6 sm:p-7 transition-all flex flex-col justify-between relative group"
    :class="isFeatured 
      ? 'bg-[#f3f3f3] border border-transparent' 
      : 'bg-white border border-[#e0e0e0] hover:border-[#141414]'"
  >
    <!-- Featured Badge Popular (The only blue accent in Mobbin system) -->
    <div v-if="isFeatured" class="absolute -top-3 right-6">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#0066ff] text-white">
        Favorit
      </span>
    </div>

    <div>
      <div class="flex items-center justify-between gap-2">
        <h4 class="text-base sm:text-lg font-bold text-[#141414] tracking-tight">{{ pkg.namaPaket }}</h4>
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#e0e0e0] text-[#141414]">
          {{ pkg.jumlahSuara }} Suara
        </span>
      </div>

      <div class="mt-4">
        <span class="text-2xl sm:text-3xl font-bold text-[#141414] font-mono">
          Rp {{ pkg.harga.toLocaleString('id-ID') }}
        </span>
        <p class="text-xs text-[#707070] mt-1 font-light">
          Setara Rp {{ Math.round(pkg.harga / pkg.jumlahSuara).toLocaleString('id-ID') }} / suara
        </p>
      </div>
    </div>

    <div class="mt-6 pt-4 border-t" :class="isFeatured ? 'border-[#e0e0e0]' : 'border-[#f0f0f0]'">
      <button 
        type="button"
        class="w-full btn-primary text-xs sm:text-sm"
        @click="$emit('buy', pkg)"
      >
        <span>Beli Token via WA</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  pkg: {
    id: number
    namaPaket: string
    jumlahSuara: number
    harga: number
  }
  isFeatured?: boolean
}>()

defineEmits(['buy'])

// Auto-detect high value or featured package if not explicitly passed
const isFeatured = computed(() => {
  if (typeof props.isFeatured === 'boolean') return props.isFeatured
  return props.pkg.jumlahSuara >= 10 || props.pkg.namaPaket.toLowerCase().includes('favorit') || props.pkg.namaPaket.toLowerCase().includes('juara')
})
</script>
