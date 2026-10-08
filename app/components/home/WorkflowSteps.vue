<template>
  <section class="bg-slate-100/70 border-y border-slate-200/80 py-10 sm:py-16">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-8 sm:mb-12 space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
          Alur Partisipasi
        </span>
        <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          4 Langkah Mudah Berpartisipasi
        </h2>
        <p class="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Cukup menggunakan perangkat smartphone Anda, berikan suara sah dalam beberapa detik.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Step 1 -->
        <div class="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4">
          <div class="flex items-center justify-between">
            <span class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              1
            </span>
            <Vote class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">Pilih Kontes Voting</h4>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">
              Cari dan buka halaman kontes pemilihan dari instansi, komunitas, atau organisasi Anda.
            </p>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4">
          <div class="flex items-center justify-between">
            <span class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              2
            </span>
            <MessageSquare class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">Dapatkan Kode Token</h4>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">
              Hubungi Admin WA Instansi/Organisasi untuk menerima kode token voting resmi.
            </p>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4">
          <div class="flex items-center justify-between">
            <span class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              3
            </span>
            <KeyRound class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">Input Token Unik</h4>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">
              Masukkan 8 digit kode token pada bilik suara digital yang tersedia.
            </p>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4">
          <div class="flex items-center justify-between">
            <span class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              4
            </span>
            <CheckCircle2 class="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">Suara Terhitung</h4>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">
              Suara Anda resmi tercatat dan langsung memperbarui hasil di leaderboard live.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Vote, MessageSquare, KeyRound, CheckCircle2 } from 'lucide-vue-next'
</script>
