<template>
  <div class="min-h-screen flex bg-slate-50 text-slate-900 font-sans">
    <LayoutTheSidebar />
    <div class="flex-1 flex flex-col min-w-0">
      <LayoutTheHeader />
      <main class="flex-1 p-6 lg:p-8 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
