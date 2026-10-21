<template>
  <section id="peran" class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center space-y-3 mb-10 sm:mb-14">
      <div class="inline-flex items-center space-x-2 text-xs font-semibold text-[#707070] bg-[#f3f3f3] px-3.5 py-1 rounded-full border border-[#e0e0e0]">
        <Users class="w-3.5 h-3.5 text-[#141414]" />
        <span>Ekosistem Pengguna</span>
      </div>
      <h2 class="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight">
        Peran dan tipe pengguna.
      </h2>
      <p class="text-sm font-light text-[#707070] max-w-xl mx-auto">
        Setiap peran memiliki hak akses dan alur kerja yang sudah disesuaikan agar event pemungutan suara berjalan efisien.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Admin Instansi Card (Featured card: #f3f3f3 fill, borderless, 24px) -->
      <div class="bg-[#f3f3f3] rounded-3xl p-7 space-y-5 flex flex-col justify-between">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center">
            <Building2 class="w-6 h-6" />
          </div>
          <div>
            <div class="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#141414] bg-white border border-[#e0e0e0] mb-2.5">
              Panitia / Ormawa
            </div>
            <h3 class="text-xl font-bold text-[#141414]">Admin Instansi</h3>
          </div>
          <p class="text-xs sm:text-sm text-[#707070] leading-relaxed">
            Peran untuk pengurus BEM, HIMA, atau panitia event. Mendaftar secara gratis, membuat kontes, mengunggah kandidat, dan memverifikasi pesanan token via WhatsApp.
          </p>
        </div>

        <ul class="pt-5 border-t border-[#e0e0e0] space-y-2.5 text-xs text-[#141414]">
          <li class="flex items-center space-x-2.5">
            <CheckCircle2 class="w-4 h-4 text-[#141414] shrink-0" />
            <span>Pendaftaran 100% Gratis</span>
          </li>
          <li class="flex items-center space-x-2.5">
            <CheckCircle2 class="w-4 h-4 text-[#141414] shrink-0" />
            <span>Kontes & Kandidat Tak Terbatas</span>
          </li>
          <li class="flex items-center space-x-2.5">
            <CheckCircle2 class="w-4 h-4 text-[#141414] shrink-0" />
            <span>Verifikasi & Terbitkan Token</span>
          </li>
        </ul>
      </div>

      <!-- Voter / Pendukung Card -->
      <div class="bg-white border border-[#e0e0e0] rounded-3xl p-7 space-y-5 flex flex-col justify-between">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-[30%] bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] flex items-center justify-center">
            <Smartphone class="w-6 h-6" />
          </div>
          <div>
            <div class="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#707070] bg-[#f3f3f3] border border-[#f0f0f0] mb-2.5">
              Publik / Mahasiswa
            </div>
            <h3 class="text-xl font-bold text-[#141414]">Voter / Pendukung</h3>
          </div>
          <p class="text-xs sm:text-sm text-[#707070] leading-relaxed">
            Masyarakat kampus atau pendukung kandidat. Tidak memerlukan pendaftaran akun, dapat membeli token suara via WhatsApp panitia, dan langsung memilih.
          </p>
        </div>

        <ul class="pt-5 border-t border-[#f0f0f0] space-y-2.5 text-xs text-[#141414]">
          <li class="flex items-center space-x-2.5">
            <CheckCircle2 class="w-4 h-4 text-[#141414] shrink-0" />
            <span>Tanpa Perlu Bikin Akun</span>
          </li>
          <li class="flex items-center space-x-2.5">
            <CheckCircle2 class="w-4 h-4 text-[#141414] shrink-0" />
            <span>Multi-Vote Dukungan Suara</span>
          </li>
          <li class="flex items-center space-x-2.5">
            <CheckCircle2 class="w-4 h-4 text-[#141414] shrink-0" />
            <span>Beli Token Langsung via WA</span>
          </li>
        </ul>
      </div>

      <!-- Super Admin Card -->
      <div class="bg-white border border-[#e0e0e0] rounded-3xl p-7 space-y-5 flex flex-col justify-between">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center">
            <ShieldCheck class="w-6 h-6" />
          </div>
          <div>
            <div class="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#707070] bg-[#f3f3f3] border border-[#f0f0f0] mb-2.5">
              Tim Platform
            </div>
            <h3 class="text-xl font-bold text-[#141414]">Super Admin</h3>
          </div>
          <p class="text-xs sm:text-sm text-[#707070] leading-relaxed">
            Tim internal SuaraKita yang menyetujui pendaftaran ormawa baru, memonitor kepatuhan platform, dan mengelola rekapitulasi komisi platform secara transparan.
          </p>
        </div>

        <ul class="pt-5 border-t border-[#f0f0f0] space-y-2.5 text-xs text-[#141414]">
          <li class="flex items-center space-x-2.5">
            <CheckCircle2 class="w-4 h-4 text-[#141414] shrink-0" />
            <span>Persetujuan Akun Instansi</span>
          </li>
          <li class="flex items-center space-x-2.5">
            <CheckCircle2 class="w-4 h-4 text-[#141414] shrink-0" />
            <span>Monitoring Aktivitas Kontes</span>
          </li>
          <li class="flex items-center space-x-2.5">
            <CheckCircle2 class="w-4 h-4 text-[#141414] shrink-0" />
            <span>Rekap Komisi Platform</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Users, Building2, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-vue-next'
</script>
