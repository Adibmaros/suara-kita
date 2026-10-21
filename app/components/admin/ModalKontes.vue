<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white border border-[#e0e0e0] rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl overflow-y-auto max-h-[90vh]">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-base sm:text-lg font-bold text-[#141414] tracking-tight">
            {{ isEdit ? 'Edit Rincian Kontes' : 'Buat Kontes Baru' }}
          </h3>
          <p class="text-xs text-[#707070] mt-0.5">
            {{ isEdit ? 'Perbarui nama, status, dan jadwal pelaksanaan kontes' : 'Isi rincian kontes atau polling yang akan diselenggarakan' }}
          </p>
        </div>
        <button 
          @click="emit('close')" 
          type="button"
          class="w-8 h-8 rounded-full flex items-center justify-center text-[#707070] hover:text-[#141414] hover:bg-[#f0f0f0] transition cursor-pointer"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Error Alert -->
      <div v-if="errorMsg" class="p-4 bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] text-xs sm:text-sm rounded-2xl flex items-center gap-2.5">
        <AlertCircle class="w-4 h-4 text-[#141414] shrink-0" />
        <span>{{ errorMsg }}</span>
      </div>

      <!-- Form -->
      <form @submit.prevent="emit('submit')" class="space-y-4">
        <!-- Nama Kontes -->
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
            Nama Kontes <span class="text-rose-500">*</span>
          </label>
          <input 
            v-model="form.nama" 
            type="text" 
            required
            placeholder="cth: Duta Kampus 2026 atau Pemilihan Ketua BEM"
            class="w-full bg-[#f0f0f0] rounded-2xl px-4 h-10 text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] text-xs sm:text-sm transition"
          />
        </div>

        <!-- Status Kontes -->
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
            Status Kontes
          </label>
          <select 
            v-model="form.status"
            class="w-full bg-[#f0f0f0] rounded-2xl px-4 h-10 text-[#141414] focus:outline-none focus:ring-2 focus:ring-[#141414] text-xs sm:text-sm transition cursor-pointer font-medium"
          >
            <option value="DRAFT">DRAFT (Belum Dipublikasi)</option>
            <option value="AKTIF">AKTIF (Mulai Menerima Vote)</option>
            <option v-if="isEdit" value="DITUTUP">DITUTUP (Voting Selesai)</option>
          </select>
          <p class="text-[11px] text-[#707070]">
            {{ form.status === 'DRAFT' ? 'Kontes tersimpan sebagai draft dan belum dapat dilihat publik.' : (form.status === 'AKTIF' ? 'Kontes dapat diakses publik untuk menerima perolehan suara.' : 'Voting ditutup, voter tidak dapat meredeem token lagi.') }}
          </p>
        </div>

        <!-- Jadwal Kontes Grid -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
              Jadwal Kontes
            </label>
            <span class="text-[10px] text-[#707070] bg-[#f0f0f0] px-2 py-0.5 rounded-full font-medium">Opsional</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] text-[#707070] mb-1">Tanggal & Waktu Mulai</label>
              <input 
                v-model="form.tanggalMulai" 
                type="datetime-local" 
                class="w-full bg-[#f0f0f0] rounded-2xl px-3 h-10 text-[#141414] text-xs focus:outline-none focus:ring-2 focus:ring-[#141414] transition"
              />
            </div>
            <div>
              <label class="block text-[11px] text-[#707070] mb-1">Tanggal & Waktu Selesai</label>
              <input 
                v-model="form.tanggalSelesai" 
                type="datetime-local" 
                class="w-full bg-[#f0f0f0] rounded-2xl px-3 h-10 text-[#141414] text-xs focus:outline-none focus:ring-2 focus:ring-[#141414] transition"
              />
            </div>
          </div>
        </div>

        <!-- Deskripsi Kontes -->
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
            Deskripsi Kontes
          </label>
          <textarea 
            v-model="form.deskripsi" 
            rows="3"
            placeholder="Tuliskan keterangan singkat, aturan, atau pengantar kontes..."
            class="w-full bg-[#f0f0f0] rounded-2xl p-3.5 text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] text-xs sm:text-sm transition leading-relaxed"
          ></textarea>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-[#f0f0f0]">
          <button 
            type="button" 
            @click="emit('close')"
            class="px-4 h-9 bg-[#f0f0f0] hover:bg-[#e8e8e8] text-[#141414] text-xs font-semibold rounded-full transition cursor-pointer"
          >
            Batal
          </button>
          <button 
            type="submit" 
            :disabled="submitting"
            class="inline-flex items-center gap-2 px-5 h-9 bg-[#141414] hover:bg-black text-white text-xs font-semibold rounded-full transition disabled:opacity-50 cursor-pointer shadow-xs"
          >
            <Loader2 v-if="submitting" class="w-3.5 h-3.5 animate-spin" />
            <span>{{ isEdit ? 'Simpan Perubahan' : 'Buat Kontes' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, Loader2, AlertCircle } from 'lucide-vue-next'

withDefaults(defineProps<{
  show: boolean
  isEdit?: boolean
  submitting: boolean
  errorMsg?: string
  form: {
    nama: string
    deskripsi: string
    status: string
    tanggalMulai: string
    tanggalSelesai: string
  }
}>(), {
  isEdit: false,
  errorMsg: ''
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()
</script>
