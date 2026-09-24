<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Admin Instansi</h1>
        <p class="text-xs text-slate-500 mt-1">Ringkasan statistik kontes & pendapatan instansi Anda</p>
      </div>

      <NuxtLink to="/admin/kontes/buat" class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors shadow-xs">
        + Buat Kontes Baru
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-slate-500 text-sm">Memuat statistik...</div>

    <div v-else-if="stats" class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between shadow-2xs">
          <div>
            <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Kontes</p>
            <h4 class="text-2xl font-bold text-slate-900 mt-1">{{ stats.totalKontes }}</h4>
            <p class="text-xs text-slate-500 mt-1">Kontes terdaftar</p>
          </div>
          <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-900">
            <Trophy class="w-5 h-5" />
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between shadow-2xs">
          <div>
            <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Menunggu Verifikasi</p>
            <h4 class="text-2xl font-bold text-slate-900 mt-1">{{ stats.pendingOrdersCount }}</h4>
            <p class="text-xs text-slate-500 mt-1">Order token dari voter</p>
          </div>
          <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-amber-50 border border-amber-200 text-amber-700">
            <Clock class="w-5 h-5" />
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between shadow-2xs">
          <div>
            <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Omset Penjualan</p>
            <h4 class="text-2xl font-bold text-slate-900 mt-1">Rp {{ stats.totalPendapatan.toLocaleString('id-ID') }}</h4>
            <p class="text-xs text-slate-500 mt-1">Total pendapatan kotor</p>
          </div>
          <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-emerald-50 border border-emerald-200 text-emerald-700">
            <TrendingUp class="w-5 h-5" />
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between shadow-2xs">
          <div>
            <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Potongan Komisi ({{ stats.persenKomisi }}%)</p>
            <h4 class="text-2xl font-bold text-slate-900 mt-1">Rp {{ stats.totalPlatformFee.toLocaleString('id-ID') }}</h4>
            <p class="text-xs text-slate-500 mt-1">Bagi hasil platform</p>
          </div>
          <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-rose-50 border border-rose-200 text-rose-700">
            <Percent class="w-5 h-5" />
          </div>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div>
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimasi Pendapatan Bersih Instansi</span>
          <h3 class="text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Rp {{ stats.pendapatanBersih.toLocaleString('id-ID') }}
          </h3>
          <p class="text-xs text-slate-500 mt-1">
            (Total Omset Kotor Rp {{ stats.totalPendapatan.toLocaleString('id-ID') }} dikurangi Komisi Platform {{ stats.persenKomisi }}% Rp {{ stats.totalPlatformFee.toLocaleString('id-ID') }})
          </p>
        </div>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col justify-between">
        <div>
          <h3 class="text-base font-semibold text-slate-900">Kelola Kontes</h3>
          <p class="text-xs text-slate-500 mt-0.5">Buat, edit, atau lihat daftar kontes</p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
          <NuxtLink to="/admin/kontes" class="inline-flex items-center justify-center px-3 h-8 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-xs rounded-md transition-colors">
            Buka Kelola Kontes
          </NuxtLink>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col justify-between">
        <div>
          <h3 class="text-base font-semibold text-slate-900">Profil Instansi</h3>
          <p class="text-xs text-slate-500 mt-0.5">Atur nama instansi dan nomor WhatsApp admin</p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
          <NuxtLink to="/admin/profil" class="inline-flex items-center justify-center px-3 h-8 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-xs rounded-md transition-colors">
            Edit Profil Instansi
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trophy, Clock, TrendingUp, Percent } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const { data: stats, pending } = await useFetch('/api/admin/stats')
</script>
