<template>
  <div class="min-h-screen flex flex-col bg-white text-[#141414] font-sans antialiased">
    <!-- Floating Stadium Nav Pill -->
    <header class="sticky top-0 z-50 w-full px-4 sm:px-6 pt-4 pb-2 transition-all">
      <div class="max-w-5xl mx-auto">
        <nav class="bg-[#f3f3f3]/95 backdrop-blur-md border border-[#e0e0e0] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between">
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

          <!-- Back to Home Button -->
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-white hover:bg-[#e8e8e8] text-[#141414] text-xs font-semibold border border-[#e0e0e0] transition-colors cursor-pointer"
          >
            <ArrowLeft class="w-3.5 h-3.5 text-[#707070]" :stroke-width="1.75" />
            <span>Kembali ke Beranda</span>
          </NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Main Centered Form Canvas -->
    <main class="flex-1 flex flex-col justify-center items-center py-8 sm:py-14 px-4 sm:px-6">
      <slot />
    </main>

    <!-- Clean Minimalist Footer -->
    <footer class="w-full py-6 px-4 border-t border-[#f0f0f0] text-center text-xs text-[#707070]">
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center space-x-2">
          <span>&copy; {{ new Date().getFullYear() }} SuaraKita. Platform Pemungutan Suara Digital.</span>
        </div>
        <div class="flex items-center space-x-4 text-[#707070]">
          <NuxtLink to="/kebijakan-privasi" class="hover:text-[#141414] transition-colors">Privasi</NuxtLink>
          <span>•</span>
          <NuxtLink to="/syarat-ketentuan" class="hover:text-[#141414] transition-colors">Syarat & Ketentuan</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
</script>

