<script setup lang="ts">
import { 
  X, 
  Upload, 
  Loader2 
} from 'lucide-vue-next'

const props = defineProps<{
  show: boolean
  submitting: boolean
  uploadingImage: boolean
  form: {
    nama: string
    visiMisi: string
    fotoUrl: string
  }
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
  (e: 'upload-file', event: Event): void
}>()
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-slate-900">Tambah Kandidat Baru</h3>
        <button @click="emit('close')" class="text-slate-400 hover:text-slate-600 cursor-pointer">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="emit('submit')" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Nama Kandidat *</label>
          <input 
            v-model="form.nama" 
            type="text" 
            required
            placeholder="Contoh: Budi Santoso"
            class="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 h-9 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Visi & Misi / Deskripsi</label>
          <textarea 
            v-model="form.visiMisi" 
            rows="3"
            placeholder="Visi & misi singkat kandidat..."
            class="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
          ></textarea>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Foto Kandidat</label>
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
                class="flex items-center gap-2 px-3.5 h-9 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition"
              >
                <Upload class="w-4 h-4 text-slate-600" />
                <span>{{ uploadingImage ? 'Mengunggah...' : 'Upload File Foto' }}</span>
              </label>
            </div>

            <input 
              v-model="form.fotoUrl" 
              type="url" 
              placeholder="Atau masukkan URL foto langsung..."
              class="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 h-9 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            />

            <div v-if="form.fotoUrl" class="mt-2">
              <img :src="form.fotoUrl" class="w-20 h-20 rounded-lg object-cover border border-slate-200" />
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button 
            type="button" 
            @click="emit('close')"
            class="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Batal
          </button>
          <button 
            type="submit" 
            :disabled="submitting || uploadingImage"
            class="flex items-center gap-2 px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition disabled:opacity-50 shadow-xs cursor-pointer"
          >
            <Loader2 v-if="submitting" class="w-3.5 h-3.5 animate-spin" />
            <span>Simpan Kandidat</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
