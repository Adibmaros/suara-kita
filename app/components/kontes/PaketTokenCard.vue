<template>
  <div class="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 transition-all flex flex-col justify-between relative group shadow-2xs">
    <div>
      <div class="flex items-center justify-between">
        <h4 class="text-base font-bold text-slate-900 tracking-tight">{{ pkg.namaPaket }}</h4>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">
          {{ pkg.jumlahSuara }} Suara
        </span>
      </div>

      <div class="mt-4">
        <span class="text-2xl font-bold text-slate-900">
          Rp {{ pkg.harga.toLocaleString('id-ID') }}
        </span>
      </div>
    </div>

    <div class="mt-6">
      <button 
        type="button"
        class="w-full h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md transition-colors shadow-xs cursor-pointer"
        @click="$emit('buy', pkg)"
      >
        Beli Token via WA
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pkg: {
    id: number
    namaPaket: string
    jumlahSuara: number
    harga: number
  }
}>()

defineEmits(['buy'])
</script>
