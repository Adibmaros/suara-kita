<template>
  <aside 
    class="bg-white border-r border-slate-200/80 flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 z-30 shadow-sm"
    :class="isCollapsed ? 'w-20' : 'w-64'"
  >
    <!-- Header Sidebar -->
    <div class="p-4 border-b border-slate-100 flex items-center justify-between h-16">
      <NuxtLink to="/" class="flex items-center space-x-3 group min-w-0 overflow-hidden">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform font-heading shrink-0">
          SK
        </div>
        <span 
          v-if="!isCollapsed" 
          class="font-bold text-slate-800 text-lg tracking-tight font-heading truncate transition-opacity duration-200"
        >
          SuaraKita
        </span>
      </NuxtLink>

      <!-- Toggle Collapse Button -->
      <button 
        @click="isCollapsed = !isCollapsed" 
        class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center"
        :title="isCollapsed ? 'Perluas Sidebar' : 'Lipat Sidebar'"
      >
        <ChevronRight v-if="isCollapsed" class="w-5 h-5" />
        <ChevronLeft v-else class="w-5 h-5" />
      </button>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 p-3 space-y-1.5 overflow-y-auto">
      <template v-if="user?.role === 'SUPER_ADMIN'">
        <div v-if="!isCollapsed" class="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-opacity duration-200">
          Super Admin
        </div>
        <div v-else class="my-2 border-t border-slate-100"></div>

        <NuxtLink 
          to="/super-admin" 
          class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="[
            route.path === '/super-admin' 
              ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200/60 shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
            isCollapsed ? 'justify-center px-0' : ''
          ]"
          :title="isCollapsed ? 'Overview' : undefined"
        >
          <LayoutGrid class="w-5 h-5 shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Overview</span>
        </NuxtLink>

        <NuxtLink 
          to="/super-admin/instansi" 
          class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="[
            route.path.startsWith('/super-admin/instansi') 
              ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200/60 shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
            isCollapsed ? 'justify-center px-0' : ''
          ]"
          :title="isCollapsed ? 'Kelola Instansi' : undefined"
        >
          <Building2 class="w-5 h-5 shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Kelola Instansi</span>
        </NuxtLink>

        <NuxtLink 
          to="/super-admin/komisi" 
          class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="[
            route.path.startsWith('/super-admin/komisi') 
              ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200/60 shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
            isCollapsed ? 'justify-center px-0' : ''
          ]"
          :title="isCollapsed ? 'Rekap Komisi' : undefined"
        >
          <Percent class="w-5 h-5 shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Rekap Komisi</span>
        </NuxtLink>
      </template>

      <template v-else-if="user?.role === 'ADMIN_INSTANSI'">
        <div v-if="!isCollapsed" class="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-opacity duration-200">
          Instansi Menu
        </div>
        <div v-else class="my-2 border-t border-slate-100"></div>

        <NuxtLink 
          to="/admin" 
          class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="[
            route.path === '/admin' 
              ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200/60 shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
            isCollapsed ? 'justify-center px-0' : ''
          ]"
          :title="isCollapsed ? 'Dashboard' : undefined"
        >
          <LayoutGrid class="w-5 h-5 shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Dashboard</span>
        </NuxtLink>

        <NuxtLink 
          to="/admin/kontes" 
          class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="[
            route.path.startsWith('/admin/kontes') 
              ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200/60 shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
            isCollapsed ? 'justify-center px-0' : ''
          ]"
          :title="isCollapsed ? 'Kelola Kontes' : undefined"
        >
          <Trophy class="w-5 h-5 shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Kelola Kontes</span>
        </NuxtLink>

        <NuxtLink 
          to="/admin/profil" 
          class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="[
            route.path === '/admin/profil' 
              ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200/60 shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
            isCollapsed ? 'justify-center px-0' : ''
          ]"
          :title="isCollapsed ? 'Profil Instansi' : undefined"
        >
          <User class="w-5 h-5 shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Profil Instansi</span>
        </NuxtLink>
      </template>

      <template v-else>
        <div class="px-3 py-2 text-xs text-slate-400">
          <span v-if="!isCollapsed">Memuat menu...</span>
          <span v-else class="block w-2 h-2 rounded-full bg-slate-300 mx-auto animate-pulse"></span>
        </div>
      </template>
    </nav>

    <!-- Bottom Profile & Logout -->
    <div class="p-3 border-t border-slate-100 bg-slate-50/50 space-y-3 mt-auto">
      <div class="flex items-center space-x-3 px-1" :class="isCollapsed ? 'justify-center px-0' : ''">
        <div 
          class="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm border border-blue-200/80 shrink-0"
          :title="isCollapsed ? (user?.nama || 'User') : undefined"
        >
          {{ user?.nama ? user.nama.charAt(0).toUpperCase() : 'U' }}
        </div>
        <div v-if="!isCollapsed" class="flex-1 min-w-0">
          <div class="text-xs font-bold text-slate-800 truncate">{{ user?.nama || 'User' }}</div>
          <div class="text-[10px] text-slate-500 font-medium truncate">
            {{ user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin Instansi' }}
          </div>
        </div>
      </div>

      <button 
        @click="handleLogout"
        class="w-full py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/60 rounded-xl transition-all flex items-center justify-center space-x-2"
        :class="isCollapsed ? 'px-0' : 'px-3'"
        :title="isCollapsed ? 'Keluar dari Akun' : undefined"
      >
        <LogOut class="w-4 h-4 shrink-0" />
        <span v-if="!isCollapsed" class="truncate">Keluar dari Akun</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LayoutGrid, Building2, Percent, Trophy, User, LogOut, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const route = useRoute()
const session = useUserSession()
const user = computed(() => session.user.value as any)
const clear = session.clear

const isCollapsed = ref(false)

const handleLogout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await navigateTo('/login')
}
</script>
