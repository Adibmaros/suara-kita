<template>
  <section class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-slate-200/80 pb-6 gap-4">
      <div class="space-y-2">
        <div class="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <Sparkles class="w-4 h-4 text-emerald-500" />
          <span>Kapabilitas Platform</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Fitur Utama SuaraKita</h2>
      </div>
      <p class="text-xs sm:text-sm text-slate-500 max-w-md">
        Dirancang khusus untuk mendukung fleksibilitas pemungutan suara skala kecil hingga event berskala besar.
      </p>
    </div>

    <!-- Bento Grid (Different Card Styles) -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <!-- Feature 1: Large Featured Card -->
      <div class="md:col-span-7 bg-slate-900 text-white rounded-3xl p-7 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden group shadow-xl">
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-slate-800 rounded-full blur-2xl opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
        
        <div class="space-y-4 relative z-10">
          <div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-emerald-400">
            <KeyRound class="w-6 h-6" />
          </div>
          <span class="inline-block text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-full">
            Keamanan Terjamin
          </span>
          <h3 class="text-xl sm:text-2xl font-extrabold text-white">Token-Based Voting & Akses Unik</h3>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
            Setiap pemilih menggunakan kode unik token 8 karakter. Sistem memastikan satu token hanya dapat digunakan tepat satu kali (*one-time redeem*), mencegah *double voting* maupun manipulasi data.
          </p>
        </div>

        <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 relative z-10">
          <span class="flex items-center space-x-2">
            <CheckCircle2 class="w-4 h-4 text-emerald-400" />
            <span>Otomatis Non-aktif setelah Redeem</span>
          </span>
          <span class="font-mono text-[11px] text-slate-500">SEC-8BIT</span>
        </div>
      </div>

      <!-- Feature 2: Side Card (WhatsApp Integration) -->
      <div class="md:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-9 flex flex-col justify-between space-y-6 shadow-xs hover:border-slate-300 transition-all duration-300">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageSquareCheck class="w-6 h-6" />
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-slate-900">Integrasi WhatsApp Fast Checkout</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Pendukung dapat memilih paket token voting dan secara otomatis terhubung langsung ke WhatsApp Admin Instansi untuk pengiriman bukti transfer.
          </p>
        </div>

        <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center space-x-3">
          <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <MessageSquareCheck class="w-4 h-4" />
          </div>
          <p class="text-[11px] font-medium text-slate-600">
            "Halo Admin, saya ingin beli 10 Token Suara untuk Paslon 01."
          </p>
        </div>
      </div>

      <!-- Feature 3: Analytics Card (Full Width Row) -->
      <div class="md:col-span-12 bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200/90 rounded-3xl p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xs">
        <div class="space-y-3 max-w-xl">
          <div class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
            <BarChart3 class="w-6 h-6" />
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-slate-900">Real-Time Analytics & Financial Report</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Pantau arus perolehan suara, total pendapatan dari penjualan token dukungan, serta rincian bagian instansi secara transparan tanpa perlu rekap manual.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
          <div class="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-2xs min-w-[130px]">
            <span class="block text-xl font-black text-slate-900">100%</span>
            <span class="text-[11px] font-medium text-slate-500">Transparansi</span>
          </div>
          <div class="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-2xs min-w-[130px]">
            <span class="block text-xl font-black text-emerald-600">0.0s</span>
            <span class="text-[11px] font-medium text-slate-500">Delay Update</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Sparkles, KeyRound, CheckCircle2, MessageSquareCheck, BarChart3 } from 'lucide-vue-next'
</script>
