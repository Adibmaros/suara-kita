<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-sm font-medium text-slate-300">
      {{ label }}
    </label>

    <div v-if="previewUrl" class="relative w-32 h-32 rounded-xl overflow-hidden border border-slate-700 bg-slate-800">
      <img :src="previewUrl" alt="Preview" class="w-full h-full object-cover" />
      <button 
        type="button" 
        @click="clearFile" 
        class="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full shadow hover:bg-rose-500 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div v-else class="relative">
      <input
        type="file"
        accept="image/*"
        class="hidden"
        ref="fileInputRef"
        @change="handleFileChange"
      />
      <div 
        @click="triggerSelect"
        class="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-900/50 hover:bg-slate-900"
      >
        <svg class="mx-auto h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="mt-2 text-sm text-slate-300 font-medium">Klik untuk upload foto</p>
        <p class="text-xs text-slate-500 mt-1">PNG, JPG, WEBP maks 5MB</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | null
  label?: string
}>()

const emit = defineEmits(['update:modelValue'])

const fileInputRef = ref<HTMLInputElement | null>(null)
const previewUrl = ref(props.modelValue || '')

watch(() => props.modelValue, (newVal) => {
  previewUrl.value = newVal || ''
})

const triggerSelect = () => {
  fileInputRef.value?.click()
}

const handleFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const file = target.files[0]
  // Local preview
  previewUrl.value = URL.createObjectURL(file)

  // Upload simulasi atau direct upload via endpoint / Supabase Client
  // Untuk kepraktisan, kirim Base64 atau FormData file URL
  // Di Nuxt app, kita emits previewUrl/Base64 untuk dikirim ke API
  const reader = new FileReader()
  reader.onload = (event) => {
    emit('update:modelValue', event.target?.result as string)
  }
  reader.readAsDataURL(file)
}

const clearFile = () => {
  previewUrl.value = ''
  emit('update:modelValue', '')
  if (fileInputRef.value) fileInputRef.value.value = ''
}
</script>
