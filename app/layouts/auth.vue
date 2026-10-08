<template>
  <div 
    class="min-h-screen w-full bg-slate-50 text-slate-900 font-sans flex flex-col"
    :class="isRegister ? 'lg:flex-row-reverse' : 'lg:flex-row'"
  >
    <!-- Visual Showcase Panel (Desktop / Laptop) -->
    <div class="hidden lg:flex lg:w-5/12 relative bg-slate-900 overflow-hidden flex-col justify-between p-10 lg:p-14 text-white min-h-screen border-slate-800">
      <!-- Background Ambient Glow & Pattern -->
      <div class="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      <!-- Top Header & Trust Badge -->
      <div class="relative z-10 space-y-6">
        <NuxtLink to="/" class="inline-flex items-center space-x-3 group">
          <div class="w-10 h-10 rounded-xl bg-white text-slate-900 font-extrabold text-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            SK
          </div>
          <span class="text-2xl font-black tracking-tight text-white">SuaraKita<span class="text-blue-400">.</span></span>
        </NuxtLink>

        <div class="pt-2">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wide text-blue-200 mb-4">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Dipercaya 45+ Instansi & Organisasi
          </div>

          <h1 class="text-3xl font-extrabold tracking-tight leading-tight text-white mb-3">
            Demokrasi & Polling <br />
            <span class="bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent">Transparan & Real-Time.</span>
          </h1>

          <p class="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
            Wujudkan pemungutan suara digital yang aman, praktis, dan akurat dengan sistem token unik sekali pakai.
          </p>
        </div>
      </div>

      <!-- Central Live Voting Preview Card Mockup -->
      <div class="relative z-10 my-6">
        <div class="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-4.5 shadow-2xl relative">
          <!-- Floating Mini Badge -->
          <div class="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <ShieldCheck class="w-3.5 h-3.5 text-blue-200" />
            <span>Enkripsi Token Valid</span>
          </div>

          <!-- Mini Live Stat Preview -->
          <div class="flex items-center gap-3 pb-3 border-b border-white/10">
            <div class="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
              SK
            </div>
            <div>
              <p class="text-xs font-bold text-white tracking-wide">Pemilihan Ketua Organisasi</p>
              <p class="text-[11px] text-slate-300">1.420 Suara • Live Leaderboard Sync</p>
            </div>
          </div>

          <!-- Candidate Rank Bar -->
          <div class="mt-3 space-y-2">
            <div class="bg-white/5 rounded-xl p-2 border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-[10px] flex items-center justify-center">1</span>
                <span class="text-xs font-semibold text-white">Paslon 01</span>
              </div>
              <span class="text-xs font-bold text-blue-300">880 Suara (62%)</span>
            </div>
            
            <div class="bg-white/5 rounded-xl p-2 border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-slate-400 text-white font-bold text-[10px] flex items-center justify-center">2</span>
                <span class="text-xs font-semibold text-white">Paslon 02</span>
              </div>
              <span class="text-xs font-bold text-slate-300">540 Suara (38%)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Stat Bullets -->
      <div class="relative z-10 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <div class="text-base font-bold text-blue-400">100%</div>
          <p class="text-[11px] text-slate-400">Transparansi Suara</p>
        </div>
        <div>
          <div class="text-base font-bold text-white">Real-Time</div>
          <p class="text-[11px] text-slate-400">Live Leaderboard</p>
        </div>
        <div>
          <div class="text-base font-bold text-emerald-400">WhatsApp</div>
          <p class="text-[11px] text-slate-400">Token Unik OTP</p>
        </div>
      </div>
    </div>

    <!-- Form Section (Desktop / Laptop 7 Cols, Full Column Display) -->
    <div class="w-full lg:w-7/12 flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto bg-slate-50 min-h-screen">
      <!-- Top Navigation Header Bar (Visible on All Devices) -->
      <div class="flex items-center justify-between pb-6 border-b border-slate-200/80 mb-4 sm:mb-6">
        <!-- Logo for Mobile (hidden on desktop since desktop has left panel logo) -->
        <NuxtLink to="/" class="inline-flex items-center space-x-2.5">
          <div class="w-9 h-9 rounded-xl bg-slate-900 text-white font-extrabold text-base flex items-center justify-center shadow-sm">
            SK
          </div>
          <span class="text-lg font-black text-slate-900">SuaraKita</span>
        </NuxtLink>

        <!-- Prominent "Kembali ke Beranda" Link Button -->
        <NuxtLink
          to="/"
          class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100/80 text-slate-700 hover:text-slate-900 font-semibold text-xs border border-slate-200/90 shadow-2xs transition-all active:scale-95"
        >
          <ArrowLeft class="w-3.5 h-3.5 text-slate-500" />
          <span>Kembali ke Beranda</span>
        </NuxtLink>
      </div>

      <!-- Main Slot Form (Fills Column Directly) -->
      <div class="w-full max-w-xl mx-auto my-auto py-2 sm:py-4">
        <slot />
      </div>

      <!-- Footer Info -->
      <div class="text-center text-xs text-slate-400 pt-6 border-t border-slate-200/60 mt-6">
        © {{ new Date().getFullYear() }} SuaraKita Platform • All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ShieldCheck, ArrowLeft } from 'lucide-vue-next'

const route = useRoute()
const isRegister = computed(() => route.path.includes('/register'))
</script>
