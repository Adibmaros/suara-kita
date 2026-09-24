<template>
  <div class="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-slate-700 border-collapse">
        <thead class="bg-slate-50/80 text-[11px] text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
          <tr>
            <th class="py-3.5 px-4 font-semibold">ID</th>
            <th class="py-3.5 px-4 font-semibold">Nama Instansi</th>
            <th class="py-3.5 px-4 font-semibold">No. WA Admin</th>
            <th class="py-3.5 px-4 font-semibold text-center">Order Verified</th>
            <th class="py-3.5 px-4 font-semibold">Total Omset Penjualan</th>
            <th class="py-3.5 px-4 font-semibold text-center">Rate Komisi</th>
            <th class="py-3.5 px-4 font-semibold text-right">Total Komisi Platform</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="items.length === 0">
            <td colspan="7" class="p-12 text-center text-slate-400">
              Tidak ada data rekap komisi yang sesuai pencarian.
            </td>
          </tr>
          <tr 
            v-for="item in items" 
            :key="item.instansiId" 
            class="hover:bg-slate-50/60 transition-colors"
          >
            <!-- ID -->
            <td class="py-4 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
              #{{ item.instansiId }}
            </td>

            <!-- Nama Instansi -->
            <td class="py-4 px-4 whitespace-nowrap">
              <div class="font-bold text-slate-900">{{ item.namaInstansi }}</div>
              <div class="text-[11px] text-slate-400 font-mono">slug: {{ item.slug }}</div>
            </td>

            <!-- No WA Admin -->
            <td class="py-4 px-4 font-mono text-slate-600 whitespace-nowrap">
              {{ item.noWaAdmin }}
            </td>

            <!-- Order Verified -->
            <td class="py-4 px-4 text-center font-bold text-slate-900 whitespace-nowrap">
              {{ item.totalOrdersVerified }}
            </td>

            <!-- Total Omset -->
            <td class="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
              Rp {{ item.totalOmset.toLocaleString('id-ID') }}
            </td>

            <!-- Rate Komisi -->
            <td class="py-4 px-4 text-center whitespace-nowrap">
              <span class="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80">
                <Percent class="w-3 h-3 text-blue-500" />
                <span>{{ item.persenKomisi }}%</span>
              </span>
            </td>

            <!-- Total Komisi Platform -->
            <td class="py-4 px-4 font-extrabold text-blue-600 text-right whitespace-nowrap">
              Rp {{ item.totalKomisi.toLocaleString('id-ID') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Percent } from 'lucide-vue-next'

defineProps<{
  items: any[]
}>()
</script>
