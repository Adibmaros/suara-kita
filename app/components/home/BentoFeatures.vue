<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <div class="text-center mb-10 sm:mb-14 space-y-3">
      <span class="text-xs font-semibold text-[#707070] bg-[#f3f3f3] px-3.5 py-1 rounded-full border border-[#e0e0e0]">
        Keunggulan Utama
      </span>
      <h2 class="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight">
        Mengapa ormawa memilih SuaraKita.
      </h2>
      <p class="text-sm sm:text-base font-light text-[#707070] max-w-lg mx-auto leading-relaxed">
        Sistem pemungutan suara digital terintegrasi yang adil, anti-manipulasi, dan mudah diakses oleh seluruh mahasiswa.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Card 1: Key Token Security -->
      <div class="p-7 rounded-3xl bg-white border border-[#e0e0e0] flex flex-col justify-between transition-all">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center">
            <KeyRound class="w-5 h-5" />
          </div>
          <h3 class="text-xl font-bold text-[#141414] leading-snug">
            Token Unik Sekali Pakai
          </h3>
          <p class="text-xs sm:text-sm text-[#707070] leading-relaxed">
            Setiap suara dilindungi kode token unik acak. Sistem memastikan satu token hanya dapat dipakai satu kali (*one-time redeem*), mencegah *multiple voting* dan kecurangan bot.
          </p>
        </div>
        <div class="mt-8 pt-4 border-t border-[#f0f0f0] flex items-center gap-2 text-xs font-semibold text-[#141414]">
          <ShieldCheck class="w-4 h-4 text-[#141414]" />
          <span>Keamanan Suara Terjamin</span>
        </div>
      </div>

      <!-- Card 2: Real-time Leaderboard -->
      <div class="p-7 rounded-3xl bg-[#f3f3f3] flex flex-col justify-between transition-all">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-[30%] bg-white text-[#141414] border border-[#e0e0e0] flex items-center justify-center">
            <BarChart3 class="w-5 h-5" />
          </div>
          <h3 class="text-xl font-bold text-[#141414] leading-snug">
            Live Leaderboard Real-Time
          </h3>
          <p class="text-xs sm:text-sm text-[#707070] leading-relaxed">
            Pantau perolehan suara detik demi detik dengan grafik transparan yang dapat disaksikan publik tanpa rekap manual yang rawan kecurigaan.
          </p>
        </div>
        <div class="mt-8 pt-4 border-t border-[#e0e0e0] flex items-center gap-2 text-xs font-semibold text-[#141414]">
          <Activity class="w-4 h-4 text-[#0066ff]" />
          <span>Update Instan Tanpa Delay</span>
        </div>
      </div>

      <!-- Card 3: WhatsApp Distribution -->
      <div class="p-7 rounded-3xl bg-white border border-[#e0e0e0] flex flex-col justify-between transition-all">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center">
            <MessageSquareCheck class="w-5 h-5" />
          </div>
          <h3 class="text-xl font-bold text-[#141414] leading-snug">
            Beli Token via WhatsApp
          </h3>
          <p class="text-xs sm:text-sm text-[#707070] leading-relaxed">
            Pemesanan dan verifikasi token dilakukan langsung ke WhatsApp panitia. Dana voting masuk langsung ke rekening kas panitia tanpa potongan payment gateway pihak ketiga.
          </p>
        </div>
        <div class="mt-8 pt-4 border-t border-[#f0f0f0] flex items-center gap-2 text-xs font-semibold text-[#141414]">
          <CheckCircle2 class="w-4 h-4 text-[#141414]" />
          <span>Dana Langsung Masuk Kas</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { KeyRound, ShieldCheck, BarChart3, Activity, MessageSquareCheck, CheckCircle2 } from 'lucide-vue-next'
</script>
