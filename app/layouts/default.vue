<template>
  <div class="min-h-screen flex flex-col bg-white text-[#141414] font-sans antialiased">
    <LayoutTheNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutTheFooter />
  </div>
</template>
