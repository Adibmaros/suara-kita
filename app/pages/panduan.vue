<template>
  <div class="space-y-20 sm:space-y-28 pb-20 sm:pb-32">
    <!-- Hero Header -->
    <PanduanHero />

    <!-- Section 1: Peran & Pengguna -->
    <PanduanRoleCard />

    <!-- Section 2: Interactive Stepper (Alur Operasional) -->
    <PanduanStepper />

    <!-- Section 3: Model Bisnis & Keuangan -->
    <PanduanBisnis />

    <!-- Section 4: Pertanyaan Sering Diajukan (FAQ) -->
    <PanduanFAQ />

    <!-- Section 5: Call to Action (Daftar Instansi) -->
    <PanduanCTA />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Panduan & Manual Book — SuaraKita',
  description: 'Panduan penggunaan SuaraKita untuk Admin Instansi dan Voter. Pelajari alur pendaftaran, pemuatan kontes, verifikasi token, hingga rekapitulasi suara.',
})

definePageMeta({
  layout: 'default',
})
</script>
