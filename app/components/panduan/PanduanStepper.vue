<template>
  <section id="alur" class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="text-center space-y-3 mb-10 sm:mb-12">
      <div class="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200/80">
        <Zap class="w-3.5 h-3.5 text-amber-500" />
        <span>Langkah demi Langkah</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Panduan Alur Operasional</h2>
      <p class="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
        Pilih perspektif di bawah untuk melihat alur kerja lengkap bagi Admin Instansi atau Voter.
      </p>
    </div>

    <!-- Mode Selector Tabs -->
    <div class="flex justify-center mb-10">
      <div class="bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 inline-flex space-x-2">
        <button 
          @click="activeRole = 'admin'"
          class="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2"
          :class="activeRole === 'admin' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'"
        >
          <Building2 class="w-4 h-4" />
          <span>Alur Admin Instansi (6 Langkah)</span>
        </button>
        <button 
          @click="activeRole = 'voter'"
          class="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2"
          :class="activeRole === 'voter' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'"
        >
          <Smartphone class="w-4 h-4" />
          <span>Alur Voter / Pendukung (4 Langkah)</span>
        </button>
      </div>
    </div>

    <!-- Stepper Content Container -->
    <div class="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative">
      <!-- Admin Workflow -->
      <div v-if="activeRole === 'admin'" class="space-y-8">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 class="text-lg sm:text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Building2 class="w-5 h-5 text-emerald-600" />
            <span>Alur Kerja Admin Instansi</span>
          </h3>
          <span class="text-xs text-slate-400 font-mono">6 Langkah Mudah</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(step, idx) in adminSteps" 
            :key="idx"
            class="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all space-y-3 relative group"
          >
            <div class="flex items-center justify-between">
              <span class="w-8 h-8 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                0{{ idx + 1 }}
              </span>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-200/60 px-2 py-0.5 rounded">
                {{ step.badge }}
              </span>
            </div>
            <h4 class="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
              {{ step.title }}
            </h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              {{ step.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- Voter Workflow -->
      <div v-else class="space-y-8">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 class="text-lg sm:text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Smartphone class="w-5 h-5 text-amber-500" />
            <span>Alur Kerja Voter & Pendukung</span>
          </h3>
          <span class="text-xs text-slate-400 font-mono">4 Langkah Singkat</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="(step, idx) in voterSteps" 
            :key="idx"
            class="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:border-amber-300 hover:shadow-md transition-all space-y-3 relative group"
          >
            <div class="flex items-center justify-between">
              <span class="w-8 h-8 rounded-xl bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                0{{ idx + 1 }}
              </span>
              <span class="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100/70 px-2 py-0.5 rounded">
                {{ step.badge }}
              </span>
            </div>
            <h4 class="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
              {{ step.title }}
            </h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              {{ step.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Zap, Building2, Smartphone } from 'lucide-vue-next'

const activeRole = ref<'admin' | 'voter'>('admin')

const adminSteps = [
  {
    badge: 'Registrasi',
    title: '1. Daftar Instansi',
    desc: 'Isi formulir pendaftaran instansi/kampus Anda secara gratis. Sertakan kontak WA dan nama instansi.'
  },
  {
    badge: 'Approval',
    title: '2. Persetujuan & Login',
    desc: 'Tim SuaraKita menyetujui pendaftaran. Login ke dashboard untuk melengkapi profil instansi & logo.'
  },
  {
    badge: 'Event',
    title: '3. Buat Kontes Baru',
    desc: 'Tentukan judul event, deskripsi, serta periode tanggal mulai dan selesai kontes pemilihan.'
  },
  {
    badge: 'Setup',
    title: '4. Input Kandidat & Token',
    desc: 'Tambahkan data kandidat (nama, foto) dan buat opsi paket token dukungan (mis. 5 Suara = Rp10.000).'
  },
  {
    badge: 'Transaksi',
    title: '5. Verifikasi & Terbit Kode',
    desc: 'Cek bukti transfer dari voter via WhatsApp. Klik "Verifikasi" di dashboard untuk otomatis terbitkan kode token.'
  },
  {
    badge: 'Monitor',
    title: '6. Pantau Live Leaderboard',
    desc: 'Pantau perolehan suara kandidat secara real-time dan unduh laporan perolehan setelah event berakhir.'
  }
]

const voterSteps = [
  {
    badge: 'Akses URL',
    title: '1. Buka Halaman Kontes',
    desc: 'Akses link kontes publik instansi tanpa perlu login atau mendaftar akun.'
  },
  {
    badge: 'Pilih Paket',
    title: '2. Beli Token via WA',
    desc: 'Pilih paket suara dukungan yang diinginkan, masukkan nomor WA, dan klik "Lanjut ke WhatsApp".'
  },
  {
    badge: 'Transfer',
    title: '3. Bayar & Terima Kode',
    desc: 'Transfer ke rekening instansi & kirim bukti bayar ke WA Admin. Terima kode token unik (SK-XXXXXXXX).'
  },
  {
    badge: 'Voting',
    title: '4. Redeem Token & Vote',
    desc: 'Masukkan kode token di halaman voting, pilih kandidat favorit, dan suara otomatis masuk secara live!'
  }
]
</script>
