<script setup lang="ts">
import LegalPageLayout from '~/components/legal/LegalPageLayout.vue'

useSeoMeta({
  title: 'Kebijakan Privasi - SuaraKita',
  description: 'Kebijakan perlindungan data pribadi dan penggunaan WhatsApp OTP sesuai UU PDP No. 27 Tahun 2022.'
})

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <LegalPageLayout
    title="Kebijakan Privasi"
    subtitle="Komitmen kami dalam melindungi data pribadi Pengguna dan Pemilih sesuai UU Perlindungan Data Pribadi (UU PDP)."
    lastUpdated="25 September 2026"
    activePage="kebijakan-privasi"
  >
    <!-- Section 1 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">1.</span> Pendahuluan & Dasar Hukum
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        SuaraKita berkomitmen penuh untuk melindungi privasi dan data pribadi pengguna platform kami. Kebijakan Privasi ini disusun berdasarkan <strong class="text-white">Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)</strong> dan peraturan perundang-undangan Republik Indonesia lainnya yang relevan.
      </p>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 2 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">2.</span> Data Pribadi yang Kami Kumpulkan
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        Kami mengumpulkan informasi terbatas yang diperlukan untuk memastikan validitas suara dan keamanan sistem:
      </p>
      <div class="space-y-3 text-sm text-slate-300 pl-2">
        <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <h3 class="font-bold text-white mb-1">A. Data Pemilih (Voter)</h3>
          <p class="text-xs text-slate-400">Nomor WhatsApp (untuk pengiriman OTP), alamat IP (keamanan anti-bot), serta riwayat alokasi token vote.</p>
        </div>
        <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <h3 class="font-bold text-white mb-1">B. Data Pengelola (Instansi)</h3>
          <p class="text-xs text-slate-400">Nama lengkap penanggung jawab, email resmi instansi, nomor WhatsApp admin, nama lembaga/kampus, serta dokumen verifikasi identitas instansi.</p>
        </div>
      </div>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 3: WA OTP Focus -->
    <section class="space-y-3 bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-5">
      <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
        <span>Penggunaan Otentikasi WhatsApp</span>
      </div>
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">3.</span> Penggunaan Nomor WhatsApp & Kode OTP
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        Nomor WhatsApp yang Anda masukkan saat memilih <strong class="text-white">hanya digunakan untuk keperluan verifikasi One-Time Password (OTP)</strong> guna mencegah voting ganda dan bot otomatis. SuaraKita:
      </p>
      <ul class="text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed pl-2">
        <li><strong class="text-emerald-400">Tidak pernah memperjualbelikan</strong> nomor WhatsApp Anda kepada pihak ketiga mana pun.</li>
        <li><strong class="text-emerald-400">Tidak mengirimkan pesan spam atau promosi</strong> pemasaran yang tidak relevan.</li>
        <li>Menyimpan nomor telepon dalam bentuk terenskripsi sesuai standar keamanan industri.</li>
      </ul>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 4 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">4.</span> Tujuan Pemrosesan Data
      </h2>
      <ul class="text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
        <li>Verifikasi identitas pemilih secara aman dan cepat.</li>
        <li>Menjaga integritas dan keabsahan rekapitulasi perolehan suara (audit trail).</li>
        <li>Mencegah kecurangan teknis, manipulasi bot, dan serangan siber.</li>
        <li>Mengirimkan konfirmasi bukti pembelian token / receipt transaksi.</li>
      </ul>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 5 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">5.</span> Penyimpanan & Keamanan Data
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        Data pengguna disimpan dalam peladen (server) terenkripsi dengan protokol enkripsi TLS/SSL standar industri. Kami menerapkan kontrol akses terbatas, firewall, dan sistem deteksi anomali untuk melindungi data dari akses tanpa izin. Data sesi pemilih akan dianonimkan/dihapus secara berkala sesuai kebijakan retensi data.
      </p>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 6 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">6.</span> Hak Subjek Data Pribadi (Pengguna)
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        Sesuai UU PDP, Anda memiliki hak untuk mengakses, memperbarui, meminta penghapusan (retraction) data pribadi Anda, atau mengajukan keberatan atas pemrosesan data tertentu dengan menghubungi tim Data Protection Officer (DPO) kami melalui email <a href="mailto:privacy@suarakita.id" class="text-emerald-400 underline">privacy@suarakita.id</a>.
      </p>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 7 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">7.</span> Cookies & Teknologi Pelacak
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        SuaraKita menggunakan cookies teknis esensial untuk mengelola sesi pengguna yang sedang aktif dan mempertahankan status login. Kami tidak menggunakan cookies pihak ketiga untuk tujuan pelacakan iklan lintas situs.
      </p>
    </section>
  </LegalPageLayout>
</template>
