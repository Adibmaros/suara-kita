<template>
  <section id="bisnis" class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="bg-[#f3f3f3] border border-[#e0e0e0] rounded-3xl p-8 sm:p-14 text-[#141414] relative overflow-hidden">
      <div class="text-center space-y-3 mb-10 sm:mb-12 relative z-10">
        <div class="inline-flex items-center space-x-2 text-xs font-semibold text-[#707070] bg-white px-3.5 py-1 rounded-full border border-[#e0e0e0]">
          <Coins class="w-3.5 h-3.5 text-[#141414]" />
          <span>Tanpa Risiko Finansial</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-[#141414]">
          Model bisnis dan alur keuangan.
        </h2>
        <p class="text-sm font-light text-[#707070] max-w-xl mx-auto">
          SuaraKita menerapkan skema berbasis bagi hasil penjualan token. Instansi tidak membayar subscription fee di awal.
        </p>
      </div>

      <!-- Financial Flow Visual Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-8">
        <div class="bg-white border border-[#e0e0e0] rounded-2xl p-6 space-y-3 text-center">
          <div class="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center mx-auto text-base font-bold">
            01
          </div>
          <h3 class="font-bold text-base text-[#141414]">Daftar & Pakai Gratis</h3>
          <p class="text-xs text-[#707070] leading-relaxed">
            Instansi bebas mendaftar dan membuat kontes tanpa biaya langganan, DP, atau biaya pemeliharaan sistem di awal.
          </p>
        </div>

        <div class="bg-white border border-[#e0e0e0] rounded-2xl p-6 space-y-3 text-center">
          <div class="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center mx-auto text-base font-bold">
            02
          </div>
          <h3 class="font-bold text-base text-[#141414]">Dana Langsung ke Kas</h3>
          <p class="text-xs text-[#707070] leading-relaxed">
            Pembelian token dikirim langsung ke rekening panitia/ormawa Anda tanpa tertahan gateway pihak ketiga.
          </p>
        </div>

        <div class="bg-white border border-[#e0e0e0] rounded-2xl p-6 space-y-3 text-center">
          <div class="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center mx-auto text-base font-bold">
            03
          </div>
          <h3 class="font-bold text-base text-[#141414]">Platform Fee 20%</h3>
          <p class="text-xs text-[#707070] leading-relaxed">
            Setiap transaksi terverifikasi dicatat sebagai komisi platform yang direkapitulasi secara periodik dan transparan.
          </p>
        </div>
      </div>

      <!-- Highlight Banner -->
      <div class="bg-white border border-[#e0e0e0] rounded-2xl p-4 sm:p-5 text-center relative z-10">
        <p class="text-xs sm:text-sm text-[#141414] font-normal leading-relaxed">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0066ff] text-white mr-1.5">SIMULASI</span>
          Jika ormawa Anda mengumpulkan token senilai <strong class="text-[#141414]">Rp1.000.000</strong>, kas panitia mendapatkan <strong class="text-[#141414]">Rp800.000</strong> (80%) dan komisi platform SuaraKita sebesar <strong class="text-[#141414]">Rp200.000</strong> (20%).
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Coins } from 'lucide-vue-next'
</script>
