<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between bg-[#f3f3f3] border border-[#e0e0e0] rounded-3xl p-5 sm:p-6 gap-4">
    <div class="flex items-center space-x-3.5">
      <div class="w-10 h-10 rounded-[30%] bg-white border border-[#e0e0e0] flex items-center justify-center text-[#141414] shrink-0 font-bold">
        🗳️
      </div>
      <div>
        <h3 class="text-base font-bold text-[#141414]">
          {{ isClosed ? 'Voting Telah Ditutup' : 'Siap Memberikan Suara?' }}
        </h3>
        <p class="text-xs text-[#707070] font-light">
          {{ isClosed 
            ? 'Kontes ini telah resmi berakhir. Terima kasih atas partisipasi Anda.' 
            : isDraft 
            ? 'Kontes ini belum dibuka. Pantau terus untuk mendapatkan info voting terbaru.' 
            : 'Gunakan token suara Anda atau beli paket token langsung via WhatsApp panitia.' }}
        </p>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-2 shrink-0">
      <button 
        type="button"
        class="btn-pill-soft h-9 text-xs"
        @click="$emit('openGuide')"
      >
        <HelpCircle class="w-4 h-4 text-[#707070]" />
        <span>Petunjuk Vote</span>
      </button>
      <button 
        v-if="!isClosed"
        type="button"
        class="btn-outline h-9 text-xs"
        @click="$emit('scrollToBeli')"
      >
        Beli Token via WA
      </button>
      <button 
        type="button"
        :disabled="isDraft || isClosed"
        :title="isClosed ? 'Voting telah ditutup.' : isDraft ? 'Voting belum dibuka. Kontes masih dalam status DRAFT.' : ''"
        class="btn-primary h-9 text-xs disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
        @click="!isDraft && !isClosed && $emit('openVote')"
      >
        {{ isClosed ? 'Voting Ditutup' : 'Masukkan Token' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HelpCircle } from 'lucide-vue-next'

defineProps<{
  isDraft?: boolean
  isClosed?: boolean
}>()

defineEmits<{
  (e: 'openGuide'): void
  (e: 'scrollToBeli'): void
  (e: 'openVote'): void
}>()
</script>
