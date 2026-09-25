<template>
  <section class="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-4">
    <div class="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-slate-800">
      <!-- Glow Decorator -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-3xl mx-auto text-center space-y-6 relative z-10">
        <!-- Badge -->
        <div class="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800/60 shadow-inner">
          <BookOpen class="w-4 h-4 text-emerald-400" />
          <span>Panduan Resmi v2 • 2026</span>
        </div>

        <!-- Main Title -->
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Panduan Lengkap <span class="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">SuaraKita</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Semua yang perlu Anda ketahui untuk memulai dan mengelola event pemilihan atau kontes populer di instansi Anda — 
          <span class="text-white font-semibold underline decoration-emerald-500 decoration-2 underline-offset-4">gratis pendaftaran</span> dan tanpa biaya di muka.
        </p>

        <!-- Quick Anchor Navigation Links -->
        <div class="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-slate-300">
          <a href="#peran" class="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/60 transition-all flex items-center space-x-1.5">
            <Users class="w-3.5 h-3.5 text-emerald-400" />
            <span>Peran & Akses</span>
          </a>
          <a href="#alur" class="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/60 transition-all flex items-center space-x-1.5">
            <Layers class="w-3.5 h-3.5 text-amber-400" />
            <span>Alur Sistem</span>
          </a>
          <a href="#bisnis" class="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/60 transition-all flex items-center space-x-1.5">
            <Coins class="w-3.5 h-3.5 text-emerald-400" />
            <span>Model Bisnis</span>
          </a>
          <a href="#faq" class="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/60 transition-all flex items-center space-x-1.5">
            <HelpCircle class="w-3.5 h-3.5 text-cyan-400" />
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
