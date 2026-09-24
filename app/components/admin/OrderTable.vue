<template>
  <div class="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-2xs">
    <table class="w-full text-left text-sm text-slate-700">
      <thead class="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
        <tr>
          <th class="p-4">ID</th>
          <th class="p-4">Paket</th>
          <th class="p-4">Harga</th>
          <th class="p-4">Suara</th>
          <th class="p-4">Kontak WA</th>
          <th class="p-4">Status</th>
          <th class="p-4">Kode Token</th>
          <th class="p-4 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr v-if="orders.length === 0">
          <td colspan="8" class="p-8 text-center text-slate-500">
            Belum ada order.
          </td>
        </tr>
        <tr v-for="order in orders" :key="order.id" class="hover:bg-slate-50/50 transition-colors">
          <td class="p-4 font-mono font-bold text-slate-900">#{{ order.id }}</td>
          <td class="p-4 font-medium text-slate-900">{{ order.package.namaPaket }}</td>
          <td class="p-4 font-semibold text-slate-700">Rp {{ order.package.harga.toLocaleString('id-ID') }}</td>
          <td class="p-4 font-semibold text-slate-900">{{ order.package.jumlahSuara }}</td>
          <td class="p-4 font-mono text-slate-500">{{ order.kontakWa || '-' }}</td>
          <td class="p-4">
            <span
              class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
              :class="{
                'bg-emerald-100 text-emerald-800': order.status === 'TERVERIFIKASI',
                'bg-amber-100 text-amber-800': order.status === 'MENUNGGU_VERIFIKASI',
                'bg-rose-100 text-rose-800': order.status === 'DITOLAK',
              }"
            >
              {{ order.status }}
            </span>
          </td>
          <td class="p-4 font-mono font-bold text-slate-900">
            {{ order.token?.code || '-' }}
          </td>
          <td class="p-4 text-right space-x-2">
            <template v-if="order.status === 'MENUNGGU_VERIFIKASI'">
              <button 
                :disabled="loadingId === order.id"
                @click="$emit('verify', order)"
                class="px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
              >
                Verifikasi
              </button>
              <button 
                :disabled="loadingId === order.id"
                @click="$emit('reject', order)"
                class="px-2.5 py-1 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
              >
                Tolak
              </button>
            </template>
            <template v-else-if="order.token?.code">
              <button 
                @click="copyToken(order.token.code)"
                class="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition-colors cursor-pointer"
              >
                Copy Token
              </button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  orders: Array<any>
  loadingId?: number | null
}>()

defineEmits(['verify', 'reject'])

const getStatusVariant = (status: string) => {
  if (status === 'TERVERIFIKASI') return 'success'
  if (status === 'DITOLAK') return 'danger'
  return 'warning'
}

const copyToken = (code: string) => {
  navigator.clipboard.writeText(code)
  alert(`Kode Token ${code} berhasil disalin!`)
}
</script>
