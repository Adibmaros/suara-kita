<template>
  <section id="bisnis" class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800">
      <div class="text-center space-y-3 mb-10 relative z-10">
        <div class="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-800/60">
          <Coins class="w-3.5 h-3.5 text-emerald-400" />
          <span>Tanpa Risiko Finansial</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-black tracking-tight">Model Bisnis & Alur Keuangan</h2>
        <p class="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          SuaraKita menerapkan skema berbasis bagi hasil penjualan token. Instansi tidak membayar subscription fee di awal.
        </p>
      </div>

      <!-- Financial Flow Visual Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-8">
        <div class="bg-slate-800/60 border border-slate-700/70 rounded-2xl p-6 space-y-3 text-center hover:bg-slate-800 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
            01
          </div>
          <h3 class="font-bold text-base text-white">Daftar & Pakai Gratis</h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            Instansi bebas mendaftar dan membuat kontes tanpa biaya langganan, DP, atau biaya pemeliharaan sistem.
          </p>
        </div>

        <div class="bg-slate-800/60 border border-slate-700/70 rounded-2xl p-6 space-y-3 text-center hover:bg-slate-800 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
            02
          </div>
          <h3 class="font-bold text-base text-white">Dana Langsung ke Instansi</h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            Pembelian token dikirim langsung ke rekening instansi Anda. SuaraKita tidak menampung dana pihak ketiga.
          </p>
        </div>

        <div class="bg-slate-800/60 border border-slate-700/70 rounded-2xl p-6 space-y-3 text-center hover:bg-slate-800 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
            03
          </div>
          <h3 class="font-bold text-base text-white">Platform Fee 20%</h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            Setiap transaksi terverifikasi otomatis mencatat 20% sebagai komisi platform yang direkapitulasi secara periodik.
          </p>
        </div>
      </div>

      <!-- Highlight Banner -->
      <div class="bg-emerald-950/60 border border-emerald-800/80 rounded-2xl p-4 sm:p-5 text-center relative z-10">
        <p class="text-xs sm:text-sm text-emerald-200 font-medium">
          💡 <span class="font-bold text-white">Contoh:</span> Jika instansi Anda berhasil menjual token sebesar <span class="text-emerald-400 font-bold">Rp1.000.000</span>, kas instansi memperoleh <span class="text-emerald-400 font-bold">Rp800.000</span> (80%) dan komisi platform SuaraKita sebesar <span class="text-emerald-400 font-bold">Rp200.000</span> (20%).
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Coins } from 'lucide-vue-next'
</script>
