<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white font-heading">Daftar Kontes</h1>
        <p class="text-xs text-slate-400 mt-1">Kelola seluruh kontes yang diselenggarakan oleh instansi Anda</p>
      </div>

      <NuxtLink to="/admin/kontes/buat">
        <UiButton variant="primary">
          + Buat Kontes Baru
        </UiButton>
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-slate-400 text-sm">Memuat kontes...</div>

    <div v-else-if="!listKontes || listKontes.length === 0" class="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
      <p class="text-slate-400 text-sm">Belum ada kontes yang dibuat.</p>
      <NuxtLink to="/admin/kontes/buat">
        <UiButton variant="primary">Buat Kontes Pertama</UiButton>
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UiCard v-for="kontes in listKontes" :key="kontes.id" hover class="flex flex-col justify-between space-y-4">
        <div>
          <div class="flex items-center justify-between">
            <UiBadge :variant="kontes.status === 'AKTIF' ? 'success' : kontes.status === 'DRAFT' ? 'warning' : 'neutral'">
              {{ kontes.status }}
            </UiBadge>
            <span class="text-xs text-slate-500 font-mono">ID: #{{ kontes.id }}</span>
          </div>

          <h3 class="text-lg font-bold text-white font-heading mt-3">{{ kontes.nama }}</h3>
          <p v-if="kontes.deskripsi" class="text-xs text-slate-400 mt-1 line-clamp-2">{{ kontes.deskripsi }}</p>
        </div>

        <div class="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
          <div class="text-xs text-slate-400 space-x-2">
            <span>{{ kontes._count.kandidat }} Kandidat</span>
            <span>•</span>
            <span>{{ kontes._count.tokenPackages }} Paket</span>
          </div>

          <div class="flex items-center space-x-2">
            <NuxtLink :to="`/admin/kontes/${kontes.id}/orders`">
              <UiButton variant="secondary" size="sm">Orders</UiButton>
            </NuxtLink>
            <NuxtLink :to="`/admin/kontes/${kontes.id}`">
              <UiButton variant="primary" size="sm">Kelola</UiButton>
            </NuxtLink>
          </div>
        </div>
      </UiCard>
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
