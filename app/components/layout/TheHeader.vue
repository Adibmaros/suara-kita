<template>
  <header class="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
    <div class="flex items-center space-x-3 min-w-0">
      <!-- Mobile Sidebar Toggle Button -->
      <button 
        @click="isMobileOpen = true"
        class="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
        aria-label="Buka Menu Sidebar"
      >
        <Menu class="w-5 h-5" />
      </button>

      <!-- Clickable Breadcrumb Navigation -->
      <nav aria-label="Breadcrumb" class="flex items-center space-x-1 sm:space-x-1.5 text-xs font-medium min-w-0 overflow-hidden">
        <template v-for="(item, index) in breadcrumbs" :key="index">
          <NuxtLink 
            v-if="index < breadcrumbs.length - 1 && item.to" 
            :to="item.to" 
            class="text-slate-500 hover:text-blue-600 hover:bg-slate-100 px-1.5 sm:px-2 py-1 rounded-md transition-all flex items-center truncate"
          >
            <Home v-if="index === 0" class="w-3.5 h-3.5 mr-1 sm:mr-1.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
            <span class="truncate">{{ item.label }}</span>
          </NuxtLink>

          <span 
            v-else 
            class="text-slate-900 font-semibold px-1.5 sm:px-2 py-1 flex items-center truncate"
          >
            <Home v-if="index === 0 && breadcrumbs.length === 1" class="w-3.5 h-3.5 mr-1 sm:mr-1.5 text-slate-400 shrink-0" />
            <span class="truncate">{{ item.label }}</span>
          </span>

          <ChevronRight v-if="index < breadcrumbs.length - 1" class="w-3.5 h-3.5 text-slate-300 shrink-0" />
        </template>
      </nav>
    </div>

    <!-- Quick Status Badge -->
    <div class="flex items-center space-x-2 text-xs font-semibold text-slate-600 bg-slate-100/80 px-2.5 sm:px-3 py-1.5 rounded-full border border-slate-200/60 shrink-0">
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      <span class="hidden sm:inline">System Active</span>
      <span class="sm:hidden text-[11px]">Aktif</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ChevronRight, Home, Menu } from 'lucide-vue-next'

const route = useRoute()
const isMobileOpen = useState('mobile-sidebar-open', () => false)

interface BreadcrumbItem {
  label: string
  to?: string
}

const labelMap: Record<string, string> = {
  'super-admin': 'Super Admin',
  'admin': 'Dashboard',
  'instansi': 'Kelola Instansi',
  'komisi': 'Rekap Komisi',
  'kontes': 'Kelola Kontes',
  'profil': 'Profil Instansi',
  'tambah': 'Tambah Baru',
  'edit': 'Edit'
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const path = route.path
  const segments = path.split('/').filter(Boolean)

  if (segments.length === 0) {
    return [{ label: 'Beranda', to: '/' }]
  }

  const items: BreadcrumbItem[] = []
  let currentPath = ''

  segments.forEach((seg, i) => {
    currentPath += `/${seg}`
    
    let label = labelMap[seg] || seg.replace(/-/g, ' ')
    label = label.charAt(0).toUpperCase() + label.slice(1)

    items.push({
      label,
      to: currentPath
    })
  })

  return items
})
</script>
