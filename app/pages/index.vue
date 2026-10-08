<template>
  <div class="space-y-12 sm:space-y-20 pb-16 sm:pb-24">
    <!-- 1. Hero Section -->
    <HomeHeroSection />

    <!-- 2. Keunggulan Utama (Bento Features) -->
    <HomeBentoFeatures />

    <!-- 3. Alur Partisipasi (4-Step Workflow) -->
    <HomeWorkflowSteps />

    <!-- 4. Kontes Berlangsung (Active Contests from DB) -->
    <HomeActiveContests />

    <!-- 5. Bottom WhatsApp Consultation Banner CTA -->
    <HomeCallToAction />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
