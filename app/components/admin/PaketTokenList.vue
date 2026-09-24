<script setup lang="ts">
import { Plus, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  paketList: any[]
}>()

const emit = defineEmits<{
  (e: 'open-paket-modal'): void
  (e: 'confirm-delete', type: 'paket', id: number, nama: string): void
}>()

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount)
}
</script>

<template>
  <div class="space-y-4 pt-6 border-t border-slate-200">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-slate-900 tracking-tight">Paket Token</h2>
        <p class="text-xs text-slate-500 mt-0.5">Atur opsi pembelian token untuk para pemilih / supporter</p>
      </div>
      <button 
        @click="emit('open-paket-modal')"
        class="flex items-center gap-2 px-3.5 h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition shadow-xs cursor-pointer"
      >
        <Plus class="w-4 h-4" />
        <span>Tambah Paket</span>
      </button>
    </div>

    <div v-if="!paketList || paketList.length === 0" class="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center shadow-2xs">
      <p class="text-slate-500 text-xs">Belum ada paket token yang dibuat.</p>
      <button @click="emit('open-paket-modal')" class="mt-2 text-xs text-indigo-600 font-bold hover:underline cursor-pointer">
        + Tambah paket token
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div 
        v-for="p in paketList" 
        :key="p.id"
        class="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition"
      >
        <div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md">
              {{ p.jumlahToken }} Token
            </span>
            <button 
              @click="emit('confirm-delete', 'paket', p.id, p.namaPaket)"
              class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
              title="Hapus Paket"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
          <h3 class="font-bold text-slate-900 text-base mt-3">{{ p.namaPaket }}</h3>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs text-slate-500">Harga Paket:</span>
          <span class="text-slate-900 font-extrabold text-sm">{{ formatRupiah(p.harga) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
