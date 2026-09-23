<template>
  <div class="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all flex flex-col justify-between relative group hover:shadow-xl hover:shadow-indigo-500/5">
    <div>
      <div class="flex items-center justify-between">
        <h4 class="text-lg font-bold text-white font-heading">{{ pkg.namaPaket }}</h4>
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          {{ pkg.jumlahSuara }} Suara
        </span>
      </div>

      <div class="mt-4">
        <span class="text-3xl font-extrabold text-white font-heading">
          Rp {{ pkg.harga.toLocaleString('id-ID') }}
        </span>
      </div>
    </div>

    <div class="mt-6">
      <UiButton 
        variant="primary" 
        class="w-full"
        @click="$emit('buy', pkg)"
      >
        Beli Token via WA
      </UiButton>
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
