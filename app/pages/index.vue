<template>
  <div class="space-y-24 sm:space-y-36 pb-20 sm:pb-32">
    <!-- Hero Section -->
    <section class="relative pt-8 sm:pt-16 pb-8 sm:pb-12 overflow-hidden">
      <!-- Background Ambient Glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-slate-100/80 via-slate-50/50 to-transparent blur-3xl -z-10 pointer-events-none"></div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
        <!-- SaaS Badge -->
        <div class="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-sm hover:bg-slate-800 transition-colors">
          <span class="flex h-2 w-2 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>SaaS E-Voting & Polling Platform</span>
        </div>

        <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight max-w-4xl mx-auto">
          Sistem E-Voting Token Real-Time untuk Instansi & Event
        </h1>

        <p class="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Kelola kontes pemilihan, voting berbayar via WhatsApp, dan pantau perolehan suara secara <span class="text-slate-900 font-semibold underline decoration-emerald-500/50 underline-offset-4">real-time & 100% transparan</span>.
        </p>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-2 max-w-md mx-auto sm:max-w-none">
          <NuxtLink to="/register" class="inline-flex items-center justify-center space-x-2 px-7 h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
            <span>Daftarkan Instansi Anda</span>
            <ArrowRight class="w-4 h-4" />
          </NuxtLink>
          <NuxtLink to="/login" class="inline-flex items-center justify-center px-7 h-12 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl transition-all duration-200 border border-slate-200/90 shadow-2xs hover:border-slate-300 active:scale-98">
            Masuk ke App
          </NuxtLink>
        </div>

        <!-- SaaS Product Interactive Preview Showcase -->
        <div class="pt-8 sm:pt-12">
          <div class="relative mx-auto max-w-4xl rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-3 sm:p-4 shadow-2xl">
            <!-- Window header mockup -->
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 px-2 mb-3">
              <div class="flex items-center space-x-2">
                <span class="w-3 h-3 rounded-full bg-rose-400"></span>
                <span class="w-3 h-3 rounded-full bg-amber-400"></span>
                <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
              </div>
              <div class="text-[11px] font-mono text-slate-500 bg-slate-100/80 px-3 py-1 rounded-md border border-slate-200/60 flex items-center space-x-1.5">
                <Lock class="w-3 h-3 text-slate-400" />
                <span>app.suarakita.com/live-leaderboard</span>
              </div>
              <div class="w-12"></div>
            </div>

            <!-- Preview Card Body: Live Leaderboard Mockup -->
            <div class="bg-slate-50/70 rounded-xl p-4 sm:p-6 space-y-4 text-left border border-slate-100">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                <div>
                  <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Polling • BEM FIKOM 2026</span>
                  <h3 class="text-base sm:text-lg font-bold text-slate-900">Pemilihan Duta Kampus Favorit</h3>
                </div>
                <div class="inline-flex items-center space-x-2 bg-emerald-100/80 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full w-fit">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>Voting Berlangsung</span>
                </div>
              </div>

              <!-- Leaderboard Candidates Rows -->
              <div class="space-y-3 pt-1">
                <!-- Rank 1 -->
                <div class="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-4 flex items-center justify-between shadow-2xs hover:border-slate-300 transition-colors">
                  <div class="flex items-center space-x-3">
                    <span class="w-6 font-mono font-bold text-slate-900 text-sm">#1</span>
                    <div class="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      A
                    </div>
                    <div>
                      <h4 class="text-xs sm:text-sm font-bold text-slate-900">Ahmad Subagja & Tim</h4>
                      <p class="text-[11px] text-slate-400">FIKOM • Paslon 01</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-xs sm:text-sm font-extrabold text-slate-900">1,420 Suara</span>
                    <div class="w-24 sm:w-40 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div class="h-full bg-slate-900 rounded-full w-[62%]"></div>
                    </div>
                  </div>
                </div>

                <!-- Rank 2 -->
                <div class="bg-white border border-slate-200/80 rounded-xl p-3 sm:p-4 flex items-center justify-between shadow-2xs">
                  <div class="flex items-center space-x-3">
                    <span class="w-6 font-mono font-bold text-slate-400 text-sm">#2</span>
                    <div class="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                      B
                    </div>
                    <div>
                      <h4 class="text-xs sm:text-sm font-bold text-slate-900">Siti Rahma & Partner</h4>
                      <p class="text-[11px] text-slate-400">FASILKOM • Paslon 02</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-xs sm:text-sm font-extrabold text-slate-600">850 Suara</span>
                    <div class="w-24 sm:w-40 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div class="h-full bg-slate-400 rounded-full w-[38%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Fitur Utama: Asymmetric Bento Box Layout -->
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

    <!-- Cara Kerja: Interactive Step Workflow Process -->
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

    <!-- Bottom Banner CTA -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div class="max-w-2xl mx-auto space-y-3 relative z-10">
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Siap Menyelenggarakan Voting Transparan?</h2>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Bergabunglah dengan puluhan instansi dan panitia event yang mempercayakan pemungutan suara mereka pada SuaraKita.
          </p>
        </div>

        <div class="pt-2 relative z-10">
          <NuxtLink to="/register" class="inline-flex items-center space-x-2 px-8 h-12 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
            <span>Mulai Sekarang — Gratis</span>
            <ArrowRight class="w-4 h-4 text-slate-900" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { 
  KeyRound, 
  MessageSquareCheck, 
  BarChart3, 
  ArrowRight, 
  Lock, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Building2, 
  Smartphone, 
  Trophy 
} from 'lucide-vue-next'

definePageMeta({
  layout: 'default',
})
</script>


