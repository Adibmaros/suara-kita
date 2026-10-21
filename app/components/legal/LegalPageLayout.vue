<script setup lang="ts">
import { 
  FileText, 
  ShieldCheck, 
  Coins, 
  ChevronRight, 
  AlertTriangle, 
  ArrowLeft 
} from 'lucide-vue-next'

defineProps<{
  title: string
  subtitle: string
  lastUpdated: string
  activePage: 'syarat-ketentuan' | 'kebijakan-privasi' | 'kebijakan-token'
}>()

const navItems = [
  {
    key: 'syarat-ketentuan',
    label: 'Syarat & Ketentuan',
    to: '/syarat-ketentuan',
    icon: FileText
  },
  {
    key: 'kebijakan-privasi',
    label: 'Kebijakan Privasi',
    to: '/kebijakan-privasi',
    icon: ShieldCheck
  },
  {
    key: 'kebijakan-token',
    label: 'Kebijakan Token',
    to: '/kebijakan-token',
    icon: Coins
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#141414] text-white font-sans selection:bg-white selection:text-[#141414]">
    <!-- Header / Hero Section -->
    <div class="border-b border-[#262626] bg-[#141414] pt-8 pb-12">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-xs font-medium text-[#707070] mb-6">
          <NuxtLink to="/" class="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft class="w-3.5 h-3.5" />
            Beranda
          </NuxtLink>
          <ChevronRight class="w-3.5 h-3.5 text-[#333333]" />
          <span class="text-[#adadad]">Dokumen Legal</span>
          <ChevronRight class="w-3.5 h-3.5 text-[#333333]" />
          <span class="text-white">{{ title }}</span>
        </nav>

        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#262626] border border-[#333333] text-[#adadad] mb-3">
              <ShieldCheck class="w-3.5 h-3.5 text-white" />
              Perlindungan Hukum & Kepatuhan
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {{ title }}
            </h1>
            <p class="mt-2 text-base text-[#adadad] font-light max-w-2xl">
              {{ subtitle }}
            </p>
          </div>
          <div class="text-xs text-[#707070] bg-[#262626] border border-[#333333] rounded-full px-4 py-2 shrink-0">
            Terakhir Diperbarui: <span class="text-white font-medium">{{ lastUpdated }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Sticky Sidebar Navigation -->
        <aside class="lg:col-span-4">
          <div class="lg:sticky lg:top-24 space-y-5">
            <div class="bg-[#1c1c1c] border border-[#262626] rounded-3xl p-4">
              <h2 class="text-xs font-semibold text-[#707070] uppercase tracking-wider px-3 mb-3">
                Dokumen Terkait
              </h2>
              <nav class="space-y-1">
                <NuxtLink
                  v-for="item in navItems"
                  :key="item.key"
                  :to="item.to"
                  :class="[
                    'flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-all',
                    activePage === item.key 
                      ? 'bg-white text-[#141414]' 
                      : 'text-[#adadad] hover:text-white hover:bg-[#262626]'
                  ]"
                >
                  <component :is="item.icon" class="w-4 h-4 shrink-0" />
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </nav>
            </div>

            <!-- Legal Notice Box -->
            <div class="bg-[#1c1c1c] border border-[#262626] rounded-3xl p-5 text-xs text-[#adadad] leading-relaxed">
              <div class="flex items-center gap-2 font-semibold text-white mb-2">
                <AlertTriangle class="w-4 h-4 text-white shrink-0" />
                <span>Pemberitahuan Resmi</span>
              </div>
              Dokumen ini mengikat secara hukum bagi seluruh pengguna, ormawa penyelenggara, dan voter di platform SuaraKita.
            </div>
          </div>
        </aside>

        <!-- Dynamic Article Content (24px card) -->
        <main class="lg:col-span-8">
          <article class="bg-[#1c1c1c] border border-[#262626] rounded-3xl p-6 sm:p-10 space-y-8">
            <slot />
          </article>
        </main>
      </div>
    </div>
  </div>
</template>
