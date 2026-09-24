<template>
  <div class="h-screen flex bg-slate-50 text-slate-900 font-sans overflow-hidden">
    <LayoutTheSidebar />
    <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
      <LayoutTheHeader />
      <main class="flex-1 p-6 lg:p-8 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
