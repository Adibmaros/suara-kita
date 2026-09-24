<script setup lang="ts">
import { ExternalLink, CheckCircle2, Trophy } from 'lucide-vue-next'

const props = defineProps<{
  kontes: any
  updatingStatus: boolean
}>()

const emit = defineEmits<{
  (e: 'update-status', status: string): void
}>()
</script>

<template>
  <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <div class="flex items-center gap-3">
        <span 
          :class="{
            'bg-emerald-100 text-emerald-800 border-emerald-200': kontes.status === 'AKTIF',
            'bg-amber-100 text-amber-800 border-amber-200': kontes.status === 'DRAFT',
            'bg-rose-100 text-rose-800 border-rose-200': kontes.status === 'DITUTUP'
          }"
          class="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
        >
          {{ kontes.status }}
        </span>
        <span class="text-xs text-slate-500 font-mono">ID Kontes: #{{ kontes.id }}</span>
      </div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight mt-1">{{ kontes.judul }}</h1>
      <p class="text-slate-500 text-xs mt-1 max-w-2xl line-clamp-2">{{ kontes.deskripsi || 'Tidak ada deskripsi' }}</p>
    </div>

    <!-- Right Side Actions & Status Control -->
    <div class="flex flex-wrap items-center gap-2.5">
      <!-- Quick Navigation Actions Group -->
      <div class="inline-flex items-center p-1 bg-slate-100/80 border border-slate-200/80 rounded-xl space-x-1">
        <!-- Internal Admin Results Page -->
        <NuxtLink 
          :to="`/admin/kontes/${kontes.id}/hasil`" 
          class="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded-lg transition-all shadow-2xs border border-blue-200/60 group"
          title="Lihat Laporan Rekapitulasi Perolehan Suara"
        >
          <Trophy class="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
          <span>Rekap Hasil Suara</span>
        </NuxtLink>

        <!-- Public Voting Page Link -->
        <NuxtLink 
          :to="`/instansi/${kontes.instansi?.slug}/kontes/${kontes.id}`" 
          target="_blank"
          class="flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg transition-all shadow-2xs border border-slate-200/60 group"
          title="Buka Halaman Public Voting"
        >
          <ExternalLink class="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
          <span>Halaman Publik</span>
        </NuxtLink>

        <!-- Order Verification Link -->
        <NuxtLink 
          :to="`/admin/kontes/${kontes.id}/orders`" 
          class="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-all shadow-2xs"
          title="Kelola & Verifikasi Pesanan Token Suara"
        >
          <CheckCircle2 class="w-3.5 h-3.5" />
          <span>Verifikasi Order</span>
        </NuxtLink>
      </div>

      <!-- Status Control Toggle -->
      <div class="flex items-center space-x-2 bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1">
        <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status:</span>
        <select 
          :value="kontes.status" 
          @change="(e) => emit('update-status', (e.target as HTMLSelectElement).value)"
          :disabled="updatingStatus"
          class="bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer disabled:opacity-50 shadow-2xs"
        >
          <option value="DRAFT">DRAFT</option>
          <option value="AKTIF">AKTIF</option>
          <option value="DITUTUP">DITUTUP</option>
        </select>
      </div>
    </div>
  </div>
</template>
