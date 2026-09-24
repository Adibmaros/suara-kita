<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div class="relative z-50 w-full max-w-lg bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        <!-- Header Modal -->
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 class="text-base font-bold text-slate-900">
              {{ voteStep === 1 ? 'Redeem Token Suara' : 'Konfirmasi Pilihan Suara Anda' }}
            </h3>
            <p class="text-xs text-slate-500">Langkah {{ voteStep }} dari 2</p>
          </div>
          <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Error / Success Messages -->
        <div v-if="errorMsg" class="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
          <span>{{ errorMsg }}</span>
        </div>
        <div v-if="successMsg" class="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{{ successMsg }}</span>
        </div>

        <!-- STEP 1: Input Token & Candidate Search Picker -->
        <form v-if="voteStep === 1" @submit.prevent="$emit('proceedStep2')" class="space-y-4">
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Kode Token Suara <span class="text-rose-500">*</span></label>
            <input
              :value="tokenCode"
              @input="$emit('update:tokenCode', ($event.target as HTMLInputElement).value)"
              type="text"
              placeholder="cth: SK-X7Y9Z1A2"
              required
              class="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors uppercase font-mono font-bold"
            />
            <p class="text-[11px] text-slate-400">Kode token yang Anda dapatkan setelah pembayaran diverifikasi admin</p>
          </div>

          <!-- Candidate Search Picker -->
          <div class="space-y-2">
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Pilih Kandidat Dukungan <span class="text-rose-500">*</span>
            </label>

            <!-- Live Search Box -->
            <div class="relative">
              <Search class="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                :value="candidateSearch"
                @input="$emit('update:candidateSearch', ($event.target as HTMLInputElement).value)"
                type="text"
                placeholder="Cari nama kandidat..."
                class="w-full h-9 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <!-- Candidates Selection List -->
            <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
              <div 
                v-if="filteredKandidat.length === 0" 
                class="p-4 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200"
              >
                Kandidat tidak ditemukan
              </div>

              <div 
                v-for="k in filteredKandidat" 
                :key="k.id"
                @click="$emit('update:kandidatId', k.id)"
                class="flex items-center space-x-3 p-3 rounded-xl border transition-all cursor-pointer"
                :class="kandidatId === k.id ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-600' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'"
              >
                <img 
                  v-if="k.fotoUrl" 
                  :src="k.fotoUrl" 
                  class="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0" 
                />
                <div v-else class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  👤
                </div>

                <div class="flex-1 min-w-0">
                  <div class="font-bold text-slate-900 text-xs truncate">{{ k.nama }}</div>
                  <div v-if="k.deskripsi" class="text-[10px] text-slate-500 truncate">{{ k.deskripsi }}</div>
                </div>

                <div 
                  class="w-5 h-5 rounded-full border flex items-center justify-center shrink-0"
                  :class="kandidatId === k.id ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'"
                >
                  <CheckCircle2 v-if="kandidatId === k.id" class="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          <div class="pt-3 flex justify-end space-x-2 border-t border-slate-100">
            <button 
              type="button" 
              @click="$emit('close')"
              class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>

            <button
              type="submit"
              :disabled="!tokenCode || !kandidatId"
              class="inline-flex items-center justify-center px-4 h-9 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs active:scale-95"
            >
              <span>Lanjut Konfirmasi Suara →</span>
            </button>
          </div>
        </form>

        <!-- STEP 2: Second Verification (Konfirmasi Ulang Sebelum Kirim Suara) -->
        <div v-else-if="voteStep === 2" class="space-y-4">
          <div class="p-4 bg-amber-50 border border-amber-200/80 rounded-2xl text-amber-900 space-y-1">
            <div class="flex items-center space-x-2 text-xs font-bold">
              <AlertCircle class="w-4 h-4 text-amber-600 shrink-0" />
              <span>Verifikasi Pilihan Suara Anda</span>
            </div>
            <p class="text-[11px] text-amber-800 leading-relaxed">
              Harap pastikan kandidat yang Anda pilih sudah benar. Setiap kode token hanya dapat digunakan **1 (satu) kali** dan tidak dapat diubah setelah dikirim.
            </p>
          </div>

          <!-- Selected Candidate Summary Card -->
          <div v-if="selectedKandidat" class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kandidat Pilihan Anda:</div>
            <div class="flex items-center space-x-3 bg-white p-3 rounded-xl border border-slate-200">
              <img 
                v-if="selectedKandidat.fotoUrl" 
                :src="selectedKandidat.fotoUrl" 
                class="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" 
              />
              <div v-else class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                👤
              </div>
              <div>
                <h4 class="font-extrabold text-slate-900 text-sm">{{ selectedKandidat.nama }}</h4>
                <span class="text-[11px] text-blue-600 font-semibold">Pilihan Sah Voter</span>
              </div>
            </div>

            <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-200/80">
              <span class="text-slate-500">Kode Token:</span>
              <span class="font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">{{ tokenCode }}</span>
            </div>
          </div>

          <div class="pt-2 flex justify-between items-center border-t border-slate-100">
            <button 
              type="button" 
              @click="$emit('backStep1')"
              class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              :disabled="voting"
            >
              ← Kembali & Ubah
            </button>

            <button
              type="button"
              @click="$emit('submitVote')"
              :disabled="voting"
              class="inline-flex items-center justify-center px-4 h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs active:scale-95"
            >
              <Loader2 v-if="voting" class="w-4 h-4 mr-2 animate-spin" />
              <span>{{ voting ? 'Mengirimkan Suara...' : 'Ya, Kirim Suara Sekarang!' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X, AlertCircle, CheckCircle2, Search, Loader2 } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
  voteStep: number
  tokenCode: string
  kandidatId: number | null
  candidateSearch: string
  filteredKandidat: any[]
  selectedKandidat: any
  voting: boolean
  errorMsg: string
  successMsg: string
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'proceedStep2'): void
  (e: 'backStep1'): void
  (e: 'submitVote'): void
  (e: 'update:tokenCode', val: string): void
  (e: 'update:kandidatId', val: number | null): void
  (e: 'update:candidateSearch', val: string): void
}>()
</script>
