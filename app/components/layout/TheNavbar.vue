<template>
  <header class="sticky top-0 z-50 w-full px-4 sm:px-6 pt-4 pb-2 transition-all">
    <div class="max-w-5xl mx-auto relative">
      <!-- Floating Stadium Nav Pill -->
      <nav class="bg-[#f3f3f3]/95 backdrop-blur-md border border-[#e0e0e0] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <!-- Logo Brand -->
        <NuxtLink to="/" class="flex items-center space-x-2.5 group" @click="isOpen = false">
          <div class="w-8 h-8 rounded-[30%] bg-[#141414] flex items-center justify-center text-white font-bold text-xs transition-transform duration-200 group-hover:scale-105">
            SK
          </div>
          <span class="text-base font-bold text-[#141414] tracking-tight">
            SuaraKita<span class="text-[#0066ff]">.</span>
          </span>
        </NuxtLink>

        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink 
            to="/panduan" 
            class="text-sm font-semibold text-[#141414] hover:text-[#707070] transition-colors"
          >
            Panduan
          </NuxtLink>
          <a 
            href="/#kontes-aktif" 
            class="text-sm font-semibold text-[#141414] hover:text-[#707070] transition-colors"
          >
            Kontes Aktif
          </a>

          <div class="h-4 w-px bg-[#e0e0e0]"></div>

          <template v-if="loggedIn">
            <NuxtLink 
              :to="user?.role === 'SUPER_ADMIN' ? '/super-admin' : '/admin'"
              class="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[#141414] text-white text-xs font-semibold hover:bg-[#262626] transition-all"
            >
              <LayoutGrid class="w-3.5 h-3.5" />
              <span>Dashboard</span>
              <ArrowRight class="w-3 h-3 text-[#adadad]" />
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink 
              to="/login" 
              class="text-sm font-semibold text-[#141414] hover:text-[#707070] transition-colors"
            >
              Masuk
            </NuxtLink>
            <NuxtLink 
              to="/register" 
              class="inline-flex items-center gap-1.5 h-9 px-5 rounded-full bg-[#141414] text-white text-xs sm:text-sm font-semibold hover:bg-[#262626] transition-all active:scale-[0.98]"
            >
              <span>Daftar Instansi</span>
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <div class="flex items-center space-x-2 md:hidden">
          <template v-if="!loggedIn">
            <NuxtLink 
              to="/register" 
              class="inline-flex items-center h-8 px-3.5 rounded-full bg-[#141414] text-white text-xs font-semibold hover:bg-[#262626] transition-all"
            >
              Daftar
            </NuxtLink>
          </template>
          <button
            type="button"
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-full text-[#141414] hover:bg-[#e8e8e8] transition-all focus:outline-none"
            :aria-expanded="isOpen"
            aria-label="Toggle navigation menu"
          >
            <Menu v-if="!isOpen" class="w-5 h-5" />
            <X v-else class="w-5 h-5" />
          </button>
        </div>
      </nav>

      <!-- Mobile Dropdown Menu -->
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div 
          v-if="isOpen" 
          class="md:hidden absolute top-full left-0 right-0 mt-2 bg-[#f3f3f3] border border-[#e0e0e0] rounded-3xl p-4 flex flex-col space-y-1.5 z-50"
        >
          <NuxtLink 
            to="/panduan" 
            @click="isOpen = false"
            class="px-4 py-2.5 text-sm font-semibold text-[#141414] hover:bg-white rounded-full transition-colors flex items-center space-x-2.5"
          >
            <BookOpen class="w-4 h-4 text-[#707070]" />
            <span>Panduan</span>
          </NuxtLink>
          <a 
            href="/#kontes-aktif" 
            @click="isOpen = false"
            class="px-4 py-2.5 text-sm font-semibold text-[#141414] hover:bg-white rounded-full transition-colors flex items-center space-x-2.5"
          >
            <Vote class="w-4 h-4 text-[#707070]" />
            <span>Kontes Aktif</span>
          </a>

          <div class="h-px bg-[#e0e0e0] my-1"></div>

          <template v-if="loggedIn">
            <NuxtLink 
              :to="user?.role === 'SUPER_ADMIN' ? '/super-admin' : '/admin'"
              @click="isOpen = false"
              class="px-4 py-2.5 text-sm font-semibold text-white bg-[#141414] hover:bg-[#262626] rounded-full transition-all flex items-center justify-between"
            >
              <div class="flex items-center space-x-2.5">
                <LayoutGrid class="w-4 h-4 text-[#adadad]" />
                <span>Dashboard</span>
              </div>
              <ArrowRight class="w-4 h-4 text-[#adadad]" />
            </NuxtLink>
          </template>

          <template v-else>
            <NuxtLink 
              to="/login" 
              @click="isOpen = false"
              class="px-4 py-2.5 text-sm font-semibold text-[#141414] hover:bg-white rounded-full transition-colors flex items-center space-x-2.5"
            >
              <LogIn class="w-4 h-4 text-[#707070]" />
              <span>Masuk</span>
            </NuxtLink>

            <NuxtLink 
              to="/register" 
              @click="isOpen = false"
              class="px-4 py-2.5 text-sm font-semibold text-white bg-[#141414] hover:bg-[#262626] rounded-full transition-all flex items-center justify-center space-x-2"
            >
              <Building2 class="w-4 h-4" />
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
import { LayoutGrid, ArrowRight, LogIn, Building2, BookOpen, Menu, X, Vote } from 'lucide-vue-next'

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
