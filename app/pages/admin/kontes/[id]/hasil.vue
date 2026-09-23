<template>
  <div class="space-y-6">
    <div>
      <NuxtLink :to="`/admin/kontes/${kontesId}`" class="text-xs text-indigo-400 hover:underline mb-1 block">
        ← Kembali ke Detail Kontes
      </NuxtLink>
      <h1 class="text-2xl font-bold text-white font-heading">Rekap Perolehan Suara</h1>
      <p class="text-xs text-slate-400 mt-1">Laporan perolehan suara terkini per kandidat</p>
    </div>

    <div v-if="pending" class="text-slate-400 text-sm">Memuat hasil...</div>

    <template v-else-if="hasil">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UiStats
          title="Total Suara Masuk"
          :value="`${hasil.totalSuaraMasuk.toLocaleString('id-ID')} Suara`"
          color="indigo"
        />
        <UiStats
          title="Status Kontes"
          :value="hasil.status"
          color="emerald"
        />
      </div>

      <KontesLeaderboard
        :items="hasil.leaderboard"
        :total-suara="hasil.totalSuaraMasuk"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const route = useRoute()
const kontesId = route.params.id as string

const { data: hasil, pending } = await useFetch(`/api/admin/kontes/${kontesId}/hasil`)
</script>
