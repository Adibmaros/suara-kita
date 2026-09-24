<template>
  <aside class="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col min-h-screen sticky top-0 shrink-0">
    <!-- Header Sidebar -->
    <div class="p-5 border-b border-slate-800 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center space-x-3 group">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-base shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform font-heading">
          SK
        </div>
        <span class="font-bold text-white text-lg tracking-tight font-heading">
          SuaraKita
        </span>
      </NuxtLink>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 p-4 space-y-1.5 overflow-y-auto">
      <template v-if="user?.role === 'SUPER_ADMIN'">
        <div class="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Super Admin
        </div>
        <NuxtLink 
          to="/super-admin" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="route.path === '/super-admin' ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'"
        >
          <LayoutGrid class="w-4 h-4" />
          <span>Overview</span>
        </NuxtLink>

        <NuxtLink 
          to="/super-admin/instansi" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="route.path.startsWith('/super-admin/instansi') ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'"
        >
          <Building2 class="w-4 h-4" />
          <span>Kelola Instansi</span>
        </NuxtLink>

        <NuxtLink 
          to="/super-admin/komisi" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="route.path.startsWith('/super-admin/komisi') ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'"
        >
          <Percent class="w-4 h-4" />
          <span>Rekap Komisi</span>
        </NuxtLink>
      </template>

      <template v-else-if="user?.role === 'ADMIN_INSTANSI'">
        <div class="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Instansi Menu
        </div>
        <NuxtLink 
          to="/admin" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="route.path === '/admin' ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'"
        >
          <LayoutGrid class="w-4 h-4" />
          <span>Dashboard</span>
        </NuxtLink>

        <NuxtLink 
          to="/admin/kontes" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="route.path.startsWith('/admin/kontes') ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'"
        >
          <Trophy class="w-4 h-4" />
          <span>Kelola Kontes</span>
        </NuxtLink>

        <NuxtLink 
          to="/admin/profil" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="route.path === '/admin/profil' ? 'bg-blue-500/15 text-blue-400 font-semibold border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'"
        >
          <User class="w-4 h-4" />
          <span>Profil Instansi</span>
        </NuxtLink>
      </template>

      <template v-else>
        <div class="px-3 py-2 text-xs text-slate-500">
          Memuat menu...
        </div>
      </template>
    </nav>

    <!-- Bottom Profile & Logout -->
    <div class="p-4 border-t border-slate-800 bg-slate-950/40 space-y-3 mt-auto">
      <div class="flex items-center space-x-3 px-1">
        <div class="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-sm border border-blue-500/30 shrink-0">
          {{ user?.nama ? user.nama.charAt(0).toUpperCase() : 'U' }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-xs font-bold text-white truncate">{{ user?.nama || 'User' }}</div>
          <div class="text-[10px] text-slate-400 font-mono truncate">
            {{ user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin Instansi' }}
          </div>
        </div>
      </div>

      <button 
        @click="handleLogout"
        class="w-full px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-all flex items-center justify-center space-x-2"
      >
        <LogOut class="w-4 h-4" />
        <span>Keluar dari Akun</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { LayoutGrid, Building2, Percent, Trophy, User, LogOut } from 'lucide-vue-next'

const route = useRoute()
const session = useUserSession()
const user = computed(() => session.user.value as any)
const clear = session.clear

const handleLogout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await navigateTo('/login')
}
</script>
