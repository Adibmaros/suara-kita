<template>
  <div class="space-y-6">
    <div>
      <NuxtLink :to="`/admin/kontes/${kontesId}`" class="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 font-medium transition-colors mb-1">
        ← Kembali ke Detail Kontes
      </NuxtLink>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Rekap Perolehan Suara</h1>
      <p class="text-xs text-slate-500 mt-1">Laporan perolehan suara terkini per kandidat</p>
    </div>

    <div v-if="pending" class="text-slate-500 text-sm">Memuat hasil...</div>

    <template v-else-if="hasil">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between shadow-2xs">
          <div>
            <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Suara Masuk</p>
            <h4 class="text-2xl font-bold text-slate-900 mt-1">{{ hasil.totalSuaraMasuk.toLocaleString('id-ID') }} Suara</h4>
          </div>
          <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-900">
            <Vote class="w-5 h-5" />
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between shadow-2xs">
          <div>
            <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Status Kontes</p>
            <h4 class="text-2xl font-bold text-slate-900 mt-1">{{ hasil.status }}</h4>
          </div>
          <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-emerald-50 border border-emerald-200 text-emerald-700">
            <CheckCircle2 class="w-5 h-5" />
          </div>
        </div>
      </div>

      <KontesLeaderboard
        :items="hasil.leaderboard"
        :total-suara="hasil.totalSuaraMasuk"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { Vote, CheckCircle2 } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const route = useRoute()
const kontesId = route.params.id as string

const { data: hasil, pending } = await useFetch(`/api/admin/kontes/${kontesId}/hasil`)
</script>
