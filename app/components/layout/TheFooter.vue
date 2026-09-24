<template>
  <footer class="border-t border-slate-200/80 bg-white pt-12 sm:pt-16 pb-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-10 sm:space-y-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
        <!-- Col 1: Brand Info -->
        <div class="space-y-4 md:col-span-1">
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div class="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-extrabold text-xs shadow-md">
              SK
            </div>
            <span class="text-base font-bold tracking-tight text-slate-900">
              SuaraKita
            </span>
          </NuxtLink>
          <p class="text-xs text-slate-500 leading-relaxed">
            Platform kontes & polling online berbasis token transparan untuk instansi, organisasi, dan sekolah.
          </p>
        </div>

        <!-- Col 2: Platform Links -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Platform</h4>
          <ul class="space-y-2 text-xs text-slate-500">
            <li><NuxtLink to="/" class="hover:text-slate-900 transition-colors">Beranda</NuxtLink></li>
            <li><NuxtLink to="/register" class="hover:text-slate-900 transition-colors">Daftarkan Instansi</NuxtLink></li>
            <li><NuxtLink to="/login" class="hover:text-slate-900 transition-colors">Masuk Dashboard</NuxtLink></li>
          </ul>
        </div>

        <!-- Col 3: Layanan -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Layanan</h4>
          <ul class="space-y-2 text-xs text-slate-500">
            <li><span>Voting Berbasis Token</span></li>
            <li><span>Live Leaderboard</span></li>
            <li><span>Verifikasi WhatsApp</span></li>
          </ul>
        </div>

        <!-- Col 4: Keamanan & Status -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Status System</h4>
          <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Semua Sistem Normal</span>
          </div>
        </div>
      </div>

      <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          &copy; {{ new Date().getFullYear() }} SuaraKita. All rights reserved.
        </div>
        <div class="flex items-center space-x-4">
          <span>Privasi</span>
          <span>•</span>
          <span>Syarat & Ketentuan</span>
        </div>
      </div>
    </div>
  </footer>
</template>
