<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Card 1: Total Omset Platform -->
    <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
      <div>
        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Omset Platform</p>
        <h4 class="text-xl font-extrabold text-slate-900 mt-1">Rp {{ totalOmset.toLocaleString('id-ID') }}</h4>
        <p class="text-[11px] text-slate-500 mt-1">Seluruh penjualan token</p>
      </div>
      <div class="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center shrink-0 shadow-xs">
        <TrendingUp class="w-5 h-5" />
      </div>
    </div>

    <!-- Card 2: Total Pendapatan Komisi Platform -->
    <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
      <div>
        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Komisi Platform</p>
        <h4 class="text-xl font-extrabold text-blue-600 mt-1">Rp {{ totalKomisi.toLocaleString('id-ID') }}</h4>
        <p class="text-[11px] text-slate-500 mt-1">Pendapatan bersih platform</p>
      </div>
      <div class="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shrink-0 shadow-xs">
        <Wallet class="w-5 h-5" />
      </div>
    </div>

    <!-- Card 3: Total Order Verified -->
    <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
      <div>
        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Order Diverifikasi</p>
        <h4 class="text-xl font-extrabold text-slate-900 mt-1">{{ totalOrders }} Order</h4>
        <p class="text-[11px] text-slate-500 mt-1">Transaksi token valid</p>
      </div>
      <div class="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/80 flex items-center justify-center shrink-0 shadow-xs">
        <CheckCircle2 class="w-5 h-5" />
      </div>
    </div>

    <!-- Card 4: Top Kontributor -->
    <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
      <div>
        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Kontributor</p>
        <h4 class="text-sm font-bold text-slate-900 mt-1 truncate max-w-[140px]" :title="topInstansi.nama">{{ topInstansi.nama }}</h4>
        <p class="text-[11px] text-amber-600 font-semibold mt-1">Komisi: Rp {{ topInstansi.komisi.toLocaleString('id-ID') }}</p>
      </div>
      <div class="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center shrink-0 shadow-xs">
        <Trophy class="w-5 h-5" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrendingUp, Wallet, CheckCircle2, Trophy } from 'lucide-vue-next'

defineProps<{
  totalOmset: number
  totalKomisi: number
  totalOrders: number
  topInstansi: { nama: string; komisi: number }
}>()
</script>
