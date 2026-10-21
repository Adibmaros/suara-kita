<template>
  <div class="h-screen flex bg-white text-[#141414] font-sans antialiased overflow-hidden">
    <LayoutTheSidebar />
    <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
      <LayoutTheHeader />
      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-white">
        <slot />
      </main>
    </div>
  </div>
</template>
