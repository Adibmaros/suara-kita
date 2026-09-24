<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-6">
      <div class="border-b border-slate-100 pb-4">
        <NuxtLink :to="`/instansi/${slug}/kontes/${kontesId}`" class="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 font-medium transition-colors mb-2">
          ← Kembali ke Kontes
        </NuxtLink>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Redeem Token Suara</h1>
        <p class="text-xs text-slate-500 mt-1">
          Masukkan kode token yang Anda dapatkan dari Admin Instansi via WhatsApp
        </p>
      </div>

      <div v-if="successMsg" class="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
        <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{{ successMsg }}</span>
      </div>

      <div v-if="errorMsg" class="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
        <AlertCircle class="w-4 h-4 text-rose-600 shrink-0" />
        <span>{{ errorMsg }}</span>
      </div>

      <form v-if="!successMsg" @submit.prevent="handleVote" class="space-y-6">
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Kode Token <span class="text-rose-500">*</span></label>
          <input
            v-model="form.tokenCode"
            type="text"
            placeholder="cth: SK-X7Y9Z1A2"
            required
            class="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 transition-colors uppercase font-mono"
          />
          <p class="text-[11px] text-slate-500">Huruf kapital dan angka 8 karakter (termasuk awalan SK-)</p>
        </div>

        <div class="space-y-3">
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Pilih Kandidat Pilihan Anda <span class="text-rose-500">*</span>
          </label>

          <div v-if="pending" class="text-xs text-slate-500 py-4">Memuat daftar kandidat...</div>

          <div v-else class="grid grid-cols-1 gap-3">
            <div
              v-for="kandidat in kontes?.leaderboard"
              :key="kandidat.id"
              @click="form.kandidatId = kandidat.id"
              class="p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between"
              :class="form.kandidatId === kandidat.id ? 'bg-slate-900 text-white border-slate-900 shadow-xs' : 'bg-white border-slate-200 text-slate-900 hover:border-slate-300'"
            >
              <div class="flex items-center space-x-3">
                <div 
                  class="w-4 h-4 rounded-full border flex items-center justify-center transition-colors"
                  :class="form.kandidatId === kandidat.id ? 'border-white bg-white' : 'border-slate-300'"
                >
                  <span v-if="form.kandidatId === kandidat.id" class="w-2 h-2 rounded-full bg-slate-900"></span>
                </div>

                <div class="flex items-center space-x-3">
                  <div v-if="kandidat.nomorUrut" class="text-xs font-mono font-bold" :class="form.kandidatId === kandidat.id ? 'text-slate-300' : 'text-slate-500'">
                    #{{ kandidat.nomorUrut }}
                  </div>
                  <span class="font-semibold">{{ kandidat.nama }}</span>
                </div>
              </div>

              <span class="text-xs font-mono" :class="form.kandidatId === kandidat.id ? 'text-slate-300' : 'text-slate-500'">{{ kandidat.totalSuara }} Suara</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          :disabled="submitting || !form.tokenCode || !form.kandidatId"
          class="w-full h-10 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-xs"
        >
          <Loader2 v-if="submitting" class="w-4 h-4 mr-2 animate-spin" />
          Kirim Suara Sekarang
        </button>
      </form>

      <div v-else class="pt-4 text-center">
        <NuxtLink :to="`/instansi/${slug}/kontes/${kontesId}`" class="inline-flex items-center justify-center px-6 h-10 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-md transition-colors shadow-xs">
          Lihat Leaderboard Live
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const slug = route.params.slug as string
const kontesId = route.params.id as string

const { data: kontes, pending } = await useFetch(`/api/public/kontes/${kontesId}`)

const form = reactive({
  tokenCode: '',
  kandidatId: null as number | null,
})

const submitting = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const handleVote = async () => {
  if (!form.tokenCode || !form.kandidatId) return
  submitting.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {
    const res = await $fetch(`/api/public/kontes/${kontesId}/vote`, {
      method: 'POST',
      body: {
        tokenCode: form.tokenCode.trim(),
        kandidatId: form.kandidatId,
      },
    })

    successMsg.value = res.message
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || err.statusMessage || err.message || 'Kode token tidak valid atau telah digunakan.'
  } finally {
    submitting.value = false
  }
}
</script>
