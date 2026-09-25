<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
    <!-- Voter Navbar Minimal -->
    <header class="sticky top-0 z-50 w-full px-4 sm:px-8 py-3">
      <div class="max-w-7xl mx-auto">
        <nav class="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs hover:shadow-md transition-shadow duration-300">
          <!-- Logo Brand -->
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div class="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-extrabold text-sm shadow-md group-hover:scale-105 transition-transform duration-200">
              SK
            </div>
            <span class="text-lg font-bold tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
              SuaraKita
            </span>
          </NuxtLink>

          <!-- Voting Context Badge -->
          <div class="flex items-center space-x-2 text-xs font-semibold text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/60">
            <span>🗳️</span>
            <span>Halaman Voting</span>
          </div>
        </nav>
      </div>
    </header>

    <!-- Content Slot -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Voter Footer Compact -->
    <footer class="border-t border-slate-200/80 bg-white px-4 sm:px-6 lg:px-8 mt-12">
      <div class="max-w-7xl mx-auto">
        <!-- Soft CTA / Promotion -->
        <div class="py-6 sm:py-8 text-center space-y-3">
          <p class="text-sm font-medium text-slate-600">
            Ingin membuat kontes & polling online untuk instansi Anda?
          </p>
          <NuxtLink 
            to="/register" 
            class="inline-flex items-center px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 space-x-1.5"
          >
            <span>Daftarkan Instansi Anda →</span>
          </NuxtLink>
        </div>

        <!-- Bottom Bar -->
        <div class="py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div class="flex items-center space-x-2">
            <div class="w-5 h-5 rounded bg-slate-900 flex items-center justify-center text-white font-extrabold text-[9px]">
              SK
            </div>
            <span>Powered by <strong class="text-slate-600 font-semibold">SuaraKita</strong></span>
            <span>• &copy; {{ new Date().getFullYear() }}</span>
          </div>
          <div class="flex items-center space-x-3">
            <NuxtLink to="/kebijakan-privasi" class="hover:text-slate-600 transition-colors">Kebijakan Privasi</NuxtLink>
            <span>•</span>
            <NuxtLink to="/syarat-ketentuan" class="hover:text-slate-600 transition-colors">Syarat & Ketentuan</NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
