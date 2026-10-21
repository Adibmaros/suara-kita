<template>
  <section class="bg-[#f3f3f3] border-y border-[#e0e0e0] py-14 sm:py-20">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-10 sm:mb-14 space-y-3">
        <span class="text-xs font-semibold text-[#707070] bg-white px-3.5 py-1 rounded-full border border-[#e0e0e0]">
          Alur Partisipasi
        </span>
        <h2 class="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight">
          Empat langkah mudah memberikan suara.
        </h2>
        <p class="text-sm sm:text-base font-light text-[#707070] max-w-md mx-auto leading-relaxed">
          Cukup dari peramban HP Anda, berikan suara sah hanya dalam beberapa detik.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Step 1 -->
        <div class="p-6 rounded-2xl bg-white border border-[#e0e0e0] flex flex-col justify-between space-y-5">
          <div class="flex items-center justify-between">
            <span class="w-8 h-8 rounded-[30%] bg-[#141414] text-white flex items-center justify-center font-bold text-xs">
              1
            </span>
            <Vote class="w-5 h-5 text-[#141414]" />
          </div>
          <div>
            <h4 class="text-base font-bold text-[#141414]">Pilih Kontes</h4>
            <p class="text-xs text-[#707070] mt-1.5 leading-relaxed">
              Buka link publik kontes pemilihan atau ajang favorit ormawa kampus Anda.
            </p>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="p-6 rounded-2xl bg-white border border-[#e0e0e0] flex flex-col justify-between space-y-5">
          <div class="flex items-center justify-between">
            <span class="w-8 h-8 rounded-[30%] bg-[#141414] text-white flex items-center justify-center font-bold text-xs">
              2
            </span>
            <MessageSquare class="w-5 h-5 text-[#141414]" />
          </div>
          <div>
            <h4 class="text-base font-bold text-[#141414]">Beli Token via WA</h4>
            <p class="text-xs text-[#707070] mt-1.5 leading-relaxed">
              Pilih paket suara dan chat panitia via WhatsApp untuk mendapatkan kode token unik.
            </p>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="p-6 rounded-2xl bg-white border border-[#e0e0e0] flex flex-col justify-between space-y-5">
          <div class="flex items-center justify-between">
            <span class="w-8 h-8 rounded-[30%] bg-[#141414] text-white flex items-center justify-center font-bold text-xs">
              3
            </span>
            <KeyRound class="w-5 h-5 text-[#141414]" />
          </div>
          <div>
            <h4 class="text-base font-bold text-[#141414]">Masukkan Token</h4>
            <p class="text-xs text-[#707070] mt-1.5 leading-relaxed">
              Ketik kode token rahasia pada bilik suara digital kandidat pilihan Anda.
            </p>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="p-6 rounded-2xl bg-white border border-[#e0e0e0] flex flex-col justify-between space-y-5">
          <div class="flex items-center justify-between">
            <span class="w-8 h-8 rounded-[30%] bg-[#141414] text-white flex items-center justify-center font-bold text-xs">
              4
            </span>
            <CheckCircle2 class="w-5 h-5 text-[#141414]" />
          </div>
          <div>
            <h4 class="text-base font-bold text-[#141414]">Suara Terhitung</h4>
            <p class="text-xs text-[#707070] mt-1.5 leading-relaxed">
              Suara langsung terverifikasi dan memperbarui peringkat live leaderboard seketika.
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
