<template>
  <header class="h-16 bg-white border-b border-[#e0e0e0] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
    <div class="flex items-center space-x-3 min-w-0">
      <!-- Mobile Sidebar Toggle Button -->
      <button 
        @click="isMobileOpen = true"
        class="md:hidden p-2 rounded-full text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3] transition-colors shrink-0"
        aria-label="Buka Menu Sidebar"
      >
        <Menu class="w-5 h-5" :stroke-width="1.75" />
      </button>

      <!-- Clickable Breadcrumb Navigation -->
      <nav aria-label="Breadcrumb" class="flex items-center space-x-1 text-xs font-medium min-w-0 overflow-hidden">
        <template v-for="(item, index) in breadcrumbs" :key="index">
          <NuxtLink 
            v-if="index < breadcrumbs.length - 1 && item.to" 
            :to="item.to" 
            class="text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3] px-2.5 py-1 rounded-full transition-all flex items-center truncate"
          >
            <Home v-if="index === 0" class="w-3.5 h-3.5 mr-1 text-[#adadad] shrink-0" :stroke-width="1.75" />
            <span class="truncate">{{ item.label }}</span>
          </NuxtLink>

          <span 
            v-else 
            class="text-[#141414] font-semibold px-2.5 py-1 rounded-full bg-[#f3f3f3] flex items-center truncate"
          >
            <Home v-if="index === 0 && breadcrumbs.length === 1" class="w-3.5 h-3.5 mr-1 text-[#707070] shrink-0" :stroke-width="1.75" />
            <span class="truncate">{{ item.label }}</span>
          </span>

          <ChevronRight v-if="index < breadcrumbs.length - 1" class="w-3.5 h-3.5 text-[#adadad] shrink-0" :stroke-width="1.75" />
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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
  'buat': 'Buat Kontes',
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
