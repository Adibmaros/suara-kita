<template>
  <header class="h-16 bg-slate-900/60 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
    <div class="flex items-center space-x-2 text-sm text-slate-400">
      <span class="font-medium text-slate-200">Dashboard</span>
      <span class="text-slate-600">/</span>
      <span class="text-slate-400 capitalize">{{ pageTitle }}</span>
    </div>

    <div class="flex items-center space-x-4">
      <div class="text-right hidden sm:block">
        <div class="text-sm font-semibold text-slate-200">{{ user?.nama || user?.email }}</div>
        <div class="text-xs text-slate-400 font-mono">
          {{ user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin Instansi' }}
        </div>
      </div>

      <button 
        @click="handleLogout"
        class="px-3.5 py-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors flex items-center space-x-1.5"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Keluar</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const { user, clear } = useUserSession()

const pageTitle = computed(() => {
  const path = route.path.replace(/^\/(admin|super-admin)\/?/, '')
  return path || 'Overview'
})

const handleLogout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await navigateTo('/login')
}
</script>
