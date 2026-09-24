<template>
  <div class="max-w-5xl mx-auto px-4 py-12 space-y-8">
    <div v-if="pending" class="text-center py-12 text-slate-400">
      Loading data instansi...
    </div>

    <div v-else-if="error" class="text-center py-12 space-y-4">
      <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Instansi Tidak Ditemukan</h2>
      <p class="text-slate-500">Instansi ini tidak aktif atau URL tidak valid.</p>
      <NuxtLink to="/" class="inline-flex items-center justify-center px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-sm rounded-md transition-colors">
        Kembali ke Beranda
      </NuxtLink>
    </div>

    <template v-else-if="instansi">
      <!-- Header Instansi -->
      <div class="bg-white border border-slate-200 shadow-2xs rounded-xl p-8 text-center space-y-2">
        <h1 class="text-3xl font-bold text-slate-900 tracking-tight">{{ instansi.nama }}</h1>
        <p class="text-xs text-slate-500">Daftar kontes & polling resmi oleh instansi ini</p>
      </div>

      <!-- Section Kontes Aktif -->
      <div class="space-y-6">
        <h2 class="text-lg font-semibold text-slate-900 tracking-tight flex items-center space-x-2">
          <span>Kontes Berlangsung</span>
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        </h2>

        <div v-if="instansi.kontes.length === 0" class="text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-200 text-sm">
          Saat ini belum ada kontes aktif dari instansi ini.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NuxtLink
            v-for="kontes in instansi.kontes"
            :key="kontes.id"
            :to="`/instansi/${instansi.slug}/kontes/${kontes.id}`"
            class="block group"
          >
            <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between h-full space-y-4">
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">AKTIF</span>
                <span class="text-xs text-slate-500 font-mono">{{ kontes._count.kandidat }} Kandidat</span>
              </div>

              <div>
                <h3 class="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                  {{ kontes.nama }}
                </h3>
                <p v-if="kontes.deskripsi" class="text-xs text-slate-500 mt-2 line-clamp-2">
                  {{ kontes.deskripsi }}
                </p>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-900 font-medium">
                <span>Lihat Kontes & Vote</span>
                <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const slug = route.params.slug as string

const { data: instansi, pending, error } = await useFetch(`/api/public/instansi/${slug}`)
</script>
