-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('MOVIE', 'SERIES', 'DOCUMENTARY', 'OTHER');

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "release_year" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "trailer_url" TEXT NOT NULL,
    "average_rating" DOUBLE PRECISION NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "country_of_origin" INTEGER NOT NULL,
    "content_type" "ContentType" NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);
