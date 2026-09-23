# 🚀 Panduan Demo SuaraKita v2

Panduan ini berisi daftar akun demo, URL publik, dan skenario presentasi untuk mendemonstrasikan seluruh fitur **SuaraKita v2** kepada kolega/pemangku kepentingan.

---

## 🔐 1. Kredensial Akun Demo

Semua akun terdaftar dengan password berikut:

| Peran | Email | Password | Status Instansi | Keterangan Demo |
|---|---|---|---|---|
| **Super Admin** | `superadmin@suarakita.id` | `SuperAdminSuaraKita2026!` | N/A | Full akses platform, persetujuan instansi, rekap komisi 20% |
| **Admin Instansi 1** | `admin.fikom@instansi.ac.id` | `Password123!` | `AKTIF` | BEM FIKOM — Kontes aktif dengan data voting real-time & order pending |
| **Admin Instansi 2** | `admin.hmm@instansi.ac.id` | `Password123!` | `AKTIF` | HMM FEB — Polling ketua himpunan aktif |
| **Admin Instansi 3** | `admin.seni@instansi.ac.id` | `Password123!` | `PENDING` | UKM Seni — Belum diapprove (untuk demo fitur approval) |

---

## 🌐 2. URL Publik (Perspektif Voter)

Voter tidak perlu login. Cukup akses URL publik berikut:

- **Halaman Utama / Landing Page**: `http://localhost:3000/`
- **Profil Instansi BEM FIKOM**: `http://localhost:3000/i/bem-fikom`
- **Kontes Duta FIKOM 2026**: `http://localhost:3000/i/bem-fikom/kontes/1`
- **Halaman Vote / Redeem Token**: `http://localhost:3000/i/bem-fikom/kontes/1/vote`
- **Profil Instansi HMM FEB**: `http://localhost:3000/i/hmm-feb`

---

## 🎬 3. Skenario & Alur Demo yang Direkomendasikan

### Skenario A: Alur Voter (Beli Token & Vote Real-time)
1. Buka URL Kontes: `http://localhost:3000/i/bem-fikom/kontes/1`.
2. Tunjukkan **Daftar Kandidat** dan **Leaderboard Suara Live**.
3. Pilih salah satu **Paket Token** (misal *Paket Sultan - 15 Suara*), klik **"Beli Token via WA"**.
4. Masukkan nomor WA, lalu klik **"Lanjut ke WhatsApp"** → Tunjukkan bahwa sistem men-generate pesan otomatis ke WhatsApp Admin Instansi dengan isi Order ID & rincian paket.
5. Pindah ke halaman vote (`/vote`), masukkan kode token yang sudah ada untuk uji coba instant:
   - Kode Token siap pakai: **`SK-DUTAFK01`** *(sudah dipakai)* → Tunjukkan bahwa token sekali pakai tidak bisa dipakai ulang.

---

### Skenario B: Alur Admin Instansi (Verifikasi Pembelian & Generate Token)
1. Login sebagai Admin BEM FIKOM di `http://localhost:3000/login` (`admin.fikom@instansi.ac.id` / `Password123!`).
2. Masuk ke menu **Kelola Kontes** → Klik **"Orders"** pada *Pemilihan Duta FIKOM 2026*.
3. Tunjukkan daftar pesanan token yang berstatus **`MENUNGGU_VERIFIKASI`**.
4. Klik tombol **"Verifikasi"** pada salah satu order pending → Tunjukkan popup sukses yang menampilkan **Kode Token Unik** (format `SK-XXXXXXXX`) dan otomatis menghitung **20% Platform Fee**.
5. Copy kode token tersebut, lalu coba gunakan di halaman Vote Publik!

---

### Skenario C: Alur Super Admin (Persetujuan Instansi & Rekap Komisi 20%)
1. Coba login dengan akun `admin.seni@instansi.ac.id` / `Password123!` → Tunjukkan sistem menolak karena instansi berstatus **`PENDING`**.
2. Logout, lalu login sebagai Super Admin (`superadmin@suarakita.id` / `SuperAdminSuaraKita2026!`).
3. Buka menu **Persetujuan Instansi** → Tunjukkan instansi *UKM Seni & Musik Mahasiswa* berstatus `PENDING`.
4. Klik **"Approve / Aktifkan"** → Sekarang instansi UKM Seni resmi aktif!
5. Buka menu **Rekapitulasi Komisi** → Tunjukkan transparansi data omset penjualan token per instansi beserta hak komisi 20% platform SuaraKita.

---

## 🛠️ Perintah Menjalankan Server Lokal

```bash
npm run dev
```

Server akan aktif di `http://localhost:3000`.
