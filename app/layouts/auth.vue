<template>
  <div 
    class="min-h-screen w-full bg-white text-[#141414] font-sans flex flex-col"
    :class="isRegister ? 'lg:flex-row-reverse' : 'lg:flex-row'"
  >
    <!-- Visual Showcase Panel (Desktop / Laptop) -->
    <div class="hidden lg:flex lg:w-5/12 relative bg-[#141414] overflow-hidden flex-col justify-between p-10 lg:p-14 text-white min-h-screen">
      <!-- Top Header & Trust Badge -->
      <div class="relative z-10 space-y-6">
        <NuxtLink to="/" class="inline-flex items-center space-x-3 group">
          <div class="w-10 h-10 rounded-2xl bg-white p-1.5 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 shadow-xs">
            <img src="/logo%20aplikasi%20transparant.png" alt="SuaraKita Logo" class="w-full h-full object-contain" />
          </div>
          <span class="text-2xl font-bold tracking-tight text-white">SuaraKita<span class="text-[#0066ff]">.</span></span>
        </NuxtLink>

        <div class="pt-2">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white mb-4 border border-white/10">
            <span class="w-1.5 h-1.5 rounded-full bg-[#0066ff]"></span>
            Dipercaya 45+ Ormawa & Kampus
          </div>

          <h1 class="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.12] text-white mb-3">
            Demokrasi kampus yang transparan dan real-time.
          </h1>

          <p class="text-[#adadad] text-xs sm:text-sm font-light leading-relaxed max-w-sm">
            Wujudkan pemungutan suara digital yang adil dan akurat dengan sistem token sekali pakai tanpa potongan gateway.
          </p>
        </div>
      </div>

      <!-- Central Live Voting Preview Card Mockup (24px card) -->
      <div class="relative z-10 my-6">
        <div class="bg-white/10 border border-white/10 rounded-3xl p-5 relative">
          <!-- Floating Mini Badge -->
          <div class="absolute -top-3 right-5 bg-[#0066ff] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck class="w-3.5 h-3.5 text-white" />
            <span>Token Terverifikasi</span>
          </div>

          <!-- Mini Live Stat Preview -->
          <div class="flex items-center gap-3 pb-3 border-b border-white/10">
            <div class="w-8 h-8 rounded-[30%] bg-white text-[#141414] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <div>
              <p class="text-xs font-bold text-white tracking-wide">Pemilihan Ketua BEM</p>
              <p class="text-[11px] text-[#adadad]">1.420 Suara • Live Sync</p>
            </div>
          </div>

          <!-- Candidate Rank Bar -->
          <div class="mt-3 space-y-2">
            <div class="bg-white/5 rounded-2xl p-2.5 border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-white text-[#141414] font-bold text-[10px] flex items-center justify-center">1</span>
                <span class="text-xs font-semibold text-white">Paslon 01</span>
              </div>
              <span class="text-xs font-bold text-white font-mono">880 Suara (62%)</span>
            </div>
            
            <div class="bg-white/5 rounded-2xl p-2.5 border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-white/20 text-white font-bold text-[10px] flex items-center justify-center">2</span>
                <span class="text-xs font-semibold text-[#adadad]">Paslon 02</span>
              </div>
              <span class="text-xs font-bold text-[#adadad] font-mono">540 Suara (38%)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Stat Bullets -->
      <div class="relative z-10 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <div class="text-base font-bold text-white">100%</div>
          <p class="text-[11px] text-[#707070]">Transparan</p>
        </div>
        <div>
          <div class="text-base font-bold text-white">Real-Time</div>
          <p class="text-[11px] text-[#707070]">Live Leaderboard</p>
        </div>
        <div>
          <div class="text-base font-bold text-white">WhatsApp</div>
          <p class="text-[11px] text-[#707070]">Token OTP</p>
        </div>
      </div>
    </div>

    <!-- Form Section (Desktop 7 Cols) -->
    <div class="w-full lg:w-7/12 flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-y-auto bg-white min-h-screen">
      <!-- Top Navigation Header Bar -->
      <div class="flex items-center justify-between pb-6 border-b border-[#f0f0f0] mb-6">
        <NuxtLink to="/" class="inline-flex items-center space-x-2.5">
          <img src="/logo%20aplikasi%20transparant.png" alt="SuaraKita Logo" class="w-8 h-8 object-contain shrink-0" />
          <span class="text-lg font-bold text-[#141414]">SuaraKita<span class="text-[#0066ff]">.</span></span>
        </NuxtLink>

        <!-- Prominent "Kembali ke Beranda" Stadium Pill -->
        <NuxtLink
          to="/"
          class="btn-outline h-9 px-4 text-xs"
        >
          <ArrowLeft class="w-3.5 h-3.5 text-[#707070]" />
          <span>Kembali ke Beranda</span>
        </NuxtLink>
      </div>

      <!-- Main Slot Form (Centered) -->
      <div class="w-full max-w-md mx-auto my-auto py-4">
        <slot />
      </div>

      <!-- Footer Info -->
      <div class="text-center text-xs text-[#adadad] pt-6 border-t border-[#f0f0f0] mt-6">
        &copy; {{ new Date().getFullYear() }} SuaraKita. Hak cipta dilindungi.
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
