<script setup lang="ts">
import { ref, watch } from 'vue'
import { 
  X, 
  Upload, 
  Loader2,
  User
} from 'lucide-vue-next'

const previewError = ref(false)

const props = withDefaults(defineProps<{
  show: boolean
  isEdit?: boolean
  submitting: boolean
  uploadingImage: boolean
  form: {
    nama: string
    nomorUrut?: number | null
    deskripsi?: string
    visiMisi?: string
    fotoUrl: string
  }
}>(), {
  isEdit: false
})

watch(() => props.form.fotoUrl, () => {
  previewError.value = false
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
  (e: 'upload-file', event: Event): void
}>()
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white border border-[#e0e0e0] rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-base sm:text-lg font-bold text-[#141414] tracking-tight">
            {{ isEdit ? 'Edit Data Kandidat' : 'Tambah Kandidat Baru' }}
          </h3>
          <p class="text-xs text-[#707070] mt-0.5">
            {{ isEdit ? 'Perbarui nomor urut, biodata, atau foto kandidat' : 'Lengkapi data kandidat yang bertanding dalam kontes ini' }}
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

      <form @submit.prevent="emit('submit')" class="space-y-4">
        <!-- Grid Nama & Nomor Urut -->
        <div class="grid grid-cols-3 gap-3">
          <div class="col-span-2 space-y-1.5">
            <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
              Nama Kandidat *
            </label>
            <input 
              v-model="form.nama" 
              type="text" 
              required
              placeholder="Contoh: Budi Santoso"
              class="w-full bg-[#f0f0f0] rounded-2xl px-3.5 h-10 text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] text-xs transition"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
              No. Urut
            </label>
            <input 
              v-model.number="form.nomorUrut" 
              type="number" 
              min="1"
              placeholder="1"
              class="w-full bg-[#f0f0f0] rounded-2xl px-3.5 h-10 text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] text-xs transition font-mono"
            />
          </div>
        </div>

        <!-- Deskripsi / Visi Misi -->
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
            Visi & Misi / Deskripsi
          </label>
          <textarea 
            v-model="form.deskripsi" 
            rows="3"
            placeholder="Tuliskan visi, misi, atau ringkasan profil kandidat..."
            class="w-full bg-[#f0f0f0] rounded-2xl p-3.5 text-[#141414] placeholder:text-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#141414] text-xs transition leading-relaxed"
          ></textarea>
        </div>

        <!-- Foto Kandidat -->
        <div class="space-y-2">
          <label class="block text-xs font-semibold text-[#141414] uppercase tracking-wider">
            Foto Kandidat
          </label>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <input 
                type="file" 
                accept="image/*" 
                @change="(e) => emit('upload-file', e)" 
                id="foto-upload"
                class="hidden"
              />
              <label 
                for="foto-upload" 
                class="inline-flex items-center gap-2 px-4 h-9 bg-[#f0f0f0] hover:bg-[#e8e8e8] text-[#141414] text-xs font-semibold rounded-full cursor-pointer transition"
              >
                <Upload class="w-3.5 h-3.5 text-[#141414]" />
                <span>{{ uploadingImage ? 'Mengunggah...' : 'Upload File Foto' }}</span>
              </label>

              <span v-if="form.fotoUrl" class="text-xs text-emerald-600 font-medium">Foto siap digunakan</span>
            </div>

            <input 
              v-model="form.fotoUrl" 
              type="url" 
              placeholder="Atau masukkan URL gambar langsung..."
              class="w-full bg-[#f0f0f0] rounded-2xl px-3.5 h-10 text-[#141414] placeholder:text-[#adadad] text-xs focus:outline-none focus:ring-2 focus:ring-[#141414] transition"
            />

            <!-- Preview Image -->
            <div v-if="form.fotoUrl" class="flex items-center gap-3 p-2 bg-[#f8f8f8] border border-[#e0e0e0] rounded-2xl">
              <img 
                v-if="!previewError"
                :src="form.fotoUrl" 
                class="w-14 h-14 rounded-xl object-cover border border-[#e0e0e0]" 
                @error="previewError = true"
              />
              <div v-else class="w-14 h-14 rounded-xl bg-white border border-[#e0e0e0] flex items-center justify-center text-[#707070] shrink-0">
                <User class="w-6 h-6" :stroke-width="1.75" />
              </div>
              <div class="flex-1 min-w-0 text-xs">
                <p class="font-medium text-[#141414] truncate">Preview Foto Kandidat</p>
                <p class="text-[11px] text-[#707070] truncate">{{ form.fotoUrl }}</p>
              </div>
            </div>
          </div>
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
            :disabled="submitting || uploadingImage"
            class="inline-flex items-center gap-2 px-5 h-9 bg-[#141414] hover:bg-black text-white text-xs font-semibold rounded-full transition disabled:opacity-50 cursor-pointer shadow-xs"
          >
            <Loader2 v-if="submitting" class="w-3.5 h-3.5 animate-spin" />
            <span>{{ isEdit ? 'Simpan Perubahan' : 'Simpan Kandidat' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
