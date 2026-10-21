<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20" id="kontes-aktif">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] font-semibold text-xs mb-3">
          <span class="w-1.5 h-1.5 rounded-full bg-[#0066ff]"></span>
          <span>Sesi Aktif</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight">
          Kontes yang sedang berlangsung.
        </h2>
      </div>
      <NuxtLink
        to="/register"
        class="text-xs sm:text-sm font-semibold text-[#141414] hover:text-[#707070] transition-colors flex items-center gap-1 self-start sm:self-auto"
      >
        <span>Daftarkan Instansi Kamu</span>
        <ChevronRight class="w-4 h-4" />
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 2" :key="i" class="p-6 rounded-3xl bg-white border border-[#e0e0e0] space-y-4">
        <div class="h-44 bg-[#f3f3f3] rounded-2xl animate-pulse"></div>
        <div class="h-6 bg-[#f3f3f3] rounded-full w-3/4 animate-pulse"></div>
        <div class="h-4 bg-[#f3f3f3] rounded-full w-1/2 animate-pulse"></div>
        <div class="h-11 bg-[#f3f3f3] rounded-full animate-pulse"></div>
      </div>
    </div>

    <!-- Empty State (ex-empty-state-card) -->
    <div v-else-if="!kontesList || kontesList.length === 0" class="p-10 sm:p-16 text-center rounded-3xl bg-[#f3f3f3] border border-[#e0e0e0]">
      <div class="w-12 h-12 rounded-[30%] bg-white border border-[#e0e0e0] text-[#141414] mx-auto flex items-center justify-center mb-4">
        <Vote class="w-6 h-6" />
      </div>
      <h3 class="text-lg font-bold text-[#141414]">Belum ada kontes aktif saat ini.</h3>
      <p class="text-xs sm:text-sm text-[#707070] max-w-sm mx-auto mt-1.5 mb-6 leading-relaxed">
        Jadilah instansi atau ormawa pertama yang menyelenggarakan kontes pemilihan digital di platform SuaraKita.
      </p>
      <NuxtLink
        to="/register"
        class="btn-primary"
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
        class="p-6 rounded-3xl bg-white border border-[#e0e0e0] hover:border-[#141414] transition-all flex flex-col justify-between"
      >
        <div class="space-y-4">
          <!-- Card Visual Banner Header -->
          <div class="relative h-44 rounded-2xl overflow-hidden bg-[#141414]">
            <img
              class="w-full h-full object-cover opacity-85"
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
              :alt="kontes.nama"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-[#141414]/20 to-transparent"></div>
            
            <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-[rgba(115,115,115,0.7)] backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-[#0066ff]"></span>
              Voting Aktif
            </span>

            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <span class="text-xs font-medium text-[#adadad] flex items-center gap-1.5 truncate">
                <Building2 class="w-3.5 h-3.5 text-white shrink-0" />
                <span class="truncate">{{ kontes.instansi.nama }}</span>
              </span>
              <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md shrink-0">
                {{ kontes.totalKandidat }} Paslon
              </span>
            </div>
          </div>

          <!-- Title & Description -->
          <div>
            <h3 class="text-lg font-bold text-[#141414] leading-snug">
              {{ kontes.nama }}
            </h3>
            <p v-if="kontes.deskripsi" class="text-xs sm:text-sm text-[#707070] mt-1.5 line-clamp-2 leading-relaxed">
              {{ kontes.deskripsi }}
            </p>
          </div>

          <!-- Stats Box -->
          <div class="p-3.5 rounded-2xl bg-[#f3f3f3] border border-[#f0f0f0] flex items-center justify-between text-xs">
            <div class="flex items-center space-x-2 text-[#707070]">
              <Vote class="w-4 h-4 text-[#141414]" />
              <span>Total Suara Masuk:</span>
            </div>
            <strong class="text-[#141414] font-bold font-mono">{{ kontes.totalSuaraMasuk.toLocaleString('id-ID') }} Suara</strong>
          </div>
        </div>

        <!-- Action Button -->
        <div class="mt-6 pt-4 border-t border-[#f0f0f0]">
          <NuxtLink
            :to="`/instansi/${kontes.instansi.slug}/kontes/${kontes.id}`"
            class="btn-primary w-full text-xs sm:text-sm"
          >
            <Vote class="w-4 h-4" />
            <span>Masuk ke Bilik Suara</span>
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
