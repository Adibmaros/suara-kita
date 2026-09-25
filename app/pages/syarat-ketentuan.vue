<script setup lang="ts">
import LegalPageLayout from '~/components/legal/LegalPageLayout.vue'

useSeoMeta({
  title: 'Syarat & Ketentuan Penggunaan - SuaraKita',
  description: 'Ketentuan layanan penggunaan platform SuaraKita untuk instansi penyelenggara dan pemilih.'
})

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <LegalPageLayout
    title="Syarat & Ketentuan"
    subtitle="Aturan main dan ketentuan legal penggunaan platform SuaraKita bagi Instansi Penyelenggara dan Pemilih."
    lastUpdated="25 September 2026"
    activePage="syarat-ketentuan"
  >
    <!-- Section 1 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">1.</span> Penerimaan Syarat & Ketentuan
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        Dengan mendaftar, mengakses, atau menggunakan platform <strong class="text-white">SuaraKita</strong>, Anda (baik sebagai Instansi Penyelenggara maupun Pemilih) menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini, Anda tidak diperkenankan menggunakan platform SuaraKita.
      </p>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 2 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">2.</span> Definisi
      </h2>
      <ul class="text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
        <li><strong class="text-white">SuaraKita:</strong> Platform penyedia perangkat lunak voting dan kompetisi berbasis Software-as-a-Service (SaaS).</li>
        <li><strong class="text-white">Instansi:</strong> Organisasi, kampus, kepanitiaan, atau entitas hukum/sosial yang mendaftar untuk menyelenggarakan pemungutan suara atau ajang favorit di SuaraKita.</li>
        <li><strong class="text-white">Pemilih (Voter):</strong> Individu yang melakukan pemungutan suara atau memberikan dukungan token kepada kandidat/peserta di platform SuaraKita.</li>
        <li><strong class="text-white">Token:</strong> Satuan kuis/dukungan digital internal yang digunakan untuk melakukan vote pada event berbayar di SuaraKita.</li>
      </ul>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 3 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">3.</span> Hak & Kewajiban Instansi Penyelenggara
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        Instansi bertanggung jawab penuh atas keabsahan data kandidat, keabsahan event, serta kepatuhan terhadap aturan kampus/hukum Indonesia. Instansi dilarang memuat konten yang mengandung unsur SARA, pornografi, ujaran kebencian, atau penipuan. SuaraKita berhak menangguhkan event yang terindikasi melanggar aturan ini.
      </p>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 4 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">4.</span> Ketentuan Pemilih (Voter)
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        Pemilih wajib memberikan nomor WhatsApp aktif untuk verifikasi OTP (One-Time Password). Pemilih dilarang menggunakan bot, script otomatis, atau kecurangan teknis dalam melakukan vote. Pemilihan suara yang terbukti dihasilkan melalui manipulasi sistem akan dibatalkan otomatis oleh algoritma anti-cheat SuaraKita.
      </p>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 5: PENJELASAN HUKUM - BUKAN PERJUDIAN -->
    <section class="space-y-3 bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-5">
      <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
        <span>Klausul Khusus Regulasi Indonesia</span>
      </div>
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">5.</span> Pernyataan Resmi: Platform Berbasis Merit & Bukan Perjudian
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        Sesuai dengan ketentuan <strong class="text-white">Pasal 303 KUHP</strong> dan <strong class="text-white">UU No. 7 Tahun 1974 tentang Penertiban Perjudian</strong>:
      </p>
      <ul class="text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed pl-2">
        <li>SuaraKita <strong class="text-emerald-400">bukanlah platform perjudian atau taruhan</strong>. Tidak ada acakan, undian keberuntungan (games of chance), atau taruhan hasil akhir.</li>
        <li>Token yang dibeli digunakan secara deterministik untuk menambahkan jumlah suara (vote count) secara transparan pada kandidat pilihan.</li>
        <li>Pemilih tidak dijanjikan dan tidak berhak menerima pengembalian finansial, deviden, atau hadiah uang tunai atas voting yang diberikan.</li>
      </ul>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 6 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">6.</span> Model Keuangan & Batas Tanggung Jawab Dana
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        SuaraKita bertindak murni sebagai <strong class="text-white">Penyedia Teknologi (Software Provider)</strong>. Pembayaran pembeliaan token dikirimkan langsung ke Gateway Pembayaran Instansi (Midtrans/Xendit milik Instansi) atau disalurkan ke Instansi sesuai perjanjian kerja sama. SuaraKita hanya mengambil biaya lisensi platform/komisi per transaksi dan <strong class="text-white">tidak mengendapkan dana publik</strong> dalam bentuk lembaga keuangan atau dompet digital.
      </p>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 7 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">7.</span> Pembatasan Tanggung Jawab (Limitation of Liability)
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        SuaraKita tidak bertanggung jawab atas sengketa internal hasil pemilu/kompetisi instansi, klaim ganti rugi antar kandidat, atau kerugian yang disebabkan oleh kesalahan input data oleh pihak Instansi. Tanggung jawab maksimum SuaraKita terbatas pada jumlah biaya komisi platform yang diterima dari event terkait.
      </p>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 8 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">8.</span> Hak Kekayaan Intelektual (HKI)
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        Seluruh kode sumber, desain antarmuka, logo SuaraKita, serta merek dagang adalah hak milik eksklusif pengembang SuaraKita. Instansi retain hak cipta atas logo, foto kandidat, dan materi publikasi milik instansi sendiri.
      </p>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 9 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">9.</span> Perubahan Syarat & Ketentuan
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        SuaraKita berhak memperbarui Syarat dan Ketentuan ini sewaktu-waktu. Perubahan akan berlaku serta merta setelah dipublikasikan pada halaman ini.
      </p>
    </section>

    <hr class="border-slate-800" />

    <!-- Section 10 -->
    <section class="space-y-3">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-emerald-400 font-mono">10.</span> Hukum yang Berlaku & Penyelesaian Sengketa
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed">
        Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Negara Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan secara musyawarah untuk mufakat, atau melalui yurisdiksi Pengadilan Negeri setempat.
      </p>
    </section>
  </LegalPageLayout>
</template>
