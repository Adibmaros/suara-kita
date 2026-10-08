<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
    <div class="text-center mb-8 sm:mb-12 space-y-2">
      <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
        Keunggulan Utama
      </span>
      <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
        Kenapa Menggunakan SuaraKita?
      </h2>
      <p class="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
        Solusi pemungutan suara digital yang aman, akurat, dan transparan untuk instansi, organisasi, dan komunitas.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <!-- Card 1: Key Token Security -->
      <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <KeyRound class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 leading-snug">
            Token Akses Unik & Sekali Pakai
          </h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Setiap pemilih menggunakan kode token unik rahasia. Sistem memastikan satu token hanya dapat digunakan tepat satu kali (*one-time redeem*), mencegah *double voting*.
          </p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-600">
          <ShieldCheck class="w-4 h-4" />
          <span>Keamanan Suara Terjamin</span>
        </div>
      </div>

      <!-- Card 2: Real-time Leaderboard -->
      <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
            <BarChart3 class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 leading-snug">
            Leaderboard Live Real-Time
          </h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Pantau perolehan suara secara langsung detik demi detik dengan grafik transparan yang dapat diakses publik secara terbuka.
          </p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-600">
          <Activity class="w-4 h-4" />
          <span>Update Data Tanpa Delay</span>
        </div>
      </div>

      <!-- Card 3: WhatsApp Distribution -->
      <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageSquareCheck class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 leading-snug">
            Kemudahan Verifikasi WhatsApp
          </h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Pengiriman dan verifikasi token dilakukan dengan mudah melalui WhatsApp Admin Instansi tanpa kerumitan alur pendaftaran ulang.
          </p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
          <CheckCircle2 class="w-4 h-4 text-emerald-600" />
          <span>Praktis & Aksesibel</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { KeyRound, ShieldCheck, BarChart3, Activity, MessageSquareCheck, CheckCircle2 } from 'lucide-vue-next'
</script>
