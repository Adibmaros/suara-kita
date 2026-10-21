<template>
  <div class="min-h-screen flex flex-col bg-white text-[#141414] font-sans antialiased">
    <!-- Voter Navbar Minimal (Floating Stadium Pill) -->
    <header class="sticky top-0 z-50 w-full px-4 sm:px-6 pt-4 pb-2 transition-all">
      <div class="max-w-5xl mx-auto">
        <nav class="bg-[#f3f3f3]/95 backdrop-blur-md border border-[#e0e0e0] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <!-- Logo Brand -->
          <NuxtLink to="/" class="flex items-center space-x-2.5 group">
            <div class="w-8 h-8 rounded-[30%] bg-[#141414] flex items-center justify-center text-white font-bold text-xs transition-transform duration-200 group-hover:scale-105">
              SK
            </div>
            <span class="text-base font-bold text-[#141414] tracking-tight">
              SuaraKita<span class="text-[#0066ff]">.</span>
            </span>
          </NuxtLink>

          <!-- Voting Context Badge -->
          <div class="flex items-center space-x-2 text-xs font-semibold text-[#141414] bg-white px-3.5 py-1 rounded-full border border-[#e0e0e0]">
            <span>🗳️</span>
            <span>Bilik Suara Digital</span>
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
            <div class="w-5 h-5 rounded-[30%] bg-white flex items-center justify-center text-[#141414] font-bold text-[9px]">
              SK
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
