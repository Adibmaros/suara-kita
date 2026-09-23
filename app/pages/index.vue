<template>
  <div class="space-y-24 pb-20">
    <!-- Hero Section -->
    <section class="relative pt-16 pb-12 overflow-hidden">
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="max-w-5xl mx-auto px-4 text-center space-y-8 relative z-10">
        <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <span>🎉 SuaraKita v2 — Platform Polling Berbasis Token</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Adakan Kontes Populer & Raih Dukungan Pendukung Tanpa Biaya di Muka
        </h1>

        <p class="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Instansi mendaftar <span class="text-white font-semibold">gratis 100%</span>. Monetisasi transparan dari pembelian token vote oleh pendukung melalui WhatsApp.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <NuxtLink to="/register">
            <UiButton size="lg" variant="primary">
              Daftarkan Instansi Anda Gratis
            </UiButton>
          </NuxtLink>
          <NuxtLink to="/login">
            <UiButton size="lg" variant="secondary">
              Masuk Dashboard Admin
            </UiButton>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="max-w-6xl mx-auto px-4">
      <div class="text-center space-y-3 mb-16">
        <h2 class="text-3xl font-bold text-white font-heading">Cara Kerja SuaraKita v2</h2>
        <p class="text-slate-400">3 Langkah Mudah Menyelenggarakan Kontes</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <UiCard class="text-center space-y-4">
          <div class="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xl mx-auto font-heading border border-indigo-500/20">
            1
          </div>
          <h3 class="text-xl font-bold text-white font-heading">Instansi Daftar Gratis</h3>
          <p class="text-sm text-slate-400">
            Admin instansi buat kontes, input kandidat, dan atur paket token dukungan sesuka hati.
          </p>
        </UiCard>

        <UiCard class="text-center space-y-4">
          <div class="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold text-xl mx-auto font-heading border border-violet-500/20">
            2
          </div>
          <h3 class="text-xl font-bold text-white font-heading">Voter Beli Token via WA</h3>
          <p class="text-sm text-slate-400">
            Pendukung pilih paket token, kirim bukti bayar via WhatsApp admin instansi, dan dapatkan kode token unik.
          </p>
        </UiCard>

        <UiCard class="text-center space-y-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xl mx-auto font-heading border border-emerald-500/20">
            3
          </div>
          <h3 class="text-xl font-bold text-white font-heading">Redeem & Live Leaderboard</h3>
          <p class="text-sm text-slate-400">
            Voter memasukkan kode token untuk mendukung kandidat favorit. Perolehan suara dihitung real-time!
          </p>
        </UiCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
