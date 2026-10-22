<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20" id="kontes-aktif">
    <!-- Section Header Lockup -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
      <div class="space-y-3">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] font-semibold text-xs">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066ff] opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-[#0066ff]"></span>
          </span>
          <span>Bilik Suara Terbuka</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414] tracking-tight leading-[1.12]">
          Kontes yang sedang berlangsung.
        </h2>
        <p class="text-xs sm:text-sm text-[#707070] max-w-xl font-light leading-relaxed">
          Pilih ajang ormawa atau pemilihan favoritmu, pelajari profil kandidat, dan berikan suara terverifikasi secara instan.
        </p>
      </div>

      <!-- Quick Action / Search -->
      <div class="flex items-center gap-3 shrink-0">
        <div v-if="kontesList && kontesList.length > 2" class="relative">
          <Search class="w-3.5 h-3.5 text-[#707070] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari kontes atau instansi..."
            class="h-10 pl-9 pr-4 text-xs bg-[#f3f3f3] hover:bg-[#ebebeb] focus:bg-white border border-[#e0e0e0] rounded-full focus:outline-none focus:ring-2 focus:ring-[#141414] transition-all w-48 sm:w-60"
          />
        </div>
        <NuxtLink
          to="/register"
          class="h-10 px-4 rounded-full bg-white hover:bg-[#f3f3f3] border border-[#e0e0e0] text-xs font-semibold text-[#141414] transition-all inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>Daftarkan Ormawa</span>
          <ArrowUpRight class="w-3.5 h-3.5 text-[#707070]" />
        </NuxtLink>
      </div>
    </div>

    <!-- Loading Skeleton Grid -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 2" :key="i" class="rounded-3xl bg-white border border-[#e0e0e0] overflow-hidden">
        <div class="h-48 sm:h-52 bg-[#f0f0f0] animate-pulse"></div>
        <div class="p-6 space-y-4">
          <div class="h-6 bg-[#f0f0f0] rounded-full w-3/4 animate-pulse"></div>
          <div class="h-4 bg-[#f0f0f0] rounded-full w-1/2 animate-pulse"></div>
          <div class="grid grid-cols-2 gap-2 pt-2">
            <div class="h-16 bg-[#f0f0f0] rounded-2xl animate-pulse"></div>
            <div class="h-16 bg-[#f0f0f0] rounded-2xl animate-pulse"></div>
          </div>
          <div class="h-11 bg-[#f0f0f0] rounded-full animate-pulse mt-4"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!kontesList || kontesList.length === 0" class="p-10 sm:p-16 text-center rounded-3xl bg-[#f8f8f8] border border-[#e0e0e0] relative overflow-hidden">
      <div class="relative z-10 max-w-md mx-auto space-y-4">
        <div class="w-14 h-14 rounded-[30%] bg-white border border-[#e0e0e0] shadow-sm text-[#141414] mx-auto flex items-center justify-center">
          <Vote class="w-7 h-7 text-[#141414]" :stroke-width="1.75" />
        </div>

        <div class="space-y-1.5">
          <h3 class="text-xl font-bold text-[#141414] tracking-tight">
            Belum ada kontes aktif saat ini.
          </h3>
          <p class="text-xs sm:text-sm text-[#707070] leading-relaxed font-light">
            Jadilah ormawa atau institusi pertama yang menyelenggarakan pemungutan suara digital terintegrasi di platform SuaraKita.
          </p>
        </div>

        <div class="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <NuxtLink
            to="/register"
            class="h-11 px-6 rounded-full bg-[#141414] hover:bg-[#262626] text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Building2 class="w-4 h-4 text-white" />
            <span>Daftarkan Instansi Sekarang</span>
          </NuxtLink>
          <NuxtLink
            to="/panduan"
            class="h-11 px-5 rounded-full bg-white hover:bg-[#f0f0f0] border border-[#e0e0e0] text-xs sm:text-sm font-semibold text-[#141414] transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Pelajari Panduan</span>
            <ChevronRight class="w-3.5 h-3.5 text-[#707070]" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Search Not Found State -->
    <div v-else-if="filteredKontes.length === 0" class="p-12 text-center rounded-3xl bg-[#f8f8f8] border border-[#e0e0e0] space-y-3">
      <p class="text-sm font-semibold text-[#141414]">
        Tidak ditemukan kontes yang cocok dengan pencarian "{{ searchQuery }}".
      </p>
      <button 
        @click="searchQuery = ''" 
        class="text-xs font-semibold text-[#0066ff] hover:underline cursor-pointer"
      >
        Tampilkan semua kontes aktif
      </button>
    </div>

    <!-- Active Contests Cards Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article
        v-for="kontes in filteredKontes"
        :key="kontes.id"
        class="group relative rounded-3xl bg-white border border-[#e0e0e0] hover:border-[#141414] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
      >
        <!-- Top Visual Banner Canvas -->
        <div class="relative h-48 sm:h-52 overflow-hidden bg-[#141414]">
          <img
            :src="getBannerUrl(kontes.id)"
            :alt="kontes.nama"
            class="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500 ease-out"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-black/30"></div>

          <!-- Top Status Pills -->
          <div class="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066ff] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-[#0066ff]"></span>
              </span>
              Voting Aktif
            </span>

            <span v-if="kontes.tanggalSelesai" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-medium font-mono">
              <Clock class="w-3 h-3 text-white/80" />
              <span>{{ getStatusLabel(kontes) }}</span>
            </span>
          </div>

          <!-- Bottom Org Info on Banner -->
          <div class="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
            <div class="flex items-center gap-2 max-w-[70%]">
              <div class="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                <Building2 class="w-3.5 h-3.5 text-white" />
              </div>
              <span class="text-xs font-medium text-white/95 truncate">
                {{ kontes.instansi.nama }}
              </span>
            </div>

            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[#141414] text-[11px] font-bold shadow-xs">
              <Users class="w-3 h-3 text-[#141414]" />
              <span>{{ kontes.totalKandidat }} Paslon</span>
            </div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <NuxtLink
              :to="`/instansi/${kontes.instansi.slug}/kontes/${kontes.id}`"
              class="block group/title"
            >
              <h3 class="text-xl font-bold text-[#141414] tracking-tight group-hover/title:text-[#0066ff] transition-colors leading-snug">
                {{ kontes.nama }}
              </h3>
            </NuxtLink>

            <p v-if="kontes.deskripsi" class="text-xs sm:text-sm text-[#707070] line-clamp-2 leading-relaxed font-light">
              {{ kontes.deskripsi }}
            </p>
            <p v-else class="text-xs text-[#adadad] italic font-light">
              Tidak ada deskripsi tambahan untuk kontes ini.
            </p>
          </div>

          <!-- Bento Stat Modules (2 columns) -->
          <div class="grid grid-cols-2 gap-2 pt-2">
            <!-- Box 1: Votes Count -->
            <div class="p-3 rounded-2xl bg-[#f3f3f3] border border-[#e8e8e8] flex flex-col justify-between">
              <div class="flex items-center gap-1.5 text-[11px] text-[#707070] font-medium">
                <Vote class="w-3.5 h-3.5 text-[#141414]" />
                <span>Suara Masuk</span>
              </div>
              <div class="mt-1 flex items-baseline gap-1">
                <span class="text-base sm:text-lg font-bold text-[#141414] font-mono tracking-tight">
                  {{ kontes.totalSuaraMasuk.toLocaleString('id-ID') }}
                </span>
                <span class="text-[10px] text-[#707070]">suara</span>
              </div>
            </div>

            <!-- Box 2: Token Price / Status -->
            <div class="p-3 rounded-2xl bg-[#f3f3f3] border border-[#e8e8e8] flex flex-col justify-between">
              <div class="flex items-center gap-1.5 text-[11px] text-[#707070] font-medium">
                <Coins class="w-3.5 h-3.5 text-[#141414]" />
                <span>Paket Token</span>
              </div>
              <div class="mt-1 flex items-baseline gap-1 truncate">
                <span class="text-xs sm:text-sm font-bold text-[#141414] font-mono truncate">
                  {{ kontes.hargaMulai > 0 ? `Rp ${kontes.hargaMulai.toLocaleString('id-ID')}` : 'Gratis / Mandiri' }}
                </span>
                <span v-if="kontes.hargaMulai > 0" class="text-[10px] text-[#707070]">/pkt</span>
              </div>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="pt-4 border-t border-[#f0f0f0] flex items-center gap-2.5">
            <NuxtLink
              :to="`/instansi/${kontes.instansi.slug}/kontes/${kontes.id}`"
              class="flex-1 h-11 px-5 rounded-full bg-[#141414] hover:bg-[#262626] text-white text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2 group/btn cursor-pointer"
            >
              <Vote class="w-4 h-4 text-white" />
              <span>Masuk Bilik Suara</span>
              <ArrowRight class="w-3.5 h-3.5 text-white/70 group-hover/btn:translate-x-0.5 transition-transform" />
            </NuxtLink>

            <NuxtLink
              :to="`/instansi/${kontes.instansi.slug}`"
              :title="`Lihat profil ${kontes.instansi.nama}`"
              class="w-11 h-11 rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] border border-[#e0e0e0] flex items-center justify-center text-[#141414] transition-colors shrink-0 cursor-pointer"
            >
              <Building2 class="w-4 h-4 text-[#707070]" />
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  ChevronRight, 
  Vote, 
  Building2, 
  Clock, 
  Users, 
  Coins, 
  ArrowRight, 
  ArrowUpRight, 
  Search 
} from 'lucide-vue-next'

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
  hargaMulai: number
}

const { data: kontesList, pending } = await useFetch<KontesPublicItem[]>('/api/public/kontes')

const searchQuery = ref('')

const filteredKontes = computed(() => {
  if (!kontesList.value) return []
  if (!searchQuery.value.trim()) return kontesList.value

  const q = searchQuery.value.toLowerCase().trim()
  return kontesList.value.filter(k => 
    k.nama.toLowerCase().includes(q) || 
    k.instansi.nama.toLowerCase().includes(q) ||
    (k.deskripsi && k.deskripsi.toLowerCase().includes(q))
  )
})

const defaultBanners = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
]

const getBannerUrl = (id: number) => {
  return defaultBanners[Math.abs(id) % defaultBanners.length]
}

const getStatusLabel = (kontes: KontesPublicItem) => {
  if (kontes.tanggalSelesai) {
    const end = new Date(kontes.tanggalSelesai).getTime()
    const now = Date.now()
    const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24))
    if (diffDays > 0) {
      return `${diffDays} hari lagi`
    } else if (diffDays === 0) {
      return 'Hari terakhir'
    }
  }
  return 'Sesi Berlangsung'
}
</script>
