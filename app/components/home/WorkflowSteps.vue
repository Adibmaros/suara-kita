<template>
  <section class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="text-center space-y-3 mb-12 sm:mb-16">
      <div class="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200/60">
        <Zap class="w-3.5 h-3.5 text-amber-500" />
        <span>Alur Mudah & Praktis</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Cara Kerja Sistem</h2>
      <p class="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
        Hanya butuh 3 langkah singkat untuk memulai event pemungutan suara instansi Anda.
      </p>
    </div>

    <!-- Process Steps Flow with Visual Connectors -->
    <div class="relative">
      <!-- Connecting Line (Desktop) -->
      <div class="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 bg-slate-200 -translate-y-6 -z-10"></div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6">
        <!-- Step 1 -->
        <div class="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-8 space-y-5 shadow-xs hover:shadow-xl transition-all duration-300 relative group">
          <div class="flex items-center justify-between">
            <span class="w-12 h-12 rounded-2xl bg-slate-900 text-white font-mono font-black text-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              01
            </span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
              Langkah 1
            </span>
          </div>

          <div class="space-y-2">
            <h3 class="text-base sm:text-lg font-bold text-slate-900">Buat Instansi & Event</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Daftarkan organisasi Anda, tambahkan daftar kandidat paslon, dan atur harga paket token sesuai kebutuhan event.
            </p>
          </div>

          <div class="pt-2 flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <Building2 class="w-4 h-4 text-slate-400" />
            <span>Gratis Pembuatan Instansi</span>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-8 space-y-5 shadow-xs hover:shadow-xl transition-all duration-300 relative group">
          <div class="flex items-center justify-between">
            <span class="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-mono font-black text-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              02
            </span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
              Langkah 2
            </span>
          </div>

          <div class="space-y-2">
            <h3 class="text-base sm:text-lg font-bold text-slate-900">Pembelian Token Support</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pendukung memilih paket suara dan mengirim bukti bayar via WhatsApp Admin. Kode token langsung terbit.
            </p>
          </div>

          <div class="pt-2 flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <Smartphone class="w-4 h-4 text-emerald-500" />
            <span>Checkout Terhubung WA</span>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-8 space-y-5 shadow-xs hover:shadow-xl transition-all duration-300 relative group">
          <div class="flex items-center justify-between">
            <span class="w-12 h-12 rounded-2xl bg-slate-900 text-white font-mono font-black text-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              03
            </span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
              Langkah 3
            </span>
          </div>

          <div class="space-y-2">
            <h3 class="text-base sm:text-lg font-bold text-slate-900">Redeem & Live Leaderboard</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Voter memasukkan kode token di halaman voting. Perolehan suara kandidat langsung ter-update secara otomatis!
            </p>
          </div>

          <div class="pt-2 flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <Trophy class="w-4 h-4 text-amber-500" />
            <span>Update Skor Real-Time</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Zap, Building2, Smartphone, Trophy } from 'lucide-vue-next'
</script>
