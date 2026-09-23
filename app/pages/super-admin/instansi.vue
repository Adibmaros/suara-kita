<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white font-heading">Kelola & Approval Instansi</h1>
        <p class="text-xs text-slate-400 mt-1">Daftar instansi terdaftar dan status persetujuannya</p>
      </div>

      <div class="flex items-center space-x-2">
        <button
          v-for="st in ['ALL', 'PENDING', 'AKTIF', 'NONAKTIF']"
          :key="st"
          @click="filterStatus = st"
          class="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors"
          :class="filterStatus === st ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'"
        >
          {{ st === 'ALL' ? 'Semua' : st }}
        </button>
      </div>
    </div>

    <UiCard class="p-0 overflow-hidden">
      <div v-if="pending" class="p-8 text-center text-slate-400 text-sm">
        Memuat daftar instansi...
      </div>

      <div v-else-if="filteredInstansi" class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-300">
          <thead class="bg-slate-900/80 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th class="p-4">ID</th>
              <th class="p-4">Nama Instansi</th>
              <th class="p-4">Slug / URL</th>
              <th class="p-4">No. WA Admin</th>
              <th class="p-4">Admin Email</th>
              <th class="p-4">Kontes</th>
              <th class="p-4">Status</th>
              <th class="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60">
            <tr v-if="filteredInstansi.length === 0">
              <td colspan="8" class="p-8 text-center text-slate-500">
                Tidak ada data instansi.
              </td>
            </tr>
            <tr v-for="ins in filteredInstansi" :key="ins.id" class="hover:bg-slate-900/40 transition-colors">
              <td class="p-4 font-mono font-bold text-slate-200">#{{ ins.id }}</td>
              <td class="p-4 font-bold text-white">{{ ins.nama }}</td>
              <td class="p-4 font-mono text-indigo-400">/i/{{ ins.slug }}</td>
              <td class="p-4 font-mono text-slate-400">{{ ins.noWaAdmin }}</td>
              <td class="p-4 text-slate-300">{{ ins.users[0]?.email || '-' }}</td>
              <td class="p-4 font-bold text-slate-200">{{ ins._count.kontes }}</td>
              <td class="p-4">
                <UiBadge :variant="ins.status === 'AKTIF' ? 'success' : ins.status === 'PENDING' ? 'warning' : 'danger'">
                  {{ ins.status }}
                </UiBadge>
              </td>
              <td class="p-4 text-right space-x-2">
                <button
                  v-if="ins.status !== 'AKTIF'"
                  @click="updateStatus(ins.id, 'AKTIF')"
                  class="px-2.5 py-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-md transition-colors"
                >
                  Approve / Aktifkan
                </button>
                <button
                  v-if="ins.status !== 'NONAKTIF'"
                  @click="updateStatus(ins.id, 'NONAKTIF')"
                  class="px-2.5 py-1 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-md transition-colors"
                >
                  Nonaktifkan
                </button>
              </td>
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

const filterStatus = ref('ALL')
const { data: listInstansi, pending, refresh } = await useFetch('/api/super-admin/instansi')

const filteredInstansi = computed(() => {
  if (!listInstansi.value) return []
  if (filterStatus.value === 'ALL') return listInstansi.value
  return listInstansi.value.filter((i: any) => i.status === filterStatus.value)
})

const updateStatus = async (id: number, status: string) => {
  if (!confirm(`Ubah status instansi #${id} menjadi ${status}?`)) return
  try {
    await $fetch(`/api/super-admin/instansi/${id}`, {
      method: 'PATCH',
      body: { status },
    })
    await refresh()
  } catch (err: any) {
    alert(err.data?.statusMessage || 'Gagal merubah status.')
  }
}
</script>
