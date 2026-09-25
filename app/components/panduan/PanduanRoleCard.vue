<template>
  <section id="peran" class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="text-center space-y-3 mb-10 sm:mb-12">
      <div class="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200/80">
        <Users class="w-3.5 h-3.5 text-emerald-600" />
        <span>Ekosistem Pengguna</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Peran & Tipe Pengguna</h2>
      <p class="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
        Setiap peran memiliki hak akses dan alur kerja yang sudah disesuaikan agar event pemungutan suara berjalan efisien.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
      <!-- Admin Instansi Card -->
      <div class="bg-white border-2 border-slate-200/90 rounded-3xl p-7 space-y-5 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between">
        <div class="space-y-4">
          <div class="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">
            <Building2 class="w-7 h-7" />
          </div>
          <div>
            <div class="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
              Pengelola Event
            </div>
            <h3 class="text-lg font-black text-slate-900">Admin Instansi</h3>
          </div>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Peran untuk panitia/organisasi kampus. Mendaftar secara gratis, membuat event kontes, menginput kandidat, menentukan paket token, dan memverifikasi pesanan pendukung via WA.
          </p>
        </div>

        <ul class="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <li class="flex items-center space-x-2">
            <CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Pendaftaran 100% Gratis</span>
          </li>
          <li class="flex items-center space-x-2">
            <CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Kontes & Kandidat Tak Terbatas</span>
          </li>
          <li class="flex items-center space-x-2">
            <CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Verifikasi Bayar & Terbit Token</span>
          </li>
        </ul>
      </div>

      <!-- Voter / Pendukung Card -->
      <div class="bg-white border-2 border-slate-200/90 rounded-3xl p-7 space-y-5 hover:border-amber-500 hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between">
        <div class="space-y-4">
          <div class="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
            <Smartphone class="w-7 h-7" />
          </div>
          <div>
            <div class="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 mb-2">
              Publik / Pendukung
            </div>
            <h3 class="text-lg font-black text-slate-900">Voter / Pendukung</h3>
          </div>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Masyarakat umum atau mahasiswa pendukung kandidat. Tidak memerlukan pendaftaran akun, bisa membeli token dukungan via WhatsApp, dan melakukan voting langsung.
          </p>
        </div>

        <ul class="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <li class="flex items-center space-x-2">
            <CheckCircle2 class="w-4 h-4 text-amber-500 shrink-0" />
            <span>Tanpa Login / Registrasi Akun</span>
          </li>
          <li class="flex items-center space-x-2">
            <CheckCircle2 class="w-4 h-4 text-amber-500 shrink-0" />
            <span>Multi-Vote (Beli Token Lagi)</span>
          </li>
          <li class="flex items-center space-x-2">
            <CheckCircle2 class="w-4 h-4 text-amber-500 shrink-0" />
            <span>Beli Token Langsung via WhatsApp</span>
          </li>
        </ul>
      </div>

      <!-- Super Admin Card -->
      <div class="bg-white border-2 border-slate-200/90 rounded-3xl p-7 space-y-5 hover:border-slate-900 hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between">
        <div class="space-y-4">
          <div class="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/20 group-hover:scale-110 transition-transform">
            <ShieldCheck class="w-7 h-7" />
          </div>
          <div>
            <div class="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-800 bg-slate-200 mb-2">
              Pengelola Platform
            </div>
            <h3 class="text-lg font-black text-slate-900">Super Admin</h3>
          </div>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Tim internal SuaraKita yang menyetujui pendaftaran instansi baru, memantau seluruh aktivitas kontes, dan merekapitulasi bagian komisi 20% platform secara berkala.
          </p>
        </div>

        <ul class="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <li class="flex items-center space-x-2">
            <CheckCircle2 class="w-4 h-4 text-slate-900 shrink-0" />
            <span>Persetujuan Registrasi Instansi</span>
          </li>
          <li class="flex items-center space-x-2">
            <CheckCircle2 class="w-4 h-4 text-slate-900 shrink-0" />
            <span>Monitoring Lintas Instansi</span>
          </li>
          <li class="flex items-center space-x-2">
            <CheckCircle2 class="w-4 h-4 text-slate-900 shrink-0" />
            <span>Rekap Komisi 20% Platform</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Users, Building2, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-vue-next'
</script>
