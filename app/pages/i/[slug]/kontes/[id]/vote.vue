<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <UiCard class="space-y-6">
      <div class="border-b border-slate-800 pb-4">
        <NuxtLink :to="`/i/${slug}/kontes/${kontesId}`" class="text-xs text-indigo-400 hover:underline flex items-center space-x-1 mb-2">
          <span>← Kembali ke Kontes</span>
        </NuxtLink>
        <h1 class="text-2xl font-bold text-white font-heading">Redeem Token Suara</h1>
        <p class="text-xs text-slate-400 mt-1">
          Masukkan kode token yang Anda dapatkan dari Admin Instansi via WhatsApp
        </p>
      </div>

      <UiAlert v-if="successMsg" type="success" :message="successMsg" />
      <UiAlert v-if="errorMsg" type="error" :message="errorMsg" />

      <form v-if="!successMsg" @submit.prevent="handleVote" class="space-y-6">
        <UiInput
          v-model="form.tokenCode"
          label="Kode Token"
          placeholder="cth: SK-X7Y9Z1A2"
          hint="Huruf kapital dan angka 8 karakter (termasuk awalan SK-)"
          required
        />

        <div class="space-y-3">
          <label class="block text-sm font-medium text-slate-300">
            Pilih Kandidat Pilihan Anda <span class="text-rose-400">*</span>
          </label>

          <div v-if="pending" class="text-xs text-slate-500 py-4">Memuat daftar kandidat...</div>

          <div v-else class="grid grid-cols-1 gap-3">
            <div
              v-for="kandidat in kontes?.leaderboard"
              :key="kandidat.id"
              @click="form.kandidatId = kandidat.id"
              class="p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between"
              :class="form.kandidatId === kandidat.id ? 'bg-indigo-600/10 border-indigo-500 shadow-md shadow-indigo-500/10' : 'bg-slate-900 border-slate-800 hover:border-slate-700'"
            >
              <div class="flex items-center space-x-3">
                <div 
                  class="w-5 h-5 rounded-full border flex items-center justify-center transition-colors"
                  :class="form.kandidatId === kandidat.id ? 'border-indigo-500 bg-indigo-500' : 'border-slate-600'"
                >
                  <span v-if="form.kandidatId === kandidat.id" class="w-2 h-2 rounded-full bg-white"></span>
                </div>

                <div class="flex items-center space-x-3">
                  <div v-if="kandidat.nomorUrut" class="text-xs font-bold text-indigo-400 font-heading">
                    #{{ kandidat.nomorUrut }}
                  </div>
                  <span class="font-bold text-white">{{ kandidat.nama }}</span>
                </div>
              </div>

              <span class="text-xs text-slate-500 font-mono">{{ kandidat.totalSuara }} Suara</span>
            </div>
          </div>
        </div>

        <UiButton
          type="submit"
          variant="primary"
          class="w-full py-3.5 text-base shadow-xl shadow-indigo-600/30"
          :loading="submitting"
          :disabled="!form.tokenCode || !form.kandidatId"
        >
          Kirim Suara Sekarang 🚀
        </UiButton>
      </form>

      <div v-else class="pt-4 text-center space-y-4">
        <NuxtLink :to="`/i/${slug}/kontes/${kontesId}`">
          <UiButton variant="primary">Lihat Leaderboard Live</UiButton>
        </NuxtLink>
      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
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
        tokenCode: form.tokenCode,
        kandidatId: form.kandidatId,
      },
    })

    successMsg.value = res.message
  } catch (err: any) {
    errorMsg.value = err.data?.statusMessage || 'Gagal menggunakan token.'
  } finally {
    submitting.value = false
  }
}
</script>
