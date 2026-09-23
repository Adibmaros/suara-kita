<template>
  <nav class="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3.5 flex items-center justify-between">
    <NuxtLink to="/" class="flex items-center space-x-3 group">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
        S
      </div>
      <span class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-heading">
        SuaraKita
      </span>
    </NuxtLink>

    <div class="flex items-center space-x-3 sm:space-x-4">
      <template v-if="loggedIn">
        <NuxtLink 
          :to="user?.role === 'SUPER_ADMIN' ? '/super-admin' : '/admin'"
          class="px-4 py-2 text-sm font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 flex items-center space-x-2"
        >
          <span>Dashboard</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </NuxtLink>
      </template>
      <template v-else>
        <NuxtLink 
          to="/login" 
          class="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Masuk Admin
        </NuxtLink>
        <NuxtLink 
          to="/register" 
          class="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-md shadow-indigo-600/30"
        >
          Daftar Instansi
        </NuxtLink>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { loggedIn, user } = useUserSession()
</script>
