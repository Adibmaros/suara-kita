<template>
  <section id="alur" class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center space-y-3 mb-10 sm:mb-14">
      <div class="inline-flex items-center space-x-2 text-xs font-semibold text-[#707070] bg-[#f3f3f3] px-3.5 py-1 rounded-full border border-[#e0e0e0]">
        <Zap class="w-3.5 h-3.5 text-[#141414]" />
        <span>Langkah demi Langkah</span>
      </div>
      <h2 class="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight">
        Panduan alur operasional.
      </h2>
      <p class="text-sm font-light text-[#707070] max-w-xl mx-auto">
        Pilih alur di bawah untuk melihat tahapan lengkap bagi Admin Instansi atau Voter.
      </p>
    </div>

    <!-- Mode Selector Tabs (Mobbin segmented-control) -->
    <div class="flex justify-center mb-10">
      <div class="bg-[#f3f3f3] p-1.5 rounded-full border border-[#e0e0e0] inline-flex space-x-1">
        <button 
          @click="activeRole = 'admin'"
          class="px-5 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all flex items-center space-x-2 cursor-pointer"
          :class="activeRole === 'admin' ? 'bg-white text-[#141414] shadow-xs' : 'text-[#707070] hover:text-[#141414]'"
        >
          <Building2 class="w-4 h-4" />
          <span>Alur Admin Instansi (6 Langkah)</span>
        </button>
        <button 
          @click="activeRole = 'voter'"
          class="px-5 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all flex items-center space-x-2 cursor-pointer"
          :class="activeRole === 'voter' ? 'bg-white text-[#141414] shadow-xs' : 'text-[#707070] hover:text-[#141414]'"
        >
          <Smartphone class="w-4 h-4" />
          <span>Alur Voter (4 Langkah)</span>
        </button>
      </div>
    </div>

    <!-- Stepper Content Container (24px card) -->
    <div class="bg-white border border-[#e0e0e0] rounded-3xl p-6 sm:p-10 relative">
      <!-- Admin Workflow -->
      <div v-if="activeRole === 'admin'" class="space-y-8">
        <div class="flex items-center justify-between border-b border-[#f0f0f0] pb-4">
          <h3 class="text-lg sm:text-xl font-bold text-[#141414] flex items-center space-x-2">
            <Building2 class="w-5 h-5 text-[#141414]" />
            <span>Alur Kerja Admin Instansi</span>
          </h3>
          <span class="text-xs text-[#707070] font-mono">6 Langkah Praktis</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(step, idx) in adminSteps" 
            :key="idx"
            class="p-5 rounded-2xl bg-[#f3f3f3] border border-transparent hover:border-[#e0e0e0] transition-all space-y-3 relative group"
          >
            <div class="flex items-center justify-between">
              <span class="w-8 h-8 rounded-[30%] bg-[#141414] text-white font-mono font-bold text-xs flex items-center justify-center">
                0{{ idx + 1 }}
              </span>
              <span class="text-[10px] font-semibold text-[#707070] bg-white border border-[#e0e0e0] px-2.5 py-0.5 rounded-full">
                {{ step.badge }}
              </span>
            </div>
            <h4 class="font-bold text-sm text-[#141414]">
              {{ step.title }}
            </h4>
            <p class="text-xs text-[#707070] leading-relaxed">
              {{ step.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- Voter Workflow -->
      <div v-else class="space-y-8">
        <div class="flex items-center justify-between border-b border-[#f0f0f0] pb-4">
          <h3 class="text-lg sm:text-xl font-bold text-[#141414] flex items-center space-x-2">
            <Smartphone class="w-5 h-5 text-[#141414]" />
            <span>Alur Kerja Voter & Pendukung</span>
          </h3>
          <span class="text-xs text-[#707070] font-mono">4 Langkah Singkat</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="(step, idx) in voterSteps" 
            :key="idx"
            class="p-5 rounded-2xl bg-[#f3f3f3] border border-transparent hover:border-[#e0e0e0] transition-all space-y-3 relative group"
          >
            <div class="flex items-center justify-between">
              <span class="w-8 h-8 rounded-[30%] bg-[#141414] text-white font-mono font-bold text-xs flex items-center justify-center">
                0{{ idx + 1 }}
              </span>
              <span class="text-[10px] font-semibold text-[#707070] bg-white border border-[#e0e0e0] px-2.5 py-0.5 rounded-full">
                {{ step.badge }}
              </span>
            </div>
            <h4 class="font-bold text-sm text-[#141414]">
              {{ step.title }}
            </h4>
            <p class="text-xs text-[#707070] leading-relaxed">
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
    desc: 'Isi formulir pendaftaran ormawa/kampus Anda secara gratis. Sertakan kontak WhatsApp dan nama instansi.'
  },
  {
    badge: 'Approval',
    title: '2. Persetujuan Akun',
    desc: 'Tim SuaraKita menyetujui pendaftaran dalam 1×24 jam. Login ke dashboard untuk melengkapi profil instansi.'
  },
  {
    badge: 'Event',
    title: '3. Buat Kontes Baru',
    desc: 'Tentukan judul event, deskripsi, serta periode tanggal mulai dan selesai kontes pemilihan.'
  },
  {
    badge: 'Setup',
    title: '4. Input Paslon & Token',
    desc: 'Tambahkan data kandidat (nama, foto) dan buat opsi paket token dukungan (mis. 5 Suara = Rp10.000).'
  },
  {
    badge: 'Transaksi',
    title: '5. Verifikasi & Terbitkan Kode',
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
    desc: 'Transfer ke kas ormawa & kirim bukti bayar ke WA Panitia. Terima kode token unik (SK-XXXXXXXX).'
  },
  {
    badge: 'Voting',
    title: '4. Redeem Token & Vote',
    desc: 'Masukkan kode token di halaman voting, pilih kandidat favorit, dan suara otomatis masuk secara live!'
  }
]
</script>
