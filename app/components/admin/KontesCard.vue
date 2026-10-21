<template>
  <div class="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 shadow-2xs transition-all flex flex-col justify-between space-y-4 relative">
    <div>
      <div class="flex items-center justify-between">
        <span 
          class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
          :class="{
            'bg-emerald-100 text-emerald-800': kontes.status === 'AKTIF',
            'bg-amber-100 text-amber-800': kontes.status === 'DRAFT',
            'bg-rose-100 text-rose-800': kontes.status === 'DITUTUP',
            'bg-slate-100 text-slate-700': kontes.status !== 'AKTIF' && kontes.status !== 'DRAFT' && kontes.status !== 'DITUTUP',
          }"
        >
          {{ kontes.status }}
        </span>

        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-400 font-mono">#{{ kontes.id }}</span>

          <!-- Action Dropdown ⋯ -->
          <div class="relative">
            <button 
              @click.stop="$emit('toggleDropdown', kontes.id)"
              class="h-7 w-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
              title="Menu Aksi"
            >
              <MoreVertical class="w-4 h-4" />
            </button>

            <div 
              v-if="isOpen" 
              v-click-outside="() => $emit('closeDropdown')"
              class="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20 text-xs"
            >
              <NuxtLink 
                :to="`/admin/kontes/${kontes.id}`" 
                class="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 font-medium"
              >
                <Settings class="w-3.5 h-3.5" />
                <span>Kelola Kontes</span>
              </NuxtLink>

              <button 
                type="button"
                @click="$emit('edit', kontes); $emit('closeDropdown')" 
                class="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 font-medium text-left cursor-pointer"
              >
                <Pencil class="w-3.5 h-3.5" />
                <span>Edit Kontes</span>
              </button>

              <NuxtLink 
                :to="`/admin/kontes/${kontes.id}/orders`" 
                class="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 font-medium"
              >
                <Receipt class="w-3.5 h-3.5" />
                <span>Lihat Orders</span>
              </NuxtLink>

              <template v-if="kontes.status === 'DRAFT'">
                <div class="border-t border-slate-100 my-1"></div>
                <button 
                  @click="$emit('delete', kontes)"
                  class="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 font-medium text-left"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                  <span>Hapus Kontes</span>
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>

      <h3 class="text-base font-bold text-slate-900 tracking-tight mt-3">
        <NuxtLink :to="`/admin/kontes/${kontes.id}`" class="hover:text-slate-700 hover:underline">
          {{ kontes.nama }}
        </NuxtLink>
      </h3>
      <p v-if="kontes.deskripsi" class="text-xs text-slate-500 mt-1 line-clamp-2">{{ kontes.deskripsi }}</p>
    </div>

    <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
      <div class="space-x-2">
        <span>{{ kontes._count?.kandidat ?? 0 }} Kandidat</span>
        <span>•</span>
        <span>{{ kontes._count?.tokenPackages ?? 0 }} Paket</span>
      </div>
      <NuxtLink 
        :to="`/admin/kontes/${kontes.id}`" 
        class="text-xs font-semibold text-slate-900 hover:underline inline-flex items-center gap-1"
      >
        <span>Kelola</span>
        <span>→</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MoreVertical, Settings, Pencil, Receipt, Trash2 } from 'lucide-vue-next'

defineProps<{
  kontes: any
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleDropdown', id: number): void
  (e: 'closeDropdown'): void
  (e: 'edit', kontes: any): void
  (e: 'delete', kontes: any): void
}>()

// Click outside directive for closing dropdown
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
</script>
