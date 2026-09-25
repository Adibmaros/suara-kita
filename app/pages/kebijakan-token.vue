<script setup lang="ts">
import LegalPageLayout from '~/components/legal/LegalPageLayout.vue'

useSeoMeta({
  title: 'Kebijakan Token & Pembelian - SuaraKita',
  description: 'Ketentuan penggunaan, sifat token voting berbayar, dan kebijakan non-refundable di SuaraKita.'
})

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <LegalPageLayout
    title="Kebijakan Token"
    subtitle="Ketentuan pembelian, penggunaan, dan sifat instrumen token voting digital pada platform SuaraKita."
    lastUpdated="25 September 2026"
    activePage="kebijakan-token"
  >
    <!-- Section 1 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">1.</span> Definisikan & Fungsi Token
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        Token SuaraKita adalah <strong class="text-white">satuan kuis/dukungan digital sekali pakai</strong> yang diterbitkan khusus untuk memfasilitasi mekanisme pemungutan suara atau kompetisi berbayar pada event tertentu di SuaraKita. Token tidak memiliki nilai tukar mata uang di luar platform SuaraKita.
      </p>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 2: Non-refundable policy -->
    <section class="space-y-3 bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-5">
      <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
        <span>Sifat Utama Token</span>
      </div>
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">2.</span> Ketentuan Pembelian & Pengembalian Dana (Non-Refundable)
      </h2>
      <ul class="text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed pl-2">
        <li><strong class="text-white">Final & Tidak Dapat Dibatalkan:</strong> Seluruh transaksi pembelian token bersifat final. Token yang telah dibeli tidak dapat ditukarkan kembali menjadi uang tunai (non-refundable).</li>
        <li><strong class="text-white">Sekali Pakai & Tidak Dapat Dipindahtangankan:</strong> Token yang dialokasikan ke kandidat pilihan langsung terhitung pada perolehan suara dan tidak dapat ditarik kembali atau dipindahkan ke kandidat/event lain.</li>
        <li><strong class="text-white">Masa Berlaku Event:</strong> Token hanya berlaku selama periode voting event yang bersangkutan aktif. Token yang tersisa/tidak digunakan setelah event resmi ditutup akan kedaluwarsa secara otomatis.</li>
      </ul>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 3 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">3.</span> Metode Pembayaran Resmi
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        Pembelian token dilakukan secara resmi dan aman melalui Payment Gateway terintegrasi (seperti Midtrans/Xendit) dengan metode QRIS, Transfer Bank (Virtual Account), atau E-Wallet. SuaraKita tidak bertanggung jawab atas transaksi yang dilakukan di luar saluran resmi platform.
      </p>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 4 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">4.</span> Kegagalan Transaksi & Penanganan Masalah
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        Apabila terjadi kendala sistem di mana saldo/uang Anda telah terpotong tetapi token tidak bertambah dalam kurun waktu 1x24 jam, Pemilih wajib menyertakan bukti pembayaran (receipt) resmi dari payment gateway untuk dilakukan penyesuaian saldo token manual oleh tim teknis kami.
      </p>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 5 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">5.</span> Sengketa Hasil Pembelian & Penyalahgunaan
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        SuaraKita berhak menangguhkan akun atau membatalkan jumlah vote token jika ditemukan indikasi kecurangan transaksi seperti peretasan payment gateway, pencucian uang, atau penggunaan kartu kredit ilegal (chargeback fraud).
      </p>
    </section>
  </LegalPageLayout>
</template>
