/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instansi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kandidat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `log_audit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pemilih` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pemilu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `suara` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN_INSTANSI');

-- CreateEnum
CREATE TYPE "InstansiStatus" AS ENUM ('PENDING', 'AKTIF', 'NONAKTIF');

-- CreateEnum
CREATE TYPE "KontesStatus" AS ENUM ('DRAFT', 'AKTIF', 'DITUTUP');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('MENUNGGU_VERIFIKASI', 'TERVERIFIKASI', 'DITOLAK');

-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_instansi_id_fkey";

-- DropForeignKey
ALTER TABLE "kandidat" DROP CONSTRAINT "kandidat_pemilu_id_fkey";

-- DropForeignKey
ALTER TABLE "log_audit" DROP CONSTRAINT "log_audit_instansi_id_fkey";

-- DropForeignKey
ALTER TABLE "pemilih" DROP CONSTRAINT "pemilih_pemilu_id_fkey";

-- DropForeignKey
ALTER TABLE "pemilu" DROP CONSTRAINT "pemilu_instansi_id_fkey";

-- DropForeignKey
ALTER TABLE "suara" DROP CONSTRAINT "suara_kandidat_id_fkey";

-- DropForeignKey
ALTER TABLE "suara" DROP CONSTRAINT "suara_pemilu_id_fkey";

-- DropTable
DROP TABLE "admin";

-- DropTable
DROP TABLE "instansi";

-- DropTable
DROP TABLE "kandidat";

-- DropTable
DROP TABLE "log_audit";

-- DropTable
DROP TABLE "pemilih";

-- DropTable
DROP TABLE "pemilu";

-- DropTable
DROP TABLE "suara";

-- DropEnum
DROP TYPE "RoleAdmin";

-- DropEnum
DROP TYPE "StatusInstansi";

-- DropEnum
DROP TYPE "StatusPemilu";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nama" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'ADMIN_INSTANSI',
    "instansiId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instansi" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "noWaAdmin" TEXT NOT NULL,
    "status" "InstansiStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instansi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kontes" (
    "id" SERIAL NOT NULL,
    "instansiId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,
    "tanggalMulai" TIMESTAMP(3),
    "tanggalSelesai" TIMESTAMP(3),
    "status" "KontesStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kontes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kandidat" (
    "id" SERIAL NOT NULL,
    "kontesId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "nomorUrut" INTEGER,
    "fotoUrl" TEXT,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kandidat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenPackage" (
    "id" SERIAL NOT NULL,
    "kontesId" INTEGER NOT NULL,
    "namaPaket" TEXT NOT NULL,
    "jumlahSuara" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "kontakWa" TEXT,
    "buktiBayarUrl" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'MENUNGGU_VERIFIKASI',
    "platformFee" INTEGER,
    "verifiedById" INTEGER,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "kandidatId" INTEGER NOT NULL,
    "voteCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogAudit" (
    "id" SERIAL NOT NULL,
    "instansiId" INTEGER NOT NULL,
    "aktor" TEXT NOT NULL,
    "aksi" TEXT NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Instansi_slug_key" ON "Instansi"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Token_orderId_key" ON "Token"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_code_key" ON "Token"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_tokenId_key" ON "Vote"("tokenId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_instansiId_fkey" FOREIGN KEY ("instansiId") REFERENCES "Instansi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kontes" ADD CONSTRAINT "Kontes_instansiId_fkey" FOREIGN KEY ("instansiId") REFERENCES "Instansi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kandidat" ADD CONSTRAINT "Kandidat_kontesId_fkey" FOREIGN KEY ("kontesId") REFERENCES "Kontes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenPackage" ADD CONSTRAINT "TokenPackage_kontesId_fkey" FOREIGN KEY ("kontesId") REFERENCES "Kontes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "TokenPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_kandidatId_fkey" FOREIGN KEY ("kandidatId") REFERENCES "Kandidat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogAudit" ADD CONSTRAINT "LogAudit_instansiId_fkey" FOREIGN KEY ("instansiId") REFERENCES "Instansi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
