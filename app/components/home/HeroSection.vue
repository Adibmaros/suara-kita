<template>
  <section class="relative pt-8 sm:pt-16 pb-12 sm:pb-20 overflow-hidden bg-white">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 sm:space-y-10">
      <!-- Badge Pill -->
      <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#f3f3f3] text-[#141414] text-xs font-semibold border border-[#e0e0e0]">
        <span class="w-1.5 h-1.5 rounded-full bg-[#141414]"></span>
        <span>Platform E-Voting & Polling Komunitas</span>
      </div>

      <!-- Hero Headline with Terminal Period -->
      <h1 class="text-4xl sm:text-6xl md:text-7xl font-bold text-[#141414] tracking-tight leading-[1.06] max-w-4xl mx-auto">
        Voting dan polling online yang transparan, aman, dan terpercaya.
      </h1>

      <!-- Subheadline (Light 300 weight airiness) -->
      <p class="text-base sm:text-xl font-light text-[#707070] max-w-2xl mx-auto leading-relaxed">
        Kelola pemilihan ormawa, voting favorit duta kampus, dan penggalangan dana kegiatan dengan sistem token sekali pakai dan live leaderboard real-time.
      </p>

      <!-- Hero CTA Stadium Pills -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 max-w-md mx-auto sm:max-w-none">
        <NuxtLink
          to="/register"
          class="btn-primary w-full sm:w-auto"
        >
          <Building2 class="w-4 h-4" />
          <span>Daftarkan Instansi Kamu</span>
          <ArrowRight class="w-4 h-4 text-[#adadad]" />
        </NuxtLink>

        <a
          href="#kontes-aktif"
          class="btn-outline w-full sm:w-auto"
        >
          <Vote class="w-4 h-4 text-[#141414]" />
          <span>Lihat Kontes Aktif</span>
        </a>
      </div>

      <!-- Hero Visual Showcase Card (Gallery Flat Frame) -->
      <div class="pt-8 sm:pt-12">
        <div class="relative mx-auto max-w-4xl rounded-3xl border border-[#e0e0e0] bg-white p-3 sm:p-5">
          <!-- Window Header Mockup -->
          <div class="flex items-center justify-between border-b border-[#f0f0f0] pb-3 px-2 mb-4">
            <div class="flex items-center space-x-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#e0e0e0]"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#e0e0e0]"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#e0e0e0]"></span>
            </div>
            <div class="text-[11px] font-mono text-[#707070] bg-[#f3f3f3] px-3.5 py-1 rounded-full border border-[#e0e0e0] flex items-center space-x-1.5">
              <ShieldCheck class="w-3.5 h-3.5 text-[#141414]" />
              <span>suarakita.vercel.app/live-leaderboard</span>
            </div>
            <div class="w-12"></div>
          </div>

          <!-- Live Leaderboard Preview Mockup -->
          <div class="bg-[#f3f3f3] rounded-2xl p-4 sm:p-6 space-y-4 text-left border border-[#f0f0f0]">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e0e0e0] pb-3">
              <div>
                <span class="text-[10px] font-bold text-[#707070] uppercase tracking-wider">Live Polling • Pemilihan Duta Ormawa</span>
                <h3 class="text-base sm:text-lg font-bold text-[#141414]">Perolehan Suara Terkini</h3>
              </div>
              <div class="inline-flex items-center space-x-2 bg-white text-[#141414] text-xs font-semibold px-3 py-1 rounded-full border border-[#e0e0e0] w-fit">
                <span class="w-1.5 h-1.5 rounded-full bg-[#0066ff]"></span>
                <span>Voting Sedang Berlangsung</span>
              </div>
            </div>

            <div class="space-y-3 pt-1">
              <div class="bg-white border border-[#e0e0e0] rounded-xl p-3 sm:p-4 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <span class="w-6 font-mono font-bold text-[#141414] text-sm">#1</span>
                  <div class="w-9 h-9 rounded-[30%] bg-[#141414] text-white font-bold text-xs flex items-center justify-center">
                    01
                  </div>
                  <div>
                    <h4 class="text-xs sm:text-sm font-bold text-[#141414]">Kandidat Paslon 01</h4>
                    <p class="text-[11px] text-[#707070]">BEM Fakultas Teknik</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs sm:text-sm font-bold text-[#141414]">1.420 Suara (62%)</span>
                  <div class="w-24 sm:w-40 h-2 bg-[#f3f3f3] rounded-full mt-1.5 overflow-hidden">
                    <div class="h-full bg-[#141414] rounded-full w-[62%]"></div>
                  </div>
                </div>
              </div>

              <div class="bg-white border border-[#e0e0e0] rounded-xl p-3 sm:p-4 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <span class="w-6 font-mono font-bold text-[#adadad] text-sm">#2</span>
                  <div class="w-9 h-9 rounded-[30%] bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] font-bold text-xs flex items-center justify-center">
                    02
                  </div>
                  <div>
                    <h4 class="text-xs sm:text-sm font-bold text-[#141414]">Kandidat Paslon 02</h4>
                    <p class="text-[11px] text-[#707070]">BEM Fakultas Ekonomi</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs sm:text-sm font-bold text-[#707070]">850 Suara (38%)</span>
                  <div class="w-24 sm:w-40 h-2 bg-[#f3f3f3] rounded-full mt-1.5 overflow-hidden">
                    <div class="h-full bg-[#adadad] rounded-full w-[38%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Metric Pill Counters -->
          <div class="grid grid-cols-3 gap-3 text-center pt-4">
            <div class="p-3 rounded-2xl bg-[#f3f3f3] border border-[#f0f0f0]">
              <p class="text-lg sm:text-2xl font-bold text-[#141414] leading-tight">45+</p>
              <p class="text-[11px] font-medium text-[#707070]">Instansi Kampus</p>
            </div>
            <div class="p-3 rounded-2xl bg-[#f3f3f3] border border-[#f0f0f0]">
              <p class="text-lg sm:text-2xl font-bold text-[#141414] leading-tight">100%</p>
              <p class="text-[11px] font-medium text-[#707070]">Transparan</p>
            </div>
            <div class="p-3 rounded-2xl bg-[#f3f3f3] border border-[#f0f0f0]">
              <p class="text-lg sm:text-2xl font-bold text-[#141414] leading-tight">Real-Time</p>
              <p class="text-[11px] font-medium text-[#707070]">Live Leaderboard</p>
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
