<template>
  <div class="space-y-8 pb-12">
    <!-- Header Admin Dashboard -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] font-medium text-xs mb-1">
          <span class="w-1.5 h-1.5 rounded-full bg-[#141414]"></span>
          <span>Portal Pengurus Instansi</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">
          Ringkasan & Aktivitas.
        </h1>
        <p class="text-xs sm:text-sm text-[#707070] font-light max-w-xl">
          Pantau performa voting, omset penjualan token, dan verifikasi pesanan voter secara real-time.
        </p>
      </div>

      <NuxtLink 
        to="/admin/kontes" 
        class="inline-flex items-center justify-center gap-2 px-5 h-10 bg-[#141414] hover:bg-[#262626] text-white font-medium text-xs sm:text-sm rounded-full transition-colors cursor-pointer shrink-0 w-full sm:w-auto"
      >
        <Plus class="w-4 h-4" :stroke-width="2" />
        <span>Kelola Kontes</span>
      </NuxtLink>
    </div>

    <!-- Skeleton Loading State -->
    <div v-if="pending" class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div v-for="i in 4" :key="i" class="h-36 rounded-3xl bg-[#f3f3f3] border border-[#e0e0e0] animate-pulse"></div>
      </div>
      <div class="h-32 rounded-3xl bg-[#f3f3f3] border border-[#e0e0e0] animate-pulse"></div>
    </div>

    <!-- Main Stats Section -->
    <div v-else-if="stats" class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <!-- Card 1: Total Kontes -->
        <NuxtLink 
          to="/admin/kontes" 
          class="group rounded-3xl border border-[#e0e0e0] bg-white hover:border-[#141414] p-6 flex flex-col justify-between transition-colors duration-200"
        >
          <div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-[#707070]">Total kontes</span>
              <div class="w-10 h-10 rounded-2xl bg-[#f3f3f3] text-[#141414] flex items-center justify-center shrink-0 group-hover:bg-[#141414] group-hover:text-white transition-colors duration-200">
                <Vote class="w-4 h-4" :stroke-width="1.75" />
              </div>
            </div>
            <h3 class="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight mt-3 tabular-nums">
              {{ stats.totalKontes }}
            </h3>
            <p class="text-xs text-[#adadad] mt-1 font-light">Event kontes terdaftar</p>
          </div>
          <div class="mt-5 pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-medium text-[#707070] group-hover:text-[#141414] transition-colors">
            <span>Daftar kontes</span>
            <ArrowUpRight class="w-3.5 h-3.5 text-[#adadad] group-hover:text-[#141414] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" :stroke-width="1.75" />
          </div>
        </NuxtLink>

        <!-- Card 2: Menunggu Verifikasi -->
        <NuxtLink 
          to="/admin/kontes" 
          class="group rounded-3xl border p-6 flex flex-col justify-between transition-colors duration-200"
          :class="stats.pendingOrdersCount > 0 
            ? 'border-[#141414] bg-white' 
            : 'border-[#e0e0e0] bg-white hover:border-[#141414]'"
        >
          <div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-[#707070]">Menunggu verifikasi</span>
              <div 
                class="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-200"
                :class="stats.pendingOrdersCount > 0 
                  ? 'bg-[#141414] text-white' 
                  : 'bg-[#f3f3f3] text-[#141414] group-hover:bg-[#141414] group-hover:text-white'"
              >
                <Clock3 class="w-4 h-4" :stroke-width="1.75" />
              </div>
            </div>
            <div class="flex items-baseline gap-2 mt-3">
              <h3 class="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight tabular-nums">
                {{ stats.pendingOrdersCount }}
              </h3>
              <span 
                v-if="stats.pendingOrdersCount > 0" 
                class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0066ff]/10 text-[#0066ff] text-[10px] font-semibold border border-[#0066ff]/20"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-pulse"></span>
                Perlu tindakan
              </span>
            </div>
            <p class="text-xs text-[#adadad] mt-1 font-light">Order token menunggu persetujuan</p>
          </div>
          <div class="mt-5 pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-medium text-[#707070] group-hover:text-[#141414] transition-colors">
            <span>Verifikasi order token</span>
            <ArrowUpRight class="w-3.5 h-3.5 text-[#adadad] group-hover:text-[#141414] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" :stroke-width="1.75" />
          </div>
        </NuxtLink>

        <!-- Card 3: Total Omset Penjualan -->
        <NuxtLink 
          to="/admin/kontes" 
          class="group rounded-3xl border border-[#e0e0e0] bg-white hover:border-[#141414] p-6 flex flex-col justify-between transition-colors duration-200"
        >
          <div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-[#707070]">Total omset kotor</span>
              <div class="w-10 h-10 rounded-2xl bg-[#f3f3f3] text-[#141414] flex items-center justify-center shrink-0 group-hover:bg-[#141414] group-hover:text-white transition-colors duration-200">
                <Wallet class="w-4 h-4" :stroke-width="1.75" />
              </div>
            </div>
            <h3 class="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight mt-3 tabular-nums">
              Rp {{ stats.totalPendapatan.toLocaleString('id-ID') }}
            </h3>
            <p class="text-xs text-[#adadad] mt-1 font-light">Total pendapatan kotor token</p>
          </div>
          <div class="mt-5 pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-medium text-[#707070] group-hover:text-[#141414] transition-colors">
            <span>Rincian per kontes</span>
            <ArrowUpRight class="w-3.5 h-3.5 text-[#adadad] group-hover:text-[#141414] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" :stroke-width="1.75" />
          </div>
        </NuxtLink>

        <!-- Card 4: Potongan Komisi Platform -->
        <div class="rounded-3xl border border-[#e0e0e0] bg-white p-6 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-[#707070]">Bagi hasil ({{ stats.persenKomisi }}%)</span>
              <div class="w-10 h-10 rounded-2xl bg-[#f3f3f3] text-[#141414] flex items-center justify-center shrink-0">
                <BadgePercent class="w-4 h-4" :stroke-width="1.75" />
              </div>
            </div>
            <h3 class="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight mt-3 tabular-nums">
              Rp {{ stats.totalPlatformFee.toLocaleString('id-ID') }}
            </h3>
            <p class="text-xs text-[#adadad] mt-1 font-light">Komisi pemeliharaan platform</p>
          </div>
          <div class="mt-5 pt-3 border-t border-[#f0f0f0] text-xs text-[#adadad] font-light">
            Biaya operasional & cloud platform
          </div>
        </div>
      </div>

      <!-- Pendapatan Bersih Banner (Polarity Inversion Surface) -->
      <div class="bg-[#141414] text-white rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border border-[#262626]">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-medium text-xs border border-white/10">
            <Sparkles class="w-3.5 h-3.5 text-white" :stroke-width="1.75" />
            <span>Estimasi Bersih Siap Cair.</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
            Rp {{ stats.pendapatanBersih.toLocaleString('id-ID') }}
          </h2>
          <p class="text-xs sm:text-sm text-[#adadad] font-light leading-relaxed max-w-2xl">
            Hasil omset kotor Rp {{ stats.totalPendapatan.toLocaleString('id-ID') }} dikurangi komisi platform {{ stats.persenKomisi }}% (Rp {{ stats.totalPlatformFee.toLocaleString('id-ID') }}). Dana voting masuk langsung ke rekening instansi yang terdaftar.
          </p>
        </div>

        <NuxtLink 
          to="/admin/profil" 
          class="inline-flex items-center justify-center gap-2 px-6 h-10 bg-white hover:bg-[#f3f3f3] text-[#141414] font-medium text-xs sm:text-sm rounded-full transition-colors whitespace-nowrap shrink-0 w-full lg:w-auto cursor-pointer"
        >
          <Landmark class="w-4 h-4 text-[#141414]" :stroke-width="1.75" />
          <span>Rekening Pencairan ↗</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Quick Actions Grid -->
    <div class="space-y-4">
      <div>
        <h2 class="text-base sm:text-lg font-bold text-[#141414] tracking-tight">Alur Kerja Cepat.</h2>
        <p class="text-xs sm:text-sm text-[#707070] font-light mt-0.5">Navigasi langsung ke modul manajemen voting instansi Anda</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <!-- Action 1: Kelola Kontes -->
        <NuxtLink 
          to="/admin/kontes" 
          class="group bg-white border border-[#e0e0e0] hover:border-[#141414] rounded-3xl p-6 transition-colors duration-200 flex flex-col justify-between"
        >
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-[#f3f3f3] text-[#141414] flex items-center justify-center group-hover:bg-[#141414] group-hover:text-white transition-colors duration-200 shrink-0">
              <Vote class="w-5 h-5" :stroke-width="1.75" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-[#141414] tracking-tight">Kelola Kontes</h3>
              <p class="text-xs text-[#707070] mt-1 font-light leading-relaxed">
                Buat kontes baru, atur paslon kandidat, dan pantau status publikasi.
              </p>
            </div>
          </div>
          <div class="mt-5 pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-semibold text-[#141414]">
            <span>Buka Kontes</span>
            <ArrowUpRight class="w-3.5 h-3.5 text-[#adadad] group-hover:text-[#141414] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" :stroke-width="1.75" />
          </div>
        </NuxtLink>

        <!-- Action 2: Verifikasi Order -->
        <NuxtLink 
          to="/admin/kontes" 
          class="group bg-white border border-[#e0e0e0] hover:border-[#141414] rounded-3xl p-6 transition-colors duration-200 flex flex-col justify-between"
        >
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="w-12 h-12 rounded-2xl bg-[#f3f3f3] text-[#141414] flex items-center justify-center group-hover:bg-[#141414] group-hover:text-white transition-colors duration-200 shrink-0">
                <FileCheck class="w-5 h-5" :stroke-width="1.75" />
              </div>
              <span 
                v-if="stats?.pendingOrdersCount && stats.pendingOrdersCount > 0" 
                class="px-2.5 py-0.5 text-[10px] font-semibold bg-[#0066ff] text-white rounded-full"
              >
                {{ stats.pendingOrdersCount }} pending
              </span>
            </div>
            <div>
              <h3 class="text-sm font-bold text-[#141414] tracking-tight">Verifikasi Order</h3>
              <p class="text-xs text-[#707070] mt-1 font-light leading-relaxed">
                Cek bukti transfer voter dan setujui token suara yang dipesan.
              </p>
            </div>
          </div>
          <div class="mt-5 pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-semibold text-[#141414]">
            <span>Verifikasi Order</span>
            <ArrowUpRight class="w-3.5 h-3.5 text-[#adadad] group-hover:text-[#141414] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" :stroke-width="1.75" />
          </div>
        </NuxtLink>

        <!-- Action 3: Rekap Hasil Voting -->
        <NuxtLink 
          to="/admin/kontes" 
          class="group bg-white border border-[#e0e0e0] hover:border-[#141414] rounded-3xl p-6 transition-colors duration-200 flex flex-col justify-between"
        >
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-[#f3f3f3] text-[#141414] flex items-center justify-center group-hover:bg-[#141414] group-hover:text-white transition-colors duration-200 shrink-0">
              <TrendingUp class="w-5 h-5" :stroke-width="1.75" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-[#141414] tracking-tight">Rekapitulasi Suara</h3>
              <p class="text-xs text-[#707070] mt-1 font-light leading-relaxed">
                Lihat perolehan suara tiap kandidat secara real-time dan transparan.
              </p>
            </div>
          </div>
          <div class="mt-5 pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-semibold text-[#141414]">
            <span>Lihat Hasil Rekap</span>
            <ArrowUpRight class="w-3.5 h-3.5 text-[#adadad] group-hover:text-[#141414] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" :stroke-width="1.75" />
          </div>
        </NuxtLink>

        <!-- Action 4: Profil Instansi -->
        <NuxtLink 
          to="/admin/profil" 
          class="group bg-white border border-[#e0e0e0] hover:border-[#141414] rounded-3xl p-6 transition-colors duration-200 flex flex-col justify-between"
        >
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-[#f3f3f3] text-[#141414] flex items-center justify-center group-hover:bg-[#141414] group-hover:text-white transition-colors duration-200 shrink-0">
              <Landmark class="w-5 h-5" :stroke-width="1.75" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-[#141414] tracking-tight">Profil & Rekening</h3>
              <p class="text-xs text-[#707070] mt-1 font-light leading-relaxed">
                Konfigurasi rekening tujuan transfer voter dan nomor WhatsApp panitia.
              </p>
            </div>
          </div>
          <div class="mt-5 pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-semibold text-[#141414]">
            <span>Buka Pengaturan</span>
            <ArrowUpRight class="w-3.5 h-3.5 text-[#adadad] group-hover:text-[#141414] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" :stroke-width="1.75" />
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Recent Contests Quick Preview Section -->
    <div v-if="recentKontes?.data && recentKontes.data.length > 0" class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-base sm:text-lg font-bold text-[#141414] tracking-tight">Kontes Terbaru.</h2>
          <p class="text-xs sm:text-sm text-[#707070] font-light mt-0.5">Daftar event kontes pemilihan yang terakhir diperbarui</p>
        </div>
        <NuxtLink 
          to="/admin/kontes" 
          class="inline-flex items-center gap-1 text-xs font-semibold text-[#141414] hover:text-[#707070] transition-colors"
        >
          <span>Semua Kontes</span>
          <ArrowUpRight class="w-3.5 h-3.5" :stroke-width="1.75" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div 
          v-for="kontes in recentKontes.data" 
          :key="kontes.id"
          class="rounded-3xl border border-[#e0e0e0] bg-white p-5 flex flex-col justify-between hover:border-[#141414] transition-colors duration-200"
        >
          <div class="space-y-3">
            <div class="flex items-center justify-between gap-2">
              <span 
                class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1.5"
                :class="{
                  'bg-[#141414] text-white': kontes.status === 'AKTIF',
                  'bg-[#f3f3f3] text-[#707070] border border-[#e0e0e0]': kontes.status === 'DRAFT',
                  'bg-[#f0f0f0] text-[#adadad]': kontes.status === 'SELESAI'
                }"
              >
                <span 
                  v-if="kontes.status === 'AKTIF'" 
                  class="w-1.5 h-1.5 rounded-full bg-emerald-400"
                ></span>
                {{ kontes.status }}
              </span>

              <span class="text-[11px] text-[#adadad] font-light">
                {{ kontes._count?.kandidat || 0 }} Paslon
              </span>
            </div>

            <div>
              <h4 class="text-sm font-bold text-[#141414] line-clamp-1 tracking-tight">
                {{ kontes.judul }}
              </h4>
              <p class="text-xs text-[#707070] line-clamp-2 mt-1 font-light leading-relaxed">
                {{ kontes.deskripsi || 'Tidak ada deskripsi kontes.' }}
              </p>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-xs">
            <span class="text-[11px] text-[#adadad] font-light">
              {{ kontes._count?.tokenPackages || 0 }} Paket Token
            </span>
            <NuxtLink 
              :to="`/admin/kontes/${kontes.id}`" 
              class="inline-flex items-center gap-1 font-semibold text-[#141414] hover:underline"
            >
              <span>Detail</span>
              <ArrowUpRight class="w-3.5 h-3.5 text-[#707070]" :stroke-width="1.75" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Vote, 
  Clock3, 
  Wallet, 
  BadgePercent, 
  ArrowUpRight, 
  Sparkles, 
  FileCheck, 
  TrendingUp, 
  Landmark, 
  Plus 
} from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin'],
})

const { data: stats, pending } = await useFetch('/api/admin/stats')
const { data: recentKontes } = await useFetch('/api/admin/kontes', {
  query: { perPage: 3 }
})
</script>
