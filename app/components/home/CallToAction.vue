<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
    <!-- Polarity-Flipped Ink Surface (24px rounded) -->
    <div class="relative overflow-hidden rounded-3xl p-8 sm:p-14 bg-[#141414] text-white">
      <div class="relative flex flex-col items-center text-center max-w-xl mx-auto space-y-5">
        <div class="w-12 h-12 rounded-[30%] bg-white/10 flex items-center justify-center text-white mb-1">
          <MessageSquare class="w-5 h-5" />
        </div>

        <h3 class="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
          Ingin menyelenggarakan kontes e-voting di kampus kamu?
        </h3>

        <p class="text-xs sm:text-sm text-[#adadad] font-light leading-relaxed">
          Konsultasikan kebutuhan voting ormawa, pemilihan ketua himpunan, atau duta kampus bersama tim SuaraKita. Gratis konsultasi dan panduan setup hingga tuntas.
        </p>

        <!-- CTA Stadium Buttons (White Pill on Dark Canvas) -->
        <div class="pt-3 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <a
            :href="waConsultationUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center space-x-2 h-11 px-7 rounded-full bg-white text-[#141414] font-semibold text-xs sm:text-sm hover:bg-[#f3f3f3] transition-all w-full sm:w-auto active:scale-[0.98]"
          >
            <MessageSquare class="w-4 h-4 fill-[#141414]" />
            <span>Konsultasi via WhatsApp</span>
          </a>

          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center space-x-2 h-11 px-7 rounded-full bg-transparent text-white font-semibold text-xs sm:text-sm border border-[#383838] hover:bg-white/10 transition-all w-full sm:w-auto active:scale-[0.98]"
          >
            <Building2 class="w-4 h-4" />
            <span>Daftar Instansi</span>
          </NuxtLink>
        </div>

        <span class="text-[11px] text-[#707070] flex items-center justify-center space-x-1.5 pt-2">
          <ShieldCheck class="w-3.5 h-3.5 text-[#adadad]" />
          <span>Layanan Resmi untuk Ormawa, BEM, Himpunan, UKM & Komunitas</span>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MessageSquare, Building2, ShieldCheck } from 'lucide-vue-next'

const superAdminWaNumber = '6281234567890'
const messageText = encodeURIComponent('Halo Admin SuaraKita, saya pengurus ormawa kampus ingin konsultasi mengenai penyelenggaraan e-voting.')
const waConsultationUrl = `https://wa.me/${superAdminWaNumber}?text=${messageText}`
</script>
