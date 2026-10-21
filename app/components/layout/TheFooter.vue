<template>
  <footer class="bg-[#141414] text-white rounded-t-3xl pt-16 pb-12 px-6 sm:px-10 mt-16 sm:mt-24">
    <div class="max-w-5xl mx-auto space-y-12 sm:space-y-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <!-- Col 1: Brand Info -->
        <div class="space-y-4 sm:col-span-2 md:col-span-1">
          <NuxtLink to="/" class="inline-flex items-center space-x-2.5 group">
            <div class="w-8 h-8 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <img 
                src="/logo%20aplikasi%20transparant.png" 
                alt="SuaraKita Logo" 
                class="w-full h-full object-contain" 
              />
            </div>
            <span class="text-xl font-bold tracking-tight text-white">
              SuaraKita<span class="text-[#0066ff]">.</span>
            </span>
          </NuxtLink>
          <p class="text-xs text-[#adadad] leading-relaxed">
            Platform e-voting & polling berbasis token unik sekali pakai untuk ormawa, instansi, dan komunitas.
          </p>
        </div>

        <!-- Col 2: Platform Links -->
        <div class="space-y-3">
          <h4 class="text-xs font-semibold text-white">Platform</h4>
          <ul class="space-y-2 text-xs text-[#adadad]">
            <li>
              <NuxtLink to="/" class="hover:text-white transition-colors">Beranda</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/panduan" class="hover:text-white transition-colors">Panduan & Manual Book</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/register" class="hover:text-white transition-colors">Daftarkan Instansi</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/login" class="hover:text-white transition-colors">Masuk Dashboard</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 3: Layanan -->
        <div class="space-y-3">
          <h4 class="text-xs font-semibold text-white">Fitur</h4>
          <ul class="space-y-2 text-xs text-[#adadad]">
            <li><span>Token Sekali Pakai</span></li>
            <li><span>Live Leaderboard</span></li>
            <li><span>Verifikasi WhatsApp</span></li>
            <li><span>Multi-Tenant Komunitas</span></li>
          </ul>
        </div>

        <!-- Col 4: Legal -->
        <div class="space-y-3">
          <h4 class="text-xs font-semibold text-white">Legalitas</h4>
          <ul class="space-y-2 text-xs text-[#adadad]">
            <li>
              <NuxtLink to="/syarat-ketentuan" class="hover:text-white transition-colors">Syarat & Ketentuan</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/kebijakan-privasi" class="hover:text-white transition-colors">Kebijakan Privasi</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/kebijakan-token" class="hover:text-white transition-colors">Kebijakan Token</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#707070]">
        <div>
          &copy; {{ new Date().getFullYear() }} SuaraKita. Hak cipta dilindungi.
        </div>
        <div class="flex items-center space-x-4">
          <NuxtLink to="/kebijakan-privasi" class="hover:text-[#adadad] transition-colors">Privasi</NuxtLink>
          <span>•</span>
          <NuxtLink to="/syarat-ketentuan" class="hover:text-[#adadad] transition-colors">Syarat & Ketentuan</NuxtLink>
          <span>•</span>
          <NuxtLink to="/kebijakan-token" class="hover:text-[#adadad] transition-colors">Token</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
