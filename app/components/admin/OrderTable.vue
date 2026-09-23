<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm text-slate-300">
      <thead class="bg-slate-900/80 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
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
      <tbody class="divide-y divide-slate-800/60">
        <tr v-if="orders.length === 0">
          <td colspan="8" class="p-8 text-center text-slate-500">
            Belum ada order.
          </td>
        </tr>
        <tr v-for="order in orders" :key="order.id" class="hover:bg-slate-900/40 transition-colors">
          <td class="p-4 font-mono font-bold text-slate-200">#{{ order.id }}</td>
          <td class="p-4 font-medium text-white">{{ order.package.namaPaket }}</td>
          <td class="p-4 font-semibold text-slate-200">Rp {{ order.package.harga.toLocaleString('id-ID') }}</td>
          <td class="p-4 font-bold text-indigo-400">{{ order.package.jumlahSuara }}</td>
          <td class="p-4 font-mono text-slate-400">{{ order.kontakWa || '-' }}</td>
          <td class="p-4">
            <UiBadge :variant="getStatusVariant(order.status)">
              {{ order.status }}
            </UiBadge>
          </td>
          <td class="p-4 font-mono font-extrabold text-amber-400">
            {{ order.token?.code || '-' }}
          </td>
          <td class="p-4 text-right space-x-2">
            <template v-if="order.status === 'MENUNGGU_VERIFIKASI'">
              <UiButton 
                size="sm" 
                variant="success"
                :loading="loadingId === order.id"
                @click="$emit('verify', order)"
              >
                Verifikasi
              </UiButton>
              <UiButton 
                size="sm" 
                variant="danger"
                :loading="loadingId === order.id"
                @click="$emit('reject', order)"
              >
                Tolak
              </UiButton>
            </template>
            <template v-else-if="order.token?.code">
              <button 
                @click="copyToken(order.token.code)"
                class="px-2.5 py-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-md transition-colors"
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
