<template>
  <section id="faq" class="max-w-4xl mx-auto px-4 sm:px-6">
    <div class="text-center space-y-3 mb-10 sm:mb-14">
      <div class="inline-flex items-center space-x-2 text-xs font-semibold text-[#707070] bg-[#f3f3f3] px-3.5 py-1 rounded-full border border-[#e0e0e0]">
        <HelpCircle class="w-3.5 h-3.5 text-[#141414]" />
        <span>Tanya Jawab</span>
      </div>
      <h2 class="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight">
        Pertanyaan yang sering diajukan.
      </h2>
      <p class="text-sm font-light text-[#707070] max-w-xl mx-auto">
        Jawaban atas pertanyaan umum seputar pendaftaran, sistem voting, dan kepatuhan operasional SuaraKita.
      </p>
    </div>

    <!-- Accordion List (Mobbin faq-row) -->
    <div class="space-y-3">
      <div 
        v-for="(item, idx) in faqs" 
        :key="idx"
        class="bg-[#f3f3f3] rounded-2xl overflow-hidden transition-all duration-200 border border-transparent hover:border-[#e0e0e0]"
      >
        <button 
          @click="toggleFAQ(idx)"
          class="w-full text-left p-5 flex items-center justify-between font-semibold text-sm sm:text-base text-[#141414] focus:outline-none cursor-pointer"
        >
          <span class="pr-4">{{ item.q }}</span>
          <ChevronDown 
            class="w-5 h-5 text-[#707070] shrink-0 transition-transform duration-300"
            :class="{ 'rotate-180 text-[#141414]': openIdx === idx }"
          />
        </button>

        <div 
          v-show="openIdx === idx"
          class="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#707070] leading-relaxed border-t border-[#e8e8e8]"
        >
          {{ item.a }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HelpCircle, ChevronDown } from 'lucide-vue-next'

const openIdx = ref<number | null>(0)

const toggleFAQ = (idx: number) => {
  openIdx.value = openIdx.value === idx ? null : idx
}

const faqs = [
  {
    q: 'Apakah mendaftar instansi di SuaraKita berbayar?',
    a: 'Tidak. Pendaftaran instansi sepenuhnya gratis tanpa biaya pendaftaran awal atau subscription bulanan. SuaraKita hanya mengambil bagian komisi platform dari total token dukungan yang terjual.'
  },
  {
    q: 'Bagaimana proses approval pendaftaran instansi?',
    a: 'Setelah formulir registrasi dikirim, tim Super Admin SuaraKita akan meninjau kelayakan instansi Anda dalam 1×24 jam. Akun Anda akan berstatus AKTIF setelah disetujui.'
  },
  {
    q: 'Apakah voter/pendukung harus membuat akun untuk memilih?',
    a: 'Tidak perlu. Pendukung dapat memilih secara langsung di URL kontes publik instansi Anda cukup dengan membeli paket token via WhatsApp dan memasukkan kode token unik.'
  },
  {
    q: 'Bagaimana alur pembayaran token oleh voter?',
    a: 'Voter memilih paket token di web → otomatis membuat draf pesan WhatsApp ke admin instansi → voter melakukan transfer manual ke kas instansi → admin memverifikasi di dashboard → sistem terbitkan kode token unik.'
  },
  {
    q: 'Apakah pendukung boleh membeli token berkali-kali?',
    a: 'Boleh. Dalam konsep kontes populer berbayar (multi-vote), pendukung diperbolehkan membeli token lagi untuk menambah jumlah suara dukungan bagi kandidat favoritnya.'
  },
  {
    q: 'Apakah token bisa dikembalikan (refund)?',
    a: 'Tidak. Kode token bersifat sekali pakai dan non-refundable setelah diterbitkan. Ketentuan ini tertera secara jelas sebelum pembelian.'
  },
  {
    q: 'Apakah hasil voting dapat dimanipulasi?',
    a: 'Tidak. Kode token dibuat secara acak dan unik oleh sistem. Suara hanya bertambah jika token yang sah dan belum terpakai dimasukkan. Leaderboard ter-update secara real-time dan transparan.'
  }
]
</script>
