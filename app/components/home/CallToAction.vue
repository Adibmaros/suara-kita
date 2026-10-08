<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
    <div class="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-slate-900 text-white shadow-xl border border-slate-800">
      <!-- Background Ambient Glow -->
      <div class="absolute -right-8 -bottom-8 w-56 h-56 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>
      <div class="absolute -left-8 -top-8 w-56 h-56 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none"></div>

      <div class="relative flex flex-col items-center text-center max-w-xl mx-auto space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-emerald-400 shadow-sm mb-1">
          <MessageSquare class="w-6 h-6" />
        </div>

        <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          Ingin Mengadakan Kontes Pemilihan di Organisasi Anda?
        </h3>

        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Hubungi tim SuaraKita untuk konsultasi pengaktifan akun instansi, pengaturan bilik suara digital, dan panduan penggunaan bagi pengurus komunitas atau organisasi.
        </p>

        <!-- WhatsApp Consultation Button -->
        <div class="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <a
            :href="waConsultationUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center space-x-2.5 w-full sm:w-auto py-3 px-7 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-98"
          >
            <MessageSquare class="w-4 h-4 fill-white" />
            <span>Konsultasi via WhatsApp</span>
          </a>

          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center space-x-2 w-full sm:w-auto py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/10 transition-all active:scale-98"
          >
            <Building2 class="w-4 h-4" />
            <span>Daftar Instansi</span>
          </NuxtLink>
        </div>

        <span class="text-[11px] text-slate-400 flex items-center justify-center space-x-1.5 pt-1">
          <ShieldCheck class="w-3.5 h-3.5 text-emerald-400" />
          <span>Layanan Resmi untuk Instansi, Komunitas, Sekolah, & Organisasi</span>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MessageSquare, Building2, ShieldCheck } from 'lucide-vue-next'

const superAdminWaNumber = '6281234567890'
const messageText = encodeURIComponent('Halo Admin SuaraKita, saya pengurus organisasi ingin konsultasi mengenai pendaftaran instansi & penyelenggaraan kontes e-voting.')
const waConsultationUrl = `https://wa.me/${superAdminWaNumber}?text=${messageText}`
</script>
