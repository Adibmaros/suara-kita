<template>
  <!-- Desktop Sidebar (Visible on md screens and up) -->
  <aside 
    class="hidden md:flex bg-white border-r border-[#e0e0e0] flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 z-30"
    :class="isCollapsed ? 'w-20' : 'w-64'"
  >
    <!-- Header Sidebar -->
    <div class="p-4 border-b border-[#f0f0f0] flex items-center justify-between h-16">
      <NuxtLink to="/" class="flex items-center space-x-3 group min-w-0 overflow-hidden">
        <img 
          src="/logo%20aplikasi%20transparant.png" 
          alt="SuaraKita Logo" 
          class="w-8 h-8 object-contain shrink-0 group-hover:scale-105 transition-transform" 
        />
        <span 
          v-if="!isCollapsed" 
          class="font-bold text-[#141414] text-base tracking-tight truncate transition-opacity duration-200"
        >
          SuaraKita<span class="text-[#0066ff]">.</span>
        </span>
      </NuxtLink>

      <!-- Toggle Collapse Button -->
      <button 
        @click="isCollapsed = !isCollapsed" 
        class="p-1.5 rounded-full text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3] transition-colors flex items-center justify-center cursor-pointer"
        :title="isCollapsed ? 'Perluas Sidebar' : 'Lipat Sidebar'"
      >
        <ChevronRight v-if="isCollapsed" class="w-4 h-4" />
        <ChevronLeft v-else class="w-4 h-4" />
      </button>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
      <template v-if="user?.role === 'SUPER_ADMIN'">
        <div v-if="!isCollapsed" class="px-3 py-1.5 text-[11px] font-medium text-[#707070] transition-opacity duration-200">
          Super Admin
        </div>
        <div v-else class="my-2 border-t border-[#f0f0f0]"></div>

        <NuxtLink 
          to="/super-admin" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all"
          :class="[
            route.path === '/super-admin' 
              ? 'bg-[#141414] text-white' 
              : 'text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]',
            isCollapsed ? 'justify-center px-0' : ''
          ]"
          :title="isCollapsed ? 'Overview' : undefined"
        >
          <LayoutGrid class="w-4 h-4 shrink-0" :stroke-width="1.75" />
          <span v-if="!isCollapsed" class="truncate">Overview</span>
        </NuxtLink>

        <NuxtLink 
          to="/super-admin/instansi" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all"
          :class="[
            route.path.startsWith('/super-admin/instansi') 
              ? 'bg-[#141414] text-white' 
              : 'text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]',
            isCollapsed ? 'justify-center px-0' : ''
          ]"
          :title="isCollapsed ? 'Kelola Instansi' : undefined"
        >
          <Building2 class="w-4 h-4 shrink-0" :stroke-width="1.75" />
          <span v-if="!isCollapsed" class="truncate">Kelola Instansi</span>
        </NuxtLink>

        <NuxtLink 
          to="/super-admin/komisi" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all"
          :class="[
            route.path.startsWith('/super-admin/komisi') 
              ? 'bg-[#141414] text-white' 
              : 'text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]',
            isCollapsed ? 'justify-center px-0' : ''
          ]"
          :title="isCollapsed ? 'Rekap Komisi' : undefined"
        >
          <BadgePercent class="w-4 h-4 shrink-0" :stroke-width="1.75" />
          <span v-if="!isCollapsed" class="truncate">Rekap Komisi</span>
        </NuxtLink>
      </template>

      <template v-else-if="user?.role === 'ADMIN_INSTANSI'">
        <div v-if="!isCollapsed" class="px-3 py-1.5 text-[11px] font-medium text-[#707070] transition-opacity duration-200">
          Menu Instansi
        </div>
        <div v-else class="my-2 border-t border-[#f0f0f0]"></div>

        <NuxtLink 
          to="/admin" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all"
          :class="[
            route.path === '/admin' 
              ? 'bg-[#141414] text-white' 
              : 'text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]',
            isCollapsed ? 'justify-center px-0' : ''
          ]"
          :title="isCollapsed ? 'Dashboard' : undefined"
        >
          <LayoutGrid class="w-4 h-4 shrink-0" :stroke-width="1.75" />
          <span v-if="!isCollapsed" class="truncate">Dashboard</span>
        </NuxtLink>

        <NuxtLink 
          to="/admin/kontes" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all"
          :class="[
            route.path.startsWith('/admin/kontes') 
              ? 'bg-[#141414] text-white' 
              : 'text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]',
            isCollapsed ? 'justify-center px-0' : ''
          ]"
          :title="isCollapsed ? 'Kelola Kontes' : undefined"
        >
          <Vote class="w-4 h-4 shrink-0" :stroke-width="1.75" />
          <span v-if="!isCollapsed" class="truncate">Kelola Kontes</span>
        </NuxtLink>

        <NuxtLink 
          to="/admin/profil" 
          class="flex items-center space-x-3 px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all"
          :class="[
            route.path === '/admin/profil' 
              ? 'bg-[#141414] text-white' 
              : 'text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]',
            isCollapsed ? 'justify-center px-0' : ''
          ]"
          :title="isCollapsed ? 'Profil Instansi' : undefined"
        >
          <Landmark class="w-4 h-4 shrink-0" :stroke-width="1.75" />
          <span v-if="!isCollapsed" class="truncate">Profil Instansi</span>
        </NuxtLink>
      </template>

      <template v-else>
        <div class="px-3 py-2 text-xs text-[#adadad]">
          <span v-if="!isCollapsed">Memuat menu...</span>
          <span v-else class="block w-2 h-2 rounded-full bg-[#e0e0e0] mx-auto animate-pulse"></span>
        </div>
      </template>
    </nav>

    <!-- Bottom Profile & Logout -->
    <div class="p-3 border-t border-[#f0f0f0] space-y-3 mt-auto">
      <div class="flex items-center space-x-3 px-1" :class="isCollapsed ? 'justify-center px-0' : ''">
        <div 
          class="w-8 h-8 rounded-[30%] bg-[#f3f3f3] text-[#141414] font-bold flex items-center justify-center text-xs border border-[#e0e0e0] shrink-0"
          :title="isCollapsed ? (user?.nama || 'User') : undefined"
        >
          {{ user?.nama ? user.nama.charAt(0).toUpperCase() : 'U' }}
        </div>
        <div v-if="!isCollapsed" class="flex-1 min-w-0">
          <div class="text-xs font-bold text-[#141414] truncate">{{ user?.nama || 'User' }}</div>
          <div class="text-[10px] text-[#707070] font-medium truncate">
            {{ user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin Instansi' }}
          </div>
        </div>
      </div>

      <button 
        @click="handleLogout"
        class="w-full py-2 text-xs font-semibold text-[#141414] hover:bg-[#f3f3f3] border border-[#e0e0e0] rounded-full transition-all flex items-center justify-center space-x-2 cursor-pointer"
        :class="isCollapsed ? 'px-0' : 'px-3'"
        :title="isCollapsed ? 'Keluar dari Akun' : undefined"
      >
        <LogOut class="w-3.5 h-3.5 shrink-0" />
        <span v-if="!isCollapsed" class="truncate">Keluar</span>
      </button>
    </div>
  </aside>

  <!-- Mobile Drawer Sidebar -->
  <Teleport to="body">
    <div v-if="isMobileOpen" class="md:hidden fixed inset-0 z-50 flex">
      <!-- Backdrop Overlay -->
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        appear
      >
        <div 
          class="fixed inset-0 bg-[#141414]/40 backdrop-blur-xs" 
          @click="isMobileOpen = false" 
        ></div>
      </Transition>

      <!-- Slide Drawer Panel -->
      <Transition
        enter-active-class="transition-transform duration-200 ease-out"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-150 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
        appear
      >
        <aside class="relative w-72 max-w-[80vw] bg-white h-full flex flex-col z-50 border-r border-[#e0e0e0]">
          <!-- Mobile Sidebar Header -->
          <div class="p-4 border-b border-[#f0f0f0] flex items-center justify-between h-16">
            <NuxtLink to="/" class="flex items-center space-x-3 group" @click="isMobileOpen = false">
              <img 
                src="/logo%20aplikasi%20transparant.png" 
                alt="SuaraKita Logo" 
                class="w-8 h-8 object-contain shrink-0" 
              />
              <span class="font-bold text-[#141414] text-base tracking-tight">
                SuaraKita<span class="text-[#0066ff]">.</span>
              </span>
            </NuxtLink>

            <button 
              @click="isMobileOpen = false"
              class="p-2 rounded-full text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3] transition-colors"
              aria-label="Tutup Sidebar"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Mobile Sidebar Navigation Links -->
          <nav class="flex-1 p-4 space-y-1.5 overflow-y-auto">
            <template v-if="user?.role === 'SUPER_ADMIN'">
              <div class="px-3 py-1.5 text-[11px] font-medium text-[#707070]">
                Super Admin
              </div>

              <NuxtLink 
                to="/super-admin" 
                @click="isMobileOpen = false"
                class="flex items-center space-x-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
                :class="route.path === '/super-admin' ? 'bg-[#141414] text-white' : 'text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]'"
              >
                <LayoutGrid class="w-4 h-4 shrink-0" :stroke-width="1.75" />
                <span>Overview</span>
              </NuxtLink>

              <NuxtLink 
                to="/super-admin/instansi" 
                @click="isMobileOpen = false"
                class="flex items-center space-x-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
                :class="route.path.startsWith('/super-admin/instansi') ? 'bg-[#141414] text-white' : 'text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]'"
              >
                <Building2 class="w-4 h-4 shrink-0" :stroke-width="1.75" />
                <span>Kelola Instansi</span>
              </NuxtLink>

              <NuxtLink 
                to="/super-admin/komisi" 
                @click="isMobileOpen = false"
                class="flex items-center space-x-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
                :class="route.path.startsWith('/super-admin/komisi') ? 'bg-[#141414] text-white' : 'text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]'"
              >
                <BadgePercent class="w-4 h-4 shrink-0" :stroke-width="1.75" />
                <span>Rekap Komisi</span>
              </NuxtLink>
            </template>

            <template v-else-if="user?.role === 'ADMIN_INSTANSI'">
              <div class="px-3 py-1.5 text-[11px] font-medium text-[#707070]">
                Menu Instansi
              </div>

              <NuxtLink 
                to="/admin" 
                @click="isMobileOpen = false"
                class="flex items-center space-x-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
                :class="route.path === '/admin' ? 'bg-[#141414] text-white' : 'text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]'"
              >
                <LayoutGrid class="w-4 h-4 shrink-0" :stroke-width="1.75" />
                <span>Dashboard</span>
              </NuxtLink>

              <NuxtLink 
                to="/admin/kontes" 
                @click="isMobileOpen = false"
                class="flex items-center space-x-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
                :class="route.path.startsWith('/admin/kontes') ? 'bg-[#141414] text-white' : 'text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]'"
              >
                <Vote class="w-4 h-4 shrink-0" :stroke-width="1.75" />
                <span>Kelola Kontes</span>
              </NuxtLink>

              <NuxtLink 
                to="/admin/profil" 
                @click="isMobileOpen = false"
                class="flex items-center space-x-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
                :class="route.path === '/admin/profil' ? 'bg-[#141414] text-white' : 'text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]'"
              >
                <Landmark class="w-4 h-4 shrink-0" :stroke-width="1.75" />
                <span>Profil Instansi</span>
              </NuxtLink>
            </template>
          </nav>

          <!-- Mobile Sidebar Footer -->
          <div class="p-4 border-t border-[#f0f0f0] space-y-3 mt-auto">
            <div class="flex items-center space-x-3 px-1">
              <div class="w-8 h-8 rounded-[30%] bg-[#f3f3f3] text-[#141414] font-bold flex items-center justify-center text-xs border border-[#e0e0e0] shrink-0">
                {{ user?.nama ? user.nama.charAt(0).toUpperCase() : 'U' }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-bold text-[#141414] truncate">{{ user?.nama || 'User' }}</div>
                <div class="text-[10px] text-[#707070] font-medium truncate">
                  {{ user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin Instansi' }}
                </div>
              </div>
            </div>

            <button 
              @click="handleLogout"
              class="w-full py-2 px-3 text-xs font-semibold text-[#141414] hover:bg-[#f3f3f3] border border-[#e0e0e0] rounded-full transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <LogOut class="w-3.5 h-3.5 shrink-0" />
              <span>Keluar</span>
            </button>
          </div>
        </aside>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { LayoutGrid, Building2, BadgePercent, Vote, Landmark, LogOut, ChevronLeft, ChevronRight, X } from 'lucide-vue-next'

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
