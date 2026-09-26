<template>
  <!-- Desktop Sidebar (Visible on md screens and up) -->
  <aside 
    class="hidden md:flex bg-white border-r border-slate-200/80 flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 z-30 shadow-sm"
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
        class="w-full py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/60 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
        :class="isCollapsed ? 'px-0' : 'px-3'"
        :title="isCollapsed ? 'Keluar dari Akun' : undefined"
      >
        <LogOut class="w-4 h-4 shrink-0" />
        <span v-if="!isCollapsed" class="truncate">Keluar dari Akun</span>
      </button>
    </div>
  </aside>

  <!-- Mobile Drawer Sidebar (Slide over for md screens and below) -->
  <Teleport to="body">
    <div v-if="isMobileOpen" class="md:hidden fixed inset-0 z-50 flex">
      <!-- Backdrop Overlay -->
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        appear
      >
        <div 
          class="fixed inset-0 bg-slate-950/50 backdrop-blur-xs" 
          @click="isMobileOpen = false" 
        ></div>
      </Transition>

      <!-- Slide Drawer Panel -->
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
        appear
      >
        <aside class="relative w-72 max-w-[80vw] bg-white h-full flex flex-col shadow-2xl z-50">
          <!-- Mobile Sidebar Header -->
          <div class="p-4 border-b border-slate-100 flex items-center justify-between h-16">
            <NuxtLink to="/" class="flex items-center space-x-3 group" @click="isMobileOpen = false">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-blue-500/20 font-heading shrink-0">
                SK
              </div>
              <span class="font-bold text-slate-800 text-lg tracking-tight font-heading">
                SuaraKita
              </span>
            </NuxtLink>

            <button 
              @click="isMobileOpen = false"
              class="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Tutup Sidebar"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Mobile Sidebar Navigation Links -->
          <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
            <template v-if="user?.role === 'SUPER_ADMIN'">
              <div class="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Super Admin
              </div>

              <NuxtLink 
                to="/super-admin" 
                @click="isMobileOpen = false"
                class="flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all"
                :class="route.path === '/super-admin' ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200/60 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'"
              >
                <LayoutGrid class="w-5 h-5 shrink-0" />
                <span>Overview</span>
              </NuxtLink>

              <NuxtLink 
                to="/super-admin/instansi" 
                @click="isMobileOpen = false"
                class="flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all"
                :class="route.path.startsWith('/super-admin/instansi') ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200/60 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'"
              >
                <Building2 class="w-5 h-5 shrink-0" />
                <span>Kelola Instansi</span>
              </NuxtLink>

              <NuxtLink 
                to="/super-admin/komisi" 
                @click="isMobileOpen = false"
                class="flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all"
                :class="route.path.startsWith('/super-admin/komisi') ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200/60 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'"
              >
                <Percent class="w-5 h-5 shrink-0" />
                <span>Rekap Komisi</span>
              </NuxtLink>
            </template>

            <template v-else-if="user?.role === 'ADMIN_INSTANSI'">
              <div class="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Instansi Menu
              </div>

              <NuxtLink 
                to="/admin" 
                @click="isMobileOpen = false"
                class="flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all"
                :class="route.path === '/admin' ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200/60 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'"
              >
                <LayoutGrid class="w-5 h-5 shrink-0" />
                <span>Dashboard</span>
              </NuxtLink>

              <NuxtLink 
                to="/admin/kontes" 
                @click="isMobileOpen = false"
                class="flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all"
                :class="route.path.startsWith('/admin/kontes') ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200/60 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'"
              >
                <Trophy class="w-5 h-5 shrink-0" />
                <span>Kelola Kontes</span>
              </NuxtLink>

              <NuxtLink 
                to="/admin/profil" 
                @click="isMobileOpen = false"
                class="flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all"
                :class="route.path === '/admin/profil' ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200/60 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'"
              >
                <User class="w-5 h-5 shrink-0" />
                <span>Profil Instansi</span>
              </NuxtLink>
            </template>
          </nav>

          <!-- Mobile Sidebar Footer -->
          <div class="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3 mt-auto">
            <div class="flex items-center space-x-3 px-1">
              <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm border border-blue-200/80 shrink-0">
                {{ user?.nama ? user.nama.charAt(0).toUpperCase() : 'U' }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-bold text-slate-800 truncate">{{ user?.nama || 'User' }}</div>
                <div class="text-[10px] text-slate-500 font-medium truncate">
                  {{ user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin Instansi' }}
                </div>
              </div>
            </div>

            <button 
              @click="handleLogout"
              class="w-full py-2.5 px-3 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/60 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <LogOut class="w-4 h-4 shrink-0" />
              <span>Keluar dari Akun</span>
            </button>
          </div>
        </aside>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { LayoutGrid, Building2, Percent, Trophy, User, LogOut, ChevronLeft, ChevronRight, X } from 'lucide-vue-next'

const route = useRoute()
const session = useUserSession()
const user = computed(() => session.user.value as any)
const clear = session.clear

const isCollapsed = ref(false)
const isMobileOpen = useState('mobile-sidebar-open', () => false)

// Close mobile drawer on route changes
watch(() => route.path, () => {
  isMobileOpen.value = false
})

const handleLogout = async () => {
  isMobileOpen.value = false
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await navigateTo('/login')
}
</script>
