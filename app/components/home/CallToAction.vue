<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
      <div class="max-w-2xl mx-auto space-y-3 relative z-10">
        <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Siap Menyelenggarakan Voting Transparan?</h2>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Bergabunglah dengan puluhan instansi dan panitia event yang mempercayakan pemungutan suara mereka pada SuaraKita.
        </p>
      </div>

      <div class="pt-2 relative z-10">
        <NuxtLink to="/register" class="inline-flex items-center space-x-2 px-8 h-12 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
          <span>Mulai Sekarang — Gratis</span>
          <ArrowRight class="w-4 h-4 text-slate-900" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>
