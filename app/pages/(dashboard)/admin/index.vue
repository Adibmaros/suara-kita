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
        <!-- Card 1: Total Kontes -->
        <NuxtLink 
          to="/admin/kontes" 
          class="group rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Kontes</p>
              <h4 class="text-2xl font-bold text-slate-900 mt-1">{{ stats.totalKontes }}</h4>
              <p class="text-xs text-slate-500 mt-1">Kontes terdaftar</p>
            </div>
            <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <Trophy class="w-5 h-5" />
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 group-hover:text-slate-900 font-medium">
            <span>Lihat semua kontes</span>
            <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </NuxtLink>

        <!-- Card 2: Menunggu Verifikasi -->
        <NuxtLink 
          to="/admin/kontes" 
          class="group rounded-xl border p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200"
          :class="stats.pendingOrdersCount > 0 
            ? 'border-amber-300 bg-amber-50/50 hover:border-amber-400' 
            : 'border-slate-200 bg-white hover:border-slate-300'"
        >
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-1.5">
                <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Menunggu Verifikasi</p>
                <span v-if="stats.pendingOrdersCount > 0" class="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-white rounded-full">
                  PERLU TINDAKAN
                </span>
              </div>
              <h4 class="text-2xl font-bold text-slate-900 mt-1">{{ stats.pendingOrdersCount }}</h4>
              <p class="text-xs text-slate-500 mt-1">Order token dari voter</p>
            </div>
            <div 
              class="h-10 w-10 rounded-lg flex items-center justify-center border transition-colors"
              :class="stats.pendingOrdersCount > 0 
                ? 'bg-amber-100 border-amber-300 text-amber-800 group-hover:bg-amber-600 group-hover:text-white' 
                : 'bg-amber-50 border-amber-200 text-amber-700 group-hover:bg-slate-900 group-hover:text-white'"
            >
              <Clock class="w-5 h-5" />
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-100/60 flex items-center justify-between text-xs font-medium" :class="stats.pendingOrdersCount > 0 ? 'text-amber-800' : 'text-slate-500 group-hover:text-slate-900'">
            <span>Verifikasi order token</span>
            <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </NuxtLink>

        <!-- Card 3: Total Omset Penjualan -->
        <NuxtLink 
          to="/admin/kontes" 
          class="group rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Omset Penjualan</p>
              <h4 class="text-2xl font-bold text-slate-900 mt-1">Rp {{ stats.totalPendapatan.toLocaleString('id-ID') }}</h4>
              <p class="text-xs text-slate-500 mt-1">Total pendapatan kotor</p>
            </div>
            <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-emerald-50 border border-emerald-200 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <TrendingUp class="w-5 h-5" />
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 group-hover:text-slate-900 font-medium">
            <span>Rincian per kontes</span>
            <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </NuxtLink>

        <!-- Card 4: Potongan Komisi (Info only) -->
        <div class="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-2xs">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Potongan Komisi ({{ stats.persenKomisi }}%)</p>
              <h4 class="text-2xl font-bold text-slate-900 mt-1">Rp {{ stats.totalPlatformFee.toLocaleString('id-ID') }}</h4>
              <p class="text-xs text-slate-500 mt-1">Bagi hasil platform</p>
            </div>
            <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-rose-50 border border-rose-200 text-rose-700">
              <Percent class="w-5 h-5" />
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400 font-medium">
            Statistik komisi platform
          </div>
        </div>
      </div>

      <!-- Pendapatan Bersih Banner -->
      <div class="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimasi Pendapatan Bersih Instansi</span>
          <h3 class="text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Rp {{ stats.pendapatanBersih.toLocaleString('id-ID') }}
          </h3>
          <p class="text-xs text-slate-500 mt-1">
            (Total Omset Kotor Rp {{ stats.totalPendapatan.toLocaleString('id-ID') }} dikurangi Komisi Platform {{ stats.persenKomisi }}% Rp {{ stats.totalPlatformFee.toLocaleString('id-ID') }})
          </p>
        </div>
        <NuxtLink 
          to="/admin/kontes" 
          class="inline-flex items-center gap-2 px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-xs rounded-md transition-colors whitespace-nowrap shrink-0"
        >
          <span>Lihat Detail Transaksi</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </NuxtLink>
      </div>
    </div>

    <!-- Quick Actions Grid -->
    <div>
      <h2 class="text-base font-bold text-slate-900 mb-4">Aksi Cepat</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Action 1: Kelola Kontes -->
        <NuxtLink 
          to="/admin/kontes" 
          class="group bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div class="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors mb-3">
              <Trophy class="w-4 h-4" />
            </div>
            <h3 class="text-sm font-semibold text-slate-900">Kelola Kontes</h3>
            <p class="text-xs text-slate-500 mt-1">Buat, edit, dan pantau status kontes aktif</p>
          </div>
          <div class="mt-4 flex items-center text-xs font-medium text-slate-900 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Buka Kontes</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </div>
        </NuxtLink>

        <!-- Action 2: Verifikasi Order -->
        <NuxtLink 
          to="/admin/kontes" 
          class="group border rounded-xl p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          :class="stats?.pendingOrdersCount && stats.pendingOrdersCount > 0 ? 'bg-amber-50/60 border-amber-200 hover:border-amber-300' : 'bg-white border-slate-200 hover:border-slate-300'"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <div 
                class="h-9 w-9 rounded-lg flex items-center justify-center transition-colors"
                :class="stats?.pendingOrdersCount && stats.pendingOrdersCount > 0 ? 'bg-amber-100 text-amber-800 group-hover:bg-amber-600 group-hover:text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white'"
              >
                <CheckCircle2 class="w-4 h-4" />
              </div>
              <span v-if="stats?.pendingOrdersCount && stats.pendingOrdersCount > 0" class="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-white rounded-full">
                {{ stats.pendingOrdersCount }} pending
              </span>
            </div>
            <h3 class="text-sm font-semibold text-slate-900">Verifikasi Order</h3>
            <p class="text-xs text-slate-500 mt-1">Cek dan verifikasi bukti transfer voter</p>
          </div>
          <div class="mt-4 flex items-center text-xs font-medium gap-1 group-hover:translate-x-1 transition-transform" :class="stats?.pendingOrdersCount && stats.pendingOrdersCount > 0 ? 'text-amber-800 font-semibold' : 'text-slate-900'">
            <span>Verifikasi Sekarang</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </div>
        </NuxtLink>

        <!-- Action 3: Rekap Hasil Voting -->
        <NuxtLink 
          to="/admin/kontes" 
          class="group bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div class="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors mb-3">
              <BarChart3 class="w-4 h-4" />
            </div>
            <h3 class="text-sm font-semibold text-slate-900">Rekap Hasil Voting</h3>
            <p class="text-xs text-slate-500 mt-1">Lihat perolehan suara per kandidat</p>
          </div>
          <div class="mt-4 flex items-center text-xs font-medium text-slate-900 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Lihat Rekap</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </div>
        </NuxtLink>

        <!-- Action 4: Profil Instansi -->
        <NuxtLink 
          to="/admin/profil" 
          class="group bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div class="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors mb-3">
              <Building2 class="w-4 h-4" />
            </div>
            <h3 class="text-sm font-semibold text-slate-900">Profil Instansi</h3>
            <p class="text-xs text-slate-500 mt-1">Atur nama instansi & WA admin</p>
          </div>
          <div class="mt-4 flex items-center text-xs font-medium text-slate-900 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Edit Profil</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trophy, Clock, TrendingUp, Percent, ArrowRight, CheckCircle2, BarChart3, Building2 } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const { data: stats, pending } = await useFetch('/api/admin/stats')
</script>

