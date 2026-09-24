<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Rekapitulasi Komisi Platform (20%)</h1>
      <p class="text-xs text-slate-500 mt-1">Laporan omset penjualan token dan bagian komisi platform per instansi</p>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
      <div v-if="pending" class="p-8 text-center text-slate-500 text-sm">
        Memuat data komisi...
      </div>

      <div v-else-if="rekap" class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-700">
          <thead class="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th class="p-4">ID</th>
              <th class="p-4">Nama Instansi</th>
              <th class="p-4">No. WA Admin</th>
              <th class="p-4">Order Diverifikasi</th>
              <th class="p-4">Total Omset Penjualan</th>
              <th class="p-4">Komisi Platform (20%)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="rekap.length === 0">
              <td colspan="6" class="p-8 text-center text-slate-500">
                Belum ada transaksi.
              </td>
            </tr>
            <tr v-for="item in rekap" :key="item.instansiId" class="hover:bg-slate-50/50 transition-colors">
              <td class="p-4 font-mono font-bold text-slate-900">#{{ item.instansiId }}</td>
              <td class="p-4 font-semibold text-slate-900">{{ item.namaInstansi }}</td>
              <td class="p-4 font-mono text-slate-500">{{ item.noWaAdmin }}</td>
              <td class="p-4 font-semibold text-slate-900">{{ item.totalOrdersVerified }}</td>
              <td class="p-4 font-semibold text-slate-700">Rp {{ item.totalOmset.toLocaleString('id-ID') }}</td>
              <td class="p-4 font-bold text-slate-900">Rp {{ item.totalKomisi.toLocaleString('id-ID') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'super-admin'],
})

const { data: rekap, pending } = await useFetch('/api/super-admin/komisi')
</script>
