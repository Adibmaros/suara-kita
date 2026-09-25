<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="bg-slate-900 rounded-3xl p-8 sm:p-14 text-center text-white space-y-6 shadow-2xl relative overflow-hidden border border-slate-800">
      <!-- Glow effect -->
      <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-2xl mx-auto space-y-3 relative z-10">
        <h2 class="text-2xl sm:text-4xl font-black tracking-tight">Siap Menyelenggarakan Kontes di Instansi Anda?</h2>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Daftarkan instansi Anda secara gratis sekarang. Hanya butuh beberapa menit untuk memulai event pemilihan transparan dan mengumpulkan dukungan!
        </p>
      </div>

      <div class="pt-3 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink 
          to="/register" 
          class="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 h-12 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
        >
          <Building2 class="w-4 h-4" />
          <span>Daftar Instansi Sekarang</span>
          <ArrowRight class="w-4 h-4" />
        </NuxtLink>

        <NuxtLink 
          to="/login" 
          class="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 h-12 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-xl transition-all border border-slate-700"
        >
          <LogIn class="w-4 h-4 text-slate-400" />
          <span>Login ke Dashboard</span>
        </NuxtLink>
      </div>

      <div class="pt-2 text-[11px] text-slate-400 font-medium relative z-10">
        ⚡ Bebas biaya langganan • Tanpa DP • Bagi hasil 20%
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Building2, LogIn } from 'lucide-vue-next'
</script>
