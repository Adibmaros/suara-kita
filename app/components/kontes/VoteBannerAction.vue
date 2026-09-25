<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs gap-4">
    <div class="flex items-center space-x-3">
      <span class="text-2xl sm:text-3xl">🗳️</span>
      <div>
        <h3 class="text-sm sm:text-base font-bold text-slate-900">
          {{ isClosed ? 'Voting Telah Ditutup' : 'Siap Memberikan Suara?' }}
        </h3>
        <p class="text-xs text-slate-500">
          {{ isClosed 
            ? 'Kontes ini telah resmi berakhir. Terima kasih atas partisipasi Anda.' 
            : isDraft 
            ? 'Kontes ini belum dibuka. Pantau terus untuk mendapatkan info voting terbaru.' 
            : 'Gunakan token suara Anda atau beli paket token langsung via WhatsApp.' }}
        </p>
      </div>
    </div>

    <div class="flex items-center space-x-2 shrink-0">
      <button 
        class="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
        @click="$emit('openGuide')"
      >
        <HelpCircle class="w-4 h-4" />
        <span>Petunjuk Vote</span>
      </button>
      <button 
        v-if="!isClosed"
        class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs rounded-xl transition-all cursor-pointer"
        @click="$emit('scrollToBeli')"
      >
        Belum Punya Token? Beli Token
      </button>
      <button 
        :disabled="isDraft || isClosed"
        :title="isClosed ? 'Voting telah ditutup.' : isDraft ? 'Voting belum dibuka. Kontes masih dalam status DRAFT.' : ''"
        class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
        @click="!isDraft && !isClosed && $emit('openVote')"
      >
        {{ isClosed ? 'Voting Ditutup' : 'Masukan Token' }}
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
