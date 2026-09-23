# PRD: SuaraKita v2 — Platform Kontes & Polling Berbasis Token Berbayar

## 1. Latar Belakang

Model awal SuaraKita adalah e-voting formal (satu pemilih = satu suara, daftar pemilih tertutup terverifikasi) — cocok untuk pemilihan ketua organisasi, tapi menyulitkan adopsi karena instansi harus percaya dan berkomitmen di awal.

**Pivot**: SuaraKita menjadi platform kontes/polling populer (mis. Duta Muslim-Muslimah Fakultas) di mana:
- Instansi daftar **gratis**, tanpa biaya di muka.
- Siapa saja bisa mendukung kandidat dengan **membeli token** — bukan hak suara berbasis keanggotaan.
- Satu token bisa mewakili banyak suara sesuai paket; voter boleh beli token berkali-kali (multi-vote diperbolehkan).
- Monetisasi dari **komisi 20%** atas penjualan token, bukan biaya langganan instansi.

## 2. Problem Statement

Instansi kampus/organisasi ingin mengadakan kontes populer yang seru dan menghasilkan engagement/dana, tapi tidak punya sistem sendiri dan tidak mau membayar biaya platform di muka. Monetisasi terjadi dari pembelian token oleh pendukung, bukan dari biaya langganan instansi.

## 3. Target Pengguna

| Peran | Deskripsi |
|---|---|
| **Admin Instansi** | Daftar gratis, buat kontes (bisa berkali-kali/berurutan), custom nama kontes, kandidat, paket token; verifikasi pembayaran manual; generate & kirim token |
| **Voter/Pendukung** | Siapa saja, tidak perlu akun/terdaftar; beli token via WA, vote pakai kode token; boleh beli & vote berkali-kali |
| **Super Admin** | Approve tenant baru, pantau seluruh kontes, rekap komisi platform lintas instansi |

## 4. Model Bisnis & Alur Pembayaran (MVP — Manual via WhatsApp)

Tidak ada payment gateway di MVP. Alurnya:

1. Voter pilih paket token di halaman kontes → klik "Beli" → diarahkan ke `wa.me` link admin instansi (pesan pre-filled).
2. Voter transfer manual ke rekening instansi, kirim bukti bayar via WA.
3. Admin instansi verifikasi bukti bayar secara manual di dashboard.
4. Sistem generate kode token unik → admin kirim kode ke voter via WA.
5. Voter pakai kode token di web untuk vote ke satu kandidat (jumlah suara = nilai paket).

**Komisi**: setiap Order terverifikasi dikenai `platform_fee` = 20% dari harga paket, direkap untuk settlement terpisah (bukan real-time) ke SuaraKita. Dana penjualan token dipegang instansi sendiri — SuaraKita tidak menampung dana pihak ketiga secara langsung.

**Data voter**: boleh anonim. Kontak WA sudah cukup sebagai kanal komunikasi; tidak wajib simpan identitas formal.

## 5. Multi-Kontes per Instansi

Satu instansi bisa mengadakan beberapa kontes berurutan, misalnya:
- Kontes #1 "Babak Penyisihan" → tentukan 10 besar.
- Kontes #2 "Grand Final" → admin input ulang 10 finalis sebagai kandidat baru di kontes terpisah.

Tidak ada fitur otomatis "promote ke babak berikutnya" di MVP — admin instansi input ulang kandidat finalis secara manual di kontes baru. Ini menjaga scope tetap achievable dan otomatis mendukung "boleh double vote, asal beli token lagi" karena token tiap kontes independen.

## 6. Kepatuhan & Mitigasi Risiko Regulasi

Model "bayar untuk vote" mirip pola vote SMS premium/polling berbayar yang rawan disalahartikan sebagai judi. Pembeda konseptual yang ditegaskan di produk (bukan nasihat hukum):

- **Tidak ada elemen keberuntungan/acak** — hasil murni dari akumulasi suara yang dibeli, bukan undian.
- **Tidak ada hadiah uang untuk voter** — token adalah bentuk dukungan, bukan tiket menang. Fitur undian berhadiah bagi pembeli token sengaja **dihindari**.
- **Transparansi hasil** — jumlah suara & token terjual dapat diakses publik.
- **Token nonrefundable & sekali pakai** — dinyatakan jelas di syarat & ketentuan tiap kontes, ditampilkan sebelum checkout.
- **Dana dipegang instansi**, bukan SuaraKita, mengurangi eksposur isu penampungan dana pihak ketiga.

## 7. Gap dari Skema Prisma Awal (Referensi)

Skema awal yang dibagikan belum multi-tenant dan belum election-scoped:
- Tidak ada model `Instansi`/`Tenant`.
- `Candidate` & `TokenPackage` bersifat global, seharusnya di-scope per `Kontes`.
- Tidak ada model `Kontes`/`Election` sebagai parent kandidat & paket token.
- Tidak ada referensi payment gateway/verifikasi manual di `Order`.

ERD final (sudah mengatasi gap ini) tersedia di file `.dbml` terpisah untuk dibuka di dbdiagram.io.

## 8. Ringkasan Perubahan Requirement Kunci (vs SRS Lama)

| Aspek | Lama | Baru |
|---|---|---|
| Siapa boleh vote | Pemilih terdaftar & diverifikasi | Siapa saja yang beli token |
| Jumlah suara/orang | Maksimal 1 | Tidak dibatasi (beli token lagi = vote lagi) |
| Anonimitas | Wajib dipisah dari identitas (demokrasi) | Anonim by default (kepraktisan, kontak via WA) |
| Model bisnis | Tenant bayar/subscribe | Gratis daftar, komisi 20% dari penjualan token |
| Pembayaran | Tidak dibahas | Manual via WhatsApp (MVP), payment gateway di Fase 2 |

## 9. Roadmap

- **Fase 1 (MVP)**: alur di atas — verifikasi manual WA, satu-dua instansi percontohan.
- **Fase 2**: payment gateway otomatis (QRIS/e-wallet/VA), settlement otomatis komisi, fitur promosi kandidat antar-babak, panel Super Admin multi-tenant penuh.
