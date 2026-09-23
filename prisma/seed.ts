import { PrismaClient, UserRole, InstansiStatus, KontesStatus, OrderStatus } from '@prisma/client'
import { scryptSync, randomBytes } from 'crypto'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
})


// Compatible scrypt password hasher matching nuxt-auth-utils format
function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hashedPassword = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hashedPassword}`
}

async function main() {
  console.log('🌱 Starting comprehensive database seeding for demo...')

  // 1. Clear existing data in correct order
  await prisma.vote.deleteMany()
  await prisma.token.deleteMany()
  await prisma.order.deleteMany()
  await prisma.tokenPackage.deleteMany()
  await prisma.kandidat.deleteMany()
  await prisma.kontes.deleteMany()
  await prisma.logAudit.deleteMany()
  await prisma.user.deleteMany()
  await prisma.instansi.deleteMany()

  // Common password hash for demo accounts
  const commonPasswordHash = hashPassword('Password123!')
  const superAdminPasswordHash = hashPassword('SuperAdminSuaraKita2026!')

  // 2. Super Admin
  const superAdmin = await prisma.user.create({
    data: {
      email: 'superadmin@suarakita.id',
      password: superAdminPasswordHash,
      nama: 'Super Admin SuaraKita',
      role: UserRole.SUPER_ADMIN,
    },
  })
  console.log('✅ Super Admin created (superadmin@suarakita.id / SuperAdminSuaraKita2026!)')

  // 3. Instansi 1: BEM Fakultas Ilmu Komputer (AKTIF)
  const instansiFikom = await prisma.instansi.create({
    data: {
      nama: 'BEM Fakultas Ilmu Komputer',
      slug: 'bem-fikom',
      noWaAdmin: '081234567890',
      status: InstansiStatus.AKTIF,
      users: {
        create: {
          email: 'admin.fikom@instansi.ac.id',
          password: commonPasswordHash,
          nama: 'Budi Pratama (Admin FIKOM)',
          role: UserRole.ADMIN_INSTANSI,
        },
      },
    },
  })

  // Kontes 1: Pemilihan Duta Fikom 2026 (AKTIF)
  const kontesDuta = await prisma.kontes.create({
    data: {
      instansiId: instansiFikom.id,
      nama: 'Pemilihan Duta FIKOM 2026',
      deskripsi: 'Ajang pemilihan putra-putri terbaik Fakultas Ilmu Komputer 2026. Dukung kandidat favoritmu!',
      tanggalMulai: new Date('2026-09-01'),
      tanggalSelesai: new Date('2026-10-15'),
      status: KontesStatus.AKTIF,
    },
  })

  // Kandidat Fikom
  const k1 = await prisma.kandidat.create({
    data: {
      kontesId: kontesDuta.id,
      nama: 'Ahmad Raihan & Nabila Putri',
      nomorUrut: 1,
      fotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      deskripsi: 'Visi: Mewujudkan mahasiswa FIKOM yang berdaya saing global, inovatif, dan berkarakter.',
    },
  })

  const k2 = await prisma.kandidat.create({
    data: {
      kontesId: kontesDuta.id,
      nama: 'Dimas Anggara & Sarah Azhari',
      nomorUrut: 2,
      fotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      deskripsi: 'Visi: Mengakselerasi karya teknologi dan seni budaya digital di lingkungan kampus.',
    },
  })

  const k3 = await prisma.kandidat.create({
    data: {
      kontesId: kontesDuta.id,
      nama: 'Fikri Haikal & Amanda Manopo',
      nomorUrut: 3,
      fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      deskripsi: 'Visi: FIKOM Inklusi & Kolaboratif dalam riset ilmiah dan aksi kepemudaan.',
    },
  })

  // Paket Token Fikom
  const pkgSingle = await prisma.tokenPackage.create({
    data: {
      kontesId: kontesDuta.id,
      namaPaket: 'Paket Dukungan Single',
      jumlahSuara: 1,
      harga: 5000,
    },
  })

  const pkgHemat = await prisma.tokenPackage.create({
    data: {
      kontesId: kontesDuta.id,
      namaPaket: 'Paket Hemat (5 Suara)',
      jumlahSuara: 5,
      harga: 20000,
    },
  })

  const pkgSultan = await prisma.tokenPackage.create({
    data: {
      kontesId: kontesDuta.id,
      namaPaket: 'Paket Sultan (15 Suara)',
      jumlahSuara: 15,
      harga: 50000,
    },
  })

  // Order & Voting Fikom (Simulasi transaksi terverifikasi & pending)
  // Order 1 (Verifikasi & Digunakan untuk Kandidat 1)
  await prisma.order.create({
    data: {
      packageId: pkgSultan.id,
      kontakWa: '081999888777',
      status: OrderStatus.TERVERIFIKASI,
      platformFee: 10000, // 20% dari 50.000
      verifiedById: superAdmin.id,
      verifiedAt: new Date(),
      token: {
        create: {
          code: 'SK-DUTAFK01',
          isUsed: true,
          usedAt: new Date(),
          vote: {
            create: {
              kandidatId: k1.id,
              voteCount: 15,
            },
          },
        },
      },
    },
  })

  // Order 2 (Verifikasi & Digunakan untuk Kandidat 2)
  await prisma.order.create({
    data: {
      packageId: pkgHemat.id,
      kontakWa: '081233445566',
      status: OrderStatus.TERVERIFIKASI,
      platformFee: 4000, // 20% dari 20.000
      verifiedById: superAdmin.id,
      verifiedAt: new Date(),
      token: {
        create: {
          code: 'SK-DUTAFK02',
          isUsed: true,
          usedAt: new Date(),
          vote: {
            create: {
              kandidatId: k2.id,
              voteCount: 5,
            },
          },
        },
      },
    },
  })

  // Order 3 (Verifikasi & Digunakan untuk Kandidat 1 lagi)
  await prisma.order.create({
    data: {
      packageId: pkgSultan.id,
      kontakWa: '085711223344',
      status: OrderStatus.TERVERIFIKASI,
      platformFee: 10000,
      verifiedById: superAdmin.id,
      verifiedAt: new Date(),
      token: {
        create: {
          code: 'SK-DUTAFK03',
          isUsed: true,
          usedAt: new Date(),
          vote: {
            create: {
              kandidatId: k1.id,
              voteCount: 15,
            },
          },
        },
      },
    },
  })

  // Order 4 (Pending - Menunggu Verifikasi Admin)
  await prisma.order.create({
    data: {
      packageId: pkgHemat.id,
      kontakWa: '081399001122',
      status: OrderStatus.MENUNGGU_VERIFIKASI,
    },
  })

  // Order 5 (Pending - Menunggu Verifikasi Admin)
  await prisma.order.create({
    data: {
      packageId: pkgSingle.id,
      kontakWa: '081277665544',
      status: OrderStatus.MENUNGGU_VERIFIKASI,
    },
  })

  // Kontes 2 Fikom: Penyisihan (DITUTUP)
  await prisma.kontes.create({
    data: {
      instansiId: instansiFikom.id,
      nama: 'Babak Penyisihan Duta FIKOM 2026',
      deskripsi: 'Tahap seleksi berkas & wawancara awal penyisihan 10 besar kandidat.',
      tanggalMulai: new Date('2026-08-01'),
      tanggalSelesai: new Date('2026-08-25'),
      status: KontesStatus.DITUTUP,
    },
  })

  console.log('✅ Instansi FIKOM created with active contest, candidates, and live voting data.')

  // 4. Instansi 2: HMM Fakultas Ekonomi & Bisnis (AKTIF)
  const instansiFeb = await prisma.instansi.create({
    data: {
      nama: 'Himpunan Mahasiswa Manajemen FEB',
      slug: 'hmm-feb',
      noWaAdmin: '089876543210',
      status: InstansiStatus.AKTIF,
      users: {
        create: {
          email: 'admin.hmm@instansi.ac.id',
          password: commonPasswordHash,
          nama: 'Siti Rahma (Admin HMM)',
          role: UserRole.ADMIN_INSTANSI,
        },
      },
    },
  })

  const kontesFeb = await prisma.kontes.create({
    data: {
      instansiId: instansiFeb.id,
      nama: 'Polling Ketua HMM FEB 2026/2027',
      deskripsi: 'Suarakan dukunganmu untuk calon Ketua Himpunan Mahasiswa Manajemen FEB!',
      tanggalMulai: new Date('2026-09-10'),
      tanggalSelesai: new Date('2026-10-30'),
      status: KontesStatus.AKTIF,
    },
  })

  await prisma.kandidat.create({
    data: {
      kontesId: kontesFeb.id,
      nama: 'Paslon #1 - Rizky & Danang',
      nomorUrut: 1,
      deskripsi: 'Manajemen Proaktif & Berprestasi',
    },
  })

  const kFeb2 = await prisma.kandidat.create({
    data: {
      kontesId: kontesFeb.id,
      nama: 'Paslon #2 - Maya & Anisa',
      nomorUrut: 2,
      deskripsi: 'Manajemen Syariah & Digital Entrepreneur',
    },
  })

  const pkgFeb1 = await prisma.tokenPackage.create({
    data: {
      kontesId: kontesFeb.id,
      namaPaket: 'Token Suara Regular',
      jumlahSuara: 1,
      harga: 2000,
    },
  })

  // Order terverifikasi FEB
  await prisma.order.create({
    data: {
      packageId: pkgFeb1.id,
      kontakWa: '089911223344',
      status: OrderStatus.TERVERIFIKASI,
      platformFee: 400,
      verifiedById: superAdmin.id,
      verifiedAt: new Date(),
      token: {
        create: {
          code: 'SK-HMMFEB01',
          isUsed: true,
          usedAt: new Date(),
          vote: {
            create: {
              kandidatId: kFeb2.id,
              voteCount: 1,
            },
          },
        },
      },
    },
  })

  console.log('✅ Instansi HMM FEB created with active polling.')

  // 5. Instansi 3: UKM Seni & Musik (PENDING - untuk Demo Approval Super Admin)
  await prisma.instansi.create({
    data: {
      nama: 'UKM Seni & Musik Mahasiswa',
      slug: 'ukm-seni',
      noWaAdmin: '085544332211',
      status: InstansiStatus.PENDING,
      users: {
        create: {
          email: 'admin.seni@instansi.ac.id',
          password: commonPasswordHash,
          nama: 'Rian D’Masiv (Pengurus UKM)',
          role: UserRole.ADMIN_INSTANSI,
        },
      },
    },
  })

  console.log('✅ Instansi UKM Seni created with PENDING status (ready for Super Admin approval demo).')

  console.log('\n🎉 Comprehensive seeding completed successfully!')
  console.log('---------------------------------------------------------')
  console.log('📌 CREDENTIALS DEMO:')
  console.log('1. Super Admin:')
  console.log('   Email   : superadmin@suarakita.id')
  console.log('   Password: SuperAdminSuaraKita2026!')
  console.log('2. Admin Instansi 1 (BEM FIKOM - AKTIF):')
  console.log('   Email   : admin.fikom@instansi.ac.id')
  console.log('   Password: Password123!')
  console.log('   URL Public: http://localhost:3000/i/bem-fikom')
  console.log('3. Admin Instansi 2 (HMM FEB - AKTIF):')
  console.log('   Email   : admin.hmm@instansi.ac.id')
  console.log('   Password: Password123!')
  console.log('   URL Public: http://localhost:3000/i/hmm-feb')
  console.log('4. Admin Instansi 3 (UKM Seni - PENDING Approval):')
  console.log('   Email   : admin.seni@instansi.ac.id')
  console.log('   Password: Password123!')
  console.log('---------------------------------------------------------')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
