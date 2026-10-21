<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="bg-[#141414] rounded-3xl p-8 sm:p-14 text-center text-white space-y-6 relative overflow-hidden">
      <div class="max-w-2xl mx-auto space-y-3 relative z-10">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
          Siap menyelenggarakan voting di kampus Anda?
        </h2>
        <p class="text-xs sm:text-sm text-[#adadad] font-light leading-relaxed">
          Daftarkan ormawa atau komunitas Anda secara gratis. Hanya butuh beberapa menit untuk membuat kontes pemilihan digital dan mulai mengumpulkan dukungan suara.
        </p>
      </div>

      <div class="pt-2 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink 
          to="/register" 
          class="w-full sm:w-auto inline-flex items-center justify-center space-x-2 h-11 px-8 rounded-full bg-white text-[#141414] font-semibold text-xs sm:text-sm hover:bg-[#f3f3f3] transition-all active:scale-[0.98]"
        >
          <Building2 class="w-4 h-4" />
          <span>Daftar Instansi Sekarang</span>
          <ArrowRight class="w-4 h-4 text-[#707070]" />
        </NuxtLink>

        <NuxtLink 
          to="/login" 
          class="w-full sm:w-auto inline-flex items-center justify-center space-x-2 h-11 px-6 rounded-full bg-transparent text-white font-semibold text-xs sm:text-sm border border-[#383838] hover:bg-white/10 transition-all active:scale-[0.98]"
        >
          <LogIn class="w-4 h-4 text-[#adadad]" />
          <span>Login Dashboard</span>
        </NuxtLink>
      </div>

      <div class="pt-2 text-[11px] text-[#707070] font-medium relative z-10">
        Bebas biaya pendaftaran • Tanpa uang muka • Platform fee 20%
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Building2, LogIn } from 'lucide-vue-next'
</script>
