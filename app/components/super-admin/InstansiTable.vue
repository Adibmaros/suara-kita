<template>
  <div class="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
    <div v-if="pending" class="p-12 text-center text-slate-500 text-sm">
      <div class="inline-block w-6 h-6 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-2"></div>
      <div>Memuat daftar instansi...</div>
    </div>

    <div v-else-if="instansiList" class="overflow-x-auto">
      <table class="w-full text-left text-sm text-slate-700 border-collapse">
        <thead class="bg-slate-50/80 text-[11px] text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
          <tr>
            <th class="py-3.5 px-4 font-semibold">ID</th>
            <th class="py-3.5 px-4 font-semibold">Nama Instansi</th>
            <th class="py-3.5 px-4 font-semibold">Public Link & Kontes</th>
            <th class="py-3.5 px-4 font-semibold">No. WA Admin</th>
            <th class="py-3.5 px-4 font-semibold">Admin Email</th>
            <th class="py-3.5 px-4 font-semibold text-center">Persen Komisi</th>
            <th class="py-3.5 px-4 font-semibold text-center">Status</th>
            <th class="py-3.5 px-4 font-semibold text-right">Aksi Approval</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="instansiList.length === 0">
            <td colspan="8" class="p-12 text-center text-slate-400">
              Tidak ada data instansi yang sesuai filter.
            </td>
          </tr>
          <tr 
            v-for="ins in instansiList" 
            :key="ins.id" 
            class="hover:bg-slate-50/60 transition-colors"
          >
            <!-- ID -->
            <td class="py-4 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
              #{{ ins.id }}
            </td>

            <!-- Nama Instansi -->
            <td class="py-4 px-4 whitespace-nowrap">
              <div class="font-bold text-slate-900">{{ ins.nama }}</div>
              <div class="text-[11px] text-slate-400 font-mono">slug: {{ ins.slug }}</div>
            </td>

            <!-- Public Link & Kontes -->
            <td class="py-4 px-4">
              <div class="space-y-1.5 min-w-[220px]">
                <NuxtLink 
                  :to="`/instansi/${ins.slug}`"
                  target="_blank"
                  class="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline group"
                >
                  <Building2 class="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span class="truncate">/instansi/{{ ins.slug }}</span>
                  <ExternalLink class="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </NuxtLink>

                <div v-if="ins.kontes && ins.kontes.length > 0" class="space-y-1 pt-1 border-t border-slate-100">
                  <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {{ ins.kontes.length }} Kontes Terdaftar:
                  </div>
                  <div class="flex flex-wrap gap-1">
                    <NuxtLink
                      v-for="k in ins.kontes"
                      :key="k.id"
                      :to="`/instansi/${ins.slug}/kontes/${k.id}`"
                      target="_blank"
                      class="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-medium transition-colors border border-indigo-200/60 max-w-[200px]"
                      :title="k.nama"
                    >
                      <Trophy class="w-3 h-3 text-indigo-500 shrink-0" />
                      <span class="truncate">{{ k.nama }}</span>
                      <ExternalLink class="w-2.5 h-2.5 opacity-60 shrink-0" />
                    </NuxtLink>
                  </div>
                </div>
                <div v-else class="text-[11px] text-slate-400 italic">
                  Belum ada kontes dibuat
                </div>
              </div>
            </td>

            <!-- No. WA Admin -->
            <td class="py-4 px-4 font-mono text-slate-600 whitespace-nowrap">
              {{ ins.noWaAdmin }}
            </td>

            <!-- Admin Email -->
            <td class="py-4 px-4 text-slate-700 whitespace-nowrap">
              {{ ins.users[0]?.email || '-' }}
            </td>

            <!-- Persen Komisi -->
            <td class="py-4 px-4 text-center whitespace-nowrap">
              <button
                @click="$emit('editKomisi', ins)"
                class="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200/80 transition-all cursor-pointer group shadow-xs active:scale-95"
                title="Klik untuk merubah persentase komisi"
              >
                <Percent class="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform" />
                <span>{{ ins.persenKomisi ?? 20 }}%</span>
                <Edit2 class="w-3 h-3 text-blue-400 opacity-60 group-hover:opacity-100" />
              </button>
            </td>

            <!-- Status -->
            <td class="py-4 px-4 text-center whitespace-nowrap">
              <span
                class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold shadow-xs"
                :class="{
                  'bg-emerald-50 text-emerald-700 border border-emerald-200': ins.status === 'AKTIF',
                  'bg-amber-50 text-amber-700 border border-amber-200': ins.status === 'PENDING',
                  'bg-rose-50 text-rose-700 border border-rose-200': ins.status === 'NONAKTIF',
                }"
              >
                <span 
                  class="w-1.5 h-1.5 rounded-full mr-1.5"
                  :class="{
                    'bg-emerald-500': ins.status === 'AKTIF',
                    'bg-amber-500 animate-pulse': ins.status === 'PENDING',
                    'bg-rose-500': ins.status === 'NONAKTIF',
                  }"
                ></span>
                {{ ins.status }}
              </span>
            </td>

            <!-- Aksi Approval Buttons -->
            <td class="py-4 px-4 text-right whitespace-nowrap">
              <div class="flex items-center justify-end gap-2">
                <button
                  v-if="ins.status !== 'AKTIF'"
                  @click="$emit('updateStatus', ins, 'AKTIF')"
                  class="px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all flex items-center space-x-1 cursor-pointer active:scale-95 shrink-0"
                >
                  <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600" />
                  <span>Approve</span>
                </button>
                <button
                  v-if="ins.status !== 'NONAKTIF'"
                  @click="$emit('updateStatus', ins, 'NONAKTIF')"
                  class="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-all flex items-center space-x-1 cursor-pointer active:scale-95 shrink-0"
                >
                  <XCircle class="w-3.5 h-3.5 text-rose-600" />
                  <span>Nonaktifkan</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, ExternalLink, Trophy, Percent, Edit2, CheckCircle2, XCircle } from 'lucide-vue-next'

defineProps<{
  instansiList: any[]
  pending: boolean
}>()

defineEmits<{
  (e: 'editKomisi', ins: any): void
  (e: 'updateStatus', ins: any, status: string): void
}>()
</script>
