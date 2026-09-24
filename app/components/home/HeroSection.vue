<template>
  <section class="relative pt-8 sm:pt-16 pb-8 sm:pb-12 overflow-hidden">
    <!-- Background Ambient Glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-slate-100/80 via-slate-50/50 to-transparent blur-3xl -z-10 pointer-events-none"></div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
      <!-- SaaS Badge -->
      <div class="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-sm hover:bg-slate-800 transition-colors">
        <span class="flex h-2 w-2 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>SaaS E-Voting & Polling Platform</span>
      </div>

      <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight max-w-4xl mx-auto">
        Sistem E-Voting Token Real-Time untuk Instansi & Event
      </h1>

      <p class="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Kelola kontes pemilihan, voting berbayar via WhatsApp, dan pantau perolehan suara secara <span class="text-slate-900 font-semibold underline decoration-emerald-500/50 underline-offset-4">real-time & 100% transparan</span>.
      </p>

      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-2 max-w-md mx-auto sm:max-w-none">
        <NuxtLink to="/register" class="inline-flex items-center justify-center space-x-2 px-7 h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
          <span>Daftarkan Instansi Anda</span>
          <ArrowRight class="w-4 h-4" />
        </NuxtLink>
        <NuxtLink to="/login" class="inline-flex items-center justify-center px-7 h-12 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl transition-all duration-200 border border-slate-200/90 shadow-2xs hover:border-slate-300 active:scale-98">
          Masuk ke App
        </NuxtLink>
      </div>

      <!-- SaaS Product Interactive Preview Showcase -->
      <div class="pt-8 sm:pt-12">
        <div class="relative mx-auto max-w-4xl rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-3 sm:p-4 shadow-2xl">
          <!-- Window header mockup -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-3 px-2 mb-3">
            <div class="flex items-center space-x-2">
              <span class="w-3 h-3 rounded-full bg-rose-400"></span>
              <span class="w-3 h-3 rounded-full bg-amber-400"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
            </div>
            <div class="text-[11px] font-mono text-slate-500 bg-slate-100/80 px-3 py-1 rounded-md border border-slate-200/60 flex items-center space-x-1.5">
              <Lock class="w-3 h-3 text-slate-400" />
              <span>app.suarakita.com/live-leaderboard</span>
            </div>
            <div class="w-12"></div>
          </div>

          <!-- Preview Card Body: Live Leaderboard Mockup -->
          <div class="bg-slate-50/70 rounded-xl p-4 sm:p-6 space-y-4 text-left border border-slate-100">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Polling • BEM FIKOM 2026</span>
                <h3 class="text-base sm:text-lg font-bold text-slate-900">Pemilihan Duta Kampus Favorit</h3>
              </div>
              <div class="inline-flex items-center space-x-2 bg-emerald-100/80 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full w-fit">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Voting Berlangsung</span>
              </div>
            </div>

            <!-- Leaderboard Candidates Rows -->
            <div class="space-y-3 pt-1">
              <!-- Rank 1 -->
              <div class="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-4 flex items-center justify-between shadow-2xs hover:border-slate-300 transition-colors">
                <div class="flex items-center space-x-3">
                  <span class="w-6 font-mono font-bold text-slate-900 text-sm">#1</span>
                  <div class="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    A
                  </div>
                  <div>
                    <h4 class="text-xs sm:text-sm font-bold text-slate-900">Ahmad Subagja & Tim</h4>
                    <p class="text-[11px] text-slate-400">FIKOM • Paslon 01</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs sm:text-sm font-extrabold text-slate-900">1,420 Suara</span>
                  <div class="w-24 sm:w-40 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                    <div class="h-full bg-slate-900 rounded-full w-[62%]"></div>
                  </div>
                </div>
              </div>

              <!-- Rank 2 -->
              <div class="bg-white border border-slate-200/80 rounded-xl p-3 sm:p-4 flex items-center justify-between shadow-2xs">
                <div class="flex items-center space-x-3">
                  <span class="w-6 font-mono font-bold text-slate-400 text-sm">#2</span>
                  <div class="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                    B
                  </div>
                  <div>
                    <h4 class="text-xs sm:text-sm font-bold text-slate-900">Siti Rahma & Partner</h4>
                    <p class="text-[11px] text-slate-400">FASILKOM • Paslon 02</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs sm:text-sm font-extrabold text-slate-600">850 Suara</span>
                  <div class="w-24 sm:w-40 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                    <div class="h-full bg-slate-400 rounded-full w-[38%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Lock } from 'lucide-vue-next'
</script>
