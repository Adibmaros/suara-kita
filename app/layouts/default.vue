<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
    <LayoutTheNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutTheFooter />
  </div>
</template>
