<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16" id="kontes-aktif">
    <div class="flex items-center justify-between mb-6 sm:mb-8">
      <div>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 font-bold text-xs mb-2">
          <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>Sedang Berlangsung</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Kontes Berlangsung
        </h2>
      </div>
      <NuxtLink
        to="/register"
        class="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
      >
        <span>Daftarkan Instansi</span>
        <ChevronRight class="w-4 h-4" />
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 2" :key="i" class="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs animate-pulse space-y-4">
        <div class="h-40 bg-slate-200 rounded-xl"></div>
        <div class="h-6 bg-slate-200 rounded w-3/4"></div>
        <div class="h-4 bg-slate-100 rounded w-1/2"></div>
        <div class="h-10 bg-slate-200 rounded-xl"></div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!kontesList || kontesList.length === 0" class="p-8 sm:p-12 text-center rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
      <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
        <Vote class="w-6 h-6" />
      </div>
      <h3 class="text-base font-bold text-slate-900">Belum Ada Kontes Aktif Saat Ini</h3>
      <p class="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-5 leading-relaxed">
        Jadilah instansi, komunitas, atau organisasi pertama yang mempublikasikan kontes pemilihan secara digital.
      </p>
      <NuxtLink
        to="/register"
        class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs sm:text-sm hover:bg-slate-800 transition-colors shadow-sm"
      >
        <Building2 class="w-4 h-4" />
        <span>Daftarkan Instansi Sekarang</span>
      </NuxtLink>
    </div>

    <!-- Active Contests Cards Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article
        v-for="kontes in kontesList"
        :key="kontes.id"
        class="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
      >
        <div class="space-y-4">
          <!-- Card Visual Banner Header -->
          <div class="relative h-40 rounded-xl overflow-hidden bg-slate-900">
            <img
              class="w-full h-full object-cover opacity-85"
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
              :alt="kontes.nama"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
            
            <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Voting Aktif
            </span>

            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <span class="text-xs font-medium text-slate-200 flex items-center gap-1.5">
                <Building2 class="w-3.5 h-3.5 text-blue-400" />
                {{ kontes.instansi.nama }}
              </span>
              <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md">
                {{ kontes.totalKandidat }} Paslon
              </span>
            </div>
          </div>

          <!-- Title & Description -->
          <div>
            <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {{ kontes.nama }}
            </h3>
            <p v-if="kontes.deskripsi" class="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed">
              {{ kontes.deskripsi }}
            </p>
          </div>

          <!-- Stats Box -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div class="flex items-center space-x-1.5">
              <Vote class="w-4 h-4 text-blue-600" />
              <span class="text-slate-500">Suara Masuk:</span>
            </div>
            <strong class="text-slate-900 font-extrabold">{{ kontes.totalSuaraMasuk.toLocaleString('id-ID') }} Suara</strong>
          </div>
        </div>

        <!-- Action Button -->
        <div class="mt-5 pt-3 border-t border-slate-100">
          <NuxtLink
            :to="`/instansi/${kontes.instansi.slug}/kontes/${kontes.id}`"
            class="w-full py-2.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-xs active:scale-98"
          >
            <Vote class="w-4 h-4" />
            <span>Lihat Bilik Suara & Vote</span>
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronRight, Vote, Building2 } from 'lucide-vue-next'

interface Instansi {
  id: number
  nama: string
  slug: string
  noWaAdmin: string
}

interface KontesPublicItem {
  id: number
  nama: string
  deskripsi: string | null
  tanggalMulai: string | null
  tanggalSelesai: string | null
  status: string
  instansi: Instansi
  totalSuaraMasuk: number
  totalKandidat: number
}

const { data: kontesList, pending } = await useFetch<KontesPublicItem[]>('/api/public/kontes')
</script>
