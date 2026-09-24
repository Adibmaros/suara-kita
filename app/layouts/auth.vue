<template>
  <div class="min-h-screen w-full bg-white text-slate-900 font-sans flex">
    <!-- Left Column: Unsplash Visual Hero Showcase (Visible on Laptop/Desktop lg screens) -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden flex-col justify-between p-12 text-white">
      <!-- Background Image with Overlay -->
      <img
        src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1600&q=80"
        alt="E-Voting SaaS Background"
        class="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-90 mix-blend-luminosity"
      />
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40"></div>

      <!-- Top Brand Logo -->
      <div class="relative z-10">
        <NuxtLink to="/" class="inline-flex items-center space-x-3 group">
          <div class="w-10 h-10 rounded-xl bg-white text-slate-900 font-extrabold text-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            S
          </div>
          <span class="text-xl font-black tracking-tight text-white">SuaraKita<span class="text-emerald-400">.</span></span>
        </NuxtLink>
      </div>

      <!-- Center Showcase Content -->
      <div class="relative z-10 max-w-lg space-y-6">
        <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-300 text-xs font-semibold">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Platform E-Voting #1 Terpercaya</span>
        </div>

        <h1 class="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
          Kelola Pemungutan Suara Berbasis Token dengan 100% Transparansi.
        </h1>

        <p class="text-sm text-slate-300 leading-relaxed">
          Sistem e-voting modern untuk institusi pendidikan, organisasi masyarakat, dan event berskala nasional.
        </p>

        <!-- Testimonial Quote Pill -->
        <div class="pt-4">
          <div class="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-xs text-slate-200 space-y-2">
            <p class="italic">"SuaraKita mempermudah seluruh proses pemilihan BEM di kampus kami. Real-time leaderboard & checkout via WA sangat praktis!"</p>
            <div class="font-bold text-white text-[11px]">— Panitia Pemilu Kampus FIKOM</div>
          </div>
        </div>
      </div>

      <!-- Bottom Footer Info -->
      <div class="relative z-10 text-xs text-slate-400 flex items-center justify-between border-t border-white/10 pt-6">
        <span>© {{ new Date().getFullYear() }} SuaraKita. All rights reserved.</span>
        <NuxtLink to="/" class="hover:text-white transition-colors">Kembali ke Beranda</NuxtLink>
      </div>
    </div>

    <!-- Right Column: Form Container -->
    <div class="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 overflow-y-auto bg-slate-50/50">
      <!-- Mobile Top Header Logo -->
      <div class="lg:hidden flex items-center justify-between pb-6">
        <NuxtLink to="/" class="inline-flex items-center space-x-2">
          <div class="w-8 h-8 rounded-lg bg-slate-900 text-white font-extrabold text-base flex items-center justify-center">
            S
          </div>
          <span class="text-lg font-black text-slate-900">SuaraKita</span>
        </NuxtLink>
        <NuxtLink to="/" class="text-xs text-slate-500 font-semibold hover:text-slate-900">
          Beranda
        </NuxtLink>
      </div>

      <!-- Main Slot Content (Login / Register Form) -->
      <div class="w-full max-w-xl xl:max-w-2xl mx-auto my-auto py-6 sm:py-10">
        <slot />
      </div>

      <!-- Footer links for mobile -->
      <div class="lg:hidden text-center text-xs text-slate-400 pt-6 border-t border-slate-200/60">
        © {{ new Date().getFullYear() }} SuaraKita Platform
      </div>
    </div>
  </div>
</template>
