<template>
  <header class="sticky top-0 z-50 w-full px-3 sm:px-8 py-3 transition-all duration-300">
    <div class="max-w-7xl mx-auto relative">
      <nav class="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs hover:shadow-md transition-all duration-300">
        <!-- Logo Brand -->
        <NuxtLink to="/" class="flex items-center space-x-2.5 sm:space-x-3 group" @click="isOpen = false">
          <div class="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-extrabold text-sm shadow-md group-hover:scale-105 transition-transform duration-200">
            SK
          </div>
          <span class="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
            SuaraKita
          </span>
        </NuxtLink>

        <!-- Desktop Navigation Buttons -->
        <div class="hidden md:flex items-center space-x-2 sm:space-x-3">
          <NuxtLink 
            to="/panduan" 
            class="px-3.5 sm:px-4 h-9 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-all duration-200 flex items-center space-x-1.5 active:scale-95"
          >
            <BookOpen class="w-4 h-4 text-slate-500" />
            <span>Panduan</span>
          </NuxtLink>

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
              <span>Daftar Instansi</span>
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile Menu Hamburger Toggle Button -->
        <button
          type="button"
          @click="isOpen = !isOpen"
          class="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 focus:outline-hidden transition-all"
          :aria-expanded="isOpen"
          aria-label="Toggle navigation menu"
        >
          <Menu v-if="!isOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </nav>

      <!-- Mobile Dropdown Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-2 scale-95"
      >
        <div 
          v-if="isOpen" 
          class="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-4 shadow-xl flex flex-col space-y-2 z-50"
        >
          <NuxtLink 
            to="/panduan" 
            @click="isOpen = false"
            class="px-4 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition-all duration-200 flex items-center space-x-3 active:scale-98"
          >
            <BookOpen class="w-5 h-5 text-slate-500" />
            <span>Panduan</span>
          </NuxtLink>

          <template v-if="loggedIn">
            <NuxtLink 
              :to="user?.role === 'SUPER_ADMIN' ? '/super-admin' : '/admin'"
              @click="isOpen = false"
              class="px-4 py-3 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200 flex items-center justify-between active:scale-98"
            >
              <div class="flex items-center space-x-3">
                <LayoutGrid class="w-5 h-5 text-slate-700" />
                <span>Dashboard</span>
              </div>
              <ArrowRight class="w-4 h-4 text-slate-400" />
            </NuxtLink>
          </template>

          <template v-else>
            <NuxtLink 
              to="/login" 
              @click="isOpen = false"
              class="px-4 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition-all duration-200 flex items-center space-x-3 active:scale-98"
            >
              <LogIn class="w-5 h-5 text-slate-500" />
              <span>Masuk</span>
            </NuxtLink>

            <NuxtLink 
              to="/register" 
              @click="isOpen = false"
              class="px-4 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center space-x-2 active:scale-98"
            >
              <Building2 class="w-5 h-5" />
              <span>Daftar Instansi</span>
            </NuxtLink>
          </template>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { LayoutGrid, ArrowRight, LogIn, Building2, BookOpen, Menu, X } from 'lucide-vue-next'

const route = useRoute()
const session = useUserSession()
const loggedIn = session.loggedIn
const user = computed(() => session.user.value as any)

const isOpen = ref(false)

// Close mobile menu on route changes
watch(() => route.path, () => {
  isOpen.value = false
})
</script>
