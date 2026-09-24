<script setup lang="ts">
import { ExternalLink, CheckCircle2 } from 'lucide-vue-next'

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

    <div class="flex flex-wrap items-center gap-3">
      <!-- Public Link Button -->
      <NuxtLink 
        :to="`/instansi/${kontes.instansi?.slug}/kontes/${kontes.id}`" 
        target="_blank"
        class="flex items-center gap-2 px-3.5 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
      >
        <ExternalLink class="w-3.5 h-3.5 text-slate-600" />
        <span>Lihat Halaman Voting</span>
      </NuxtLink>

      <!-- Order Verification Link -->
      <NuxtLink 
        :to="`/admin/kontes/${kontes.id}/orders`" 
        class="flex items-center gap-2 px-3.5 h-9 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg transition"
      >
        <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600" />
        <span>Verifikasi Order</span>
      </NuxtLink>

      <!-- Status Dropdown Toggle -->
      <select 
        :value="kontes.status" 
        @change="(e) => emit('update-status', (e.target as HTMLSelectElement).value)"
        :disabled="updatingStatus"
        class="bg-white border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg px-3 h-9 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer disabled:opacity-50"
      >
        <option value="DRAFT">DRAFT</option>
        <option value="AKTIF">AKTIF</option>
        <option value="DITUTUP">DITUTUP</option>
      </select>
    </div>
  </div>
</template>
