<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Kelola & Approval Instansi</h1>
        <p class="text-xs text-slate-500 mt-1">Daftar instansi terdaftar dan status persetujuannya</p>
      </div>

      <div class="flex items-center space-x-2">
        <button
          v-for="st in ['ALL', 'PENDING', 'AKTIF', 'NONAKTIF']"
          :key="st"
          @click="filterStatus = st"
          class="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer"
          :class="filterStatus === st ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'"
        >
          {{ st === 'ALL' ? 'Semua' : st }}
        </button>
      </div>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
      <div v-if="pending" class="p-8 text-center text-slate-500 text-sm">
        Memuat daftar instansi...
      </div>

      <div v-else-if="filteredInstansi" class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-700">
          <thead class="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
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
          <tbody class="divide-y divide-slate-100">
            <tr v-if="filteredInstansi.length === 0">
              <td colspan="8" class="p-8 text-center text-slate-500">
                Tidak ada data instansi.
              </td>
            </tr>
            <tr v-for="ins in filteredInstansi" :key="ins.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="p-4 font-mono font-bold text-slate-900">#{{ ins.id }}</td>
              <td class="p-4 font-semibold text-slate-900">{{ ins.nama }}</td>
              <td class="p-4 font-mono text-slate-600">/instansi/{{ ins.slug }}</td>
              <td class="p-4 font-mono text-slate-500">{{ ins.noWaAdmin }}</td>
              <td class="p-4 text-slate-700">{{ ins.users[0]?.email || '-' }}</td>
              <td class="p-4 font-semibold text-slate-900">{{ ins._count.kontes }}</td>
              <td class="p-4">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  :class="{
                    'bg-emerald-100 text-emerald-800': ins.status === 'AKTIF',
                    'bg-amber-100 text-amber-800': ins.status === 'PENDING',
                    'bg-rose-100 text-rose-800': ins.status === 'NONAKTIF',
                  }"
                >
                  {{ ins.status }}
                </span>
              </td>
              <td class="p-4 text-right space-x-2">
                <button
                  v-if="ins.status !== 'AKTIF'"
                  @click="updateStatus(ins.id, 'AKTIF')"
                  class="px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors cursor-pointer"
                >
                  Approve / Aktifkan
                </button>
                <button
                  v-if="ins.status !== 'NONAKTIF'"
                  @click="updateStatus(ins.id, 'NONAKTIF')"
                  class="px-2.5 py-1 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors cursor-pointer"
                >
                  Nonaktifkan
                </button>
              </td>
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
