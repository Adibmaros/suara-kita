<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-white font-heading">Dashboard Super Admin</h1>
      <p class="text-xs text-slate-400 mt-1">Ringkasan statistik platform SuaraKita v2 secara menyeluruh</p>
    </div>

    <div v-if="pending" class="text-slate-400 text-sm">Memuat statistik global...</div>

    <div v-else-if="stats" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <UiStats
        title="Total Instansi"
        :value="stats.totalInstansi"
        subtext="Terdaftar di platform"
        color="indigo"
      />
      <UiStats
        title="Pending Approval"
        :value="stats.pendingInstansi"
        subtext="Instansi menunggu diapprove"
        color="amber"
      />
      <UiStats
        title="Total Omset Lintas Instansi"
        :value="`Rp ${stats.totalRevenue.toLocaleString('id-ID')}`"
        subtext="Penjualan token terverifikasi"
        color="emerald"
      />
      <UiStats
        title="Total Platform Fee (20%)"
        :value="`Rp ${stats.totalPlatformFee.toLocaleString('id-ID')}`"
        subtext="Hak komisi platform"
        color="rose"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UiCard title="Persetujuan Instansi" subtitle="Approve instansi yang baru mendaftar">
        <template #footer>
          <NuxtLink to="/super-admin/instansi">
            <UiButton variant="primary">Buka Approval Instansi</UiButton>
          </NuxtLink>
        </template>
      </UiCard>

      <UiCard title="Rekapitulasi Komisi" subtitle="Lihat rekap komisi platform 20% per instansi">
        <template #footer>
          <NuxtLink to="/super-admin/komisi">
            <UiButton variant="secondary">Lihat Rekap Komisi</UiButton>
          </NuxtLink>
        </template>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'super-admin'],
})

const { data: stats, pending } = await useFetch('/api/super-admin/stats')
</script>
