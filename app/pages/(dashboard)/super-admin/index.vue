<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Super Admin</h1>
      <p class="text-xs text-slate-500 mt-1">Ringkasan statistik platform SuaraKita v2 secara menyeluruh</p>
    </div>

    <div v-if="pending" class="text-slate-500 text-sm">Memuat statistik global...</div>

    <div v-else-if="stats" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between shadow-2xs">
        <div>
          <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Instansi</p>
          <h4 class="text-2xl font-bold text-slate-900 mt-1">{{ stats.totalInstansi }}</h4>
          <p class="text-xs text-slate-500 mt-1">Terdaftar di platform</p>
        </div>
        <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-900">
          <Building2 class="w-5 h-5" />
        </div>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between shadow-2xs">
        <div>
          <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending Approval</p>
          <h4 class="text-2xl font-bold text-slate-900 mt-1">{{ stats.pendingInstansi }}</h4>
          <p class="text-xs text-slate-500 mt-1">Instansi menunggu diapprove</p>
        </div>
        <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-amber-50 border border-amber-200 text-amber-700">
          <Clock class="w-5 h-5" />
        </div>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between shadow-2xs">
        <div>
          <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Omset Lintas Instansi</p>
          <h4 class="text-2xl font-bold text-slate-900 mt-1">Rp {{ stats.totalRevenue.toLocaleString('id-ID') }}</h4>
          <p class="text-xs text-slate-500 mt-1">Penjualan token terverifikasi</p>
        </div>
        <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-emerald-50 border border-emerald-200 text-emerald-700">
          <TrendingUp class="w-5 h-5" />
        </div>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between shadow-2xs">
        <div>
          <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Platform Fee (20%)</p>
          <h4 class="text-2xl font-bold text-slate-900 mt-1">Rp {{ stats.totalPlatformFee.toLocaleString('id-ID') }}</h4>
          <p class="text-xs text-slate-500 mt-1">Hak komisi platform</p>
        </div>
        <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-900">
          <Percent class="w-5 h-5" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col justify-between">
        <div>
          <h3 class="text-base font-semibold text-slate-900">Persetujuan Instansi</h3>
          <p class="text-xs text-slate-500 mt-0.5">Approve instansi yang baru mendaftar</p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
          <NuxtLink to="/super-admin/instansi" class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors shadow-xs">
            Buka Approval Instansi
          </NuxtLink>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col justify-between">
        <div>
          <h3 class="text-base font-semibold text-slate-900">Rekapitulasi Komisi</h3>
          <p class="text-xs text-slate-500 mt-0.5">Lihat rekap komisi platform 20% per instansi</p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
          <NuxtLink to="/super-admin/komisi" class="inline-flex items-center justify-center px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-sm rounded-md transition-colors">
            Lihat Rekap Komisi
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Clock, TrendingUp, Percent } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'super-admin'],
})

const { data: stats, pending } = await useFetch('/api/super-admin/stats')
</script>
