-- CreateEnum
CREATE TYPE "StatusInstansi" AS ENUM ('pending', 'aktif', 'nonaktif');

-- CreateEnum
CREATE TYPE "RoleAdmin" AS ENUM ('super_admin', 'admin_instansi');

-- CreateEnum
CREATE TYPE "StatusPemilu" AS ENUM ('draft', 'aktif', 'ditutup');

-- CreateTable
CREATE TABLE "instansi" (
    "id" SERIAL NOT NULL,
    "nama_instansi" TEXT NOT NULL,
    "jenis_instansi" TEXT NOT NULL,
    "status" "StatusInstansi" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "instansi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "RoleAdmin" NOT NULL,
    "instansi_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pemilu" (
    "id" SERIAL NOT NULL,
    "instansi_id" INTEGER NOT NULL,
    "nama_pemilu" TEXT NOT NULL,
    "deskripsi" TEXT,
    "tanggal_mulai" TIMESTAMP(3) NOT NULL,
    "tanggal_selesai" TIMESTAMP(3) NOT NULL,
    "status" "StatusPemilu" NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pemilu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kandidat" (
    "id" SERIAL NOT NULL,
    "pemilu_id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "foto_url" TEXT,
    "visi_misi" TEXT,

    CONSTRAINT "kandidat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pemilih" (
    "id" SERIAL NOT NULL,
    "pemilu_id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "identitas" TEXT NOT NULL,
    "token_akses" TEXT NOT NULL,
    "status_memilih" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pemilih_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suara" (
    "id" SERIAL NOT NULL,
    "pemilu_id" INTEGER NOT NULL,
    "kandidat_id" INTEGER NOT NULL,
    "waktu_submit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "suara_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log_audit" (
    "id" SERIAL NOT NULL,
    "instansi_id" INTEGER NOT NULL,
    "aktor" TEXT NOT NULL,
    "aksi" TEXT NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_audit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pemilih_token_akses_key" ON "pemilih"("token_akses");

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_instansi_id_fkey" FOREIGN KEY ("instansi_id") REFERENCES "instansi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemilu" ADD CONSTRAINT "pemilu_instansi_id_fkey" FOREIGN KEY ("instansi_id") REFERENCES "instansi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kandidat" ADD CONSTRAINT "kandidat_pemilu_id_fkey" FOREIGN KEY ("pemilu_id") REFERENCES "pemilu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemilih" ADD CONSTRAINT "pemilih_pemilu_id_fkey" FOREIGN KEY ("pemilu_id") REFERENCES "pemilu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suara" ADD CONSTRAINT "suara_pemilu_id_fkey" FOREIGN KEY ("pemilu_id") REFERENCES "pemilu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suara" ADD CONSTRAINT "suara_kandidat_id_fkey" FOREIGN KEY ("kandidat_id") REFERENCES "kandidat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_audit" ADD CONSTRAINT "log_audit_instansi_id_fkey" FOREIGN KEY ("instansi_id") REFERENCES "instansi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
