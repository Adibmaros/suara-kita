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
  <div class="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
    <!-- Header / Hero Section -->
    <div class="relative -mt-3 pt-6 pb-12 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 to-slate-950">
      <!-- Background Ambient Glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full"></div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-xs font-medium text-slate-400 mb-6">
          <NuxtLink to="/" class="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <ArrowLeft class="w-3.5 h-3.5" />
            Beranda
          </NuxtLink>
          <ChevronRight class="w-3.5 h-3.5 text-slate-600" />
          <span class="text-slate-300">Dokumen Legal</span>
          <ChevronRight class="w-3.5 h-3.5 text-slate-600" />
          <span class="text-emerald-400">{{ title }}</span>
        </nav>

        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
              <ShieldCheck class="w-3.5 h-3.5" />
              Perlindungan Hukum & Privasi
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {{ title }}
            </h1>
            <p class="mt-2 text-base sm:text-lg text-slate-400 max-w-2xl">
              {{ subtitle }}
            </p>
          </div>
          <div class="text-xs text-slate-500 bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2.5 backdrop-blur-sm shrink-0">
            Terakhir Diperbarui: <span class="text-slate-300 font-medium">{{ lastUpdated }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- Sticky Sidebar Navigation -->
        <aside class="lg:col-span-4">
          <div class="lg:sticky lg:top-24 space-y-6">
            <div class="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-sm">
              <h2 class="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-3">
                Dokumen Terkait
              </h2>
              <nav class="space-y-1">
                <NuxtLink
                  v-for="item in navItems"
                  :key="item.key"
                  :to="item.to"
                  :class="[
                    'flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    activePage === item.key 
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  ]"
                >
                  <component :is="item.icon" class="w-4 h-4 shrink-0" />
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </nav>
            </div>

            <!-- Legal Notice Box -->
            <div class="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-xs text-amber-300/90 leading-relaxed">
              <div class="flex items-center gap-2 font-semibold text-amber-400 mb-1.5">
                <AlertTriangle class="w-4 h-4 shrink-0" />
                <span>Pemberitahuan Penting</span>
              </div>
              Dokumen ini mengikat secara hukum bagi seluruh pengguna, penyelenggara (instansi), dan pemilih platform SuaraKita.
            </div>
          </div>
        </aside>

        <!-- Dynamic Article Content -->
        <main class="lg:col-span-8">
          <article class="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-10 space-y-8 backdrop-blur-sm shadow-xl">
            <slot />
          </article>
        </main>
      </div>
    </div>
  </div>
</template>
