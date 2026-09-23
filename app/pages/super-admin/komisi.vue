<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-white font-heading">Rekapitulasi Komisi Platform (20%)</h1>
      <p class="text-xs text-slate-400 mt-1">Laporan omset penjualan token dan bagian komisi platform per instansi</p>
    </div>

    <UiCard class="p-0 overflow-hidden">
      <div v-if="pending" class="p-8 text-center text-slate-400 text-sm">
        Memuat data komisi...
      </div>

      <div v-else-if="rekap" class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-300">
          <thead class="bg-slate-900/80 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th class="p-4">ID</th>
              <th class="p-4">Nama Instansi</th>
              <th class="p-4">No. WA Admin</th>
              <th class="p-4">Order Diverifikasi</th>
              <th class="p-4">Total Omset Penjualan</th>
              <th class="p-4">Komisi Platform (20%)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60">
            <tr v-if="rekap.length === 0">
              <td colspan="6" class="p-8 text-center text-slate-500">
                Belum ada transaksi.
              </td>
            </tr>
            <tr v-for="item in rekap" :key="item.instansiId" class="hover:bg-slate-900/40 transition-colors">
              <td class="p-4 font-mono font-bold text-slate-200">#{{ item.instansiId }}</td>
              <td class="p-4 font-bold text-white">{{ item.namaInstansi }}</td>
              <td class="p-4 font-mono text-slate-400">{{ item.noWaAdmin }}</td>
              <td class="p-4 font-bold text-indigo-400">{{ item.totalOrdersVerified }}</td>
              <td class="p-4 font-semibold text-slate-200">Rp {{ item.totalOmset.toLocaleString('id-ID') }}</td>
              <td class="p-4 font-extrabold text-emerald-400">Rp {{ item.totalKomisi.toLocaleString('id-ID') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'super-admin'],
})

const { data: rekap, pending } = await useFetch('/api/super-admin/komisi')
</script>
