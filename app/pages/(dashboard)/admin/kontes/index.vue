<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Daftar Kontes</h1>
        <p class="text-xs text-slate-500 mt-1">Kelola seluruh kontes yang diselenggarakan oleh instansi Anda</p>
      </div>

      <NuxtLink to="/admin/kontes/buat" class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors shadow-xs">
        + Buat Kontes Baru
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-slate-500 text-sm">Memuat kontes...</div>

    <div v-else-if="!listKontes || listKontes.length === 0" class="text-center py-16 bg-white border border-slate-200 rounded-xl space-y-4 shadow-2xs">
      <p class="text-slate-500 text-sm">Belum ada kontes yang dibuat.</p>
      <NuxtLink to="/admin/kontes/buat" class="inline-flex items-center justify-center px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors shadow-xs">
        Buat Kontes Pertama
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="kontes in listKontes" :key="kontes.id" class="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 shadow-2xs transition-all flex flex-col justify-between space-y-4">
        <div>
          <div class="flex items-center justify-between">
            <span 
              class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
              :class="{
                'bg-emerald-100 text-emerald-800': kontes.status === 'AKTIF',
                'bg-amber-100 text-amber-800': kontes.status === 'DRAFT',
                'bg-slate-100 text-slate-700': kontes.status !== 'AKTIF' && kontes.status !== 'DRAFT',
              }"
            >
              {{ kontes.status }}
            </span>
            <span class="text-xs text-slate-500 font-mono">ID: #{{ kontes.id }}</span>
          </div>

          <h3 class="text-base font-bold text-slate-900 tracking-tight mt-3">{{ kontes.nama }}</h3>
          <p v-if="kontes.deskripsi" class="text-xs text-slate-500 mt-1 line-clamp-2">{{ kontes.deskripsi }}</p>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <div class="text-xs text-slate-500 space-x-2">
            <span>{{ kontes._count.kandidat }} Kandidat</span>
            <span>•</span>
            <span>{{ kontes._count.tokenPackages }} Paket</span>
          </div>

          <div class="flex items-center space-x-2">
            <NuxtLink :to="`/admin/kontes/${kontes.id}/orders`" class="inline-flex items-center justify-center px-3 h-8 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-xs rounded-md transition-colors">
              Orders
            </NuxtLink>
            <NuxtLink :to="`/admin/kontes/${kontes.id}`" class="inline-flex items-center justify-center px-3 h-8 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md transition-colors shadow-xs">
              Kelola
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const { data: listKontes, pending } = await useFetch('/api/admin/kontes')
</script>
