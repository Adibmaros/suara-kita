<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-4">
    <div class="bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] rounded-3xl p-8 sm:p-14 relative overflow-hidden">
      <div class="max-w-3xl mx-auto text-center space-y-6 relative z-10">
        <!-- Badge Pill -->
        <div class="inline-flex items-center space-x-2 text-xs font-semibold text-[#141414] bg-white px-4 py-1.5 rounded-full border border-[#e0e0e0]">
          <BookOpen class="w-3.5 h-3.5 text-[#141414]" />
          <span>Panduan Penggunaan Platform</span>
        </div>

        <!-- Main Title with Terminal Period -->
        <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-[#141414] leading-[1.08]">
          Panduan lengkap dan manual book SuaraKita.
        </h1>

        <!-- Subtitle -->
        <p class="text-base sm:text-lg font-light text-[#707070] max-w-2xl mx-auto leading-relaxed">
          Semua panduan operasional yang Anda butuhkan untuk memulai dan mengelola event pemilihan atau voting favorit di kampus Anda — gratis pendaftaran dan tanpa biaya di muka.
        </p>

        <!-- Quick Anchor Navigation Stadium Pills -->
        <div class="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold text-[#141414]">
          <a href="#peran" class="px-4 py-2 rounded-full bg-white hover:bg-[#e8e8e8] border border-[#e0e0e0] transition-all flex items-center space-x-1.5">
            <Users class="w-3.5 h-3.5 text-[#141414]" />
            <span>Peran & Akses</span>
          </a>
          <a href="#alur" class="px-4 py-2 rounded-full bg-white hover:bg-[#e8e8e8] border border-[#e0e0e0] transition-all flex items-center space-x-1.5">
            <Layers class="w-3.5 h-3.5 text-[#141414]" />
            <span>Alur Sistem</span>
          </a>
          <a href="#bisnis" class="px-4 py-2 rounded-full bg-white hover:bg-[#e8e8e8] border border-[#e0e0e0] transition-all flex items-center space-x-1.5">
            <Coins class="w-3.5 h-3.5 text-[#141414]" />
            <span>Model Bisnis</span>
          </a>
          <a href="#faq" class="px-4 py-2 rounded-full bg-white hover:bg-[#e8e8e8] border border-[#e0e0e0] transition-all flex items-center space-x-1.5">
            <HelpCircle class="w-3.5 h-3.5 text-[#141414]" />
            <span>FAQ</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BookOpen, Users, Layers, Coins, HelpCircle } from 'lucide-vue-next'
</script>
