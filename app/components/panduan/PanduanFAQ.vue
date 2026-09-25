<template>
  <section id="faq" class="max-w-4xl mx-auto px-4 sm:px-6">
    <div class="text-center space-y-3 mb-10 sm:mb-12">
      <div class="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3.5 py-1 rounded-full border border-cyan-200/80">
        <HelpCircle class="w-3.5 h-3.5 text-cyan-600" />
        <span>Tanya Jawab</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Pertanyaan yang Sering Diajukan</h2>
      <p class="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
        Jawaban atas pertanyaan umum seputar pendaftaran, sistem voting, dan kepatuhan operasional SuaraKita.
      </p>
    </div>

    <!-- Accordion List -->
    <div class="space-y-3">
      <div 
        v-for="(item, idx) in faqs" 
        :key="idx"
        class="bg-white border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
      >
        <button 
          @click="toggleFAQ(idx)"
          class="w-full text-left p-5 flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-700 transition-colors focus:outline-none"
        >
          <span class="pr-4">{{ item.q }}</span>
          <ChevronDown 
            class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300"
            :class="{ 'rotate-180 text-emerald-600': openIdx === idx }"
          />
        </button>

        <div 
          v-show="openIdx === idx"
          class="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50"
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
    a: 'Tidak. Pendaftaran instansi sepenuhnya gratis tanpa biaya pendaftaran awal atau subscription harian/bulanan. SuaraKita hanya mengambil bagian komisi 20% dari total penjualan token dukungan.'
  },
  {
    q: 'Bagaimana proses approval pendaftaran instansi?',
    a: 'Setelah formulir registrasi dikirim, tim Super Admin SuaraKita akan meninjau kelayakan instansi Anda dalam 1×24 jam. Akun Anda akan berstatus AKTIF setelah diapprove.'
  },
  {
    q: 'Apakah voter/pendukung harus membuat akun untuk memilih?',
    a: 'Tidak perlu. Pendukung dapat memilih secara langsung di URL kontes publik instansi Anda cukup dengan membeli paket token via WhatsApp dan memasukkan kode token unik.'
  },
  {
    q: 'Bagaimana alur pembayaran token oleh voter?',
    a: 'Voter memilih paket token di web → otomatis membuat draf pesan WhatsApp ke admin instansi → voter melakukan transfer manual ke rekening instansi → admin memverifikasi bayar di dashboard → sistem terbitkan kode token unik.'
  },
  {
    q: 'Apakah pendukung boleh membeli token berkali-kali?',
    a: 'Boleh. Dalam konsep kontes populer berbayar (multi-vote), pendukung diperbolehkan membeli token lagi untuk menambah jumlah suara dukungan bagi kandidat favoritnya.'
  },
  {
    q: 'Apakah token bisa dikembalikan (refund)?',
    a: 'Tidak. Kode token bersifat sekali pakai dan non-refundable setelah diterbitkan. Ketentuan ini tertera secara jelas sebelum checkout.'
  },
  {
    q: 'Bagaimana jika event saya memiliki beberapa babak (misal Penyisihan & Grand Final)?',
    a: 'Anda dapat membuat beberapa kontes terpisah berurutan. Di babak berikutnya, Anda cukup menginput kandidat finalis secara manual. Token pada tiap babak bersifat independen.'
  },
  {
    q: 'Kapan komisi 20% platform dibayarkan ke SuaraKita?',
    a: 'Karena dana hasil penjualan token dipegang langsung oleh instansi Anda, rekapitulasi komisi 20% platform dilakukan secara berkala melalui menu rekapitulasi komisi yang dikelola Super Admin.'
  },
  {
    q: 'Apakah hasil voting dapat dimanipulasi?',
    a: 'Tidak. Kode token dibuat secara acak dan unik oleh sistem. Suara hanya bertambah jika token yang sah dan belum terpakai dimasukkan. Leaderboard ter-update secara real-time dan transparan.'
  },
  {
    q: 'Apakah nantinya akan ada otomatisasi pembayaran (Payment Gateway)?',
    a: 'Ya! Pada pengemabngan Fase 2 mendatang, SuaraKita akan menyediakan integrasi Payment Gateway otomatis (QRIS, E-Wallet, & Virtual Account) untuk pengalaman checkout yang lebih praktis.'
  }
]
</script>
