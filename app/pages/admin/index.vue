<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white font-heading">Dashboard Admin Instansi</h1>
        <p class="text-xs text-slate-400 mt-1">Ringkasan statistik kontes & pendapatan instansi Anda</p>
      </div>

      <NuxtLink to="/admin/kontes/buat">
        <UiButton variant="primary">
          + Buat Kontes Baru
        </UiButton>
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-slate-400 text-sm">Memuat statistik...</div>

    <div v-else-if="stats" class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <UiStats
        title="Total Kontes"
        :value="stats.totalKontes"
        subtext="Kontes terdaftar"
        color="indigo"
      />
      <UiStats
        title="Menunggu Verifikasi"
        :value="stats.pendingOrdersCount"
        subtext="Order token dari voter"
        color="amber"
      />
      <UiStats
        title="Total Omset Penjualan"
        :value="`Rp ${stats.totalPendapatan.toLocaleString('id-ID')}`"
        subtext="Hasil penjualan token"
        color="emerald"
      />
    </div>

    <!-- Quick Links -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UiCard title="Kelola Kontes" subtitle="Buat, edit, atau lihat daftar kontes">
        <template #footer>
          <NuxtLink to="/admin/kontes">
            <UiButton variant="secondary" size="sm">Buka Kelola Kontes</UiButton>
          </NuxtLink>
        </template>
      </UiCard>

      <UiCard title="Profil Instansi" subtitle="Atur nama instansi dan nomor WhatsApp admin">
        <template #footer>
          <NuxtLink to="/admin/profil">
            <UiButton variant="secondary" size="sm">Edit Profil Instansi</UiButton>
          </NuxtLink>
        </template>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const { data: stats, pending } = await useFetch('/api/admin/stats')
</script>
