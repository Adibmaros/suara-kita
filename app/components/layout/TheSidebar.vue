<template>
  <aside class="w-64 bg-slate-900 border-r border-slate-800 flex flex-col min-h-screen sticky top-0">
    <!-- Header Sidebar -->
    <div class="p-5 border-b border-slate-800 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold font-heading">
          S
        </div>
        <span class="font-bold text-white text-lg font-heading">SuaraKita</span>
      </NuxtLink>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 p-4 space-y-1.5 overflow-y-auto">
      <template v-if="user?.role === 'SUPER_ADMIN'">
        <div class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Super Admin Menu
        </div>
        <NuxtLink 
          to="/super-admin" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="route.path === '/super-admin' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Overview</span>
        </NuxtLink>
        <NuxtLink 
          to="/super-admin/instansi" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="route.path.startsWith('/super-admin/instansi') ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>Instansi</span>
        </NuxtLink>
        <NuxtLink 
          to="/super-admin/komisi" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="route.path.startsWith('/super-admin/komisi') ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Rekap Komisi</span>
        </NuxtLink>
      </template>

      <template v-else-if="user?.role === 'ADMIN_INSTANSI'">
        <div class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Admin Instansi Menu
        </div>
        <NuxtLink 
          to="/admin" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="route.path === '/admin' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Dashboard</span>
        </NuxtLink>
        <NuxtLink 
          to="/admin/kontes" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="route.path.startsWith('/admin/kontes') ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>Kelola Kontes</span>
        </NuxtLink>
        <NuxtLink 
          to="/admin/profil" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="route.path === '/admin/profil' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Profil Instansi</span>
        </NuxtLink>
      </template>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()
const { user } = useUserSession()
</script>
