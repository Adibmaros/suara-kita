<template>
  <header class="sticky top-0 z-50 w-full px-4 sm:px-8 py-3 transition-all duration-300">
    <div class="max-w-7xl mx-auto">
      <nav class="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs hover:shadow-md transition-shadow duration-300">
        <!-- Logo Brand -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-extrabold text-sm shadow-md group-hover:scale-105 transition-transform duration-200">
            SK
          </div>
          <span class="text-lg font-bold tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
            SuaraKita
          </span>
        </NuxtLink>

        <!-- Navigation Buttons -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          <template v-if="loggedIn">
            <NuxtLink 
              :to="user?.role === 'SUPER_ADMIN' ? '/super-admin' : '/admin'"
              class="px-4 h-9 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-200 flex items-center space-x-2 active:scale-95"
            >
              <LayoutGrid class="w-4 h-4 text-slate-700" />
              <span>Dashboard</span>
              <ArrowRight class="w-3.5 h-3.5 text-slate-400" />
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink 
              to="/login" 
              class="px-3.5 sm:px-4 h-9 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-all duration-200 flex items-center space-x-1.5 active:scale-95"
            >
              <LogIn class="w-4 h-4 text-slate-500" />
              <span>Masuk</span>
            </NuxtLink>
            <NuxtLink 
              to="/register" 
              class="px-4 h-9 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-1.5 active:scale-95"
            >
              <Building2 class="w-4 h-4" />
              <span class="hidden sm:inline">Daftar Instansi</span>
              <span class="sm:hidden">Daftar</span>
            </NuxtLink>
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { LayoutGrid, ArrowRight, LogIn, Building2 } from 'lucide-vue-next'

const session = useUserSession()
const loggedIn = session.loggedIn
const user = computed(() => session.user.value as any)
</script>
