<template>
  <div class="min-h-screen flex flex-col bg-white text-[#141414] font-sans antialiased">
    <!-- Voter Navbar Minimal (Floating Stadium Pill) -->
    <header class="sticky top-0 z-50 w-full px-4 sm:px-6 pt-4 pb-2 transition-all">
      <div class="max-w-5xl mx-auto">
        <nav class="bg-[#f3f3f3]/95 backdrop-blur-md border border-[#e0e0e0] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          <!-- Logo Brand -->
          <NuxtLink to="/" class="flex items-center space-x-2.5 group shrink-0">
            <img 
              src="/logo%20aplikasi%20transparant.png" 
              alt="SuaraKita Logo" 
              class="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-105 shrink-0" 
            />
            <span class="text-base font-bold text-[#141414] tracking-tight">
              SuaraKita<span class="text-[#0066ff]">.</span>
            </span>
          </NuxtLink>

          <!-- Right: Voter Contest Action Buttons (when on contest page) -->
          <div v-if="isContestPage" class="flex items-center gap-1.5 sm:gap-2">
            <!-- Desktop Buttons (md and up) -->
            <div class="hidden md:flex items-center gap-2">
              <!-- Petunjuk Vote -->
              <button 
                type="button"
                @click="openGuide"
                class="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white hover:bg-[#e8e8e8] text-[#141414] text-xs font-semibold border border-[#e0e0e0] transition-colors cursor-pointer"
              >
                <HelpCircle class="w-3.5 h-3.5 text-[#707070]" :stroke-width="1.75" />
                <span>Petunjuk</span>
              </button>

              <!-- Beli Token via WA -->
              <button 
                v-if="!isClosed"
                type="button"
                @click="scrollToBeli"
                class="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-white hover:bg-[#141414] hover:text-white text-[#141414] text-xs font-semibold border border-[#e0e0e0] transition-colors cursor-pointer group"
              >
                <Coins class="w-3.5 h-3.5 text-[#707070] group-hover:text-white" :stroke-width="1.75" />
                <span>Beli Token</span>
              </button>
            </div>

            <!-- Mobile Compact Buttons (< md) -->
            <div class="flex md:hidden items-center gap-1">
              <button 
                type="button"
                @click="openGuide"
                class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#707070] hover:text-[#141414] border border-[#e0e0e0] transition-colors cursor-pointer"
                title="Petunjuk Vote"
              >
                <HelpCircle class="w-4 h-4" :stroke-width="1.75" />
              </button>

              <button 
                v-if="!isClosed"
                type="button"
                @click="scrollToBeli"
                class="inline-flex items-center justify-center h-8 px-2.5 rounded-full bg-white text-[#141414] text-xs font-semibold border border-[#e0e0e0] transition-colors cursor-pointer"
                title="Beli Token"
              >
                <span>Beli</span>
              </button>
            </div>

            <!-- Masukkan Token CTA (Always prominent on both mobile & desktop) -->
            <button 
              type="button"
              :disabled="isDraft || isClosed"
              :title="isClosed ? 'Voting telah ditutup' : isDraft ? 'Voting belum dibuka' : 'Buka form input token'"
              class="inline-flex items-center gap-1.5 h-8 px-3.5 sm:px-4 rounded-full bg-[#141414] hover:bg-[#262626] text-white text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              @click="openVote"
            >
              <Vote class="w-3.5 h-3.5" :stroke-width="1.75" />
              <span>{{ isClosed ? 'Ditutup' : 'Masukkan Token' }}</span>
            </button>
          </div>
        </nav>
      </div>
    </header>

    <!-- Content Slot -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Voter Footer Compact (Mobbin Ink Footer) -->
    <footer class="bg-[#141414] text-white rounded-t-3xl px-6 sm:px-10 pt-12 pb-8 mt-16 sm:mt-24">
      <div class="max-w-5xl mx-auto space-y-8">
        <!-- Soft CTA / Promotion -->
        <div class="py-4 text-center space-y-3">
          <p class="text-sm font-medium text-[#adadad]">
            Ingin mengadakan kontes voting & polling online untuk organisasi Anda?
          </p>
          <NuxtLink 
            to="/register" 
            class="inline-flex items-center h-10 px-6 rounded-full bg-white text-[#141414] text-xs font-semibold hover:bg-[#f3f3f3] transition-all active:scale-[0.98]"
          >
            <span>Daftarkan Instansi Anda ↗</span>
          </NuxtLink>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-6 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#707070]">
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 rounded-md bg-white p-0.5 flex items-center justify-center shrink-0">
              <img src="/logo%20aplikasi%20transparant.png" alt="SuaraKita Logo" class="w-full h-full object-contain" />
            </div>
            <span>Platform <strong class="text-white font-semibold">SuaraKita</strong></span>
            <span>• &copy; {{ new Date().getFullYear() }}</span>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/kebijakan-privasi" class="hover:text-[#adadad] transition-colors">Privasi</NuxtLink>
            <span>•</span>
            <NuxtLink to="/syarat-ketentuan" class="hover:text-[#adadad] transition-colors">Syarat & Ketentuan</NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { HelpCircle, Coins, Vote } from 'lucide-vue-next'

const { isContestPage, isDraft, isClosed, openVote, openGuide, scrollToBeli } = useVoterNav()
</script>
