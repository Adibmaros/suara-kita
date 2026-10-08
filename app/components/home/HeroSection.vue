<template>
  <section class="relative pt-6 sm:pt-12 pb-8 sm:pb-12 overflow-hidden bg-slate-50">
    <!-- Ambient Background Glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-100/40 via-slate-50/50 to-transparent blur-3xl -z-10 pointer-events-none"></div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
      <!-- Badge Pill -->
      <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs hover:bg-slate-800 transition-colors">
        <span class="flex h-2 w-2 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>Platform E-Voting & Polling Digital Organisasi</span>
      </div>

      <!-- Hero Headline -->
      <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
        Voting & Polling Online Transparan, <br class="hidden sm:inline" />
        <span class="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">Real-Time & Terpercaya</span>
      </h1>

      <!-- Subheadline -->
      <p class="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Kelola kontes pemilihan, pemungutan suara berbasis token unik, dan pantau hasil perolehan suara secara langsung untuk instansi, komunitas, organisasi, dan event.
      </p>

      <!-- Hero CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-2 max-w-md mx-auto sm:max-w-none">
        <NuxtLink
          to="/register"
          class="inline-flex items-center justify-center space-x-2 px-7 h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        >
          <Building2 class="w-4 h-4" />
          <span>Daftarkan Instansi / Komunitas</span>
          <ArrowRight class="w-4 h-4" />
        </NuxtLink>

        <a
          href="#kontes-aktif"
          class="inline-flex items-center justify-center space-x-2 px-7 h-12 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl transition-all duration-200 border border-slate-200/90 shadow-2xs hover:border-slate-300 active:scale-98"
        >
          <Vote class="w-4 h-4 text-blue-600" />
          <span>Lihat Kontes Berlangsung</span>
        </a>
      </div>

      <!-- Hero Visual Showcase Card -->
      <div class="pt-6 sm:pt-10">
        <div class="relative mx-auto max-w-4xl rounded-2xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-xl">
          <!-- Window Header Mockup -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-3 px-2 mb-3">
            <div class="flex items-center space-x-2">
              <span class="w-3 h-3 rounded-full bg-rose-400"></span>
              <span class="w-3 h-3 rounded-full bg-amber-400"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
            </div>
            <div class="text-[11px] font-mono text-slate-500 bg-slate-100/80 px-3 py-1 rounded-md border border-slate-200/60 flex items-center space-x-1.5">
              <ShieldCheck class="w-3.5 h-3.5 text-blue-600" />
              <span>suarakita.id/live-leaderboard</span>
            </div>
            <div class="w-12"></div>
          </div>

          <!-- Live Leaderboard Preview Mockup -->
          <div class="bg-slate-50/80 rounded-xl p-4 sm:p-6 space-y-4 text-left border border-slate-100">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Polling • Pemilihan Ketua Organisasi</span>
                <h3 class="text-base sm:text-lg font-bold text-slate-900">Perolehan Suara Terkini</h3>
              </div>
              <div class="inline-flex items-center space-x-2 bg-emerald-100/80 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full w-fit">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Voting Berlangsung</span>
              </div>
            </div>

            <div class="space-y-3 pt-1">
              <div class="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-4 flex items-center justify-between shadow-2xs">
                <div class="flex items-center space-x-3">
                  <span class="w-6 font-mono font-bold text-blue-600 text-sm">#1</span>
                  <div class="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    01
                  </div>
                  <div>
                    <h4 class="text-xs sm:text-sm font-bold text-slate-900">Kandidat Paslon 01</h4>
                    <p class="text-[11px] text-slate-400">Tim Mandiri Utama</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs sm:text-sm font-extrabold text-slate-900">1.420 Suara (62%)</span>
                  <div class="w-24 sm:w-40 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                    <div class="h-full bg-blue-600 rounded-full w-[62%]"></div>
                  </div>
                </div>
              </div>

              <div class="bg-white border border-slate-200/80 rounded-xl p-3 sm:p-4 flex items-center justify-between shadow-2xs">
                <div class="flex items-center space-x-3">
                  <span class="w-6 font-mono font-bold text-slate-400 text-sm">#2</span>
                  <div class="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                    02
                  </div>
                  <div>
                    <h4 class="text-xs sm:text-sm font-bold text-slate-900">Kandidat Paslon 02</h4>
                    <p class="text-[11px] text-slate-400">Tim Pembaharuan</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs sm:text-sm font-extrabold text-slate-600">850 Suara (38%)</span>
                  <div class="w-24 sm:w-40 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                    <div class="h-full bg-slate-400 rounded-full w-[38%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Metric Pill Counters -->
          <div class="grid grid-cols-3 gap-2.5 text-center pt-3">
            <div class="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p class="text-base sm:text-xl font-black text-slate-900 leading-tight">45+</p>
              <p class="text-[10px] sm:text-xs font-medium text-slate-500">Instansi & Komunitas</p>
            </div>
            <div class="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p class="text-base sm:text-xl font-black text-blue-600 leading-tight">100%</p>
              <p class="text-[10px] sm:text-xs font-medium text-slate-500">Transparansi Hasil</p>
            </div>
            <div class="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p class="text-base sm:text-xl font-black text-emerald-600 leading-tight">Real-Time</p>
              <p class="text-[10px] sm:text-xs font-medium text-slate-500">Hasil Perolehan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Building2, ArrowRight, Vote, ShieldCheck } from 'lucide-vue-next'
</script>
