# 🗳️ SuaraKita v2

**SuaraKita v2** adalah platform *Software as a Service* (SaaS) untuk manajemen *voting* berbayar yang dirancang khusus untuk ekosistem komunitas dan kampus (BEM, Himpunan, UKM). Platform ini memfasilitasi penggalangan dana (*fundraising*) melalui kontes pemilihan dengan sistem pembelian "Token Suara" melalui jalur komunikasi WhatsApp.

Proyek ini dibangun menggunakan **Nuxt 3** dan **Prisma ORM**.

---

## ✨ Fitur Utama

1. **Sistem Multi-Tenant (SaaS)**: Banyak instansi/organisasi dapat mendaftar dan mengelola kontes mereka masing-masing dalam satu wadah.
2. **Approval & Verifikasi Instansi**: Keamanan platform dijaga oleh *Super Admin* yang bertugas me-*review* dan meng-*approve* pendaftaran instansi baru.
3. **Transaksi *Frictionless* via WhatsApp**: Pembelian token suara dilakukan via WhatsApp langsung ke nomor panitia. Bebas potongan biaya *Payment Gateway* (seperti Midtrans/Xendit) dan dana langsung cair ke rekening kepanitiaan.
4. **Manajemen Token & Paket Bundling**: Admin Instansi dapat membuat paket token kreatif (misal: "Paket Sultan - 15 Suara"). Sistem akan men-*generate* kode token unik (misal: `SK-XXXXX`) setelah pembayaran diverifikasi.
5. **Rekapitulasi Komisi Otomatis**: Transparansi bisnis dengan kalkulasi otomatis pemotongan 20% (*Platform Fee*) untuk setiap transaksi *vote* yang disetujui.
6. **Live Leaderboard**: Pemilih publik dapat melihat perolehan suara kandidat/paslon yang diperbarui secara *real-time*.

---

## 📁 Dokumen Penting Proyek

Untuk memahami alur dan model bisnis platform ini secara menyeluruh, silakan baca dokumentasi berikut:
- 📖 [Panduan Skenario Demo (DEMO_GUIDE.md)](./DEMO_GUIDE.md)
- 💡 [Argumen Keunggulan Aplikasi (keunggulan_aplikasi.md)](./keunggulan_aplikasi.md)
- 📊 [Diagram Alur Aplikasi (alur_aplikasi.xml)](./alur_aplikasi.xml) — *File ini bisa langsung di-import ke Draw.io*

---

## 🚀 Instalasi & Setup Lokal (Development)

Pastikan Node.js telah terinstal di perangkat Anda.

1. **Install seluruh dependensi:**
   ```bash
   npm install
   ```

2. **Konfigurasi Database (Prisma):**
   Pastikan Anda sudah memiliki file `.env` dengan kredensial database (`DATABASE_URL`). Lalu jalankan perintah berikut untuk migrasi skema dan men-*generate* *Prisma Client*:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Jalankan Server Development:**
   ```bash
   npm run dev
   ```
   Aplikasi akan bisa diakses melalui `http://localhost:3000`.

---

## 🛠️ Tech Stack Utama

- **Framework**: Nuxt 3 (Vue.js)
- **Database ORM**: Prisma
- **Environment**: Node.js

---
*Proyek Capstone — Dirancang untuk mendukung digitalisasi pemilihan dan fundraising di ekosistem kampus.*
