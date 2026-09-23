<template>
  <div class="max-w-5xl mx-auto px-4 py-12 space-y-8">
    <div v-if="pending" class="text-center py-12 text-slate-400">
      Loading data instansi...
    </div>

    <div v-else-if="error" class="text-center py-12 space-y-4">
      <h2 class="text-2xl font-bold text-white font-heading">Instansi Tidak Ditemukan</h2>
      <p class="text-slate-400">Instansi ini tidak aktif atau URL tidak valid.</p>
      <NuxtLink to="/">
        <UiButton variant="secondary">Kembali ke Beranda</UiButton>
      </NuxtLink>
    </div>

    <template v-else-if="instansi">
      <!-- Header Instansi -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3 relative overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
        <h1 class="text-3xl font-extrabold text-white font-heading">{{ instansi.nama }}</h1>
        <p class="text-sm text-slate-400">Daftar kontes & polling resmi oleh instansi ini</p>
      </div>

      <!-- Section Kontes Aktif -->
      <div class="space-y-6">
        <h2 class="text-xl font-bold text-white font-heading flex items-center space-x-2">
          <span>Kontes Berlangsung</span>
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        </h2>

        <div v-if="instansi.kontes.length === 0" class="text-center py-12 text-slate-500 bg-slate-900/50 rounded-xl border border-slate-800">
          Saat ini belum ada kontes aktif dari instansi ini.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NuxtLink
            v-for="kontes in instansi.kontes"
            :key="kontes.id"
            :to="`/i/${instansi.slug}/kontes/${kontes.id}`"
            class="block group"
          >
            <UiCard hover class="h-full space-y-4">
              <div class="flex items-center justify-between">
                <UiBadge variant="success">AKTIF</UiBadge>
                <span class="text-xs text-slate-500 font-mono">{{ kontes._count.kandidat }} Kandidat</span>
              </div>

              <div>
                <h3 class="text-xl font-bold text-white font-heading group-hover:text-indigo-400 transition-colors">
                  {{ kontes.nama }}
                </h3>
                <p v-if="kontes.deskripsi" class="text-xs text-slate-400 mt-2 line-clamp-2">
                  {{ kontes.deskripsi }}
                </p>
              </div>

              <div class="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                <span>Lihat Kontes & Vote</span>
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </UiCard>
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const slug = route.params.slug as string

const { data: instansi, pending, error } = await useFetch(`/api/public/instansi/${slug}`)
</script>
